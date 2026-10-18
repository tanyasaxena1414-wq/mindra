import React from 'react';
import { BookOpen, Cpu, Award, ListChecks } from 'lucide-react';
import { AFFINITY_THEMES, FEATURE_TO_NEED_MAPPING, DEMO_PRESENTATION_SCRIPT } from '../data/affinityData';

export const DesignRationale: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Rubric Header Banner */}
      <div className="rubric-header-banner">
        <div className="rubric-pill">
          <Award size={14} />
          <span>FA2 Design Thinking Evaluation Guide (25 Marks Rubric)</span>
        </div>
        <h2 className="rubric-heading">
          Design Rationale, Affinity Themes & Rubric Mapping
        </h2>
        <p className="rubric-subtext">
          Explicit, verifiable evidence across all 3 rows of the FA2 Design Thinking evaluation rubric: Prototype Design & Documentation (10m), Framework Application (10m), and Working Demonstration (5m).
        </p>
      </div>

      {/* 1. Problem Statement & Need Mapping (10 Marks Rubric) */}
      <div className="card-panel">
        <div className="card-header-row">
          <h3>
            <BookOpen size={20} color="#e11d48" />
            <span>1. Problem Statement & User Need Synthesis</span>
          </h3>
          <span className="status-badge lavender">
            Rubric: Row 1 (10 Marks)
          </span>
        </div>

        <div className="rubric-quote-callout">
          <strong style={{ fontSize: '0.94rem', color: '#1c1917', display: 'block', marginBottom: '6px' }}>
            Core Problem Statement (from Project Presentation):
          </strong>
          <p style={{ fontSize: '0.88rem', color: '#44403c', lineHeight: 1.6, margin: 0 }}>
            "Individuals across diverse age cohorts experience acute emotional and cognitive distress, yet face steep barriers including prohibitive clinical therapy costs, social stigma, fear of data privacy leaks, and existing AI chatbots that rely on generic, black-box scripted responses without emotional nuance or tracking."
          </p>
        </div>

        {/* Affinity Map */}
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1c1917', marginBottom: '14px' }}>
          Affinity Map: Categorization of User Pain Points
        </h4>

        <div className="affinity-grid">
          {AFFINITY_THEMES.map((theme, i) => (
            <div 
              key={i} 
              className="affinity-theme-card"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span className={`affinity-dot ${theme.badgeColor}`} />
                <strong style={{ fontSize: '0.92rem', color: '#1c1917' }}>{theme.theme}</strong>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#78716c', marginBottom: '12px', minHeight: '90px' }}>
                <div style={{ fontWeight: 600, color: '#44403c', marginBottom: '6px' }}>Observed Pain Points:</div>
                <ul style={{ paddingLeft: '18px', margin: 0 }}>
                  {theme.painPointsFromPPT.map((pt, j) => (
                    <li key={j} style={{ marginBottom: '4px' }}>{pt}</li>
                  ))}
                </ul>
              </div>

              <div className="affinity-solution-box">
                <strong>Mindra Solution:</strong> {theme.designResponseInMindra}
              </div>
            </div>
          ))}
        </div>

        {/* Feature-to-Need Mapping Table */}
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1c1917', marginBottom: '14px', marginTop: '24px' }}>
          Feature-to-Need Traceability Matrix
        </h4>

        <div style={{ overflowX: 'auto' }}>
          <table className="rubric-table">
            <thead>
              <tr>
                <th>User Need / Pain Point</th>
                <th>Origin in PPT</th>
                <th>Prototype Implementation</th>
                <th>Demo Status</th>
              </tr>
            </thead>
            <tbody>
              {FEATURE_TO_NEED_MAPPING.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600, color: '#1c1917' }}>{row.userNeed}</td>
                  <td style={{ color: '#78716c' }}>{row.pptPainPoint}</td>
                  <td style={{ color: '#be123c', fontWeight: 600 }}>{row.feature}</td>
                  <td>
                    <span className={`status-badge ${row.status.includes('Functional') ? 'teal' : 'amber'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Framework Selection & Architecture (10 Marks Rubric) */}
      <div className="card-panel">
        <div className="card-header-row">
          <h3>
            <Cpu size={20} color="#d97706" />
            <span>2. Framework Selection & Technical Architecture Justification</span>
          </h3>
          <span className="status-badge lavender">
            Rubric: Row 2 (10 Marks)
          </span>
        </div>

        <div className="framework-cards-grid">
          <div className="framework-card">
            <strong className="framework-card-title">
              ⚡ React 19 + TypeScript + Vite
            </strong>
            <p className="framework-card-desc">
              Chosen for instantaneous bundling, strict type-safety across complex emotion vector shapes, zero runtime overhead, and clean modular component breakdown.
            </p>
          </div>

          <div className="framework-card">
            <strong className="framework-card-title">
              📐 Custom Vector SVG Radar Engine
            </strong>
            <p className="framework-card-desc">
              Built directly via standard SVG trigonometry rather than heavy third-party canvas wrappers. Ensures 100% responsiveness, zero layout shifts, crisp rendering, and accessible text alternatives.
            </p>
          </div>

          <div className="framework-card">
            <strong className="framework-card-title">
              🔒 Offline-First Local Engine (Zero API Keys)
            </strong>
            <p className="framework-card-desc">
              Operates 100% deterministically in-memory. Guarantees that the presentation will never crash due to network drops, third-party API rate limits, or expired tokens, while maintaining the privacy promise.
            </p>
          </div>
        </div>

        {/* Implemented vs Simulated vs Future Work */}
        <div className="disclosure-box">
          <strong style={{ fontSize: '0.9rem', color: '#1c1917', display: 'block', marginBottom: '10px' }}>
            Clear Academic Disclosure: Implemented vs. Simulated vs. Future Roadmap
          </strong>
          <div className="disclosure-columns-grid">
            <div>
              <span className="disclosure-header implemented">✅ Fully Functional:</span>
              <ul className="disclosure-list">
                <li>Plutchik 8D Vector computation & shift dynamics</li>
                <li>Persona-adaptive conversational tone (5 age cohorts)</li>
                <li>Explainable AI "Why this response?" rationale</li>
                <li>Context-aware follow-ups & intent classification</li>
                <li>Longitudinal 7-day trend tracker</li>
                <li>4-4-4 Box breathing visualizer & 5-4-3-2-1 grounding</li>
                <li>Deterministic crisis safety intercept</li>
              </ul>
            </div>
            <div>
              <span className="disclosure-header simulated">🟡 Simulated (FA2 Concept):</span>
              <ul className="disclosure-list">
                <li>Acoustic/voice pitch variance toggle</li>
                <li>Regional Hindi/Marathi sample responses</li>
                <li>Seeded weekly progression data points</li>
              </ul>
            </div>
            <div>
              <span className="disclosure-header roadmap">🚀 Future Engineering:</span>
              <ul className="disclosure-list">
                <li>End-to-end WebRTC audio pipeline</li>
                <li>On-device quantized transformer model</li>
                <li>Encrypted biometric sync (Apple Health/Fit)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 60-90 Second Poster Presentation Script & Q&A Prep (5 Marks) */}
      <div className="card-panel">
        <div className="card-header-row">
          <h3>
            <ListChecks size={20} color="#e11d48" />
            <span>3. 60–90 Second Poster Presentation Script & Q&A Preparation</span>
          </h3>
          <span className="status-badge teal">
            Rubric: Row 3 (5 Marks)
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '22px' }}>
          {DEMO_PRESENTATION_SCRIPT.map((item, idx) => (
            <div key={idx} className="demo-script-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span className="demo-script-phase">{item.phase}</span>
                <span className="demo-script-time">{item.time}</span>
              </div>
              <p className="demo-script-text">
                "{item.script}"
              </p>
            </div>
          ))}
        </div>

        {/* Evaluator Q&A Cheat Sheet */}
        <h4 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#1c1917', marginBottom: '12px' }}>
          Frequently Asked Questions by Evaluators:
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="faq-card">
            <strong className="faq-question">
              Q: "How does Mindra protect user privacy compared to commercial LLMs?"
            </strong>
            <p className="faq-answer">
              <strong>Answer:</strong> Mindra processes emotion vectors locally in the browser session. No raw psychological text is sent to third-party servers or stored persistently, eliminating the risk of data leaks or ad profile harvesting.
            </p>
          </div>

          <div className="faq-card">
            <strong className="faq-question">
              Q: "What happens if a user expresses suicidal thoughts?"
            </strong>
            <p className="faq-answer">
              <strong>Answer:</strong> Mindra halts conversational coaching immediately. It activates the Crisis Safety Intercept and displays verified, toll-free Indian mental health helplines (Tele-MANAS 14416 and 112) without claiming to provide emergency psychiatric intervention.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
