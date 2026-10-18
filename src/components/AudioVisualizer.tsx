import React, { useRef, useEffect } from 'react';

interface AudioVisualizerProps {
  frequencyData?: Uint8Array | null;
  volume?: number;
  isActive: boolean;
  width?: number;
  height?: number;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  frequencyData,
  volume = 0,
  isActive,
  width = 240,
  height = 48
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const phaseRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const barCount = 28;
    const barWidth = Math.max(3, (width - (barCount - 1) * 3) / barCount);
    const gap = 3;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isActive && frequencyData && frequencyData.length > 0) {
        // Active microphone audio visualization with gradient bars
        const step = Math.floor(frequencyData.length / barCount);

        for (let i = 0; i < barCount; i++) {
          const rawValue = frequencyData[i * step] || 0;
          // Apply gentle smoothing & boost low voices
          const normalized = Math.min(1, Math.max(0.08, (rawValue / 255) * 1.35 + (volume * 0.4)));
          const barHeight = Math.max(4, normalized * (height - 6));
          const x = i * (barWidth + gap);
          const y = (height - barHeight) / 2;

          // Gradient from Teal to Lavender
          const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
          // Left to right color transition: Teal -> Lavender -> Amber
          const ratio = i / barCount;
          if (ratio < 0.5) {
            gradient.addColorStop(0, '#0d9488'); // Teal
            gradient.addColorStop(1, '#a855f7'); // Lavender
          } else {
            gradient.addColorStop(0, '#9333ea'); // Lavender-purple
            gradient.addColorStop(1, '#e11d48'); // Rose
          }

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, 3);
          ctx.fill();
        }
      } else if (isActive) {
        // Active recording but no frequency stream yet (simulated gentle pulse wave)
        phaseRef.current += 0.08;
        for (let i = 0; i < barCount; i++) {
          const sine = Math.sin(phaseRef.current + i * 0.35);
          const normalized = 0.25 + 0.35 * Math.abs(sine);
          const barHeight = Math.max(6, normalized * (height - 8));
          const x = i * (barWidth + gap);
          const y = (height - barHeight) / 2;

          const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
          gradient.addColorStop(0, '#0d9488');
          gradient.addColorStop(1, '#a855f7');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, 3);
          ctx.fill();
        }
      } else {
        // Idle state: Subtle flat baseline dots
        for (let i = 0; i < barCount; i++) {
          const x = i * (barWidth + gap);
          const y = (height - 4) / 2;
          ctx.fillStyle = '#E2D3CC';
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, 4, 2);
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, frequencyData, volume, width, height]);

  return (
    <div className="audio-visualizer-container" style={{ width, height }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="audio-visualizer-canvas"
        role="img"
        aria-label="Real-time voice waveform audio visualizer"
      />
    </div>
  );
};
