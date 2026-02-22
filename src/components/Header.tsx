import React from 'react';
import { THEME } from '../styles/theme';

interface HeaderProps {
  currentNote: string | null;
  onShowTutorial: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentNote, onShowTutorial }) => {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        background: `${THEME.bg.glass}`,
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${THEME.border.subtle}`,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span
          style={{
            fontSize: '28px',
            filter: 'drop-shadow(0 0 10px rgba(0,170,255,0.6))',
            animation: 'lumatune-float 3s ease-in-out infinite',
          }}
        >
          🎵
        </span>
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 800,
            margin: 0,
            background: THEME.gradient.title,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px',
          }}
        >
          LumaTune
        </h1>
      </div>

      {/* Center: current note badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '120px', justifyContent: 'center' }}>
        {currentNote && (
          <span
            style={{
              padding: '5px 14px',
              borderRadius: THEME.radius.full,
              background: 'rgba(0, 136, 255, 0.2)',
              border: `1px solid ${THEME.border.active}`,
              color: THEME.accent.cyan,
              fontSize: '14px',
              fontWeight: 700,
              animation: 'lumatune-pulse 0.4s ease',
              letterSpacing: '1px',
            }}
          >
            ♪ {currentNote}
          </span>
        )}
      </div>

      {/* Tutorial Button */}
      <button
        onClick={onShowTutorial}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 16px',
          borderRadius: THEME.radius.md,
          border: `1px solid ${THEME.border.default}`,
          background: 'rgba(0, 136, 255, 0.08)',
          color: THEME.text.secondary,
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: THEME.font,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.background = 'rgba(0, 136, 255, 0.18)';
          el.style.color = THEME.accent.secondary;
          el.style.borderColor = THEME.border.active;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.background = 'rgba(0, 136, 255, 0.08)';
          el.style.color = THEME.text.secondary;
          el.style.borderColor = THEME.border.default;
        }}
      >
        📖 Tutoriel
      </button>
    </header>
  );
};

export default Header;
