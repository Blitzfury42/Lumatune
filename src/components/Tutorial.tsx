import React, { useState } from 'react';
import { THEME } from '../styles/theme';

interface TutorialProps {
  onClose: () => void;
}

const STEPS = [
  {
    icon: '🎹',
    title: 'Piano Interactif',
    content: (
      <div>
        <p>Jouez des notes avec votre clavier ou en cliquant sur les touches.</p>
        <br />
        <p><strong>Touches blanches :</strong> A S D F G H J K L ;</p>
        <p><strong>Touches noires :</strong> W E T Y U O P</p>
        <br />
        <p>Les touches actives s'illuminent en bleu avec un effet glow.</p>
      </div>
    ),
  },
  {
    icon: '〜',
    title: "Types d'onde",
    content: (
      <div>
        <p>Choisissez la forme d'onde du synthétiseur :</p>
        <br />
        <p>〜 <strong>Sine</strong> — Son doux et pur, idéal pour les pads</p>
        <p>⊓ <strong>Square</strong> — Riche en harmoniques, son creux</p>
        <p>⋀ <strong>Sawtooth</strong> — Brillant et agressif, parfait pour le lead</p>
        <p>△ <strong>Triangle</strong> — Chaleureux entre sine et square</p>
      </div>
    ),
  },
  {
    icon: '🥁',
    title: 'Drum Pads',
    content: (
      <div>
        <p>Créez des rythmes avec les pads de batterie !</p>
        <br />
        <p>Utilisez les touches <strong>1-5</strong> pour déclencher :</p>
        <p>1 — Kick drum (basse)</p>
        <p>2 — Snare (caisse claire)</p>
        <p>3 — Hi-Hat fermé</p>
        <p>4 — Hi-Hat ouvert</p>
        <p>5 — Clap</p>
      </div>
    ),
  },
  {
    icon: '🎵',
    title: 'Morceaux de Démo',
    content: (
      <div>
        <p>5 morceaux complets vous attendent :</p>
        <br />
        <p>🌌 <strong>Neon Dreams</strong> — Atmosphérique (88 BPM)</p>
        <p>⚡ <strong>Cyber Pulse</strong> — Électro (128 BPM)</p>
        <p>🌙 <strong>Midnight Waltz</strong> — Mélancolique (72 BPM)</p>
        <p>🎸 <strong>Blue Horizon</strong> — Lo-fi (85 BPM)</p>
        <p>🔥 <strong>Digital Fire</strong> — Intense (140 BPM)</p>
      </div>
    ),
  },
  {
    icon: '📊',
    title: 'Visualiseur & Effets',
    content: (
      <div>
        <p>Le visualiseur affiche le signal audio en temps réel.</p>
        <br />
        <p>▦ <strong>Barres</strong> — Spectre de fréquences</p>
        <p>〜 <strong>Onde</strong> — Forme d'onde temporelle</p>
        <p>◉ <strong>Cercle</strong> — Visualisation polaire</p>
        <br />
        <p>Ajustez la <strong>réverbération</strong> pour ajouter de la profondeur à vos sons.</p>
      </div>
    ),
  },
];

const Tutorial: React.FC<TutorialProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 4, 16, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
        animation: 'lumatune-fadeIn 0.3s ease',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #0a1830 0%, #0d1f3c 100%)',
          border: `1px solid ${THEME.border.active}`,
          borderRadius: THEME.radius.xl,
          padding: '36px',
          maxWidth: '520px',
          width: '100%',
          boxShadow: `${THEME.shadow.glowStrong}, 0 24px 80px rgba(0,0,0,0.6)`,
          animation: 'lumatune-slideUp 0.3s ease',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '14px', color: THEME.text.muted, fontWeight: 600 }}>
            {step + 1} / {STEPS.length}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: THEME.text.muted,
              fontSize: '20px',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: THEME.radius.sm,
              fontFamily: THEME.font,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = THEME.text.primary; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = THEME.text.muted; }}
          >
            ✕
          </button>
        </div>

        {/* Step content */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '52px', marginBottom: '16px' }}>{STEPS[step].icon}</div>
          <h2
            style={{
              fontSize: '22px',
              fontWeight: 800,
              color: THEME.accent.secondary,
              marginBottom: '16px',
            }}
          >
            {STEPS[step].title}
          </h2>
          <div style={{ color: THEME.text.secondary, lineHeight: 1.7, textAlign: 'left' }}>
            {STEPS[step].content}
          </div>
        </div>

        {/* Dots navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              style={{
                width: i === step ? '24px' : '8px',
                height: '8px',
                borderRadius: THEME.radius.full,
                background: i === step ? THEME.accent.primary : THEME.border.default,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: THEME.radius.md,
              border: `1px solid ${THEME.border.default}`,
              background: 'transparent',
              color: step === 0 ? THEME.text.muted : THEME.text.secondary,
              cursor: step === 0 ? 'default' : 'pointer',
              fontFamily: THEME.font,
              fontWeight: 600,
              fontSize: '14px',
              opacity: step === 0 ? 0.4 : 1,
              transition: 'all 0.2s ease',
            }}
          >
            ← Précédent
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: THEME.radius.md,
                border: 'none',
                background: THEME.gradient.primary,
                color: '#fff',
                cursor: 'pointer',
                fontFamily: THEME.font,
                fontWeight: 700,
                fontSize: '14px',
                boxShadow: THEME.shadow.button,
                transition: 'all 0.2s ease',
              }}
            >
              Suivant →
            </button>
          ) : (
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: THEME.radius.md,
                border: 'none',
                background: THEME.gradient.primary,
                color: '#fff',
                cursor: 'pointer',
                fontFamily: THEME.font,
                fontWeight: 700,
                fontSize: '14px',
                boxShadow: THEME.shadow.button,
                animation: 'lumatune-glow 2s ease-in-out infinite',
              }}
            >
              🎵 C'est parti !
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
