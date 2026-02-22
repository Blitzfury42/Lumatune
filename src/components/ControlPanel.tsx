import React from 'react';
import { THEME } from '../styles/theme';
import { GlobalStyles } from '../styles/GlobalStyles';
import { WaveType } from '../engine/AudioEngine';

interface ControlPanelProps {
  waveType: WaveType;
  volume: number;
  reverb: number;
  onWaveChange: (w: WaveType) => void;
  onVolumeChange: (v: number) => void;
  onReverbChange: (v: number) => void;
}

const WAVE_OPTIONS: { type: WaveType; emoji: string; label: string; desc: string }[] = [
  { type: 'sine', emoji: '〜', label: 'Sine', desc: 'Doux & pur' },
  { type: 'square', emoji: '⊓', label: 'Square', desc: 'Riche & creux' },
  { type: 'sawtooth', emoji: '⋀', label: 'Saw', desc: 'Brillant & agressif' },
  { type: 'triangle', emoji: '△', label: 'Triangle', desc: 'Chaleureux & doux' },
];

const ControlPanel: React.FC<ControlPanelProps> = ({
  waveType,
  volume,
  reverb,
  onWaveChange,
  onVolumeChange,
  onReverbChange,
}) => {
  const sliderStyle: React.CSSProperties = {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    appearance: 'none' as any,
    background: `linear-gradient(to right, ${THEME.accent.primary} 0%, ${THEME.accent.secondary} ${volume * 100}%, rgba(0,100,200,0.2) ${volume * 100}%)`,
    outline: 'none',
    cursor: 'pointer',
  };

  const reverbSliderStyle: React.CSSProperties = {
    ...sliderStyle,
    background: `linear-gradient(to right, ${THEME.accent.primary} 0%, ${THEME.accent.secondary} ${reverb * 100}%, rgba(0,100,200,0.2) ${reverb * 100}%)`,
  };

  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {/* Wave Type Card */}
      <div style={{ ...GlobalStyles.card, flex: 1, minWidth: '280px' }}>
        <div style={GlobalStyles.sectionTitle}>Type d'onde</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {WAVE_OPTIONS.map(({ type, emoji, label, desc }) => {
            const active = waveType === type;
            return (
              <button
                key={type}
                onClick={() => onWaveChange(type)}
                style={{
                  flex: 1,
                  minWidth: '60px',
                  padding: '10px 8px',
                  borderRadius: THEME.radius.md,
                  border: `1px solid ${active ? THEME.border.active : THEME.border.subtle}`,
                  background: active
                    ? 'rgba(0, 136, 255, 0.2)'
                    : 'rgba(0, 50, 120, 0.1)',
                  color: active ? THEME.accent.cyan : THEME.text.secondary,
                  cursor: 'pointer',
                  fontFamily: THEME.font,
                  transition: 'all 0.2s ease',
                  boxShadow: active ? `0 0 12px ${THEME.accent.glow}` : 'none',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{emoji}</div>
                <div style={{ fontSize: '12px', fontWeight: 700 }}>{label}</div>
                <div style={{ fontSize: '10px', color: THEME.text.muted, marginTop: '2px' }}>{desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Volume & Reverb Card */}
      <div style={{ ...GlobalStyles.card, flex: 1, minWidth: '200px' }}>
        <div style={GlobalStyles.section}>
          <div
            style={{
              ...GlobalStyles.sectionTitle,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Volume</span>
            <span style={{ color: THEME.accent.secondary, fontWeight: 700 }}>
              {Math.round(volume * 100)}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            style={sliderStyle}
          />
        </div>

        <div>
          <div
            style={{
              ...GlobalStyles.sectionTitle,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Réverbération</span>
            <span style={{ color: THEME.accent.secondary, fontWeight: 700 }}>
              {Math.round(reverb * 100)}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={reverb}
            onChange={(e) => onReverbChange(parseFloat(e.target.value))}
            style={reverbSliderStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
