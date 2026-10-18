import React from 'react';
import { ArrowRight, Sparkles, Activity, ShieldCheck, HeartPulse, GraduationCap, Briefcase, Building2, HeartHandshake, Smile, Compass, Clock, CheckCircle2 } from 'lucide-react';
import type { LifeStage, LanguageCode, CheckInEntry } from '../types';
import { PERSONAS } from '../data/personas';
import { SAMPLE_WEEKLY_TRENDS } from '../data/sampleTrends';
import { TRANSLATIONS, LOCALIZED_PROMPTS } from '../data/translations';

interface DashboardProps {
  currentLifeStage: LifeStage;
  currentLanguage: LanguageCode;
  onChangeLifeStage: (stage: LifeStage) => void;
  latestCheckIn?: CheckInEntry;
  onStartCheckIn: (prompt?: string) => void;
  onOpenInsights: () => void;
  onOpenWellness: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentLifeStage,
  currentLanguage,
  onChangeLifeStage,
  latestCheckIn,
  onStartCheckIn,
  onOpenInsights,
  onOpenWellness
}) => {
  const activePersona = PERSONAS[currentLifeStage] || PERSONAS.student;
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const getPersonaIcon = (stage: LifeStage) => {
    switch (stage) {
      case 'student': return <GraduationCap size={20} />;
      case 'young_adult': return <Briefcase size={20} />;
      case 'working_adult': return <Building2 size={20} />;
      case 'middle_aged': return <HeartHandshake size={20} />;
      case 'senior': return <Smile size={20} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Hero Welcome Card */}
      <div className="hero-banner-card">
        <div className="hero-content-col">
          <div className="hero-tagline-pill">
            <Sparkles size={14} />
            <span>{t.dashboard.heroTagline}</span>
          </div>

          <h2 className="hero-heading">
            {t.dashboard.heroHeading}
          </h2>

          <p className="hero-description">
            {t.dashboard.heroDescription}
          </p>

          <div className="hero-cta-row">
            <button
              onClick={() => onStartCheckIn()}
              className="hero-primary-btn"
            >
              <span>{t.dashboard.startCheckInBtn}</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onOpenWellness}
              className="hero-secondary-btn"
            >
              <HeartPulse size={16} />
              <span>{t.dashboard.breathingBtn}</span>
            </button>
          </div>
        </div>

        {/* Hero Persona Context Card */}
        <div className="hero-persona-card">
          <div className="hero-persona-header">
            <div className="hero-persona-icon-box">
              {getPersonaIcon(currentLifeStage)}
            </div>
            <div>
              <div className="hero-persona-label">{t.dashboard.activeAdaptation}</div>
              <div className="hero-persona-name">{activePersona.name}</div>
            </div>
          </div>
          <p className="hero-persona-tagline">
            "{activePersona.tagline}"
          </p>
          <div className="hero-persona-meta">
            <strong>Context:</strong> {activePersona.typicalContext}
          </div>
          <div style={{ marginTop: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {activePersona.coreStressors.slice(0, 2).map((stressor, sIdx) => (
              <span key={sIdx} className="hero-stressor-pill">
                • {stressor}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Latest Check-in Summary + Weekly Trend Preview */}
      <div className="dashboard-grid-2col">
        
        {/* Latest Check-In Snapshot */}
        <div className="card-panel">
          <div className="card-header-row">
            <h3>
              <Activity size={18} color="#e11d48" />
              <span>{t.dashboard.latestSnapshot}</span>
            </h3>
            <span className="status-badge lavender">
              Active Session
            </span>
          </div>

          {latestCheckIn ? (
            <div>
              <div className="snapshot-timestamp-row">
                <Clock size={14} />
                <span>Recorded: {latestCheckIn.dateLabel}</span>
                <span>•</span>
                <span>Dominant: <strong style={{ color: '#be123c' }}>{latestCheckIn.explanation.dominantEmotion}</strong></span>
              </div>

              <div className="snapshot-quote-box">
                "{latestCheckIn.userMessage}"
              </div>

              {/* Vector Bar Snippets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
                <div>
                  <div className="mini-vector-bar-label">
                    <span>Anticipation / Pressure</span>
                    <span>{latestCheckIn.emotionVector.anticipation}%</span>
                  </div>
                  <div className="mini-vector-track">
                    <div 
                      className="mini-vector-fill"
                      style={{ width: `${latestCheckIn.emotionVector.anticipation}%`, background: '#ea580c' }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="mini-vector-bar-label">
                    <span>Fear / Apprehension</span>
                    <span>{latestCheckIn.emotionVector.fear}%</span>
                  </div>
                  <div className="mini-vector-track">
                    <div 
                      className="mini-vector-fill"
                      style={{ width: `${latestCheckIn.emotionVector.fear}%`, background: '#a855f7' }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="mini-vector-bar-label">
                    <span>Joy / Relief</span>
                    <span>{latestCheckIn.emotionVector.joy}%</span>
                  </div>
                  <div className="mini-vector-track">
                    <div 
                      className="mini-vector-fill"
                      style={{ width: `${latestCheckIn.emotionVector.joy}%`, background: '#f59e0b' }} 
                    />
                  </div>
                </div>
              </div>

              <div className="snapshot-footer-row">
                <span style={{ fontSize: '0.78rem', color: '#78716c' }}>
                  Heuristic confidence: <strong style={{ color: '#44403c' }}>{latestCheckIn.explanation.heuristicConfidence}</strong>
                </span>
                <button
                  onClick={onOpenInsights}
                  className="inspect-link-btn"
                >
                  Inspect 8D Vector <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '36px 20px', color: '#78716c' }}>
              No check-ins yet. Start one to see your emotion vector.
            </div>
          )}
        </div>

        {/* Weekly Trend Preview */}
        <div className="card-panel">
          <div className="card-header-row">
            <h3>
              <Compass size={18} color="#d97706" />
              <span>{t.dashboard.weeklyFlow}</span>
            </h3>
            <span className="status-badge amber">
              Sample 7-Day Trend
            </span>
          </div>

          <p style={{ fontSize: '0.84rem', color: '#78716c', marginBottom: '16px', lineHeight: 1.5 }}>
            Longitudinal progression across the week illustrating shifts between high anticipatory stress and restorative recovery.
          </p>

          {/* Clean Rounded Bar Graph Representation */}
          <div className="weekly-chart-bars-wrap">
            {SAMPLE_WEEKLY_TRENDS.map((item) => (
              <div key={item.day} className="weekly-bar-column">
                <div className="weekly-bars-cluster">
                  {/* Joy bar */}
                  <div 
                    title={`Joy: ${item.joy}%`}
                    className="trend-bar joy"
                    style={{ height: `${item.joy}px` }} 
                  />
                  {/* Anticipation / Stress bar */}
                  <div 
                    title={`Anticipation: ${item.anticipation}%`}
                    className="trend-bar anticipation"
                    style={{ height: `${item.anticipation}px` }} 
                  />
                  {/* Fear bar */}
                  <div 
                    title={`Fear: ${item.fear}%`}
                    className="trend-bar fear"
                    style={{ height: `${item.fear}px` }} 
                  />
                </div>
                <span className="weekly-day-label">{item.day}</span>
              </div>
            ))}
          </div>

          <div className="weekly-chart-legend-row">
            <div className="legend-items-cluster">
              <span className="legend-tag">
                <span className="legend-color-dot" style={{ background: '#f59e0b' }} /> Joy
              </span>
              <span className="legend-tag">
                <span className="legend-color-dot" style={{ background: '#ea580c' }} /> Anticipation
              </span>
              <span className="legend-tag">
                <span className="legend-color-dot" style={{ background: '#a855f7' }} /> Fear
              </span>
            </div>
            <button
              onClick={onOpenInsights}
              className="inspect-link-btn"
              style={{ color: '#e11d48' }}
            >
              Full Analytics →
            </button>
          </div>
        </div>
      </div>

      {/* Life Stage Persona Switcher Section */}
      <div className="card-panel">
        <div className="card-header-row">
          <div>
            <h3>
              <ShieldCheck size={20} color="#e11d48" />
              <span>{t.dashboard.exploreLifeStage}</span>
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#78716c', marginTop: '4px', lineHeight: 1.5 }}>
              {t.dashboard.exploreLifeStageDesc}
            </p>
          </div>
        </div>

        <div className="persona-cards-grid">
          {Object.values(PERSONAS).map(p => {
            const isSelected = currentLifeStage === p.id;
            const localizedSamplePrompt = LOCALIZED_PROMPTS[currentLanguage]?.[p.id]?.[0] || p.samplePrompts[0];
            return (
              <div
                key={p.id}
                onClick={() => onChangeLifeStage(p.id)}
                className={`persona-cohort-card ${isSelected ? 'active' : ''}`}
              >
                <div className="cohort-card-top">
                  <div className="cohort-card-icon">
                    {getPersonaIcon(p.id)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="cohort-card-name">{p.name.split(' ')[0]}</div>
                    <div className="cohort-card-age">{p.ageRange}</div>
                  </div>
                  {isSelected && (
                    <div className="cohort-check-icon">
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                </div>

                <div className="cohort-card-tagline">
                  {p.tagline}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeLifeStage(p.id);
                    onStartCheckIn(localizedSamplePrompt);
                  }}
                  className="cohort-test-prompt-btn"
                >
                  {t.dashboard.testSamplePromptBtn}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
