import type { LanguageCode, LifeStage } from '../types';

export interface UIStrings {
  brandTagline: string;
  topBanner: string;
  urgentHelpBtn: string;
  disclaimerText: string;
  inMemorySession: string;
  resetDemoBtn: string;
  navTabs: {
    dashboard: string;
    checkin: string;
    insights: string;
    wellness: string;
    support: string;
    rationale: string;
  };
  dashboard: {
    heroTagline: string;
    heroHeading: string;
    heroDescription: string;
    startCheckInBtn: string;
    breathingBtn: string;
    activeAdaptation: string;
    latestSnapshot: string;
    weeklyFlow: string;
    exploreLifeStage: string;
    exploreLifeStageDesc: string;
    testSamplePromptBtn: string;
  };
  chat: {
    title: string;
    adaptedFor: string;
    voiceCuesActive: string;
    simulateVoiceCues: string;
    greeting: string;
    quickPromptsLabel: string;
    inputPlaceholder: (name: string) => string;
    sendBtnTitle: string;
    suggestedFollowUps: string;
    typingMessage: string;
    vectorAwaiting: string;
    vectorAwaitingDesc: string;
    humanSupportNotice: string;
    helplineBtn: string;
    tryBreathingBtn: string;
    micBtnTitle: string;
    micActiveTitle: string;
    autoSpeakResponses: string;
    voiceCheckInBadge: string;
    listenResponse: string;
    stopSpeaking: string;
    replayResponse: string;
    voiceTranscribedNotice: string;
    noSpeechDetected: string;
  };
  wellness: {
    preTitle: string;
    heading: string;
    subheading: string;
    boxBreathingTitle: string;
    boxBreathingDesc: string;
    inhale: string;
    holdFull: string;
    exhale: string;
    holdEmpty: string;
    startBreathing: string;
    pauseBreathing: string;
    resetBreathing: string;
    groundingTitle: string;
    groundingDesc: string;
    resetChecklist: string;
  };
  support: {
    crisisTitle: string;
    crisisText: string;
    callNow: string;
    verifiedHelplines: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, UIStrings> = {
  en: {
    brandTagline: 'Emotion-Vector Guided Mental Care',
    topBanner: 'FA2 Design Thinking Prototype • Mindra — Mental AI Therapy Chatbot based on 8D Emotion Vectors',
    urgentHelpBtn: 'Need Urgent Help?',
    disclaimerText: 'Wellness Support Prototype: Mindra is an interactive design prototype created for FA2 Design Thinking evaluation. It does not provide clinical diagnosis, psychiatric therapy, or emergency crisis interception.',
    inMemorySession: '100% In-Memory Session',
    resetDemoBtn: 'Reset Demo',
    navTabs: {
      dashboard: '🏠 Overview',
      checkin: '💬 Check-In & Chat',
      insights: '📊 Emotion Vector & Analytics',
      wellness: '🌿 Calming & Grounding',
      support: '🛡️ Verified Support',
      rationale: '📋 Design Rationale & Rubric'
    },
    dashboard: {
      heroTagline: 'Emotion-Vector Guided Mental Wellness',
      heroHeading: 'How is your mind feeling right now?',
      heroDescription: 'Mindra maps your thoughts into an 8-dimensional emotion vector based on Robert Plutchik’s model. It transparently explains its reasoning, preserves 100% session privacy, and dynamically adapts its conversational register to your life stage.',
      startCheckInBtn: 'Start a Check-In',
      breathingBtn: '4-4-4 Box Breathing',
      activeAdaptation: 'ACTIVE ADAPTATION',
      latestSnapshot: 'Latest Emotion Vector Snapshot',
      weeklyFlow: 'Weekly Emotional Flow (Demo Data)',
      exploreLifeStage: 'Explore Life-Stage Personalisation',
      exploreLifeStageDesc: 'Different age cohorts have distinctly different emotional vocabularies and stressors. Select a persona below to see how Mindra tunes its empathetic register:',
      testSamplePromptBtn: 'Test Sample Prompt →'
    },
    chat: {
      title: 'Guided Emotion Check-In',
      adaptedFor: 'Adapted for:',
      voiceCuesActive: 'Voice Cues Active',
      simulateVoiceCues: 'Simulate Voice Cues',
      greeting: "Hello, I'm Mindra. I'm here as a safe, confidential sanctuary to unpack how you're feeling today. How is your day treating you?",
      quickPromptsLabel: 'Quick Prompts:',
      inputPlaceholder: (name) => `Express what's on your mind as ${name} (e.g. "I feel so overwhelmed today")...`,
      sendBtnTitle: 'Send (Press Enter)',
      suggestedFollowUps: 'Suggested follow-ups:',
      typingMessage: 'Mindra is formulating response...',
      vectorAwaiting: 'Emotion Vector Awaiting Input',
      vectorAwaitingDesc: "Select a quick prompt or type what you're experiencing. Mindra will instantly visualize the 8-dimensional emotion vector and plain-language explanation here.",
      humanSupportNotice: 'Need human support right now? Connect directly with verified 24/7 counselors.',
      helplineBtn: 'Tele-MANAS (14416)',
      tryBreathingBtn: 'Try Breathing',
      micBtnTitle: 'Voice Check-In: Speak your thoughts naturally',
      micActiveTitle: 'Recording in progress... Click to stop or cancel',
      autoSpeakResponses: 'Read responses aloud (TTS)',
      voiceCheckInBadge: 'Voice Check-In',
      listenResponse: 'Listen',
      stopSpeaking: 'Stop',
      replayResponse: 'Replay',
      voiceTranscribedNotice: 'Voice transcribed! Review, edit if needed, and press Send.',
      noSpeechDetected: 'No speech was detected. Please speak closer or try typing.'
    },
    wellness: {
      preTitle: 'AUTONOMIC NERVOUS SYSTEM REGULATION',
      heading: 'Calming & Sensory Grounding Exercises',
      subheading: 'Real-time physiological regulation techniques to reduce sensory overload, stimulate the vagus nerve, and reset fight-or-flight arousal.',
      boxBreathingTitle: '4-4-4-4 Box Breathing Visualizer',
      boxBreathingDesc: 'Box breathing stimulates the vagus nerve, calming heart rate and down-regulating amygdala hyperactivity during moments of acute dread or panic.',
      inhale: 'Inhale',
      holdFull: 'Hold (Full)',
      exhale: 'Exhale',
      holdEmpty: 'Hold (Empty)',
      startBreathing: 'Start Paced Breathing',
      pauseBreathing: 'Pause Exercise',
      resetBreathing: 'Reset',
      groundingTitle: '5-4-3-2-1 Sensory Grounding Exercise',
      groundingDesc: 'When catastrophic thoughts or exam dread race ahead, grounding firmly anchors sensory awareness back into the present physical environment.',
      resetChecklist: 'Reset Checklist'
    },
    support: {
      crisisTitle: 'In an Immediate Crisis or Feeling Unsafe?',
      crisisText: 'Mindra is an automated student software prototype for FA2 Design Thinking. It cannot diagnose, provide clinical psychiatric care, or intercept medical emergencies. If you or someone you know is in acute distress or considering self-harm, please connect with caring humans or contact verified helplines immediately.',
      callNow: 'Call Now',
      verifiedHelplines: 'Verified Mental Health Helplines (India)'
    }
  },
  hi: {
    brandTagline: 'भावना-वेक्टर आधारित मानसिक कल्याण',
    topBanner: 'एफ़ए2 डिज़ाइन थिंकिंग प्रोटोटाइप • मिन्द्रा — 8D भावना वेक्टर आधारित मानसिक कल्याण चैटबॉट',
    urgentHelpBtn: 'तत्काल सहायता चाहिए?',
    disclaimerText: 'मानसिक स्वास्थ्य प्रोटोटाइप: मिन्द्रा एक संवादात्मक डिज़ाइन प्रोटोटाइप है। यह चिकित्सीय निदान, मनोचिकित्सा या आपातकालीन संकट सहायता प्रदान नहीं करता है।',
    inMemorySession: '100% स्थानीय सत्र (पूर्ण गोपनीयता)',
    resetDemoBtn: 'डेमो रीसेट करें',
    navTabs: {
      dashboard: '🏠 मुख्य पृष्ठ',
      checkin: '💬 चेक-इन व संवाद',
      insights: '📊 भावना विश्लेषण व ट्रेंड्स',
      wellness: '🌿 ध्यान व प्राणायाम',
      support: '🛡️ सत्यापित हेल्पलाइन',
      rationale: '📋 डिज़ाइन रूब्रिक'
    },
    dashboard: {
      heroTagline: 'भावना-वेक्टर आधारित मानसिक स्वास्थ्य',
      heroHeading: 'इस समय आपका मन कैसा महसूस कर रहा है?',
      heroDescription: 'मिन्द्रा आपकी सोच को रॉबर्ट प्लूटचिक के 8-आयामी भावना मॉडल में विश्लेषित करता है। यह अपनी प्रतिक्रिया के कारण पारदर्शी ढंग से समझाता है और आपकी उम्र के अनुसार संवादात्मक शैली बदलता है।',
      startCheckInBtn: 'चेक-इन शुरू करें',
      breathingBtn: '4-4-4 प्राणायाम',
      activeAdaptation: 'सक्रिय जीवन-चरण',
      latestSnapshot: 'नवीनतम भावना वेक्टर स्नैपशॉट',
      weeklyFlow: 'साप्ताहिक भावनात्मक प्रवाह (डेमो डेटा)',
      exploreLifeStage: 'जीवन-चरण व्यक्तिगत अनुकूलन',
      exploreLifeStageDesc: 'अलग-अलग आयु वर्ग की भावनात्मक चुनौतियाँ अलग होती हैं। मिन्द्रा कैसे अपनी भाषा और सलाह अनुकूलित करता है, यह देखने के लिए नीचे एक प्रोफ़ाइल चुनें:',
      testSamplePromptBtn: 'नमूना प्रॉम्प्ट आज़माएँ →'
    },
    chat: {
      title: 'मार्गदर्शित भावना चेक-इन (हिंदी)',
      adaptedFor: 'अनुकूलित:',
      voiceCuesActive: 'ध्वनि संकेत सक्रिय',
      simulateVoiceCues: 'ध्वनि संकेत सिम्युलेट करें',
      greeting: 'नमस्ते, मैं मिन्द्रा हूँ। आज आप कैसा महसूस कर रहे हैं? अपने मन की बात यहाँ बिना किसी झिझक के साझा करें।',
      quickPromptsLabel: 'त्वरित प्रॉम्प्ट्स:',
      inputPlaceholder: (name) => `${name} के रूप में अपने मन की बात लिखें (उदा. "मुझे आज बहुत घबराहट हो रही है")...`,
      sendBtnTitle: 'भेजें (Enter दबाएँ)',
      suggestedFollowUps: 'सुझाए गए अनुवर्ती विकल्प:',
      typingMessage: 'मिन्द्रा उत्तर तैयार कर रहा है...',
      vectorAwaiting: 'भावना वेक्टर इनपुट की प्रतीक्षा में',
      vectorAwaitingDesc: 'त्वरित प्रॉम्प्ट चुनें या अपनी भावना टाइप करें। मिन्द्रा तुरंत 8-आयामी भावना वेक्टर और स्पष्ट व्याख्या यहाँ दिखाएगा।',
      humanSupportNotice: 'क्या तुरंत किसी से बात करने की ज़रूरत है? सत्यापित 24/7 परामर्शदाताओं से जुड़ें।',
      helplineBtn: 'टेली-मानस (14416)',
      tryBreathingBtn: 'प्राणायाम करें',
      micBtnTitle: 'आवाज से चेक-इन: बोलकर अपनी भावनाएं बताएं',
      micActiveTitle: 'रिकॉर्डिंग जारी है... रोकने के लिए क्लिक करें',
      autoSpeakResponses: 'उत्तर बोलकर सुनाएं (TTS)',
      voiceCheckInBadge: 'आवाज से चेक-इन',
      listenResponse: 'सुनें',
      stopSpeaking: 'रोकें',
      replayResponse: 'दोबारा सुनें',
      voiceTranscribedNotice: 'आवाज रूपांतरित हो गई! समीक्षा करें और भेजें।',
      noSpeechDetected: 'कोई आवाज नहीं पहचानी गई। कृपया थोड़ा पास बोलें या लिखकर बताएं।'
    },
    wellness: {
      preTitle: 'स्वायत्त तंत्रिका तंत्र नियमन',
      heading: 'मन शांत करने और वर्तमान में लौटने के अभ्यास',
      subheading: 'मानसिक तनाव और घबराहट को तुरंत कम करने के लिए प्रमाणित शारीरिक विश्राम तकनीकें।',
      boxBreathingTitle: '4-4-4-4 बॉक्स ब्रीदिंग (प्राणायाम)',
      boxBreathingDesc: 'यह तकनीक हृदय गति को नियंत्रित करती है और अत्यधिक घबराहट या तनाव के समय तंत्रिका तंत्र को शांत करती है।',
      inhale: 'श्वास अंदर लें (Inhale)',
      holdFull: 'श्वास रोकें (Hold)',
      exhale: 'श्वास छोड़ें (Exhale)',
      holdEmpty: 'खाली रखें (Hold)',
      startBreathing: 'प्राणायाम शुरू करें',
      pauseBreathing: 'रोकें',
      resetBreathing: 'रीसेट करें',
      groundingTitle: '5-4-3-2-1 इंद्रिय संवेदी अभ्यास',
      groundingDesc: 'जब भविष्य की चिंता या नकारात्मक विचार हावी हों, तो यह अभ्यास ध्यान को वर्तमान में वापस लाता है।',
      resetChecklist: 'चेकलिस्ट रीसेट करें'
    },
    support: {
      crisisTitle: 'क्या आप गंभीर संकट में हैं या असुरक्षित महसूस कर रहे हैं?',
      crisisText: 'मिन्द्रा एक प्रोटोटाइप है और आपातकालीन सेवा नहीं है। यदि आप या कोई परिचित गंभीर संकट में है या आत्म-हानि के विचार आ रहे हैं, तो तुरंत राष्ट्रीय हेल्पलाइन पर कॉल करें।',
      callNow: 'कॉल करें',
      verifiedHelplines: 'भारत की सत्यापित मानसिक स्वास्थ्य हेल्पलाइन'
    }
  },
  mr: {
    brandTagline: 'भावना-वेक्टर आधारित मानसिक कल्याण',
    topBanner: 'एफ़ए2 डिझाइन थिंकिंग प्रोटोटाइप • मिन्द्रा — 8D भावना वेक्टर आधारित मानसिक आरोग्य चॅटबॉट',
    urgentHelpBtn: 'तातडीची मदत हवी आहे?',
    disclaimerText: 'मानसिक आरोग्य प्रोटोटाइप: मिन्द्रा हा एक संवादात्मक डिझाइन प्रोटोटाइप आहे. ही कोणतीही वैद्यकीय किंवा आपत्कालीन सेवा नाही.',
    inMemorySession: '100% स्थानिक सत्र (संपूर्ण गोपनीयता)',
    resetDemoBtn: 'डेमो रीसेट करा',
    navTabs: {
      dashboard: '🏠 मुख्य पृष्ठ',
      checkin: '💬 चेक-इन व संवाद',
      insights: '📊 भावना विश्लेषण व ट्रेंड्स',
      wellness: '🌿 शांतता व श्वसन व्यायाम',
      support: '🛡️ मदत केंद्र व हेल्पलाइन',
      rationale: '📋 डिझाइन मार्गदर्शक'
    },
    dashboard: {
      heroTagline: 'भावना-वेक्टर आधारित मानसिक स्वास्थ्य',
      heroHeading: 'या क्षणी आपले मन कसे अनुभवत आहे?',
      heroDescription: 'मिन्द्रा आपल्या विचारांचे 8-आयामी भावना मॉडेलमध्ये विश्लेषण करते. हे पारदर्शकपणे स्पष्टीकरण देते आणि आपल्या वयोमानानुसार भाषा व सल्ला बदलते.',
      startCheckInBtn: 'चेक-इन सुरू करा',
      breathingBtn: '4-4-4 श्वसन व्यायाम',
      activeAdaptation: 'सक्रिय जीवन-टप्पा',
      latestSnapshot: 'नवीनतम भावना वेक्टर स्नॅपशॉट',
      weeklyFlow: 'साप्ताहिक भावनिक बदल (डेमो डेटा)',
      exploreLifeStage: 'जीवन-टप्पा वैयक्तिकरण',
      exploreLifeStageDesc: 'प्रत्येक वयोगटातील भावनिक ताण वेगवेगळा असतो. मिन्द्रा आपली भाषा कशी जुळवून घेते हे पाहण्यासाठी खालील प्रोफाइल निवडा:',
      testSamplePromptBtn: 'नमुना प्रॉम्प्ट तपासा →'
    },
    chat: {
      title: 'मार्गदर्शित भावना चेक-इन (मराठी)',
      adaptedFor: 'अनुकूलित:',
      voiceCuesActive: 'आवाज संकेत सक्रिय',
      simulateVoiceCues: 'आवाज संकेत सिम्युलेट करा',
      greeting: 'नमस्कार, मी मिन्द्रा आहे. आज तुम्हाला कसे वाटत आहे? आपल्या भावना येथे मोकळेपणाने व्यक्त करा.',
      quickPromptsLabel: 'त्वरित प्रॉम्प्ट्स:',
      inputPlaceholder: (name) => `${name} म्हणून आपल्या भावना व्यक्त करा (उदा. "मला आज खूप ताण जाणवत आहे")...`,
      sendBtnTitle: 'पाठवा (Enter दाबा)',
      suggestedFollowUps: 'सुचवलेले पर्याय:',
      typingMessage: 'मिन्द्रा उत्तर तयार करत आहे...',
      vectorAwaiting: 'भावना वेक्टर इनपुटची वाट पाहत आहे',
      vectorAwaitingDesc: 'त्वरित प्रॉम्प्ट निवडा किंवा आपल्या भावना लिहा. मिन्द्रा त्वरित 8-आयामी भावना वेक्टर आणि स्पष्टीकरण येथे दाखवेल.',
      humanSupportNotice: 'तातडीने कोणाशी बोलायचे आहे का? सत्यापित 24/7 समुपदेशकांशी संपर्क साधा.',
      helplineBtn: 'टेलि-मानस (14416)',
      tryBreathingBtn: 'श्वसन व्यायाम करा',
      micBtnTitle: 'आवाजाने चेक-इन: बोलून आपल्या भावना व्यक्त करा',
      micActiveTitle: 'रेकॉर्डिंग सुरू आहे... थांबवण्यासाठी क्लिक करा',
      autoSpeakResponses: 'उत्तर ऐकवा (TTS)',
      voiceCheckInBadge: 'आवाजाने चेक-इन',
      listenResponse: 'ऐका',
      stopSpeaking: 'थांबवा',
      replayResponse: 'पुन्हा ऐका',
      voiceTranscribedNotice: 'आवाज मजकुरात रूपांतरित झाली! तपासा आणि पाठवा.',
      noSpeechDetected: 'कोणताही आवाज ओळखता आला नाही. कृपया जवळ येऊन बोला किंवा टाईप करा.'
    },
    wellness: {
      preTitle: 'मज्जासंस्था नियमन',
      heading: 'मन शांत करण्याचे आणि स्थिर राहण्याचे व्यायाम',
      subheading: 'मानसिक ताण आणि अस्वस्थता कमी करण्यासाठी प्रमाणित श्वसन व मनःशांती तंत्रे.',
      boxBreathingTitle: '4-4-4-4 बॉक्स ब्रीदिंग (श्वसन व्यायाम)',
      boxBreathingDesc: 'हा व्यायाम हृदयाचे ठोके शांत करतो आणि भीती किंवा तीव्र ताणाच्या वेळी मनाला स्थिर करतो.',
      inhale: 'श्वास आत घ्या (Inhale)',
      holdFull: 'श्वास रोखा (Hold)',
      exhale: 'श्वास सोडा (Exhale)',
      holdEmpty: 'शांत राहा (Hold)',
      startBreathing: 'व्यायाम सुरू करा',
      pauseBreathing: 'थांबवा',
      resetBreathing: 'रीसेट करा',
      groundingTitle: '5-4-3-2-1 पंचेंद्रिय व्यायाम',
      groundingDesc: 'जेव्हा विचारांचे चक्र थांबत नाही, तेव्हा हा व्यायाम आपले लक्ष सभोवतालच्या वास्तवावर केंद्रित करतो.',
      resetChecklist: 'चेकलिस्ट रीसेट करा'
    },
    support: {
      crisisTitle: 'तुम्ही तीव्र संकटात आहात किंवा असुरक्षित वाटत आहे का?',
      crisisText: 'मिन्द्रा हा शैक्षणिक प्रोटोटाइप आहे आणि आपत्कालीन वैद्यकीय सेवा नाही. आत्म-हानीचे विचार येत असल्यास कृपया लगेच अधिकृत हेल्पलाइनशी संपर्क साधा.',
      callNow: 'कॉल करा',
      verifiedHelplines: 'भारतातील सत्यापित मानसिक आरोग्य हेल्पलाइन'
    }
  }
};

export const LOCALIZED_PROMPTS: Record<LanguageCode, Record<LifeStage, string[]>> = {
  en: {
    student: [
      'I have an exam tomorrow and I feel completely paralyzed by anxiety.',
      'Everyone else in my batch seems to understand the concepts except me.',
      'I cannot focus on studying for more than five minutes today.',
      'My parents have high expectations and I dread disappointing them.'
    ],
    young_adult: [
      'My manager gave harsh feedback and I am questioning my entire career choice.',
      'I feel exhausted every weekend and dread opening my work laptop on Monday.',
      'I am falling behind compared to where my peers are financially and socially.',
      'I have so many decisions to make and my mind is in endless analysis paralysis.'
    ],
    working_adult: [
      'I have zero time for myself between work deadlines and household responsibilities.',
      'I snapped at my family after a long day at the office and feel awful about it.',
      'My workload keeps compounding but I cannot afford to pause or drop any balls.',
      'I feel emotionally numb and just running through daily checklists on autopilot.'
    ],
    middle_aged: [
      'The house feels unusually quiet now that the kids have moved out for college.',
      'Balancing my elderly mother’s hospital visits with my daily routine is draining.',
      'I find myself reflecting on past choices and feeling anxious about growing older.',
      'I want to rediscover what brings me personal peace and joy.'
    ],
    senior: [
      'Days feel very long since retirement and I miss having purposeful work.',
      'My knees keep hurting and it frustrates me that I cannot walk like I used to.',
      'Most of my old colleagues have moved away and evenings feel quite lonely.',
      'I just wanted a calm, patient space to share what is on my mind today.'
    ]
  },
  hi: {
    student: [
      'कल मेरी परीक्षा है और मुझे बहुत घबराहट हो रही है।',
      'मेरी कक्षा में सबको समझ आ रहा है, सिर्फ मुझे छोड़कर।',
      'आज मेरा पढ़ाई में बिल्कुल मन नहीं लग रहा है।',
      'मेरे माता-पिता की बहुत उम्मीदें हैं और मुझे डर लग रहा है।'
    ],
    young_adult: [
      'मेरे मैनेजर ने डांट दिया और मुझे अपने करियर की चिंता हो रही है।',
      'पूरा सप्ताहांत थकान में बीतता है और सोमवार को काम का डर लगता है।',
      'मुझे लगता है कि मैं अपने दोस्तों की तुलना में बहुत पीछे छूट रहा हूँ।'
    ],
    working_adult: [
      'काम और घर की ज़िम्मेदारियों के बीच खुद के लिए बिल्कुल समय नहीं है।',
      'दिनभर की थकान के बाद मैंने घर पर गुस्सा कर दिया, मुझे बहुत बुरा लग रहा है।',
      'काम का बोझ बढ़ता ही जा रहा है और मैं बहुत थक चुका हूँ।'
    ],
    middle_aged: [
      'बच्चों के कॉलेज जाने के बाद से घर बहुत खाली और शांत लगता है।',
      'बुजुर्ग माता-पिता की देखभाल और दैनिक जीवन में संतुलन बनाना कठिन हो रहा है।'
    ],
    senior: [
      'रिटायरमेंट के बाद दिन बहुत लंबे लगते हैं और पुरानी व्यस्तता याद आती है।',
      'शाम के समय बहुत अकेलापन महसूस होता है, बस किसी से बात करने का मन है।'
    ]
  },
  mr: {
    student: [
      'उद्या माझी परीक्षा आहे आणि मला खूप भीती वाटत आहे.',
      'माझ्या वर्गात सर्वांना समजते आहे, फक्त मलाच नाही.',
      'आज माझे अभ्यासात अजिबात लक्ष लागत नाहीये.',
      'माझ्या पालकांच्या खूप अपेक्षा आहेत आणि मला त्यांची भीती वाटते.'
    ],
    young_adult: [
      'मॅनेजरच्या अभिप्रायामुळे मी माझ्या करिअरबद्दल साशंक झालो आहे.',
      'कामाच्या ताणामुळे मला खूप मानसिक व शारीरिक थकवा जाणवत आहे.'
    ],
    working_adult: [
      'ऑफिस आणि घर सांभाळताना स्वतःसाठी अजिबात वेळ मिळत नाही.',
      'थकव्यामुळे मी घरात चिडचिड केली, मला वाईट वाटत आहे.'
    ],
    middle_aged: [
      'मुलं शिक्षणासाठी बाहेर गेल्यानंतर घर खूप शांत आणि रिकामे वाटते.',
      'वयस्कर आई-वडिलांची काळजी घेताना स्वतःचा तोल सांभाळणे कठीण होते.'
    ],
    senior: [
      'निवृत्तीनंतर वेळ जात नाही आणि जुन्या सहकाऱ्यांची खूप आठवण येते.',
      'संध्याकाळच्या वेळी एकटेपणा जाणवतो, मन मोकळे करायचे आहे.'
    ]
  }
};
