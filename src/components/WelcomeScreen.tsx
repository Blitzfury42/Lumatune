import React from 'react';
import { THEME } from '../styles/theme';
import ParticleBackground from './ParticleBackground';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: THEME.gradient.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '40px 20px',
        animation: 'lumatune-fadeIn 0.8s ease',
      }}
    >
      <ParticleBackground />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '680px',
          width: '100%',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: '80px',
            lineHeight: 1,
            marginBottom: '24px',
            animation: 'lumatune-float 3s ease-in-out infinite',
            filter: 'drop-shadow(0 0 30px rgba(0, 170, 255, 0.8))',
          }}
        >
          🎵
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(52px, 8vw, 80px)',
            fontWeight: 900,
            letterSpacing: '-2px',
            margin: '0 0 8px',
            background: THEME.gradient.title,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'lumatune-slideUp 0.6s ease 0.2s both',
          }}
        >
          LumaTune
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '4px',
            color: THEME.text.muted,
            textTransform: 'uppercase',
            marginBottom: '24px',
            animation: 'lumatune-slideUp 0.6s ease 0.3s both',
          }}
        >
          SYNTHÉTISEUR MUSICAL WEB
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: '16px',
            color: THEME.text.secondary,
            lineHeight: 1.7,
            marginBottom: '36px',
            animation: 'lumatune-slideUp 0.6s ease 0.4s both',
          }}
        >
          Créez de la musique directement dans votre navigateur grâce à la{' '}
          <span style={{ color: THEME.accent.secondary, fontWeight: 600 }}>Web Audio API</span>.
          Piano interactif, pads de batterie, effets et bibliothèque de morceaux — le tout sans aucune dépendance externe.
        </p>

        {/* CTA Button */}
        <button
          onClick={onStart}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '18px 44px',
            fontSize: '18px',
            fontWeight: 700,
            background: THEME.gradient.primary,
            color: '#fff',
            border: 'none',
            borderRadius: THEME.radius.full,
            cursor: 'pointer',
            boxShadow: THEME.shadow.button,
            animation: 'lumatune-glow 2s ease-in-out infinite, lumatune-slideUp 0.6s ease 0.5s both',
            transition: 'transform 0.15s ease',
            fontFamily: THEME.font,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          }}
        >
          ▶ Démarrer LumaTune
        </button>

        {/* Hint */}
        <p
          style={{
            marginTop: '20px',
            fontSize: '14px',
            color: THEME.text.muted,
            animation: 'lumatune-slideUp 0.6s ease 0.6s both',
          }}
        >
          🔊 Active ton son — une démo joue automatiquement
        </p>

        {/* Tech Badges */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
            marginTop: '36px',
            animation: 'lumatune-slideUp 0.6s ease 0.7s both',
          }}
        >
          {['React 18', 'TypeScript', 'Web Audio API', 'Canvas'].map((tech) => (
            <span
              key={tech}
              style={{
                padding: '6px 14px',
                borderRadius: THEME.radius.full,
                background: 'rgba(0, 136, 255, 0.12)',
                border: `1px solid ${THEME.border.default}`,
                color: THEME.accent.secondary,
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.5px',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
