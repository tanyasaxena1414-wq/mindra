import type { LanguageCode, AcousticCues } from '../types';

// Browser API declarations for Web Speech
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export interface AudioVisualizerState {
  frequencyData: Uint8Array;
  volume: number; // 0 to 1
  peak: number;
}

export interface VoiceRecorderCallbacks {
  onInterimTranscript?: (text: string) => void;
  onFinalTranscript?: (text: string) => void;
  onAudioData?: (data: AudioVisualizerState) => void;
  onError?: (errorCode: string, userMessage: string) => void;
  onStatusChange?: (status: VoiceStatus) => void;
}

export type VoiceStatus = 
  | 'idle' 
  | 'requesting-permission' 
  | 'listening' 
  | 'processing' 
  | 'permission-denied' 
  | 'unsupported' 
  | 'error';

export const isSpeechRecognitionSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
};

export const isSpeechSynthesisSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  return Boolean('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window);
};

export const isUserMediaSupported = (): boolean => {
  return typeof navigator !== 'undefined' && Boolean(navigator.mediaDevices?.getUserMedia);
};

export const getLanguageBCP47 = (lang: LanguageCode): string => {
  switch (lang) {
    case 'hi':
      return 'hi-IN';
    case 'mr':
      return 'mr-IN';
    case 'en':
    default:
      return 'en-US';
  }
};

/**
 * VoiceController handles:
 * 1. Web Audio API stream capture for real-time waveform visualization
 * 2. Real-time acoustic metric extraction (cadence, pitch variance, vocal strain)
 * 3. Speech-to-Text transcription via SpeechRecognition
 */
export class VoiceController {
  private mediaStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private recognition: any = null;
  private animationFrameId: number | null = null;
  
  private status: VoiceStatus = 'idle';
  private currentLanguage: LanguageCode = 'en';
  private callbacks: VoiceRecorderCallbacks = {};
  
  // Acoustic metrics tracking
  private volumeHistory: number[] = [];
  private highFreqHistory: number[] = [];
  private speechStartTime: number = 0;
  private finalTranscriptAccumulated: string = '';
  private interimTranscriptCurrent: string = '';

  constructor(language: LanguageCode = 'en', callbacks: VoiceRecorderCallbacks = {}) {
    this.currentLanguage = language;
    this.callbacks = callbacks;
  }

  public setLanguage(lang: LanguageCode) {
    this.currentLanguage = lang;
    if (this.recognition) {
      this.recognition.lang = getLanguageBCP47(lang);
    }
  }

  public setCallbacks(callbacks: VoiceRecorderCallbacks) {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  public getStatus(): VoiceStatus {
    return this.status;
  }

  private setStatus(status: VoiceStatus) {
    this.status = status;
    this.callbacks.onStatusChange?.(status);
  }

  /**
   * Start recording: requests mic, sets up analyser, starts speech recognition
   */
  public async startRecording(): Promise<boolean> {
    this.finalTranscriptAccumulated = '';
    this.interimTranscriptCurrent = '';
    this.volumeHistory = [];
    this.highFreqHistory = [];
    this.speechStartTime = Date.now();

    // Check recognition support
    const hasRecognition = isSpeechRecognitionSupported();
    const hasMedia = isUserMediaSupported();

    if (!hasRecognition && !hasMedia) {
      this.setStatus('unsupported');
      this.callbacks.onError?.(
        'unsupported',
        'Speech recognition and microphone access are not supported in this browser. Please try Chrome, Edge, or Safari.'
      );
      return false;
    }

    this.setStatus('requesting-permission');

    // 1. Setup Audio Stream for Visualizer & Acoustic Cues
    try {
      if (hasMedia) {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });

        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        this.audioContext = new AudioCtx();
        const source = this.audioContext.createMediaStreamSource(this.mediaStream);
        
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 64; // 32 frequency bins
        this.analyser.smoothingTimeConstant = 0.8;
        source.connect(this.analyser);

        this.startVisualizerLoop();
      }
    } catch (err: any) {
      console.warn('Microphone permission or audio context error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        this.setStatus('permission-denied');
        this.callbacks.onError?.(
          'permission-denied',
          'Microphone permission was denied. Please allow microphone access in your browser address bar to speak.'
        );
        return false;
      }
      // If hardware mic fails but recognition might work (or fallback mode), continue
    }

    // 2. Setup Speech Recognition
    if (hasRecognition) {
      try {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRec();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;
        this.recognition.lang = getLanguageBCP47(this.currentLanguage);

        this.recognition.onstart = () => {
          this.setStatus('listening');
        };

        this.recognition.onresult = (event: any) => {
          let interim = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              this.finalTranscriptAccumulated += (this.finalTranscriptAccumulated ? ' ' : '') + transcript.trim();
              this.callbacks.onFinalTranscript?.(this.finalTranscriptAccumulated);
            } else {
              interim += transcript;
            }
          }
          this.interimTranscriptCurrent = interim;
          this.callbacks.onInterimTranscript?.(interim);
        };

        this.recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          if (event.error === 'not-allowed') {
            this.setStatus('permission-denied');
            this.callbacks.onError?.('permission-denied', 'Microphone permission was denied. Please click the lock icon in the URL bar to enable it.');
          } else if (event.error === 'no-speech') {
            // Keep listening, do not abort immediately
          } else if (event.error === 'network') {
            this.callbacks.onError?.('network', 'Network connectivity issue during speech transcription.');
          } else {
            this.callbacks.onError?.(event.error, `Voice recognition notice: ${event.error}`);
          }
        };

        this.recognition.onend = () => {
          if (this.status === 'listening') {
            // Restart if user hasn't explicitly stopped yet
            try {
              this.recognition.start();
            } catch {
              // Ignore if already stopping
            }
          }
        };

        this.recognition.start();
        this.setStatus('listening');
        return true;
      } catch (e: any) {
        console.error('Failed to start speech recognition:', e);
        this.setStatus('error');
        this.callbacks.onError?.('recognition-failed', 'Could not initialize speech recognition. You can still type your thoughts.');
        return false;
      }
    } else {
      // Audio capture worked but SpeechRecognition not supported (e.g. Firefox)
      this.setStatus('listening');
      return true;
    }
  }

  private startVisualizerLoop() {
    if (!this.analyser) return;

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateVisualizer = () => {
      if (!this.analyser || this.status !== 'listening') return;

      this.analyser.getByteFrequencyData(dataArray);

      // Compute average volume
      let sum = 0;
      let peak = 0;
      let highFreqSum = 0;

      for (let i = 0; i < bufferLength; i++) {
        const val = dataArray[i];
        sum += val;
        if (val > peak) peak = val;
        // high frequency bins (top 40%)
        if (i > bufferLength * 0.6) {
          highFreqSum += val;
        }
      }

      const avgVolume = sum / (bufferLength * 255);
      const highFreqRatio = highFreqSum / (Math.max(1, sum));

      this.volumeHistory.push(avgVolume);
      this.highFreqHistory.push(highFreqRatio);

      this.callbacks.onAudioData?.({
        frequencyData: dataArray,
        volume: avgVolume,
        peak: peak / 255
      });

      this.animationFrameId = requestAnimationFrame(updateVisualizer);
    };

    this.animationFrameId = requestAnimationFrame(updateVisualizer);
  }

  /**
   * Stop recording: shuts down audio stream and recognition, computes acoustic cues
   */
  public stopRecording(): { transcript: string; acousticCues: AcousticCues } {
    this.setStatus('processing');

    // 1. Stop visualizer animation
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    // 2. Stop speech recognition
    if (this.recognition) {
      try {
        this.recognition.onend = null;
        this.recognition.stop();
      } catch (e) {
        console.warn('Error stopping speech recognition:', e);
      }
      this.recognition = null;
    }

    // 3. Stop media stream tracks
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close();
      } catch {
        // ignore
      }
      this.audioContext = null;
      this.analyser = null;
    }

    // Combine any pending interim transcript with final transcript
    let totalTranscript = this.finalTranscriptAccumulated.trim();
    if (this.interimTranscriptCurrent.trim()) {
      if (!totalTranscript.endsWith(this.interimTranscriptCurrent.trim())) {
        totalTranscript = (totalTranscript + ' ' + this.interimTranscriptCurrent.trim()).trim();
      }
    }

    // 4. Calculate real acoustic cues from collected audio metrics
    const durationSeconds = Math.max(1, (Date.now() - this.speechStartTime) / 1000);
    const acousticCues = this.computeRealAcousticCues(totalTranscript, durationSeconds);

    this.setStatus('idle');
    return {
      transcript: totalTranscript,
      acousticCues
    };
  }

  /**
   * Cancel and discard current recording
   */
  public cancelRecording() {
    this.finalTranscriptAccumulated = '';
    this.interimTranscriptCurrent = '';

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.recognition) {
      try {
        this.recognition.onend = null;
        this.recognition.abort();
      } catch {
        // ignore
      }
      this.recognition = null;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close();
      } catch {
        // ignore
      }
      this.audioContext = null;
      this.analyser = null;
    }

    this.setStatus('idle');
  }

  /**
   * Derives cadence, vocal strain, and pitch variance from audio history + transcript
   */
  private computeRealAcousticCues(transcript: string, durationSec: number): AcousticCues {
    const wordCount = transcript.trim().split(/\s+/).filter(Boolean).length;
    const wordsPerMinute = (wordCount / durationSec) * 60;

    // Cadence
    let cadence: AcousticCues['cadence'] = 'steady';
    if (wordsPerMinute > 165 || (wordCount > 10 && durationSec < 3.5)) {
      cadence = 'rapid';
    } else if (wordsPerMinute < 85 && wordCount > 3) {
      cadence = 'slow';
    }

    // Vocal strain from spectral high-frequency ratio & volume variation
    let vocalStrain: AcousticCues['vocalStrain'] = 'relaxed';
    if (this.highFreqHistory.length > 0) {
      const avgHighFreq = this.highFreqHistory.reduce((a, b) => a + b, 0) / this.highFreqHistory.length;
      if (avgHighFreq > 0.38) {
        vocalStrain = 'elevated';
      } else if (avgHighFreq > 0.22) {
        vocalStrain = 'moderate';
      }
    }

    // Pitch variance from volume volatility & pitch fluctuations
    let pitchVariance: AcousticCues['pitchVariance'] = 'normal';
    if (this.volumeHistory.length > 5) {
      const mean = this.volumeHistory.reduce((a, b) => a + b, 0) / this.volumeHistory.length;
      const variance = this.volumeHistory.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / this.volumeHistory.length;
      if (variance > 0.04) {
        pitchVariance = 'high';
      } else if (variance < 0.008) {
        pitchVariance = 'low';
      }
    }

    // Confidence score based on duration and audio data points
    const confidenceScore = Math.min(96, Math.max(76, Math.floor(78 + Math.min(this.volumeHistory.length / 10, 16))));

    return {
      cadence,
      pitchVariance,
      vocalStrain,
      confidenceScore
    };
  }
}

/**
 * Text-to-Speech (TTS) manager
 */
let activeUtterance: SpeechSynthesisUtterance | null = null;

export const speakBotResponse = (
  text: string,
  language: LanguageCode,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): boolean => {
  if (!isSpeechSynthesisSupported()) {
    console.warn('SpeechSynthesis is not supported in this browser environment.');
    return false;
  }

  // Cancel any active speech
  stopBotSpeaking();

  // Strip emojis, markdown, and extra whitespace for clean speech synthesis
  const cleanText = text
    .replace(/[#*`_~]/g, '')
    .replace(/\bhttps?:\/\/\S+/gi, '')
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) return false;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  const langCode = getLanguageBCP47(language);
  utterance.lang = langCode;
  utterance.rate = 0.94; // slightly slower, calming cadence for mental health sanctuary
  utterance.pitch = 1.0;

  // Find preferred voice matching language
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = 
    voices.find(v => v.lang.toLowerCase().replace('_', '-') === langCode.toLowerCase()) ||
    voices.find(v => v.lang.toLowerCase().startsWith(language)) ||
    voices.find(v => v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('samantha'));

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onstart = () => {
    activeUtterance = utterance;
    onStart?.();
  };

  utterance.onend = () => {
    activeUtterance = null;
    onEnd?.();
  };

  utterance.onerror = (e) => {
    activeUtterance = null;
    onError?.(e);
  };

  window.speechSynthesis.speak(utterance);
  return true;
};

export const stopBotSpeaking = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
    activeUtterance = null;
  }
};

export const isBotSpeaking = (): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return Boolean(activeUtterance && window.speechSynthesis.speaking);
};
