import React, { useState } from 'react';
import { Sparkles, HeartHandshake, PhoneCall, RotateCcw, ShieldCheck, GraduationCap, Briefcase, Building2, Smile, ChevronDown, Check } from 'lucide-react';
import type { LifeStage, LanguageCode, TonePreference } from '../types';
import { PERSONAS } from '../data/personas';
import { TRANSLATIONS } from '../data/translations';

interface AppShellProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currentLifeStage: LifeStage;
  onChangeLifeStage: (stage: LifeStage) => void;
  currentLanguage: LanguageCode;
  onChangeLanguage: (lang: LanguageCode) => void;
  currentTone: TonePreference;
  onChangeTone: (tone: TonePreference) => void;
  onResetDemo: () => void;
  onOpenUrgentHelp: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentTab,
  onSelectTab,
  currentLifeStage,
  onChangeLifeStage,
  currentLanguage,
  onChangeLanguage,
  onResetDemo,
  onOpenUrgentHelp,
  children
}) => {
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const activePersona = PERSONAS[currentLifeStage] || PERSONAS.student;
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const getPersonaIcon = (stage: LifeStage) => {
    switch (stage) {
      case 'student': return <GraduationCap size={16} />;
      case 'young_adult': return <Briefcase size={16} />;
      case 'working_adult': return <Building2 size={16} />;
      case 'middle_aged': return <HeartHandshake size={16} />;
      case 'senior': return <Smile size={16} />;
    }
  };

  return (
    <div className="app-container">
      {/* Top Banner */}
      <div className="top-announcement">
        <span className="badge-pill">FA2 Design Thinking</span>
        <span>{t.topBanner}</span>
        <span className="top-banner-sub">• {t.inMemorySession}</span>
      </div>

      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="brand-section" onClick={() => onSelectTab('dashboard')}>
            <div className="brand-logo-icon">
              <Sparkles size={22} />
            </div>
            <div className="brand-titles">
              <div className="brand-name-row">
                <h1>Mindra</h1>
                <span className="brand-version-badge">
                  {currentLanguage === 'en' ? 'Wellness AI' : currentLanguage === 'hi' ? 'कल्याण AI' : 'आरोग्य AI'}
                </span>
              </div>
              <p className="brand-tagline">{t.brandTagline}</p>
            </div>
          </div>

          <div className="header-controls">
            {/* Persona Switcher Pill */}
            <div style={{ position: 'relative' }}>
              <button 
                className="persona-selector-pill" 
                onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                aria-label="Select Life Stage Persona"
              >
                <span className="persona-pill-icon">{getPersonaIcon(currentLifeStage)}</span>
                <span className="persona-pill-name">{activePersona.name}</span>
                <ChevronDown size={14} style={{ opacity: 0.7 }} />
              </button>

              {showPersonaMenu && (
                <div className="persona-dropdown-menu">
                  <div className="dropdown-menu-header">
                    SELECT LIFE-STAGE ADAPTATION
                  </div>
                  {Object.values(PERSONAS).map(p => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onChangeLifeStage(p.id);
                        setShowPersonaMenu(false);
                      }}
                      className={`dropdown-menu-item ${currentLifeStage === p.id ? 'active' : ''}`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span className="dropdown-item-icon">{getPersonaIcon(p.id)}</span>
                        <div>
                          <div className="dropdown-item-title">{p.name}</div>
                          <div className="dropdown-item-sub">{p.ageRange} • {p.preferredTone} tone</div>
                        </div>
                      </div>
                      {currentLifeStage === p.id && <Check size={16} color="#e11d48" />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="lang-selector-group">
              <button 
                className={`lang-btn ${currentLanguage === 'en' ? 'active' : ''}`}
                onClick={() => onChangeLanguage('en')}
              >
                English
              </button>
              <button 
                className={`lang-btn ${currentLanguage === 'hi' ? 'active' : ''}`}
                onClick={() => onChangeLanguage('hi')}
                title="Hindi Interface Preview"
              >
                हिंदी
              </button>
              <button 
                className={`lang-btn ${currentLanguage === 'mr' ? 'active' : ''}`}
                onClick={() => onChangeLanguage('mr')}
                title="Marathi Interface Preview"
              >
                मराठी
              </button>
            </div>

            {/* Urgent Help Button */}
            <button 
              className="urgent-help-btn"
              onClick={onOpenUrgentHelp}
              aria-label="Need urgent help"
            >
              <PhoneCall size={14} />
              <span>{t.urgentHelpBtn}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div className="nav-container">
          <button 
            className={`nav-tab-btn ${currentTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => onSelectTab('dashboard')}
          >
            {t.navTabs.dashboard}
          </button>
          <button 
            className={`nav-tab-btn ${currentTab === 'checkin' ? 'active' : ''}`}
            onClick={() => onSelectTab('checkin')}
          >
            {t.navTabs.checkin}
          </button>
          <button 
            className={`nav-tab-btn ${currentTab === 'insights' ? 'active' : ''}`}
            onClick={() => onSelectTab('insights')}
          >
            {t.navTabs.insights}
          </button>
          <button 
            className={`nav-tab-btn ${currentTab === 'wellness' ? 'active' : ''}`}
            onClick={() => onSelectTab('wellness')}
          >
            {t.navTabs.wellness}
          </button>
          <button 
            className={`nav-tab-btn ${currentTab === 'support' ? 'active' : ''}`}
            onClick={() => onSelectTab('support')}
          >
            {t.navTabs.support}
          </button>
          <button 
            className={`nav-tab-btn ${currentTab === 'design-rationale' ? 'active' : ''}`}
            onClick={() => onSelectTab('design-rationale')}
          >
            {t.navTabs.rationale}
            <span className="nav-badge-rubric">FA2 Guide</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-wrapper">
        {/* Medical & Privacy Disclaimers */}
        <div className="disclaimer-card">
          <div className="disclaimer-text">
            <ShieldCheck size={18} color="#e11d48" style={{ flexShrink: 0 }} />
            <span>
              {t.disclaimerText}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span className="disclaimer-tag">🔒 {t.inMemorySession}</span>
            <button 
              onClick={onResetDemo}
              className="reset-demo-btn"
              title="Reset all demo session check-ins to initial state"
            >
              <RotateCcw size={12} />
              <span>{t.resetDemoBtn}</span>
            </button>
          </div>
        </div>

        {children}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <div>
            <strong>Mindra</strong> — FA2 Design Thinking Project • Based on Robert Plutchik’s 8D Emotion Vectors & Explainable AI
          </div>
          <div className="footer-links">
            <span>Verified 24/7 Helpline: <strong>Tele-MANAS (14416)</strong></span>
            <span>•</span>
            <span>Illustrative Estimates / Demo Data Only</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
