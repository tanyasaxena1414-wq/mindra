export type LifeStage = 'student' | 'young_adult' | 'working_adult' | 'middle_aged' | 'senior';

export type LanguageCode = 'en' | 'hi' | 'mr';

export type TonePreference = 'gentle' | 'empowering' | 'grounding' | 'reflective';

export interface EmotionVector {
  joy: number;          // 0 to 100
  trust: number;        // 0 to 100
  fear: number;         // 0 to 100
  surprise: number;     // 0 to 100
  sadness: number;      // 0 to 100
  disgust: number;      // 0 to 100
  anger: number;        // 0 to 100
  anticipation: number; // 0 to 100
}

export interface AcousticCues {
  pitchVariance: 'low' | 'normal' | 'high';
  cadence: 'slow' | 'steady' | 'rapid';
  vocalStrain: 'relaxed' | 'moderate' | 'elevated';
  confidenceScore: number; // demo heuristic
}

export interface ExplanationPayload {
  dominantEmotion: string;
  secondaryEmotion: string;
  detectedKeywords: string[];
  rationale: string;
  toneApplied: string;
  heuristicConfidence: string;
  suggestedAction: string;
}

export interface CheckInEntry {
  id: string;
  timestamp: string;
  dateLabel: string;
  userMessage: string;
  lifeStage: LifeStage;
  language: LanguageCode;
  tone: TonePreference;
  emotionVector: EmotionVector;
  explanation: ExplanationPayload;
  botResponse: string;
  isCrisis?: boolean;
  simulatedVoiceCues?: AcousticCues;
  isVoiceInput?: boolean;
}

export interface PersonaProfile {
  id: LifeStage;
  name: string;
  ageRange: string;
  tagline: string;
  avatarIcon: string;
  typicalContext: string;
  coreStressors: string[];
  preferredTone: TonePreference;
  samplePrompts: string[];
}
