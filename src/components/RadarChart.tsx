import React, { useState } from 'react';
import type { EmotionVector } from '../types';

interface RadarChartProps {
  vector: EmotionVector;
  size?: number;
  showLabels?: boolean;
}

const EMOTION_CONFIG: { key: keyof EmotionVector; label: string; color: string; desc: string; emoji: string }[] = [
  { key: 'joy', label: 'Joy', color: '#f59e0b', desc: 'Serenity, satisfaction, gratitude', emoji: '✨' },
  { key: 'trust', label: 'Trust', color: '#fb7185', desc: 'Acceptance, safety, alignment', emoji: '🤝' },
  { key: 'fear', label: 'Fear', color: '#a855f7', desc: 'Apprehension, anxiety, dread', emoji: '🛡️' },
  { key: 'surprise', label: 'Surprise', color: '#f97316', desc: 'Uncertainty, novelty, distraction', emoji: '⚡' },
  { key: 'sadness', label: 'Sadness', color: '#818cf8', desc: 'Grief, fatigue, loneliness', emoji: '🌧️' },
  { key: 'disgust', label: 'Disgust', color: '#d97706', desc: 'Aversion, friction, critique', emoji: '🍂' },
  { key: 'anger', label: 'Anger', color: '#e11d48', desc: 'Frustration, perceived unfairness', emoji: '🔥' },
  { key: 'anticipation', label: 'Anticipation', color: '#ea580c', desc: 'Vigilance, future focus, urgency', emoji: '⏳' },
];

export const RadarChart: React.FC<RadarChartProps> = ({ vector, size = 360, showLabels = true }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const center = size / 2;
  const radius = (size / 2) - 48;
  const totalAxes = EMOTION_CONFIG.length;
  const angleStep = (Math.PI * 2) / totalAxes;

  // Concentric levels
  const levels = [0.25, 0.5, 0.75, 1.0];

  // Helper to get point coordinates
  const getPointCoordinates = (index: number, valueRatio: number) => {
    // Start at top (-PI/2)
    const angle = (index * angleStep) - (Math.PI / 2);
    const r = radius * valueRatio;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      angle
    };
  };

  // Generate radar polygon points
  const polygonPoints = EMOTION_CONFIG.map((item, index) => {
    const value = vector[item.key] || 0;
    const ratio = Math.max(0.1, value / 100);
    const pt = getPointCoordinates(index, ratio);
    return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
  }).join(' ');

  return (
    <div className="radar-chart-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <svg
        width="100%"
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="radar-svg"
        role="img"
        aria-label="Plutchik 8-Dimensional Emotion Vector Radar Visualization"
      >
        <defs>
          {/* Sunset Rose Quartz & Golden Amber Radial Gradient */}
          <radialGradient id="radarFillGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.48" />
            <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.36" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.14" />
          </radialGradient>
          <linearGradient id="polygonStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="48%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
          <filter id="radarGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#e11d48" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Concentric grid rings */}
        {levels.map((lvl, lvlIdx) => {
          const ringPoints = EMOTION_CONFIG.map((_, i) => {
            const pt = getPointCoordinates(i, lvl);
            return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
          }).join(' ');

          return (
            <g key={`ring-${lvlIdx}`}>
              <polygon
                points={ringPoints}
                fill={lvl === 1.0 ? "rgba(255, 248, 245, 0.6)" : "none"}
                stroke="#ead2c9"
                strokeWidth={lvl === 1.0 ? "1.5" : "1"}
                strokeDasharray={lvl === 1.0 ? undefined : "3 3"}
                opacity={0.85}
              />
              <text
                x={center + 5}
                y={center - (radius * lvl) - 4}
                fill="#ba9e95"
                fontSize="9"
                fontWeight="600"
              >
                {Math.round(lvl * 100)}%
              </text>
            </g>
          );
        })}

        {/* Radial axes */}
        {EMOTION_CONFIG.map((item, idx) => {
          const outerPt = getPointCoordinates(idx, 1.0);
          return (
            <line
              key={`axis-${item.key}`}
              x1={center}
              y1={center}
              x2={outerPt.x}
              y2={outerPt.y}
              stroke="#e7e2d8"
              strokeWidth="1.2"
            />
          );
        })}

        {/* Radar filled polygon */}
        <polygon
          points={polygonPoints}
          fill="url(#radarFillGrad)"
          stroke="url(#polygonStrokeGrad)"
          strokeWidth="2.5"
          filter="url(#radarGlow)"
          className="radar-active-polygon"
          style={{ transition: 'all 0.4s ease' }}
        />

        {/* Vertex points and interaction dots */}
        {EMOTION_CONFIG.map((item, idx) => {
          const value = vector[item.key] || 0;
          const ratio = Math.max(0.1, value / 100);
          const pt = getPointCoordinates(idx, ratio);
          const isHovered = hoveredIdx === idx;

          return (
            <g
              key={`vertex-${item.key}`}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {isHovered && (
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="12"
                  fill={item.color}
                  fillOpacity="0.25"
                  className="pulsing-vertex-ring"
                />
              )}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? 7 : 5}
                fill={item.color}
                stroke="#ffffff"
                strokeWidth="2.5"
                style={{ transition: 'all 0.2s ease' }}
              />
              {/* Value label on vertex */}
              <text
                x={pt.x}
                y={pt.y - 10}
                fill="#26140e"
                fontSize="10"
                fontWeight="800"
                textAnchor="middle"
              >
                {value}%
              </text>
            </g>
          );
        })}

        {/* Perimeter Axis Labels */}
        {showLabels && EMOTION_CONFIG.map((item, idx) => {
          const outerPt = getPointCoordinates(idx, 1.18);
          const angle = (idx * angleStep) - (Math.PI / 2);
          
          let textAnchor: 'start' | 'end' | 'middle' = 'middle';
          if (Math.cos(angle) > 0.3) textAnchor = 'start';
          else if (Math.cos(angle) < -0.3) textAnchor = 'end';

          const isHovered = hoveredIdx === idx;

          return (
            <g
              key={`label-${item.key}`}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <text
                x={outerPt.x}
                y={outerPt.y + 4}
                fill={isHovered ? item.color : '#523a31'}
                fontSize="11"
                fontWeight={isHovered ? '800' : '600'}
                textAnchor={textAnchor}
                style={{ transition: 'fill 0.2s ease', letterSpacing: '0.01em' }}
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Hover Info Tooltip */}
      {hoveredIdx !== null ? (
        <div className="radar-tooltip-badge">
          <span className="tooltip-dot" style={{ backgroundColor: EMOTION_CONFIG[hoveredIdx].color }} />
          <strong>{EMOTION_CONFIG[hoveredIdx].label}:</strong> {vector[EMOTION_CONFIG[hoveredIdx].key]}%
          <span className="tooltip-sub">({EMOTION_CONFIG[hoveredIdx].desc})</span>
        </div>
      ) : (
        <div className="radar-tooltip-hint">
          <span>💡 Hover over axes or nodes to inspect Plutchik dimension definitions</span>
        </div>
      )}
    </div>
  );
};
