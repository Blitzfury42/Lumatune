import React from 'react';
import { THEME } from '../styles/theme';

const Footer: React.FC = () => {
  return (
    <footer style={{ marginTop: '40px', paddingBottom: '32px' }}>
      {/* Separator gradient */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,136,255,0.4) 30%, rgba(0,200,255,0.6) 50%, rgba(0,136,255,0.4) 70%, transparent 100%)',
          marginBottom: '20px',
        }}
      />

      <div
        style={{
          textAlign: 'center',
          color: THEME.text.muted,
          fontSize: '14px',
          marginBottom: '14px',
        }}
      >
        ✨ LumaTune — Synthétiseur Musical Web ✨
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {['React 18', 'TypeScript', 'Web Audio API', 'Canvas API'].map((badge) => (
          <span
            key={badge}
            style={{
              padding: '4px 12px',
              borderRadius: THEME.radius.full,
              background: 'rgba(0, 100, 200, 0.1)',
              border: `1px solid ${THEME.border.subtle}`,
              color: THEME.text.muted,
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            {badge}
          </span>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
