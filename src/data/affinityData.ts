export interface AffinityTheme {
  theme: string;
  badgeColor: string;
  painPointsFromPPT: string[];
  designResponseInMindra: string;
}

export const AFFINITY_THEMES: AffinityTheme[] = [
  {
    theme: 'Access & Availability',
    badgeColor: 'blue',
    painPointsFromPPT: [
      'In-person therapy is cost-prohibitive for students and young adults.',
      'Long appointment waiting times prevent immediate de-escalation when distress spikes.',
      'Stigma around mental healthcare creates hesitation to schedule clinic visits.',
      'Geographical barriers and lack of nearby counselors in tier-2/3 regions.'
    ],
    designResponseInMindra: 'Zero-barrier, instant digital check-ins accessible 24/7 with zero login requirement and immediate crisis helpline routing.'
  },
  {
    theme: 'Trust, Safety & Privacy',
    badgeColor: 'emerald',
    painPointsFromPPT: [
      'Users fear clinical data leaks, employer discovery, or societal judgment.',
      'Black-box AI chatbots give generic advice with zero transparency on reasoning.',
      'Unsafe automated answers during acute crises or suicidal ideation.'
    ],
    designResponseInMindra: 'Local-only ephemeral session state with explicit "Why this response?" explainability cards and deterministic crisis triage to verified helplines (Tele-MANAS 14416).'
  },
  {
    theme: 'Life-Stage Personalisation',
    badgeColor: 'purple',
    painPointsFromPPT: [
      'One-size-fits-all chatbots sound robotic, patronizing, or detached.',
      'A 16-year-old student and a 68-year-old retiree have vastly different vocabularies and life stressors.',
      'Monolingual English interfaces alienate non-native speakers seeking emotional expression.'
    ],
    designResponseInMindra: '5 explicit life-stage personas (Student to Senior) that tune linguistic register, coping suggestions, and regional language previews (Hindi & Marathi).'
  },
  {
    theme: 'Emotional Awareness & Tracking',
    painPointsFromPPT: [
      'Users struggle with emotional alexithymia (difficulty identifying or verbalizing feelings).',
      'Traditional binary "happy vs sad" trackers fail to capture nuanced emotional states.',
      'Lack of longitudinal visibility into emotional patterns across days and weeks.'
    ],
    badgeColor: 'amber',
    designResponseInMindra: 'Plutchik’s 8-dimensional emotion vector radar + bar breakdowns, paired with 7-day longitudinal trend charts to foster self-regulation.'
  }
];

export const FEATURE_TO_NEED_MAPPING = [
  {
    userNeed: 'Difficulty expressing complex or messy feelings',
    pptPainPoint: 'Difficulty expressing feelings; emotional illiteracy',
    feature: 'Guided check-in prompt chips & Plutchik 8D Emotion Vector mapping',
    status: 'Functional'
  },
  {
    userNeed: 'Impersonal, generic chatbot platitudes',
    pptPainPoint: 'Impersonal & scripted support',
    feature: 'Adaptive Life-Stage Profiles (5 age cohorts) + Tone Tuning engine',
    status: 'Functional'
  },
  {
    userNeed: 'Understanding what emotions are being felt',
    pptPainPoint: 'Lack of emotion tracking & insight',
    feature: 'Multi-dimensional Emotion Radar + Longitudinal 7-day trend analytics',
    status: 'Functional'
  },
  {
    userNeed: 'Transparency into why the AI said what it said',
    pptPainPoint: 'Black-box algorithms causing user distrust',
    feature: 'Explainable AI "Why this response?" rationale breakdown with heuristic cues',
    status: 'Functional'
  },
  {
    userNeed: 'Severe fear of therapy data being recorded or leaked',
    pptPainPoint: 'Privacy concerns & social stigma',
    feature: 'Local-only session sandbox; zero telemetry; zero third-party API exposure',
    status: 'Functional'
  },
  {
    userNeed: 'Immediate calming when distress is rising',
    pptPainPoint: 'Delayed support; no real-time coping mechanism',
    feature: 'Interactive 4-4-4 Box Breathing visualizer & 5-4-3-2-1 Grounding tool',
    status: 'Functional'
  },
  {
    userNeed: 'Safety during acute emotional crises or danger',
    pptPainPoint: 'Unsafe responses & lack of clinical boundaries',
    feature: 'Deterministic keyword crisis intercept + Verified Tele-MANAS (14416) routing',
    status: 'Functional'
  },
  {
    userNeed: 'Users struggling to express feelings through typing / vernacular voice',
    pptPainPoint: 'Typing fatigue, verbal expression barriers, vocal tone nuances',
    feature: 'Full Voice Chat: STT microphone recording, real-time waveform visualizer, editable transcription review, TTS spoken responses, and live acoustic cue extraction',
    status: 'Functional'
  }
];

export const DEMO_PRESENTATION_SCRIPT = [
  {
    time: '0:00 - 0:20',
    phase: 'Problem & Hook',
    script: 'Good morning/afternoon evaluators. In our Design Thinking research, we found that emotional distress strikes across all age cohorts—from exam-stressed teens to isolated seniors—yet 80% struggle to identify their exact feelings, and existing chatbots offer impersonal, black-box scripts.'
  },
  {
    time: '0:20 - 0:45',
    phase: 'Solution: Emotion Vectors',
    script: 'We created Mindra: a mental wellness prototype powered by 8-dimensional emotion vectors based on Plutchik’s model. Notice how when Aarav, our student persona, shares feeling overwhelmed before an exam, Mindra does not just output a flat response. It decomposes the message into an explicit vector of Fear, Anticipation, and Sadness.'
  },
  {
    time: '0:45 - 1:10',
    phase: 'Explainability & Personalisation',
    script: 'Crucially, to satisfy our Trust & Privacy theme, Mindra shows a dedicated "Why this response?" card explaining the exact linguistic triggers. And by switching life stages from Student to Working Parent, the tone adapts seamlessly from gentle validation to structured grounding.'
  },
  {
    time: '1:10 - 1:30',
    phase: 'Safety, Trends & Rubric Summary',
    script: 'For safety, any acute distress triggers an immediate, non-judgmental crisis intercept routing to India’s Tele-MANAS 14416 helpline. With weekly trend analytics and interactive breathing tools, Mindra demonstrates a safe, empathetic, and human-centered design for our FA2 submission.'
  }
];
