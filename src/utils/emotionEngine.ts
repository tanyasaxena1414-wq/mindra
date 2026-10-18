import type { EmotionVector, ExplanationPayload, LifeStage, LanguageCode, TonePreference, AcousticCues } from '../types';

export interface ChatMessage {
  role: 'user' | 'bot' | 'crisis';
  text: string;
  time: string;
  followUpSuggestions?: string[];
  isVoice?: boolean;
  acousticCues?: AcousticCues;
}

interface EmotionLexicon {
  keywords: string[];
  dimension: keyof EmotionVector;
  weight: number;
}

const LEXICON: EmotionLexicon[] = [
  // Joy / Relief / Hope / Gratitude
  {
    keywords: [
      'happy', 'relieved', 'grateful', 'proud', 'excited', 'peace', 'peaceful', 'joy',
      'smile', 'calm', 'calmer', 'hopeful', 'good', 'better', 'love', 'accomplished',
      'lighter', 'relaxed', 'smiling', 'content', 'optimistic', 'thank you', 'thanks',
      'helped', 'appreciate', 'refreshed', 'wonderful', 'great'
    ],
    dimension: 'joy',
    weight: 22
  },

  // Trust / Acceptance / Connection
  {
    keywords: [
      'trust', 'safe', 'support', 'supported', 'friend', 'friends', 'family', 'listen',
      'help', 'helpful', 'believe', 'honest', 'together', 'mentor', 'comfort', 'comforting',
      'valid', 'understood', 'accepted', 'connected', 'community', 'partner', 'colleague', 'team'
    ],
    dimension: 'trust',
    weight: 20
  },

  // Fear / Anxiety / Panic / Dread
  {
    keywords: [
      'anxious', 'anxiety', 'scared', 'panic', 'panicking', 'nervous', 'dread', 'afraid',
      'paralyzed', 'fear', 'terrified', 'worry', 'worried', 'stress', 'stressed', 'overwhelmed',
      'overwhelming', 'shaking', 'frightened', 'trembling', 'racing', 'palpitations', 'freeze',
      'hyperventilating', 'chest tight', 'scared to death', 'freaking out', 'imposter', 'doubt'
    ],
    dimension: 'fear',
    weight: 26
  },

  // Surprise / Confusion / Uncertainty / Novelty
  {
    keywords: [
      'shocked', 'sudden', 'unexpected', 'confused', 'confusion', 'lost', 'uncertain',
      'uncertainty', 'disoriented', 'bewildered', 'unprepared', 'abrupt', 'strange',
      'baffled', 'how', 'why', 'what is', 'explain', 'curious', 'surprised', 'caught off guard'
    ],
    dimension: 'surprise',
    weight: 18
  },

  // Sadness / Grief / Loneliness / Exhaustion / Burnout
  {
    keywords: [
      'sad', 'sadness', 'lonely', 'loneliness', 'exhausted', 'exhaustion', 'tired', 'depressed',
      'depression', 'cry', 'crying', 'hopeless', 'heavy', 'empty', 'emptiness', 'drained',
      'alone', 'numb', 'down', 'hurt', 'burnout', 'grief', 'missing', 'loss', 'worthless',
      'giving up', 'pointless', 'crying myself to sleep', 'unmotivated', 'isolated'
    ],
    dimension: 'sadness',
    weight: 24
  },

  // Disgust / Aversion / Regret / Bitterness
  {
    keywords: [
      'sick of', 'hate this', 'regret', 'repulsed', 'disgusted', 'ashamed', 'shame',
      'guilt', 'guilty', 'bitter', 'toxic', 'unbearable', 'disgusted with myself',
      'cringe', 'awful', 'gross', 'nauseous', 'betrayed'
    ],
    dimension: 'disgust',
    weight: 18
  },

  // Anger / Irritation / Frustration / Resentment
  {
    keywords: [
      'angry', 'mad', 'frustrated', 'frustration', 'furious', 'annoyed', 'annoying',
      'unfair', 'rage', 'snapped', 'irritated', 'resentment', 'hostile', 'screamed',
      'yelled', 'pissed', 'infuriating', 'fed up', 'fuming'
    ],
    dimension: 'anger',
    weight: 22
  },

  // Anticipation / Pressure / Deadlines / Tomorrow / Vigilance
  {
    keywords: [
      'deadline', 'exam', 'exams', 'tomorrow', 'waiting', 'future', 'expectations',
      'pressure', 'anticipating', 'urgent', 'approaching', 'monday', 'interview',
      'results', 'test', 'presentation', 'schedule', 'planning', 'due', 'countdown'
    ],
    dimension: 'anticipation',
    weight: 22
  },
];

const CRISIS_KEYWORDS = [
  'kill myself', 'suicide', 'end my life', 'hurt myself', 'want to die', 
  'end it all', 'die tonight', 'no reason to live', 'hang myself', 'self-harm',
  'cut my wrist', 'slit my', 'take all my pills', 'take overdose', 'jump off',
  'better off dead', 'wish i was dead', 'wish i were dead', 'kill me'
];

export function checkIsCrisis(text: string): boolean {
  const normalized = text.toLowerCase();
  return CRISIS_KEYWORDS.some(kw => normalized.includes(kw));
}

export interface IntentAndContext {
  intent: 
    | 'academic_stress'
    | 'career_burnout'
    | 'relationship_friction'
    | 'loneliness_isolation'
    | 'somatic_anxiety'
    | 'progress_relief'
    | 'gratitude_closure'
    | 'inquiry_radar_explain'
    | 'coping_request'
    | 'clarification_response'
    | 'general_overwhelm';
  topic: string;
  detectedWords: string[];
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  hasProgress: boolean;
  userChoices?: string;
}

export function detectIntentAndContext(
  text: string, 
  history: ChatMessage[] = []
): IntentAndContext {
  const lower = text.toLowerCase();
  const detectedWords: string[] = [];

  // Check progress / gratitude
  const isProgress = (
    lower.includes('better') || lower.includes('helped') || lower.includes('calmer') ||
    lower.includes('took a breath') || lower.includes('did the exercise') || lower.includes('feeling lighter') ||
    lower.includes('thanks') || lower.includes('thank you')
  );

  const isGratitude = (
    lower.startsWith('thank') || lower.includes('thank you') || lower.includes('appreciate it') ||
    lower.includes('that helps a lot')
  );

  const isRadarInquiry = (
    lower.includes('radar') || lower.includes('vector') || lower.includes('chart') ||
    lower.includes('what do the numbers mean') || lower.includes('how does this work') ||
    lower.includes('plutchik')
  );

  const isCopingRequest = (
    lower.includes('breathing') || lower.includes('grounding') || lower.includes('exercise') ||
    lower.includes('what should i do') || lower.includes('how do i stop') || lower.includes('any tips') ||
    lower.includes('give me a tool') || lower.includes('help me calm')
  );

  const isSomatic = (
    lower.includes('chest') || lower.includes('shaking') || lower.includes('breathing fast') ||
    lower.includes('heart') || lower.includes('dizzy') || lower.includes('nauseous') ||
    lower.includes('can\'t breathe') || lower.includes('palpitations') || lower.includes('headache')
  );

  const isAcademic = (
    lower.includes('exam') || lower.includes('test') || lower.includes('study') ||
    lower.includes('studying') || lower.includes('assignment') || lower.includes('college') ||
    lower.includes('school') || lower.includes('marks') || lower.includes('grades') ||
    lower.includes('professor') || lower.includes('syllabus') || lower.includes('chapter')
  );

  const isCareer = (
    lower.includes('boss') || lower.includes('manager') || lower.includes('work') ||
    lower.includes('job') || lower.includes('career') || lower.includes('office') ||
    lower.includes('client') || lower.includes('meeting') || lower.includes('promoted') ||
    lower.includes('salary') || lower.includes('layoff') || lower.includes('workplace')
  );

  const isRelationship = (
    lower.includes('parents') || lower.includes('mom') || lower.includes('dad') ||
    lower.includes('partner') || lower.includes('boyfriend') || lower.includes('girlfriend') ||
    lower.includes('friend') || lower.includes('fight') || lower.includes('argued') ||
    lower.includes('yelled') || lower.includes('breakup') || lower.includes('disappointed them')
  );

  const isLoneliness = (
    lower.includes('lonely') || lower.includes('alone') || lower.includes('nobody') ||
    lower.includes('no one') || lower.includes('isolated') || lower.includes('empty house') ||
    lower.includes('miss having') || lower.includes('no friends')
  );

  // Check last bot message to see if user is answering a specific question
  const lastBotMsg = [...history].reverse().find(m => m.role === 'bot')?.text || '';
  const isAnsweringChoice = (
    lastBotMsg.includes('break this into') || lastBotMsg.includes('pause') ||
    lastBotMsg.includes('what feels like') || lastBotMsg.includes('what would bring')
  );

  let intent: IntentAndContext['intent'] = 'general_overwhelm';
  let topic = 'General Mental State';

  if (isGratitude && lower.length < 35) {
    intent = 'gratitude_closure';
    topic = 'Gratitude & Closure';
  } else if (isProgress) {
    intent = 'progress_relief';
    topic = 'Positive Regulation';
  } else if (isRadarInquiry) {
    intent = 'inquiry_radar_explain';
    topic = 'Emotion Vector Methodology';
  } else if (isCopingRequest) {
    intent = 'coping_request';
    topic = 'Regulation Exercises';
  } else if (isSomatic) {
    intent = 'somatic_anxiety';
    topic = 'Physiological Nervous System Stress';
  } else if (isAcademic) {
    intent = 'academic_stress';
    topic = 'Academic Pressure';
  } else if (isCareer) {
    intent = 'career_burnout';
    topic = 'Professional Burnout & Boundaries';
  } else if (isRelationship) {
    intent = 'relationship_friction';
    topic = 'Interpersonal Dynamics';
  } else if (isLoneliness) {
    intent = 'loneliness_isolation';
    topic = 'Isolation & Belonging';
  } else if (isAnsweringChoice) {
    intent = 'clarification_response';
    topic = 'Follow-up Clarification';
  }

  let sentiment: IntentAndContext['sentiment'] = 'neutral';
  if (isProgress || isGratitude) {
    sentiment = 'positive';
  } else if (isSomatic || isAcademic || isCareer || isRelationship || isLoneliness) {
    sentiment = 'negative';
  }

  return {
    intent,
    topic,
    detectedWords,
    sentiment,
    hasProgress: isProgress
  };
}

export function computeEmotionVector(
  text: string, 
  previousVector?: EmotionVector, 
  voiceInput: boolean | AcousticCues = false
): { vector: EmotionVector; detectedWords: string[]; dominant: keyof EmotionVector } {
  const normalized = text.toLowerCase();
  
  // Baseline or momentum from previous vector
  const vector: EmotionVector = previousVector ? {
    joy: Math.max(8, Math.round(previousVector.joy * 0.7)),
    trust: Math.max(10, Math.round(previousVector.trust * 0.75)),
    fear: Math.max(6, Math.round(previousVector.fear * 0.7)),
    surprise: Math.max(5, Math.round(previousVector.surprise * 0.6)),
    sadness: Math.max(6, Math.round(previousVector.sadness * 0.7)),
    disgust: Math.max(4, Math.round(previousVector.disgust * 0.6)),
    anger: Math.max(4, Math.round(previousVector.anger * 0.6)),
    anticipation: Math.max(8, Math.round(previousVector.anticipation * 0.7)),
  } : {
    joy: 12,
    trust: 14,
    fear: 10,
    surprise: 8,
    sadness: 10,
    disgust: 6,
    anger: 6,
    anticipation: 14,
  };

  const detectedWords: string[] = [];

  LEXICON.forEach(entry => {
    entry.keywords.forEach(kw => {
      if (normalized.includes(kw)) {
        vector[entry.dimension] = Math.min(96, vector[entry.dimension] + entry.weight);
        if (!detectedWords.includes(kw)) {
          detectedWords.push(kw);
        }
      }
    });
  });

  // Emotional shifts based on calming words
  if (normalized.includes('better') || normalized.includes('calm') || normalized.includes('thank')) {
    vector.joy = Math.min(92, vector.joy + 28);
    vector.trust = Math.min(94, vector.trust + 32);
    vector.fear = Math.max(8, vector.fear - 35);
    vector.anticipation = Math.max(15, vector.anticipation - 30);
    vector.sadness = Math.max(8, vector.sadness - 25);
  }

  // Somatic cues increase fear / anticipation
  if (normalized.includes('shaking') || normalized.includes('heart') || normalized.includes('chest') || normalized.includes('panic')) {
    vector.fear = Math.min(95, vector.fear + 35);
    vector.anticipation = Math.min(90, vector.anticipation + 25);
  }

  // Questions increase anticipation & surprise
  if (text.includes('?')) {
    vector.anticipation = Math.min(90, vector.anticipation + 15);
    vector.surprise = Math.min(85, vector.surprise + 12);
  }
  if (text.includes('!')) {
    vector.anger = Math.min(90, vector.anger + 10);
    vector.fear = Math.min(92, vector.fear + 10);
  }

  // Voice acoustic cues variance (simulated or real measured cues)
  if (voiceInput) {
    if (typeof voiceInput === 'object') {
      if (voiceInput.vocalStrain === 'elevated') {
        vector.fear = Math.min(96, vector.fear + 8);
        vector.anticipation = Math.min(94, vector.anticipation + 6);
      } else if (voiceInput.vocalStrain === 'relaxed') {
        vector.trust = Math.min(95, vector.trust + 6);
        vector.joy = Math.min(92, vector.joy + 4);
      }
      if (voiceInput.cadence === 'rapid') {
        vector.anticipation = Math.min(94, vector.anticipation + 8);
      } else if (voiceInput.cadence === 'slow') {
        vector.sadness = Math.min(92, vector.sadness + 6);
      }
      if (voiceInput.pitchVariance === 'high') {
        vector.surprise = Math.min(90, vector.surprise + 8);
      }
    } else {
      vector.fear = Math.min(96, vector.fear + 6);
      vector.anticipation = Math.min(94, vector.anticipation + 6);
    }
  }

  // Find dominant
  const entries = Object.entries(vector) as [keyof EmotionVector, number][];
  entries.sort((a, b) => b[1] - a[1]);
  const dominant = entries[0][0];

  return { vector, detectedWords, dominant };
}

export function generateAcousticCues(text: string, simulatedActive: boolean): AcousticCues {
  const lower = text.toLowerCase();
  const isHighStress = lower.includes('panic') || lower.includes('overwhelmed') || lower.includes('exam') || lower.includes('deadline') || lower.includes('shaking');
  const isSad = lower.includes('sad') || lower.includes('lonely') || lower.includes('empty') || lower.includes('tired');

  if (!simulatedActive) {
    return {
      pitchVariance: 'normal',
      cadence: 'steady',
      vocalStrain: 'relaxed',
      confidenceScore: 0
    };
  }

  return {
    pitchVariance: isHighStress ? 'high' : isSad ? 'low' : 'normal',
    cadence: isHighStress ? 'rapid' : isSad ? 'slow' : 'steady',
    vocalStrain: isHighStress ? 'elevated' : 'moderate',
    confidenceScore: Math.floor(82 + Math.random() * 12)
  };
}

export function buildExplanation(
  vector: EmotionVector,
  detectedWords: string[],
  lifeStage: LifeStage,
  tone: TonePreference,
  context: IntentAndContext
): ExplanationPayload {
  const entries = Object.entries(vector) as [keyof EmotionVector, number][];
  entries.sort((a, b) => b[1] - a[1]);

  const dominant = entries[0][0];
  const secondary = entries[1][0];
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const keywordsSummary = detectedWords.length > 0 
    ? detectedWords.slice(0, 4).map(w => `"${w}"`).join(', ')
    : 'conversational rhythm and intent markers';

  let rationale = `Detected ${capitalize(dominant)} (${entries[0][1]}%) and ${capitalize(secondary)} (${entries[1][1]}%) tied to ${context.topic.toLowerCase()} cues (${keywordsSummary}).`;

  if (context.hasProgress) {
    rationale += ` As you reported positive regulation, Mindra responded with validating reinforcement and closure options.`;
  } else if (dominant === 'fear' || dominant === 'anticipation') {
    rationale += ` Paced directly for ${lifeStage.replace('_', ' ')} stressors with immediate de-escalation, avoiding generic platitudes.`;
  } else if (dominant === 'sadness') {
    rationale += ` Structured with gentle, zero-pressure presence to honor emotional fatigue without forcing immediate productivity.`;
  } else if (dominant === 'anger') {
    rationale += ` Focused on validating boundaries and emotional legitimacy before introducing physiological grounding.`;
  } else {
    rationale += ` Tuned to provide steady emotional equilibrium and reflective clarity.`;
  }

  let suggestedAction = 'Take 3 steady breaths and drink a glass of water before deciding next steps.';
  if (context.intent === 'somatic_anxiety' || dominant === 'fear') {
    suggestedAction = 'Engage in a 4-4-4 Box Breathing cycle to signal your vagus nerve that you are physically safe.';
  } else if (context.intent === 'academic_stress') {
    suggestedAction = 'Write down only 2 high-yield priorities for today and permit yourself to ignore the rest for now.';
  } else if (context.intent === 'career_burnout') {
    suggestedAction = 'Close all work tabs for 15 minutes and step away from your screen to reset cognitive fatigue.';
  } else if (context.intent === 'loneliness_isolation') {
    suggestedAction = 'Step into a warm environment or send a low-pressure hello to someone you trust.';
  } else if (context.intent === 'coping_request') {
    suggestedAction = 'Follow along with the interactive 4-4-4-4 Box Breathing visualizer in the Calming tab.';
  }

  return {
    dominantEmotion: capitalize(dominant),
    secondaryEmotion: capitalize(secondary),
    detectedKeywords: detectedWords,
    rationale,
    toneApplied: `${tone.toUpperCase()} tone tuned for ${lifeStage.toUpperCase().replace('_', ' ')}`,
    heuristicConfidence: '91% heuristic match (Demo Heuristic)',
    suggestedAction
  };
}

export function generateAdaptiveResponse(
  userMessage: string,
  history: ChatMessage[],
  vector: EmotionVector,
  lifeStage: LifeStage,
  language: LanguageCode,
  tone: TonePreference
): { response: string; followUpSuggestions: string[] } {
  // Multilingual preview check
  if (language === 'hi') {
    return generateHindiResponse(userMessage, lifeStage);
  }
  if (language === 'mr') {
    return generateMarathiResponse(userMessage, lifeStage);
  }

  // Dominant emotion for contextual alignment
  const vectorEntries = Object.entries(vector) as [keyof EmotionVector, number][];
  vectorEntries.sort((a, b) => b[1] - a[1]);
  const dominantEmotion = vectorEntries[0][0];

  const context = detectIntentAndContext(userMessage, history);
  const tonePrefix = tone === 'grounding' 
    ? "[Grounding Perspective] " 
    : tone === 'empowering' 
    ? "[Empowering Focus] " 
    : tone === 'reflective' 
    ? "[Quiet Reflection] " 
    : "";

  let response = '';
  let followUpSuggestions: string[] = [];

  // 1. Radar Chart / Methodology Inquiry
  if (context.intent === 'inquiry_radar_explain') {
    response = `${tonePrefix}That radar chart is an 8-dimensional visual map based on Robert Plutchik’s psychoevolutionary model of primary emotions (Joy, Trust, Fear, Surprise, Sadness, Disgust, Anger, and Anticipation). 
    
Right now, it calculates emotional intensities from the words, phrasing, and stress markers you share in this session. It is an illustrative demo heuristic—not a diagnostic test. Its goal is to help you put words to abstract, tangled sensations. Does the shape on the chart resonate with what you feel inside right now?`;
    followUpSuggestions = [
      "Yes, the chart feels accurate",
      "Why is my anticipation so high?",
      "Can we return to what I was sharing?"
    ];
    return { response, followUpSuggestions };
  }

  // 2. Coping / Breathing / Grounding Request
  if (context.intent === 'coping_request') {
    response = `${tonePrefix}Let's pause right here together. When your mind is in overdrive, trying to 'think your way out' often makes the anxiety loop tighter. 

Instead, let's work with your nervous system directly:
1. Unclench your jaw and drop your shoulders away from your ears.
2. Inhale gently through your nose for 4 seconds...
3. Hold that air gently for 4 seconds...
4. Exhale smoothly through your mouth for 4 seconds.

Would you like to do a round of 4-4-4 Box Breathing with the visual timer, or try the 5-4-3-2-1 sensory grounding exercise?`;
    followUpSuggestions = [
      "Let's try Box Breathing",
      "Guide me through 5-4-3-2-1 Grounding",
      "I'm feeling a bit calmer now"
    ];
    return { response, followUpSuggestions };
  }

  // 3. Somatic Physical Symptoms (Shaking, Chest tightness, racing heart)
  if (context.intent === 'somatic_anxiety') {
    response = `${tonePrefix}I hear you, and I want to reassure you: what you are experiencing is your autonomic nervous system activating a fight-or-flight response. Your body is trying to protect you, even though you are physically safe right this second.

You don't need to fight these physical sensations. Place one hand flat over your chest and feel the solid floor underneath your feet. Let's take just one slow, steady breath. Are you in a comfortable place right now where you can sit down and sip some water?`;
    followUpSuggestions = [
      "I'm sitting down and drinking water",
      "My chest still feels tight",
      "Can you guide me through a quick grounding?"
    ];
    return { response, followUpSuggestions };
  }

  // 4. Progress / Relief Reported by User
  if (context.intent === 'progress_relief') {
    response = `${tonePrefix}Notice that shift right there. That is proof that intense emotional spikes do not stay peak forever; they rise, peak, and gradually soften when given room to breathe. 

You handled that moment with real self-awareness. How would you like to proceed right now? We can gently look at the task at hand, or you can take this as your cue to rest your mind for the day.`;
    followUpSuggestions = [
      "I want to tackle one small step now",
      "I think I need to rest for the night",
      "Thank you, Mindra"
    ];
    return { response, followUpSuggestions };
  }

  // 5. Gratitude & Closure
  if (context.intent === 'gratitude_closure') {
    response = `${tonePrefix}You are very welcome. Remember that the capacity to calm down and find clarity came from you—Mindra is just a sounding board. Be kind to yourself today, and whenever you need a zero-judgment space to unpack your mind, I am right here.`;
    followUpSuggestions = [
      "Start a fresh check-in",
      "View my weekly emotion trend",
      "Check out the calming exercises"
    ];
    return { response, followUpSuggestions };
  }

  // 6. Clarification / Intent Follow-ups & Direct Question Responses
  const lowerMsg = userMessage.toLowerCase();

  // 6a. Specific Subject or Chapter Block
  if (
    lowerMsg.includes('chapter') || lowerMsg.includes('subject') || lowerMsg.includes('physics') ||
    lowerMsg.includes('math') || lowerMsg.includes('formula') || lowerMsg.includes('chemistry') ||
    lowerMsg.includes('biology') || lowerMsg.includes('history') || lowerMsg.includes('syllabus') ||
    lowerMsg.includes('coding') || lowerMsg.includes('algorithm')
  ) {
    response = `${tonePrefix}When a specific subject or dense chapter feels like an impenetrable wall, our brains tend to generalize it into 'I am failing everything.' Let's shrink the challenge: you do not need to conquer every formula or derivation tonight. 

If you isolate just 1 or 2 high-yield concepts or diagrams from that chapter, which ones would carry the most confidence into tomorrow?`;
    followUpSuggestions = [
      "Reviewing just the summary and 2 diagrams",
      "Practicing 2 key formulas",
      "I feel too exhausted, I need to sleep"
    ];
    return { response, followUpSuggestions };
  }

  // 6b. Cognitive Bottleneck / Total Paralysis
  if (
    lowerMsg.includes('piled') || lowerMsg.includes('everything is') || lowerMsg.includes('paralyzed') ||
    lowerMsg.includes('freeze') || lowerMsg.includes('frozen') || lowerMsg.includes('can\'t start') ||
    lowerMsg.includes('stuck')
  ) {
    response = `${tonePrefix}That paralysis is a classic cognitive bottleneck: when your working memory attempts to evaluate 10 urgent demands simultaneously, the brain's executive function locks up. 

Let's do a hard reset: close every browser tab and textbook except one. Pick the single easiest 5-minute micro-action just to break the inertia. Would you like to do that, or do 3 minutes of Box Breathing first to clear the mental fog?`;
    followUpSuggestions = [
      "Let's do 3 minutes of Box Breathing",
      "I will do the 5-minute easiest task",
      "Help me pick which task to start with"
    ];
    return { response, followUpSuggestions };
  }

  // 6c. Parental Expectations & Peer Comparison
  if (
    lowerMsg.includes('parent') || lowerMsg.includes('disappoint') || lowerMsg.includes('comparing') ||
    lowerMsg.includes('relative') || lowerMsg.includes('family expect') || lowerMsg.includes('peer')
  ) {
    response = `${tonePrefix}Carrying the fear of disappointing your parents or falling behind peers is one of the heaviest forms of psychological pressure. It hurts because we naturally crave the pride and approval of those around us. 

Remember: parental anxiety is often their own unresolved fears projected onto you. Your worth as a human being is not a bargaining chip for anyone else's expectations. What is one kind thought you can offer yourself tonight?`;
    followUpSuggestions = [
      "I am doing the best I can right now",
      "I just want them to acknowledge my effort",
      "Can we try a breathing exercise?"
    ];
    return { response, followUpSuggestions };
  }

  // 6d. Harsh Manager Feedback / Workplace Confrontation
  if (
    lowerMsg.includes('harsh feedback') || lowerMsg.includes('yelled') || lowerMsg.includes('boss said') ||
    lowerMsg.includes('manager gave') || lowerMsg.includes('criticism') || lowerMsg.includes('called out')
  ) {
    response = `${tonePrefix}Harsh criticism cuts deeply, especially when delivered without empathy or in front of colleagues. It triggers an immediate threat response that makes you question your entire worth and competence. 

Take a deep breath and let the adrenaline subside. Feedback reflects a manager's communication style and immediate task expectations—not an indictment of your talent or future. What was the specific task issue beneath their delivery?`;
    followUpSuggestions = [
      "They were unhappy with the delivery deadline",
      "They criticized my presentation style",
      "I just feel like walking away from this job"
    ];
    return { response, followUpSuggestions };
  }

  // 6e. Unmanageable Workload / Long Hours
  if (
    lowerMsg.includes('unrealistic') || lowerMsg.includes('compounding') || lowerMsg.includes('12 hours') ||
    lowerMsg.includes('too many hours') || lowerMsg.includes('no time for myself')
  ) {
    response = `${tonePrefix}Operating under chronic, unmanageable task volume is a structural failure of organizational pacing—not your personal inadequacy. Running at 110% capacity will eventually force your nervous system to shut down through fatigue or illness. 

Tonight, let us practice sustainable self-preservation: pick one task that can safely be postponed until tomorrow morning without catastrophic consequences. What can wait?`;
    followUpSuggestions = [
      "I can postpone drafting that report",
      "I will shut my laptop at 8 PM sharp",
      "I snapped at my family because of this"
    ];
    return { response, followUpSuggestions };
  }

  // 6f. Micro-Action / Taking First Step
  if (
    lowerMsg.includes('reading') || lowerMsg.includes('outline') || lowerMsg.includes('organizing') ||
    lowerMsg.includes('started') || lowerMsg.includes('page 1') || lowerMsg.includes('working on it')
  ) {
    response = `${tonePrefix}That right there is a genuine victory over inertia. Action generates motivation, not the other way around. 

Now that you have stepped past the hardest barrier—starting—set a gentle 15-minute timer. Don't worry about finishing, just stay gently with the task. How does your mind feel now compared to before you took that first step?`;
    followUpSuggestions = [
      "Feeling a bit more focused and calm",
      "Still nervous but making progress",
      "I will keep going for 15 minutes"
    ];
    return { response, followUpSuggestions };
  }

  // 6g. Breaking down into small steps
  if (lowerMsg.includes('break') || lowerMsg.includes('one small') || lowerMsg.includes('step')) {
    response = `${tonePrefix}Breaking things down is the best antidote to feeling overwhelmed. Let's shrink the universe: forget everything due later this week. What is the single smallest action you can do in the next 10 minutes that would take off 5% of the pressure?`;
    followUpSuggestions = [
      "Just reading over page 1",
      "Writing down the outline",
      "Organizing my notes"
    ];
    return { response, followUpSuggestions };
  }

  // 6h. Permission to rest
  if (lowerMsg.includes('rest') || lowerMsg.includes('pause') || lowerMsg.includes('sleep') || lowerMsg.includes('tired')) {
    response = `${tonePrefix}Permission granted. Society often tricks us into believing rest is something we have to 'earn' after burning out. In reality, rest is non-negotiable maintenance. Put your materials away, close your browser tabs, and give yourself a guilt-free evening. You will think 10 times clearer tomorrow.`;
    followUpSuggestions = [
      "I will close my laptop now",
      "What if I can't fall asleep?",
      "Thank you, I needed to hear that"
    ];
    return { response, followUpSuggestions };
  }

  // 7. Life-Stage & Domain Adaptive Generation
  switch (lifeStage) {
    case 'student':
      if (context.intent === 'academic_stress') {
        response = `${tonePrefix}Academic deadlines and exams have a way of convincing your entire nervous system that your entire future hinges on this single moment. It feels enormous, but I want to remind you: your worth as a human being is not graded on a curve. 

When you look at what you need to do, is there one specific subject or chapter that feels like the main roadblock, or does everything feel piled together?`;
        followUpSuggestions = [
          "It's a specific chapter I don't understand",
          "Everything is piled together and I'm paralyzed",
          "My parents expect top marks and I'm scared"
        ];
      } else if (context.intent === 'relationship_friction') {
        response = `${tonePrefix}Carrying the fear of disappointing your parents or feeling out of place among peers is an invisible, exhausting burden. You shouldn't have to carry the weight of everyone else's expectations on top of your own studies. What did they say or do that made you feel this way?`;
        followUpSuggestions = [
          "They keep comparing me to relatives",
          "I feel like I'm falling behind my batch",
          "I just want them to understand how tired I am"
        ];
      } else if (context.intent === 'loneliness_isolation') {
        response = `${tonePrefix}Being surrounded by classmates and yet feeling completely alone is a very sharp, quiet ache. When everyone on social media looks like they have life sorted out, it's easy to feel like an outsider. What feels like the loneliest part of your day right now?`;
        followUpSuggestions = [
          "Meal times and breaks in college",
          "Studying late at night alone",
          "Feeling like no one really knows me"
        ];
      } else {
        response = `${tonePrefix}Thank you for putting that into words. Even having the honesty to write down what's bothering you takes real courage. Let's take things one moment at a time. What part of this is taking up the most room in your head today?`;
        followUpSuggestions = [
          "I can't concentrate on anything",
          "I'm feeling physically exhausted",
          "I just need someone to listen"
        ];
      }
      break;

    case 'young_adult':
      if (context.intent === 'career_burnout') {
        response = `${tonePrefix}Navigating early career expectations, harsh feedback, or corporate urgency can make you feel like you are constantly on trial. But remember: urgent requests from managers are often the result of their lack of planning, not your incompetence. 

What happened at work that triggered this knot in your stomach? Did someone give critical feedback, or is the volume of tasks simply unsustainable?`;
        followUpSuggestions = [
          "My manager gave harsh feedback",
          "The workload is completely unrealistic",
          "I feel like an imposter who will get exposed"
        ];
      } else if (context.intent === 'relationship_friction') {
        response = `${tonePrefix}Relationship transitions, dating ambiguities, or friction with friends in your 20s can feel destabilizing because your foundation is already shifting. It's valid to feel hurt or frustrated. What boundary do you feel needs to be drawn here?`;
        followUpSuggestions = [
          "I need space to focus on myself",
          "I feel like I'm putting in all the effort",
          "I'm afraid of confrontation"
        ];
      } else {
        response = `${tonePrefix}Balancing personal autonomy, career momentum, and emotional health is a steep learning curve. You don't need to have your entire 5-year trajectory solved by midnight. What would give you the most grounded relief this evening?`;
        followUpSuggestions = [
          "Setting a strict work boundary tonight",
          "Talking through how I'm feeling",
          "Doing a grounding exercise"
        ];
      }
      break;

    case 'working_adult':
      if (context.intent === 'career_burnout' || context.intent === 'general_overwhelm') {
        response = `${tonePrefix}When you are managing deliverables at the workplace while keeping household gears turning, your brain never gets to exit 'standby power mode.' Feeling short-tempered or emotionally flat is your mind signaling severe cognitive overload. 

You do not need to be the hero who fixes every single issue today. What is one responsibility on your plate that will realistically not cause a disaster if postponed until tomorrow?`;
        followUpSuggestions = [
          "Postponing non-urgent emails until tomorrow",
          "Ordering food instead of cooking tonight",
          "I snapped at my family and feel terrible"
        ];
      } else if (context.intent === 'relationship_friction') {
        response = `${tonePrefix}Snapping at family or feeling detached from loved ones after an exhausting day comes from an empty emotional tank, not a lack of love. Acknowledge your tiredness with them gently: 'I love you, but my brain is completely overwhelmed right now and I need 15 minutes of quiet.' Would taking a 15-minute quiet transition help you reset?`;
        followUpSuggestions = [
          "Yes, I need 15 minutes to decompress",
          "How do I apologize for being irritable?",
          "Can we try a breathing exercise?"
        ];
      } else {
        response = `${tonePrefix}You carry a massive invisible load every single week. This space is here for you without any checklists, status updates, or demands. Settle back into your chair. What is weighing most heavily on your mind right now?`;
        followUpSuggestions = [
          "I feel like I'm on autopilot",
          "Workload is compounding daily",
          "I just have zero time for myself"
        ];
      }
      break;

    case 'middle_aged':
      if (context.intent === 'loneliness_isolation' || context.intent === 'relationship_friction') {
        response = `${tonePrefix}Life transitions—children growing up and gaining independence, aging parents requiring medical care, or shifts in your daily home rhythm—can bring a quiet, profound grief that few people speak openly about. 

It is completely natural to feel both love and an ache of emptiness at the same time. How has this transition been feeling in your day-to-day routine?`;
        followUpSuggestions = [
          "The house feels quiet and empty",
          "Balancing elderly parent care is exhausting",
          "I feel like my role in life is changing"
        ];
      } else {
        response = `${tonePrefix}You have given so much of your life, energy, and wisdom to caring for others. In this moment, this conversation is dedicated solely to your own emotional well-being. What is a thought or feeling that you haven't had the space to share with anyone else lately?`;
        followUpSuggestions = [
          "I'm worried about my health and future",
          "I want to rediscover what brings me joy",
          "I just feel tired of being the strong one"
        ];
      }
      break;

    case 'senior':
      if (context.intent === 'loneliness_isolation') {
        response = `${tonePrefix}Namaste and warm greetings. Changes in routine, missing longtime companions, or having quieter days can make the hours feel long. Please know that your experiences, memories, and voice are deeply respected here. 

I am here to listen with all the patience in the world. What has been occupying your thoughts today?`;
        followUpSuggestions = [
          "Evenings feel particularly quiet",
          "My physical mobility frustrates me",
          "I was remembering old colleagues and friends"
        ];
      } else {
        response = `${tonePrefix}It is an honor to share this quiet moment with you. Life has many chapters, each with its own rhythm and adjustments. Take your time comfortably—is there something specific on your heart you would like to talk about today?`;
        followUpSuggestions = [
          "Talking about how my routine has changed",
          "Dealing with aches and physical limits",
          "Just having someone patient to listen"
        ];
      }
      break;

    default:
      response = `${tonePrefix}I hear you clearly, and I recognize that heightened ${dominantEmotion} is present in what you're experiencing. You do not have to navigate this alone. What would feel most supportive right now?`;
      followUpSuggestions = [
        "Help me break this down",
        "Guide me through a breathing exercise",
        "I just want to vent a bit more"
      ];
  }

  return { response, followUpSuggestions };
}

function generateHindiResponse(message: string, lifeStage: LifeStage): { response: string; followUpSuggestions: string[] } {
  const lower = message.toLowerCase();
  let response = '';
  const followUpSuggestions = [
    "क्या हम प्राणायाम (Breathing) कर सकते हैं?",
    "मुझे थोड़ा और बताना है",
    "धन्यवाद, मुझे थोड़ा बेहतर लग रहा है"
  ];

  if (lower.includes('exam') || lower.includes('padhai') || lower.includes('marks') || lifeStage === 'student') {
    response = "नमस्ते। मैं समझ सकता हूँ कि पढ़ाई और परीक्षाओं का दबाव कितना भारी हो सकता है। यह बिल्कुल स्वाभाविक है कि आप कभी-कभी परेशान महसूस करें। याद रखें: आपकी काबिलियत सिर्फ अंकों से तय नहीं होती। अपनी गति से एक गहरी सांस लें। क्या आप किसी खास विषय को लेकर परेशान हैं? (Hindi Demo Preview)";
  } else if (lower.includes('thak') || lower.includes('tired') || lower.includes('kaam') || lifeStage === 'working_adult') {
    response = "नमस्ते। काम और घर की ज़िम्मेदारियों को एक साथ संभालना बहुत थका देने वाला होता है। खुद पर ज़्यादा दबाव न डालें। 5 मिनट के लिए अपनी स्क्रीन बंद करें और पानी पिएं। मैं यहाँ आपके साथ हूँ। (Hindi Demo Preview)";
  } else {
    response = "नमस्ते। आपकी बात सुनकर मुझे समझ आ रहा है कि आप पर कितना मानसिक तनाव है। आपको अकेले यह सब सहने की ज़रूरत नहीं है। शांत मन से एक गहरी सांस लें। मैं यहाँ आपके साथ हूँ—बताइए क्या बात आपको सबसे ज़्यादा परेशान कर रही है? (Hindi Demo Preview)";
  }

  return { response, followUpSuggestions };
}

function generateMarathiResponse(message: string, lifeStage: LifeStage): { response: string; followUpSuggestions: string[] } {
  const lower = message.toLowerCase();
  let response = '';
  const followUpSuggestions = [
    "श्वसनाचा व्यायाम करूया का?",
    "मला अजून सांगायचे आहे",
    "धन्यवाद, बरे वाटले"
  ];

  if (lower.includes('exam') || lower.includes('abhyas') || lifeStage === 'student') {
    response = "नमस्कार. परीक्षा आणि अभ्यासाचा ताण खूप जास्त वाटू शकतो, हे मी समजू शकतो. स्वतःवर अवाजवी दबाव आणू नका. तुमचे मूल्य फक्त गुणांवर अवलंबून नाही. एक दीर्घ श्वास घ्या आणि मन शांत करा. मी तुमच्या सोबत आहे. (Marathi Demo Preview)";
  } else if (lower.includes('kaam') || lower.includes('office') || lifeStage === 'working_adult') {
    response = "नमस्कार. कामाचा ताण आणि घराची जबाबदारी यामुळे थकवा येणे अत्यंत साहजिक आहे. स्वतःला थोडी विश्रांती द्या. एक ग्लास पाणी प्या आणि थोडा वेळ शांत बसा. (Marathi Demo Preview)";
  } else {
    response = "नमस्कार. आपल्या भावना व्यक्त करणे ही स्वतःची काळजी घेण्याची पहिली पायरी आहे. मानसिक थकवा जाणवणे पूर्णपणे साहजिक आहे. थोडा वेळ विश्रांती घ्या. मी ऐकण्यासाठी इथे आहे. (Marathi Demo Preview)";
  }

  return { response, followUpSuggestions };
}
