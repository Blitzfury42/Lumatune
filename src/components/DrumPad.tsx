import React, { useState, useEffect, useCallback } from 'react';
import { AudioEngine } from '../engine/AudioEngine';
import { THEME } from '../styles/theme';

interface DrumPadProps {
  engine: AudioEngine | null;
}

const PADS = [
  { id: 'kick', emoji: '🥁', label: 'Kick', key: '1', color: '#ff4400' },
  { id: 'snare', emoji: '🪘', label: 'Snare', key: '2', color: '#ff8800' },
  { id: 'hihat', emoji: '🎩', label: 'Hi-Hat', key: '3', color: '#00aaff' },
  { id: 'openHH', emoji: '🎶', label: 'Open HH', key: '4', color: '#00ccff' },
  { id: 'clap', emoji: '👏', label: 'Clap', key: '5', color: '#aa66ff' },
];

const DrumPad: React.FC<DrumPadProps> = ({ engine }) => {
  const [activePads, setActivePads] = useState<Set<string>>(new Set());

  const triggerPad = useCallback((id: string) => {
    if (!engine) return;
    switch (id) {
      case 'kick': engine.playKick(); break;
      case 'snare': engine.playSnare(); break;
      case 'hihat': engine.playHihat(false); break;
      case 'openHH': engine.playHihat(true); break;
      case 'clap': engine.playClap(); break;
    }
    setActivePads((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setActivePads((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 150);
  }, [engine]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const pad = PADS.find((p) => p.key === e.key);
      if (pad) triggerPad(pad.id);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [triggerPad]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
        gap: '12px',
      }}
    >
      {PADS.map((pad) => {
        const active = activePads.has(pad.id);
        return (
          <button
            key={pad.id}
            onMouseDown={() => triggerPad(pad.id)}
            onTouchStart={(e) => { e.preventDefault(); triggerPad(pad.id); }}
            style={{
              padding: '16px 8px',
              borderRadius: THEME.radius.lg,
              border: `2px solid ${active ? pad.color : 'rgba(0, 100, 200, 0.2)'}`,
              background: active
                ? `rgba(${hexToRgb(pad.color)}, 0.25)`
                : 'rgba(0, 20, 60, 0.6)',
              color: active ? '#fff' : THEME.text.secondary,
              cursor: 'pointer',
              fontFamily: THEME.font,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.08s ease',
              transform: active ? 'scale(0.95)' : 'scale(1)',
              boxShadow: active
                ? `0 0 20px rgba(${hexToRgb(pad.color)}, 0.5)`
                : '0 2px 8px rgba(0,0,0,0.4)',
              userSelect: 'none',
            }}
          >
            <span style={{ fontSize: '28px' }}>{pad.emoji}</span>
            <span style={{ fontSize: '12px', fontWeight: 700 }}>{pad.label}</span>
            <span
              style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: THEME.radius.full,
                background: active
                  ? `rgba(${hexToRgb(pad.color)}, 0.4)`
                  : 'rgba(0, 100, 200, 0.2)',
                color: active ? '#fff' : THEME.text.muted,
                fontWeight: 700,
              }}
            >
              [{pad.key}]
            </span>
          </button>
        );
      })}
    </div>
  );
};

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

export default DrumPad;
