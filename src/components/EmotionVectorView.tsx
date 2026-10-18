import React, { useState } from 'react';
import { BarChart2, Compass, Calendar, Filter, Sparkles, Info } from 'lucide-react';
import type { EmotionVector, CheckInEntry, LifeStage } from '../types';
import { RadarChart } from './RadarChart';

interface EmotionVectorViewProps {
  checkIns: CheckInEntry[];
  currentLifeStage?: LifeStage;
}

export const EmotionVectorView: React.FC<EmotionVectorViewProps> = ({ checkIns }) => {
  const [selectedCheckInId, setSelectedCheckInId] = useState<string>(checkIns[0]?.id || '');
  const [filterStage, setFilterStage] = useState<string>('all');

  const filteredCheckIns = filterStage === 'all'
    ? checkIns
    : checkIns.filter(c => c.lifeStage === filterStage);

  const activeEntry = checkIns.find(c => c.id === selectedCheckInId) || checkIns[0];

  const emotionDimensions: { key: keyof EmotionVector; label: string; color: string; desc: string; category: string }[] = [
    { key: 'joy', label: 'Joy', color: '#f59e0b', desc: 'Serenity, contentment, emotional warmth', category: 'Positive Resonance' },
    { key: 'trust', label: 'Trust', color: '#fb7185', desc: 'Acceptance, psychological safety, connection', category: 'Relational Safety' },
    { key: 'fear', label: 'Fear', color: '#a855f7', desc: 'Apprehension, exam/deadline dread, worry', category: 'Acute Threat Response' },
    { key: 'surprise', label: 'Surprise', color: '#f97316', desc: 'Uncertainty, unexpected transitions, novelty', category: 'Cognitive Disruption' },
    { key: 'sadness', label: 'Sadness', color: '#818cf8', desc: 'Fatigue, loneliness, emotional heaviness', category: 'Energy Conservation' },
    { key: 'disgust', label: 'Disgust', color: '#d97706', desc: 'Aversion, bitterness, boundary violation', category: 'Protective Rejection' },
    { key: 'anger', label: 'Anger', color: '#e11d48', desc: 'Frustration, perceived unfairness, irritability', category: 'Mobilizing Energy' },
    { key: 'anticipation', label: 'Anticipation', color: '#ea580c', desc: 'Forward-looking vigilance, urgency, pressure', category: 'Future Focus' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Title & Heuristic Banner */}
      <div className="insights-header-banner">
        <div>
          <div className="section-pre-title">
            <Sparkles size={14} color="#e11d48" />
            <span>PSYCHOEVOLUTIONARY TAXONOMY</span>
          </div>
          <h2 className="section-main-heading">
            Emotion Vector Analysis & Longitudinal Trends
          </h2>
          <p className="section-subtitle">
            Multi-dimensional emotional mapping based on Robert Plutchik’s psychoevolutionary model of primary emotions.
          </p>
        </div>

        <div className="heuristic-pill-badge">
          ⚠️ Illustrative Estimates / Demo Data Only
        </div>
      </div>

      {/* Main 2-Column: Radar + Bar Breakdown */}
      <div className="insights-grid-2col">
        
        {/* Radar Chart View */}
        <div className="card-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="card-header-row" style={{ width: '100%' }}>
            <h3>
              <Compass size={18} color="#e11d48" />
              <span>8-Dimensional Radar Topology</span>
            </h3>
            <span className="status-badge teal">
              {activeEntry ? activeEntry.dateLabel : 'No Data'}
            </span>
          </div>

          {activeEntry ? (
            <RadarChart vector={activeEntry.emotionVector} size={350} />
          ) : (
            <div style={{ padding: '60px', color: '#ba9e95' }}>No check-in selected.</div>
          )}

          <div className="radar-footer-note">
            Polygon volume illustrates emotional intensity; symmetry reflects emotional balance versus acute situational spikes.
          </div>
        </div>

        {/* Linear Vector Dimension Breakdown */}
        <div className="card-panel">
          <div className="card-header-row">
            <h3>
              <BarChart2 size={18} color="#d97706" />
              <span>Dimension Intensity Breakdown</span>
            </h3>
            <span style={{ fontSize: '0.74rem', color: '#78716c', fontWeight: 600 }}>
              Scale: 0 to 100%
            </span>
          </div>

          {activeEntry && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {emotionDimensions.map(dim => {
                const val = activeEntry.emotionVector[dim.key] || 0;
                return (
                  <div key={dim.key} className="dimension-bar-item">
                    <div className="dimension-bar-meta">
                      <span className="dimension-title-group">
                        <span className="dim-color-bullet" style={{ background: dim.color }} />
                        <span className="dim-name">{dim.label}</span>
                        <span className="dim-desc">({dim.desc})</span>
                      </span>
                      <span className="dim-val-text">{val}%</span>
                    </div>

                    <div className="dimension-track">
                      <div
                        className="dimension-fill"
                        style={{
                          width: `${val}%`,
                          background: dim.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Longitudinal 7-Day Trend Chart & History Table */}
      <div className="card-panel">
        <div className="card-header-row">
          <div>
            <h3>
              <Calendar size={18} color="#e11d48" />
              <span>Session Check-In History & Longitudinal Progression</span>
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#78716c', marginTop: '4px' }}>
              Select any past check-in below to load its 8-dimensional radar topology and conversational explanation above.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Filter size={14} color="#78716c" />
            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Life Stages</option>
              <option value="student">Students</option>
              <option value="young_adult">Young Adults</option>
              <option value="working_adult">Working Adults</option>
              <option value="middle_aged">Middle Aged</option>
              <option value="senior">Seniors</option>
            </select>
          </div>
        </div>

        {/* Longitudinal History List */}
        <div className="history-entries-list">
          {filteredCheckIns.map(item => {
            const isSelected = item.id === (activeEntry?.id || '');
            return (
              <div
                key={item.id}
                onClick={() => setSelectedCheckInId(item.id)}
                className={`history-entry-card ${isSelected ? 'selected' : ''}`}
              >
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div className="history-entry-meta">
                    <span className="history-date-label">
                      {item.dateLabel}
                    </span>
                    <span className="history-cohort-badge">
                      {item.lifeStage.replace('_', ' ')}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: '#78716c' }}>
                      Dominant: <strong style={{ color: '#0f766e' }}>{item.explanation.dominantEmotion}</strong>
                    </span>
                  </div>
                  <div className="history-user-msg">
                    "{item.userMessage}"
                  </div>
                </div>

                <div className="history-right-stats">
                  <div className="history-mini-scores">
                    <div>Joy: <strong style={{ color: '#10b981' }}>{item.emotionVector.joy}%</strong></div>
                    <div>Fear: <strong style={{ color: '#8b5cf6' }}>{item.emotionVector.fear}%</strong></div>
                    <div>Anticipation: <strong style={{ color: '#14b8a6' }}>{item.emotionVector.anticipation}%</strong></div>
                  </div>
                  <div className={`history-inspect-indicator ${isSelected ? 'active' : ''}`}>
                    {isSelected ? '● Inspected' : 'Inspect →'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Text Alternative for Accessibility */}
        <div className="accessibility-note-box">
          <Info size={16} color="#0d9488" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Accessible Screen-Reader Table Alternative:</strong> The 8-dimensional emotion vector maps Robert Plutchik’s emotion model evaluated via local semantic heuristics. The current selected record shows highest intensity on {activeEntry?.explanation.dominantEmotion} ({activeEntry?.emotionVector[activeEntry?.explanation.dominantEmotion.toLowerCase() as keyof EmotionVector] || 0}%) followed by {activeEntry?.explanation.secondaryEmotion}. All figures are illustrative demo heuristics without medical diagnostic validity.
          </div>
        </div>
      </div>
    </div>
  );
};
