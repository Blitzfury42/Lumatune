import React, { useRef, useEffect, useCallback } from 'react';
import { AudioEngine } from '../engine/AudioEngine';
import { THEME } from '../styles/theme';

type VizMode = 'bars' | 'wave' | 'circle';

interface VisualizerProps {
  engine: AudioEngine | null;
  mode: VizMode;
  onModeChange: () => void;
}

const MODE_LABELS: Record<VizMode, string> = {
  bars: '▦ Barres',
  wave: '〜 Onde',
  circle: '◉ Cercle',
};

const Visualizer: React.FC<VisualizerProps> = ({ engine, mode, onModeChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const drawBars = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, data: Uint8Array) => {
    const barCount = 80;
    const step = Math.floor(data.length / barCount);
    const barW = w / barCount;

    // Subtle grid
    ctx.strokeStyle = 'rgba(0, 100, 200, 0.08)';
    ctx.lineWidth = 0.5;
    for (let g = 0; g < 4; g++) {
      const y = (h / 4) * g;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    for (let i = 0; i < barCount; i++) {
      const val = data[i * step] / 255;
      const bh = val * h * 0.9;
      const x = i * barW;
      const y = h - bh;

      const grad = ctx.createLinearGradient(0, y, 0, h);
      grad.addColorStop(0, `rgba(0, 200, 255, ${0.6 + val * 0.4})`);
      grad.addColorStop(1, `rgba(0, 80, 255, ${0.3 + val * 0.3})`);

      const radius = Math.min(barW * 0.35, 4);
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + barW - radius - 1, y);
      ctx.quadraticCurveTo(x + barW - 1, y, x + barW - 1, y + radius);
      ctx.lineTo(x + barW - 1, h);
      ctx.lineTo(x, h);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();

      ctx.shadowColor = `rgba(0, 180, 255, ${val * 0.8})`;
      ctx.shadowBlur = val * 20;
      ctx.fillStyle = grad;
      ctx.fill();

      // Reflection
      const refGrad = ctx.createLinearGradient(0, h, 0, h + bh * 0.3);
      refGrad.addColorStop(0, `rgba(0, 200, 255, ${val * 0.25})`);
      refGrad.addColorStop(1, 'transparent');
      ctx.shadowBlur = 0;
      ctx.fillStyle = refGrad;
      ctx.fillRect(x, h, barW - 1, bh * 0.3);
    }
    ctx.shadowBlur = 0;
  }, []);

  const drawWave = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, data: Uint8Array) => {
    const mid = h / 2;
    const step = w / data.length;

    // Fill under curve
    ctx.beginPath();
    ctx.moveTo(0, mid);
    for (let i = 0; i < data.length; i++) {
      const y = ((data[i] - 128) / 128) * mid + mid;
      ctx.lineTo(i * step, y);
    }
    ctx.lineTo(w, mid);
    ctx.closePath();
    const fillGrad = ctx.createLinearGradient(0, 0, 0, h);
    fillGrad.addColorStop(0, 'rgba(0, 170, 255, 0.25)');
    fillGrad.addColorStop(1, 'rgba(0, 50, 255, 0.05)');
    ctx.fillStyle = fillGrad;
    ctx.fill();

    // Glow line (secondary)
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const y = ((data[i] - 128) / 128) * mid + mid;
      if (i === 0) ctx.moveTo(0, y);
      else ctx.lineTo(i * step, y);
    }
    ctx.strokeStyle = 'rgba(0, 200, 255, 0.2)';
    ctx.lineWidth = 4;
    ctx.shadowColor = 'rgba(0, 200, 255, 0.6)';
    ctx.shadowBlur = 16;
    ctx.stroke();

    // Main line
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const y = ((data[i] - 128) / 128) * mid + mid;
      if (i === 0) ctx.moveTo(0, y);
      else ctx.lineTo(i * step, y);
    }
    ctx.strokeStyle = 'rgba(0, 220, 255, 0.95)';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }, []);

  const drawCircle = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, data: Uint8Array) => {
    const cx = w / 2;
    const cy = h / 2;
    const baseR = Math.min(w, h) * 0.28;
    const step = (Math.PI * 2) / data.length;

    // Ring 1 (filled, glow)
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const val = data[i] / 255;
      const r = baseR + val * baseR * 0.5;
      const angle = i * step - Math.PI / 2;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(0, 200, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(0, 200, 255, 0.6)';
    ctx.shadowBlur = 20;
    ctx.stroke();

    // Ring 2 (glow)
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const val = data[i] / 255;
      const r = baseR + val * baseR * 0.5;
      const angle = i * step - Math.PI / 2;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(0, 150, 255, 0.3)';
    ctx.lineWidth = 6;
    ctx.shadowColor = 'rgba(0, 150, 255, 0.5)';
    ctx.shadowBlur = 30;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Center pulsing gradient
    const avgVal = Array.from(data).reduce((a, b) => a + b, 0) / data.length / 255;
    const innerR = baseR * (0.3 + avgVal * 0.3);
    const innerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, innerR);
    innerGrad.addColorStop(0, `rgba(0, 200, 255, ${0.4 + avgVal * 0.4})`);
    innerGrad.addColorStop(0.5, `rgba(0, 100, 255, ${0.2 + avgVal * 0.2})`);
    innerGrad.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.fillStyle = innerGrad;
    ctx.fill();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!engine) {
        animRef.current = requestAnimationFrame(loop);
        return;
      }

      if (mode === 'bars') {
        const data = engine.getFrequencyData();
        drawBars(ctx, canvas.width, canvas.height, data);
      } else if (mode === 'wave') {
        const data = engine.getWaveformData();
        drawWave(ctx, canvas.width, canvas.height, data);
      } else {
        const data = engine.getFrequencyData();
        drawCircle(ctx, canvas.width, canvas.height, data);
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [engine, mode, drawBars, drawWave, drawCircle]);

  return (
    <div
      style={{
        background: 'rgba(5, 12, 30, 0.8)',
        borderRadius: THEME.radius.lg,
        border: `1px solid ${THEME.border.subtle}`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <canvas
        ref={canvasRef}
        width={960}
        height={240}
        style={{ display: 'block', width: '100%', height: '200px' }}
      />
      <div
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
        }}
      >
        <button
          onClick={onModeChange}
          style={{
            padding: '6px 14px',
            borderRadius: THEME.radius.full,
            border: `1px solid ${THEME.border.default}`,
            background: 'rgba(0, 20, 60, 0.8)',
            color: THEME.accent.secondary,
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: THEME.font,
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0, 136, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0, 20, 60, 0.8)';
          }}
        >
          {MODE_LABELS[mode]}
        </button>
      </div>
    </div>
  );
};

export default Visualizer;
