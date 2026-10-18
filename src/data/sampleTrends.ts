import type { CheckInEntry } from '../types';

export const INITIAL_SAMPLE_CHECKINS: CheckInEntry[] = [
  {
    id: 'seed-1',
    timestamp: '2026-10-06T09:15:00Z',
    dateLabel: 'Mon, Oct 6',
    userMessage: 'Starting the week with a pile of pending tasks and a big presentation due on Wednesday.',
    lifeStage: 'working_adult',
    language: 'en',
    tone: 'grounding',
    emotionVector: {
      joy: 14,
      trust: 22,
      fear: 55,
      surprise: 12,
      sadness: 32,
      disgust: 8,
      anger: 20,
      anticipation: 82
    },
    explanation: {
      dominantEmotion: 'Anticipation',
      secondaryEmotion: 'Fear',
      detectedKeywords: ['pending', 'deadline', 'presentation'],
      rationale: 'High forward-looking pressure related to upcoming deliverables triggered elevated anticipation and fear.',
      toneApplied: 'GROUNDING tone for WORKING ADULT',
      heuristicConfidence: '89% heuristic match (Demo Heuristic)',
      suggestedAction: 'List only top 2 essential items for today; defer non-urgent requests.'
    },
    botResponse: 'Mondays often bring a surge of anticipation and tension as deliverables loom. Remember you only need to steer through today, not solve the whole week right this hour. Let us isolate your single highest priority.',
  },
  {
    id: 'seed-2',
    timestamp: '2026-10-08T18:40:00Z',
    dateLabel: 'Wed, Oct 8',
    userMessage: 'The presentation went reasonably well, but my body feels completely drained and tired.',
    lifeStage: 'working_adult',
    language: 'en',
    tone: 'grounding',
    emotionVector: {
      joy: 58,
      trust: 60,
      fear: 20,
      surprise: 15,
      sadness: 45,
      disgust: 5,
      anger: 10,
      anticipation: 25
    },
    explanation: {
      dominantEmotion: 'Trust',
      secondaryEmotion: 'Joy',
      detectedKeywords: ['well', 'drained', 'tired'],
      rationale: 'Post-presentation relief and sense of accomplishment mixed with physiological post-adrenaline fatigue.',
      toneApplied: 'GENTLE tone for WORKING ADULT',
      heuristicConfidence: '84% heuristic match (Demo Heuristic)',
      suggestedAction: 'Allow yourself physical decompression with a warm beverage and screen-free evening.'
    },
    botResponse: 'Great job getting through that milestone. That heavy feeling right now is your nervous system settling down after adrenaline. Rest your mind tonight without guilt.',
  },
  {
    id: 'seed-3',
    timestamp: '2026-10-10T14:20:00Z',
    dateLabel: 'Fri, Oct 10',
    userMessage: 'I had a quiet lunch with an old colleague and finally laughed without thinking about work.',
    lifeStage: 'young_adult',
    language: 'en',
    tone: 'empowering',
    emotionVector: {
      joy: 85,
      trust: 78,
      fear: 12,
      surprise: 18,
      sadness: 10,
      disgust: 5,
      anger: 8,
      anticipation: 30
    },
    explanation: {
      dominantEmotion: 'Joy',
      secondaryEmotion: 'Trust',
      detectedKeywords: ['lunch', 'laughed', 'colleague'],
      rationale: 'Social connection and spontaneous levity activated strong joy and trust dimensions, dampening baseline work anxiety.',
      toneApplied: 'EMPOWERING tone for YOUNG ADULT',
      heuristicConfidence: '91% heuristic match (Demo Heuristic)',
      suggestedAction: 'Take a mental snapshot of this lightness to anchor yourself during future stressful moments.'
    },
    botResponse: 'Moments of unscripted laughter and genuine connection are deeply restorative. It is proof that joy can thrive right alongside busy seasons of life.',
  },
  {
    id: 'seed-4',
    timestamp: '2026-10-12T11:00:00Z',
    dateLabel: 'Sun, Oct 12',
    userMessage: 'Feeling a bit of the Sunday evening blues. Wondering how to stay centered this coming week.',
    lifeStage: 'student',
    language: 'en',
    tone: 'gentle',
    emotionVector: {
      joy: 22,
      trust: 35,
      fear: 48,
      surprise: 10,
      sadness: 52,
      disgust: 14,
      anger: 18,
      anticipation: 68
    },
    explanation: {
      dominantEmotion: 'Anticipation',
      secondaryEmotion: 'Sadness',
      detectedKeywords: ['sunday', 'blues', 'wondering', 'week'],
      rationale: 'Anticipatory dread regarding academic routine coupled with sadness over the weekend concluding.',
      toneApplied: 'GENTLE tone for STUDENT',
      heuristicConfidence: '86% heuristic match (Demo Heuristic)',
      suggestedAction: 'Try 5 minutes of Box Breathing to ease Sunday night anticipatory tension.'
    },
    botResponse: 'The Sunday evening blues are very common when transitioning from rest back into high-demand schedules. You do not have to conquer Monday right now—tonight is meant for resting.',
  }
];

export interface TrendDataPoint {
  day: string;
  joy: number;
  fear: number;
  sadness: number;
  anticipation: number;
  dominantMood: string;
}

export const SAMPLE_WEEKLY_TRENDS: TrendDataPoint[] = [
  { day: 'Mon', joy: 25, fear: 68, sadness: 40, anticipation: 82, dominantMood: 'High Anticipation & Stress' },
  { day: 'Tue', joy: 30, fear: 60, sadness: 35, anticipation: 75, dominantMood: 'Workload Pressure' },
  { day: 'Wed', joy: 55, fear: 42, sadness: 40, anticipation: 45, dominantMood: 'Post-Task Relief' },
  { day: 'Thu', joy: 48, fear: 35, sadness: 30, anticipation: 50, dominantMood: 'Steady Focus' },
  { day: 'Fri', joy: 75, fear: 20, sadness: 15, anticipation: 35, dominantMood: 'Elevated Joy & Social Trust' },
  { day: 'Sat', joy: 80, fear: 15, sadness: 12, anticipation: 20, dominantMood: 'Restorative Calm' },
  { day: 'Sun', joy: 40, fear: 50, sadness: 48, anticipation: 65, dominantMood: 'Sunday Evening Transition' },
];
