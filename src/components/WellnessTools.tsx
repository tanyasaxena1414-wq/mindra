import React, { useState, useEffect } from 'react';
import { HeartPulse, Wind, Play, Pause, RotateCcw, CheckSquare, Eye, Hand, Volume2, Sparkles } from 'lucide-react';
import type { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface WellnessToolsProps {
  currentLanguage?: LanguageCode;
}

export const WellnessTools: React.FC<WellnessToolsProps> = ({ currentLanguage = 'en' }) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  // Box Breathing State
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold (Full)' | 'Exhale' | 'Hold (Empty)'>('Inhale');
  const [timerSeconds, setTimerSeconds] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  // Grounding Tool State
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    let interval: any = null;
    if (breathingActive) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            // Transition phase
            setBreathPhase(curr => {
              if (curr === 'Inhale') return 'Hold (Full)';
              if (curr === 'Hold (Full)') return 'Exhale';
              if (curr === 'Exhale') return 'Hold (Empty)';
              setCycleCount(c => c + 1);
              return 'Inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [breathingActive]);

  const resetBreathing = () => {
    setBreathingActive(false);
    setBreathPhase('Inhale');
    setTimerSeconds(4);
    setCycleCount(0);
  };

  const getLocalizedPhase = (phase: string) => {
    if (phase === 'Inhale') return t.wellness.inhale;
    if (phase === 'Hold (Full)') return t.wellness.holdFull;
    if (phase === 'Exhale') return t.wellness.exhale;
    return t.wellness.holdEmpty;
  };

  const groundingTasks = currentLanguage === 'hi' ? [
    { count: 5, sense: 'देखें', icon: <Eye size={18} color="#e11d48" />, prompt: 'अपने चारों ओर देखें और 5 अलग-अलग चीजें नोटिस करें (उदा. पेन, दीवार पर परछाई, खिड़की के बाहर का पेड़)।' },
    { count: 4, sense: 'स्पर्श करें', icon: <Hand size={18} color="#f59e0b" />, prompt: '4 ऐसी चीजें महसूस करें जिन्हें आप छू सकते हैं (उदा. कपड़ों का कपड़ा, मेज की सतह, फोन की स्क्रीन)।' },
    { count: 3, sense: 'सुनें', icon: <Volume2 size={18} color="#ea580c" />, prompt: 'ध्यान से 3 आवाज़ें सुनें (उदा. पंखे की आवाज़, दूर से आती गाड़ियों की आवाज़, घड़ी की टिक-टिक)।' },
    { count: 2, sense: 'सूंघें', icon: <Wind size={18} color="#a855f7" />, prompt: '2 सुगंध या गंध महसूस करें (उदा. ताज़ी हवा, चाय/कॉफी की महक, कागज़ की गंध)।' },
    { count: 1, sense: 'स्वाद लें', icon: <Sparkles size={18} color="#fb7185" />, prompt: '1 स्वाद पर ध्यान दें या मुंह के अंदर की स्वाभाविक गर्माहट को महसूस करें।' },
  ] : currentLanguage === 'mr' ? [
    { count: 5, sense: 'पहा', icon: <Eye size={18} color="#e11d48" />, prompt: 'सभोवताली नजर टाका आणि 5 वेगवेगळ्या वस्तू शोधा (उदा. पेन, भिंतीवरची सावली, बाहेरील झाड).' },
    { count: 4, sense: 'स्पर्श करा', icon: <Hand size={18} color="#f59e0b" />, prompt: '4 अशा गोष्टी ज्यांना तुम्ही स्पर्श करू शकता (उदा. कपड्यांचा पोत, टेबलाचा पृष्ठभाग).' },
    { count: 3, sense: 'ऐका', icon: <Volume2 size={18} color="#ea580c" />, prompt: 'शांतपणे 3 आवाज ऐकण्याचा प्रयत्न करा (उदा. पंख्याचा आवाज, वाहनांचा आवाज).' },
    { count: 2, sense: 'वास घ्या', icon: <Wind size={18} color="#a855f7" />, prompt: '2 सुगंध किंवा वास अनुभवा (उदा. ताजी हवा, चहा/कॉफीचा सुगंध).' },
    { count: 1, sense: 'चव घ्या', icon: <Sparkles size={18} color="#fb7185" />, prompt: '1 चव अनुभवा किंवा मुखातील शांत उष्णतेवर लक्ष केंद्रित करा.' },
  ] : [
    { count: 5, sense: 'SEE', icon: <Eye size={18} color="#e11d48" />, prompt: 'Look around you right now and notice 5 distinct objects (e.g. pen, shadow on wall, tree outside).' },
    { count: 4, sense: 'TOUCH', icon: <Hand size={18} color="#f59e0b" />, prompt: 'Notice 4 physical textures you can feel (e.g. fabric of your clothing, smooth desk, coolness of phone screen).' },
    { count: 3, sense: 'HEAR', icon: <Volume2 size={18} color="#ea580c" />, prompt: 'Listen carefully for 3 ambient sounds (e.g. distant fan, traffic hum, clock ticking).' },
    { count: 2, sense: 'SMELL', icon: <Wind size={18} color="#a855f7" />, prompt: 'Notice 2 scents in your environment (e.g. fresh breeze, coffee, paper).' },
    { count: 1, sense: 'TASTE', icon: <Sparkles size={18} color="#fb7185" />, prompt: 'Notice 1 taste or focus on the gentle natural warmth inside your mouth.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <div className="section-pre-title">
          <HeartPulse size={14} color="#e11d48" />
          <span>{t.wellness.preTitle}</span>
        </div>
        <h2 className="section-main-heading">
          {t.wellness.heading}
        </h2>
        <p className="section-subtitle">
          {t.wellness.subheading}
        </p>
      </div>

      <div className="wellness-grid-2col">
        
        {/* 4-4-4-4 Box Breathing Visualizer */}
        <div className="card-panel">
          <div className="card-header-row">
            <h3>
              <Wind size={18} color="#e11d48" />
              <span>{t.wellness.boxBreathingTitle}</span>
            </h3>
            <span className="status-badge teal">
              {currentLanguage === 'hi' ? `चक्र: ${cycleCount}` : currentLanguage === 'mr' ? `फेऱ्या: ${cycleCount}` : `Cycles: ${cycleCount}`}
            </span>
          </div>

          <p style={{ fontSize: '0.84rem', color: '#78716c', marginBottom: '22px', lineHeight: 1.5 }}>
            {t.wellness.boxBreathingDesc}
          </p>

          <div className="breathing-box">
            <div className="breath-circle-outer">
              <div 
                className={`breath-circle-inner ${
                  breathPhase === 'Inhale' ? 'inhale' : breathPhase.startsWith('Hold') ? 'hold' : 'exhale'
                }`}
              >
                <div className="breath-phase-text">
                  {getLocalizedPhase(breathPhase)}
                </div>
                <div className="breath-timer-count">
                  {timerSeconds}s
                </div>
              </div>
            </div>

            <div className="breathing-controls-row">
              <button
                onClick={() => setBreathingActive(!breathingActive)}
                className={`breathing-primary-btn ${breathingActive ? 'active' : ''}`}
              >
                {breathingActive ? <Pause size={16} /> : <Play size={16} />}
                <span>{breathingActive ? t.wellness.pauseBreathing : t.wellness.startBreathing}</span>
              </button>

              <button
                onClick={resetBreathing}
                className="breathing-reset-btn"
              >
                <RotateCcw size={15} />
                <span>{t.wellness.resetBreathing}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5-4-3-2-1 Sensory Grounding Tool */}
        <div className="card-panel">
          <div className="card-header-row">
            <h3>
              <CheckSquare size={18} color="#8b5cf6" />
              <span>{t.wellness.groundingTitle}</span>
            </h3>
            <span className="status-badge lavender">
              {currentLanguage === 'hi' ? 'संवादात्मक चेकलिस्ट' : currentLanguage === 'mr' ? 'संवादात्मक चेकलिस्ट' : 'Interactive Checklist'}
            </span>
          </div>

          <p style={{ fontSize: '0.84rem', color: '#78716c', marginBottom: '18px', lineHeight: 1.5 }}>
            {t.wellness.groundingDesc}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {groundingTasks.map((tItem, idx) => {
              const isChecked = !!checkedItems[idx];
              return (
                <div
                  key={idx}
                  onClick={() => setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }))}
                  className={`grounding-task-card ${isChecked ? 'completed' : ''}`}
                >
                  <div style={{ marginTop: '2px' }}>{tItem.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div className="grounding-task-title">
                      {currentLanguage === 'hi'
                        ? `चरण ${idx + 1}: ऐसी ${tItem.count} चीजें जिन्हें आप ${tItem.sense} सकते हैं`
                        : currentLanguage === 'mr'
                        ? `पायरी ${idx + 1}: अशा ${tItem.count} गोष्टी ज्या तुम्ही ${tItem.sense} शकता`
                        : `Step ${idx + 1}: Notice ${tItem.count} Things You Can ${tItem.sense}`}
                    </div>
                    <div className="grounding-task-prompt">
                      {tItem.prompt}
                    </div>
                  </div>
                  <div className={`grounding-checkbox ${isChecked ? 'checked' : ''}`}>
                    {isChecked ? '✓' : ''}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setCheckedItems({})}
              className="reset-checklist-btn"
            >
              {t.wellness.resetChecklist}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
