import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Send, 
  Sparkles, 
  Mic, 
  MicOff, 
  Info, 
  HeartPulse, 
  ShieldAlert, 
  ArrowRight,
  Volume2,
  VolumeX,
  Square,
  X
} from 'lucide-react';
import type { LifeStage, LanguageCode, TonePreference, CheckInEntry, EmotionVector, AcousticCues } from '../types';
import { PERSONAS } from '../data/personas';
import { TRANSLATIONS, LOCALIZED_PROMPTS } from '../data/translations';
import { 
  computeEmotionVector, 
  buildExplanation, 
  generateAdaptiveResponse, 
  checkIsCrisis, 
  generateAcousticCues,
  detectIntentAndContext,
  type ChatMessage
} from '../utils/emotionEngine';
import { 
  VoiceController, 
  speakBotResponse, 
  stopBotSpeaking,
  type AudioVisualizerState,
  type VoiceStatus
} from '../utils/voiceService';
import { RadarChart } from './RadarChart';
import { VoiceRecorderBar } from './VoiceRecorderBar';

interface CheckInChatProps {
  currentLifeStage: LifeStage;
  currentLanguage: LanguageCode;
  currentTone: TonePreference;
  onCheckInCompleted: (entry: CheckInEntry) => void;
  onOpenWellness: () => void;
  onOpenSupport: () => void;
  initialPrompt?: string;
}

export const CheckInChat: React.FC<CheckInChatProps> = ({
  currentLifeStage,
  currentLanguage,
  currentTone,
  onCheckInCompleted,
  onOpenWellness,
  onOpenSupport,
  initialPrompt = ''
}) => {
  const [inputText, setInputText] = useState(initialPrompt);
  const [simulatedVoiceActive, setSimulatedVoiceActive] = useState(false);
  const [activeCheckIn, setActiveCheckIn] = useState<CheckInEntry | null>(null);
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Voice Chat States
  const [isRecording, setIsRecording] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>('idle');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [audioData, setAudioData] = useState<AudioVisualizerState | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [voiceTranscribedMessage, setVoiceTranscribedMessage] = useState<string | null>(null);
  const [activeAcousticCues, setActiveAcousticCues] = useState<AcousticCues | null>(null);
  const [isLatestVoiceInput, setIsLatestVoiceInput] = useState(false);
  
  // TTS & Audio Playback States
  const [autoSpeakEnabled, setAutoSpeakEnabled] = useState(false);
  const [currentlySpeakingIndex, setCurrentlySpeakingIndex] = useState<number | null>(null);

  const voiceControllerRef = useRef<VoiceController | null>(null);
  const timerRef = useRef<number | null>(null);

  const persona = PERSONAS[currentLifeStage] || PERSONAS.student;
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const currentPrompts = LOCALIZED_PROMPTS[currentLanguage]?.[currentLifeStage] || persona.samplePrompts;

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'bot',
      text: t.chat.greeting,
      time: 'Just now',
      followUpSuggestions: currentPrompts.slice(0, 3)
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync prompt prop if initialPrompt changes
  const [prevPrompt, setPrevPrompt] = useState(initialPrompt);
  if (initialPrompt !== prevPrompt) {
    setPrevPrompt(initialPrompt);
    setInputText(initialPrompt);
  }

  // React to language switch immediately in the chat stream & voice controller
  const [prevLang, setPrevLang] = useState(currentLanguage);
  if (currentLanguage !== prevLang) {
    setPrevLang(currentLanguage);
    const newGreeting = t.chat.greeting;
    const newSuggestions = currentPrompts.slice(0, 3);
    setChatHistory(prev => {
      if (prev.length <= 1) {
        return [{
          role: 'bot',
          text: newGreeting,
          time: 'Just now',
          followUpSuggestions: newSuggestions
        }];
      }
      return [
        ...prev,
        {
          role: 'bot',
          text: newGreeting,
          time: 'Just now',
          followUpSuggestions: newSuggestions
        }
      ];
    });
  }

  // Sync language with active voice controller in effect
  useEffect(() => {
    if (voiceControllerRef.current) {
      voiceControllerRef.current.setLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (voiceControllerRef.current) {
        voiceControllerRef.current.cancelRecording();
      }
      stopBotSpeaking();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isBotTyping, isRecording]);

  const handleSpeakMessage = useCallback((index: number, text: string) => {
    setCurrentlySpeakingIndex(index);
    speakBotResponse(
      text,
      currentLanguage,
      () => setCurrentlySpeakingIndex(index),
      () => setCurrentlySpeakingIndex(null),
      () => setCurrentlySpeakingIndex(null)
    );
  }, [currentLanguage]);

  const handleStopTTS = useCallback(() => {
    stopBotSpeaking();
    setCurrentlySpeakingIndex(null);
  }, []);

  const handleSend = useCallback((textToSend?: string, isVoice = false, acousticCues?: AcousticCues) => {
    const message = (textToSend || inputText).trim();
    if (!message || isBotTyping) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const wasVoice = isVoice || isLatestVoiceInput;
    const cuesToUse = acousticCues || activeAcousticCues || (simulatedVoiceActive ? generateAcousticCues(message, true) : undefined);

    // 1. Check Crisis Safety Protocol
    if (checkIsCrisis(message)) {
      setChatHistory(prev => [
        ...prev,
        { role: 'user', text: message, time: timeStr, isVoice: wasVoice, acousticCues: cuesToUse },
        {
          role: 'crisis',
          text: `We care about your safety above all else. Mindra is an automated wellness prototype and cannot offer crisis intervention or medical emergency care. Please connect with caring human professionals immediately: Call Tele-MANAS at 14416 (24/7 Toll-free) or emergency services at 112. You do not have to carry this alone.`,
          time: timeStr
        }
      ]);
      setInputText('');
      setVoiceTranscribedMessage(null);
      setIsLatestVoiceInput(false);
      setActiveAcousticCues(null);
      return;
    }

    // 2. Add user message immediately
    const userMsgEntry: ChatMessage = { 
      role: 'user', 
      text: message, 
      time: timeStr,
      isVoice: wasVoice,
      acousticCues: cuesToUse
    };

    setChatHistory(prev => [...prev, userMsgEntry]);
    setInputText('');
    setVoiceTranscribedMessage(null);
    setIsLatestVoiceInput(false);
    setActiveAcousticCues(null);
    setIsBotTyping(true);

    // 3. Process context-aware response with natural empathetic delay
    setTimeout(() => {
      const prevVector: EmotionVector | undefined = activeCheckIn?.emotionVector;
      const { vector, detectedWords } = computeEmotionVector(message, prevVector, cuesToUse || simulatedVoiceActive);
      const measuredOrSimulatedAcoustics = cuesToUse || generateAcousticCues(message, simulatedVoiceActive);
      const context = detectIntentAndContext(message, chatHistory);
      const explanation = buildExplanation(vector, detectedWords, currentLifeStage, currentTone, context);
      const { response: botResponse, followUpSuggestions } = generateAdaptiveResponse(
        message,
        [...chatHistory, userMsgEntry],
        vector,
        currentLifeStage,
        currentLanguage,
        currentTone
      );

      const newEntry: CheckInEntry = {
        id: `checkin-${Date.now()}`,
        timestamp: new Date().toISOString(),
        dateLabel: 'Today, ' + timeStr,
        userMessage: message,
        lifeStage: currentLifeStage,
        language: currentLanguage,
        tone: currentTone,
        emotionVector: vector,
        explanation,
        botResponse,
        simulatedVoiceCues: measuredOrSimulatedAcoustics,
        isVoiceInput: wasVoice
      };

      setActiveCheckIn(newEntry);
      onCheckInCompleted(newEntry);

      const newBotMessage: ChatMessage = {
        role: 'bot',
        text: botResponse,
        time: timeStr,
        followUpSuggestions
      };

      setChatHistory(prev => {
        const next = [...prev, newBotMessage];
        const newBotIdx = next.length - 1;

        // Auto-speak response if enabled
        if (autoSpeakEnabled) {
          setTimeout(() => {
            handleSpeakMessage(newBotIdx, botResponse);
          }, 150);
        }

        return next;
      });

      setIsBotTyping(false);
    }, 450);
  }, [
    inputText, 
    isBotTyping, 
    activeCheckIn, 
    chatHistory, 
    currentLifeStage, 
    currentLanguage, 
    currentTone, 
    onCheckInCompleted, 
    simulatedVoiceActive, 
    isLatestVoiceInput, 
    activeAcousticCues, 
    autoSpeakEnabled,
    handleSpeakMessage
  ]);

  // Voice Recording Handlers
  const handleStartVoiceRecording = async () => {
    if (isBotTyping) return;
    setVoiceError(null);
    setVoiceTranscribedMessage(null);
    setInterimTranscript('');
    setFinalTranscript('');
    setRecordingDuration(0);

    // Stop TTS if speaking
    handleStopTTS();

    const controller = new VoiceController(currentLanguage, {
      onInterimTranscript: (interim) => setInterimTranscript(interim),
      onFinalTranscript: (final) => setFinalTranscript(final),
      onAudioData: (data) => setAudioData(data),
      onError: (_code, friendlyMsg) => setVoiceError(friendlyMsg),
      onStatusChange: (status) => setVoiceStatus(status)
    });

    voiceControllerRef.current = controller;
    setIsRecording(true);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setRecordingDuration(prev => {
        if (prev >= 60) {
          // Safety cap at 60 seconds
          handleDoneSpeaking();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    await controller.startRecording();
  };

  const handleDoneSpeaking = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (voiceControllerRef.current) {
      const { transcript, acousticCues } = voiceControllerRef.current.stopRecording();
      setIsRecording(false);
      setAudioData(null);

      const cleaned = (transcript || finalTranscript || interimTranscript).trim();
      if (!cleaned) {
        setVoiceError(t.chat.noSpeechDetected);
        return;
      }

      setInputText(cleaned);
      setIsLatestVoiceInput(true);
      setActiveAcousticCues(acousticCues);
      setVoiceTranscribedMessage(t.chat.voiceTranscribedNotice);

      // Auto focus chat input for immediate editing or reviewing
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setIsRecording(false);
    }
  };

  const handleCancelRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (voiceControllerRef.current) {
      voiceControllerRef.current.cancelRecording();
    }

    setIsRecording(false);
    setInterimTranscript('');
    setFinalTranscript('');
    setAudioData(null);
    setRecordingDuration(0);
    setVoiceError(null);
  };

  const handleDirectSend = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    let textToSend = (finalTranscript + (interimTranscript ? ' ' + interimTranscript : '')).trim();
    let cues: AcousticCues | undefined = undefined;

    if (voiceControllerRef.current) {
      const res = voiceControllerRef.current.stopRecording();
      setIsRecording(false);
      setAudioData(null);
      if (res.transcript.trim()) {
        textToSend = res.transcript.trim();
      }
      cues = res.acousticCues;
    } else {
      setIsRecording(false);
    }

    if (textToSend) {
      handleSend(textToSend, true, cues);
    }
  };

  const handleTrySampleVoice = (sampleText: string) => {
    setFinalTranscript(sampleText);
    setInterimTranscript('');
    const sampleDuration = Math.max(3, Math.floor(sampleText.length / 14));
    setRecordingDuration(sampleDuration);
    const cues = generateAcousticCues(sampleText, true);
    setActiveAcousticCues(cues);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="checkin-layout">
      {/* Left Column: Interactive Chat Stream */}
      <div className="chat-panel">
        {/* Chat Header */}
        <div className="chat-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="avatar-pulse-container">
              <div className="avatar-core">
                <Sparkles size={16} />
              </div>
              <span className="online-indicator-dot" />
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1c1917', letterSpacing: '-0.01em' }}>
                {t.chat.title}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#78716c', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>{t.chat.adaptedFor}</span>
                <span className="persona-badge-pill">{persona.name}</span>
                <span>•</span>
                <span style={{ color: '#be123c', fontWeight: 700 }}>
                  {currentLanguage === 'en' ? 'English' : currentLanguage === 'hi' ? 'हिंदी (सक्रिय)' : 'मराठी (सक्रिय)'}
                </span>
              </div>
            </div>
          </div>

          {/* Voice Controls: Auto-Voice Output & Acoustic Cue Simulator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => {
                if (autoSpeakEnabled) {
                  handleStopTTS();
                  setAutoSpeakEnabled(false);
                } else {
                  setAutoSpeakEnabled(true);
                }
              }}
              className={`voice-header-btn ${autoSpeakEnabled ? 'active' : ''}`}
              title={autoSpeakEnabled ? 'Spoken responses active (Click to mute)' : 'Click to enable spoken responses (Text-to-Speech)'}
              aria-label={t.chat.autoSpeakResponses}
            >
              {autoSpeakEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span>{autoSpeakEnabled ? 'Voice Output ON' : 'Voice Output OFF'}</span>
            </button>

            <button
              onClick={() => setSimulatedVoiceActive(!simulatedVoiceActive)}
              className={`voice-toggle-btn ${simulatedVoiceActive || (activeCheckIn?.simulatedVoiceCues && activeCheckIn.simulatedVoiceCues.confidenceScore > 0) ? 'active' : ''}`}
              title="Acoustic emotion cue analysis (pitch variance, cadence & vocal strain)"
            >
              {simulatedVoiceActive || activeCheckIn?.isVoiceInput ? <Mic size={14} /> : <MicOff size={14} />}
              <span>
                {activeCheckIn?.isVoiceInput 
                  ? 'Live Acoustic Analysis' 
                  : simulatedVoiceActive 
                  ? t.chat.voiceCuesActive 
                  : t.chat.simulateVoiceCues}
              </span>
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="chat-messages-scroll">
          {chatHistory.map((item, idx) => (
            <div key={idx} className={`chat-bubble-group ${item.role}`}>
              {/* User Voice Check-in Tag */}
              {item.role === 'user' && item.isVoice && (
                <div className="user-voice-badge-tag">
                  <Mic size={11} />
                  <span>{t.chat.voiceCheckInBadge}</span>
                  {item.acousticCues && (
                    <span className="user-voice-cues-detail">
                      • {item.acousticCues.cadence} cadence
                    </span>
                  )}
                </div>
              )}

              <div className={`chat-bubble ${item.role}`}>
                {item.role === 'bot' && (
                  <div className="bot-author-tag">
                    <Sparkles size={12} color="#e11d48" />
                    <span>Mindra Guide</span>
                  </div>
                )}
                {item.role === 'crisis' && (
                  <div className="crisis-bubble-header">
                    <ShieldAlert size={16} />
                    <span>CRISIS SAFETY PROTOCOL ENGAGED</span>
                  </div>
                )}
                
                <div className="bubble-text-content">{item.text}</div>
                
                <div className="bubble-meta-row">
                  <span>{item.time}</span>
                  {item.role === 'bot' && (
                    <>
                      <span>•</span>
                      <span className="tone-indicator-tag">Tuned for {persona.id.replace('_', ' ')}</span>
                      <span>•</span>
                      <button
                        type="button"
                        className={`tts-bubble-btn ${currentlySpeakingIndex === idx ? 'active' : ''}`}
                        onClick={() => {
                          if (currentlySpeakingIndex === idx) {
                            handleStopTTS();
                          } else {
                            handleSpeakMessage(idx, item.text);
                          }
                        }}
                        title={currentlySpeakingIndex === idx ? t.chat.stopSpeaking : t.chat.listenResponse}
                        aria-label={currentlySpeakingIndex === idx ? 'Stop audio' : 'Listen to response'}
                      >
                        {currentlySpeakingIndex === idx ? (
                          <>
                            <Square size={11} />
                            <span>{t.chat.stopSpeaking}</span>
                            <span className="tts-wave-bars">
                              <span /><span /><span />
                            </span>
                          </>
                        ) : (
                          <>
                            <Volume2 size={11} />
                            <span>{t.chat.listenResponse}</span>
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Contextual Follow-up Chips for latest bot message */}
              {item.role === 'bot' && idx === chatHistory.length - 1 && item.followUpSuggestions && item.followUpSuggestions.length > 0 && !isBotTyping && (
                <div className="inline-suggestions-row">
                  <span className="suggestions-label">{t.chat.suggestedFollowUps}</span>
                  <div className="suggestions-chips-wrap">
                    {item.followUpSuggestions.map((suggestion, sIdx) => (
                      <button
                        key={sIdx}
                        className="suggestion-chip-btn"
                        onClick={() => handleSend(suggestion)}
                      >
                        <span>{suggestion}</span>
                        <ArrowRight size={12} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Bot Typing Indicator */}
          {isBotTyping && (
            <div className="chat-bubble-group bot">
              <div className="chat-bubble bot typing-bubble">
                <div className="typing-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span style={{ fontSize: '0.74rem', color: '#78716c', marginLeft: '6px' }}>{t.chat.typingMessage}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Chips Bar */}
        <div className="chips-container">
          <span className="chips-header-label">{t.chat.quickPromptsLabel}</span>
          {currentPrompts.map((chip, i) => (
            <button
              key={i}
              className="prompt-chip"
              onClick={() => handleSend(chip)}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Transcribed Speech Notification & Review Banner */}
        {voiceTranscribedMessage && (
          <div className="voice-transcribed-alert" role="status">
            <div className="voice-alert-left">
              <Sparkles size={15} color="#0d9488" />
              <span>{voiceTranscribedMessage}</span>
            </div>
            <div className="voice-alert-actions">
              <button
                type="button"
                className="voice-alert-send-btn"
                onClick={() => handleSend()}
                disabled={isBotTyping || !inputText.trim()}
              >
                <span>Send Now</span>
                <Send size={12} />
              </button>
              <button
                type="button"
                className="voice-alert-close"
                onClick={() => setVoiceTranscribedMessage(null)}
                aria-label="Dismiss notice"
              >
                <X size={13} />
              </button>
            </div>
          </div>
        )}

        {/* Live Voice Recorder Bar */}
        {isRecording && (
          <VoiceRecorderBar
            isRecording={isRecording}
            status={voiceStatus}
            interimTranscript={interimTranscript}
            finalTranscript={finalTranscript}
            audioData={audioData}
            durationSeconds={recordingDuration}
            language={currentLanguage}
            onDoneSpeaking={handleDoneSpeaking}
            onCancelRecording={handleCancelRecording}
            onDirectSend={handleDirectSend}
            errorMessage={voiceError}
            onClearError={() => setVoiceError(null)}
            onTrySampleVoice={handleTrySampleVoice}
          />
        )}

        {/* Chat Input Bar */}
        <div className="chat-input-row">
          {/* Lavender, Teal & Off-white Microphone Button */}
          <button
            type="button"
            className={`voice-mic-btn ${isRecording ? 'recording' : ''}`}
            onClick={() => {
              if (isRecording) {
                handleDoneSpeaking();
              } else {
                handleStartVoiceRecording();
              }
            }}
            disabled={isBotTyping}
            title={isRecording ? t.chat.micActiveTitle : t.chat.micBtnTitle}
            aria-label={isRecording ? "Stop voice recording" : "Record voice check-in"}
          >
            {isRecording ? (
              <span className="mic-rec-inner">
                <Square size={16} />
              </span>
            ) : (
              <Mic size={18} />
            )}
            {isRecording && <span className="mic-pulsing-ring" />}
          </button>

          <input
            ref={inputRef}
            type="text"
            className="chat-input-field"
            placeholder={isRecording ? "Listening to your voice..." : t.chat.inputPlaceholder(persona.name.split(' ')[0])}
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              if (voiceTranscribedMessage) {
                setVoiceTranscribedMessage(null);
              }
            }}
            onKeyDown={handleKeyDown}
            disabled={isBotTyping}
          />

          <button
            type="button"
            className="send-btn"
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isBotTyping}
            aria-label="Send check-in message"
            title={t.chat.sendBtnTitle}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Right Column: Real-time Emotion Vector & Explainability Engine */}
      <div className="chat-sidebar-column">
        {activeCheckIn ? (
          <>
            {/* Real-time Plutchik Radar */}
            <div className="card-panel">
              <div className="card-header-row">
                <h3>
                  <Sparkles size={18} color="#0d9488" />
                  <span>Plutchik 8D Emotion Vector</span>
                </h3>
                <span className="status-badge teal">
                  {activeCheckIn.isVoiceInput ? 'Voice Acoustic Data' : 'Text Heuristic'}
                </span>
              </div>

              <RadarChart vector={activeCheckIn.emotionVector} size={290} />

              {/* Acoustic cue badge if voice input or simulated */}
              {activeCheckIn.simulatedVoiceCues && activeCheckIn.simulatedVoiceCues.confidenceScore > 0 && (
                <div className="acoustic-cue-card">
                  <div className="acoustic-header">
                    <Mic size={14} />
                    <span>{activeCheckIn.isVoiceInput ? 'Measured Voice Acoustic Analysis' : 'Simulated Acoustic Cue Analysis'}</span>
                  </div>
                  <div className="acoustic-details">
                    Cadence: <strong>{activeCheckIn.simulatedVoiceCues.cadence}</strong> • Vocal Strain: <strong>{activeCheckIn.simulatedVoiceCues.vocalStrain}</strong> • Pitch Variance: <strong>{activeCheckIn.simulatedVoiceCues.pitchVariance}</strong> • Confidence: {activeCheckIn.simulatedVoiceCues.confidenceScore}%
                  </div>
                </div>
              )}
            </div>

            {/* Explainable AI Card ("Why this response?") */}
            <div className="card-panel explainable-card">
              <div className="card-header-row">
                <div className="explain-badge">
                  <Info size={12} />
                  <span>EXPLAINABLE AI ENGINE</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#78716c', fontWeight: 500 }}>
                  {activeCheckIn.explanation.heuristicConfidence}
                </span>
              </div>

              <h4 className="explain-title">
                Why did Mindra choose this response?
              </h4>
              <p className="explain-text">
                {activeCheckIn.explanation.rationale}
              </p>

              <div className="keywords-box">
                <strong>Trigger Keywords Detected:</strong>{' '}
                {activeCheckIn.explanation.detectedKeywords.length > 0
                  ? activeCheckIn.explanation.detectedKeywords.join(', ')
                  : 'Syntactic context, emotional shift & punctuation cues'}
              </div>

              {/* Action Recommendation */}
              <div className="action-recommendation-row">
                <div className="action-text">
                  <span className="lightbulb-icon">💡</span>
                  <span>{activeCheckIn.explanation.suggestedAction}</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenWellness}
                  className="quick-action-btn"
                >
                  <HeartPulse size={14} />
                  <span>{t.chat.tryBreathingBtn}</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="card-panel empty-vector-state">
            <div className="empty-state-icon-circle">
              <Sparkles size={24} color="#e11d48" />
            </div>
            <h4>{t.chat.vectorAwaiting}</h4>
            <p>
              {t.chat.vectorAwaitingDesc}
            </p>
            <div className="empty-state-actions">
              <button
                type="button"
                className="test-sample-btn"
                onClick={() => handleSend(currentPrompts[0])}
              >
                Send "{currentPrompts[0].substring(0, 32)}..."
              </button>
            </div>
          </div>
        )}

        {/* Quick Safety Pathway */}
        <div className="safety-callout-card">
          <div className="safety-callout-text">
            <strong>{t.chat.humanSupportNotice}</strong>
          </div>
          <button
            type="button"
            onClick={onOpenSupport}
            className="safety-helpline-btn"
          >
            {t.chat.helplineBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
