import React from 'react';
import { Check, X, Send, AlertCircle, ShieldCheck, Sparkles, Volume2 } from 'lucide-react';
import type { LanguageCode } from '../types';
import type { AudioVisualizerState, VoiceStatus } from '../utils/voiceService';
import { AudioVisualizer } from './AudioVisualizer';

interface VoiceRecorderBarProps {
  isRecording: boolean;
  status: VoiceStatus;
  interimTranscript: string;
  finalTranscript: string;
  audioData: AudioVisualizerState | null;
  durationSeconds: number;
  language: LanguageCode;
  onDoneSpeaking: () => void;
  onCancelRecording: () => void;
  onDirectSend?: () => void;
  errorMessage?: string | null;
  onClearError?: () => void;
  onTrySampleVoice?: (sampleText: string) => void;
}

const SAMPLE_VOICE_NOTES: Record<LanguageCode, string[]> = {
  en: [
    "I'm feeling overwhelmed by my upcoming deadlines and haven't slept properly in days.",
    "I had a conflict with a close friend and feel really isolated and down.",
    "Took a short walk and did the 4-4-4 breathing; feeling noticeably calmer now."
  ],
  hi: [
    "मुझे अपनी परीक्षाओं को लेकर बहुत घबराहट हो रही है और पढ़ाई पर ध्यान नहीं लग पा रहा है।",
    "आज ऑफिस में काम का बहुत दबाव था, मैं खुद को बहुत थका हुआ महसूस कर रहा हूँ।",
    "मुझे थोड़ी देर पहले बेचैनी हो रही थी, लेकिन प्राणायाम करने के बाद अब राहत महसूस हो रही है।"
  ],
  mr: [
    "मला माझ्या परीक्षा आणि भविष्याची खूप काळजी वाटत आहे, काहीच सुचत नाहीये.",
    "आज दिवसभर कामाचा खूप ताण होता आणि मला खूप थकल्यासारखे वाटत आहे.",
    "थोड्या वेळापूर्वी खूप अस्वस्थ वाटत होते, पण शांत बसून दीर्घ श्वास घेतल्याने आता बरे वाटत आहे."
  ]
};

export const VoiceRecorderBar: React.FC<VoiceRecorderBarProps> = ({
  isRecording,
  status,
  interimTranscript,
  finalTranscript,
  audioData,
  durationSeconds,
  language,
  onDoneSpeaking,
  onCancelRecording,
  onDirectSend,
  errorMessage,
  onClearError,
  onTrySampleVoice
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const currentText = (finalTranscript + (interimTranscript ? ' ' + interimTranscript : '')).trim();
  const samplePrompts = SAMPLE_VOICE_NOTES[language] || SAMPLE_VOICE_NOTES.en;

  return (
    <div className="voice-recorder-bar-container" role="region" aria-label="Voice check-in recorder">
      {/* Status & Visualizer Top Row */}
      <div className="voice-bar-header">
        <div className="voice-status-group">
          <div className="recording-indicator-pulse">
            <span className="rec-dot" />
            <span className="rec-label">{status === 'listening' ? 'RECORDING' : status.toUpperCase()}</span>
          </div>
          <span className="voice-timer-badge">{formatTime(durationSeconds)}</span>
        </div>

        {/* Real-time Dynamic Waveform Canvas */}
        <div className="voice-visualizer-slot">
          <AudioVisualizer
            isActive={isRecording}
            frequencyData={audioData?.frequencyData}
            volume={audioData?.volume}
            width={220}
            height={38}
          />
        </div>

        {/* Privacy Pill */}
        <div className="voice-privacy-badge" title="Microphone stream runs 100% locally in your browser. Mindra does not record or transmit your raw audio.">
          <ShieldCheck size={13} color="#0d9488" />
          <span>Local & Private</span>
        </div>
      </div>

      {/* Live Transcript / Caption Preview Box */}
      <div className="voice-transcript-card">
        {currentText ? (
          <div className="voice-live-text">
            <span>{finalTranscript}</span>
            {interimTranscript && (
              <span className="voice-interim-text"> {interimTranscript}</span>
            )}
          </div>
        ) : (
          <div className="voice-placeholder-hint">
            <div className="voice-soundwave-bars">
              <span /><span /><span /><span />
            </div>
            <span>
              {language === 'hi' 
                ? 'सुन रहे हैं... कृपया अपने विचार बोलें (स्पीच-टू-टेक्स्ट सक्रिय है)' 
                : language === 'mr' 
                ? 'ऐकत आहोत... कृपया आपल्या भावना बोलून सांगा' 
                : 'Listening... speak naturally. Your voice will appear here in real-time.'}
            </span>
          </div>
        )}
      </div>

      {/* Error or Permission Guidance if present */}
      {errorMessage && (
        <div className="voice-error-banner">
          <AlertCircle size={15} />
          <span>{errorMessage}</span>
          {onClearError && (
            <button className="voice-error-dismiss" onClick={onClearError} aria-label="Dismiss error">
              <X size={13} />
            </button>
          )}
        </div>
      )}

      {/* Action Controls & Sample Prompts Row */}
      <div className="voice-actions-row">
        <div className="voice-sample-chips">
          <span className="voice-sample-label">
            <Sparkles size={12} color="#a855f7" />
            <span>Try sample note:</span>
          </span>
          {samplePrompts.slice(0, 2).map((sample, idx) => (
            <button
              key={idx}
              className="voice-sample-btn"
              onClick={() => onTrySampleVoice?.(sample)}
              title="Click to simulate voice input of this sample phrase"
            >
              <Volume2 size={11} />
              <span>"{sample.substring(0, 24)}..."</span>
            </button>
          ))}
        </div>

        <div className="voice-btn-group">
          <button
            type="button"
            className="voice-cancel-btn"
            onClick={onCancelRecording}
            title="Discard this recording and return to typing"
          >
            <X size={15} />
            <span>Cancel</span>
          </button>

          <button
            type="button"
            className="voice-done-btn"
            onClick={onDoneSpeaking}
            title="Stop recording and review transcribed text in chat input"
          >
            <Check size={16} />
            <span>Done Speaking</span>
          </button>

          {onDirectSend && (
            <button
              type="button"
              className="voice-direct-send-btn"
              onClick={onDirectSend}
              disabled={!currentText}
              title="Transcribe and send check-in immediately"
            >
              <Send size={15} />
              <span>Send Now</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
