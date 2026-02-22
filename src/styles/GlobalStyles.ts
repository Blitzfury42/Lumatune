import { THEME } from './theme';

export const GlobalStyles = {
  btnBase: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: THEME.radius.full,
    border: 'none',
    cursor: 'pointer',
    fontFamily: THEME.font,
    fontSize: '14px',
    fontWeight: 600,
    transition: 'all 0.2s ease',
    userSelect: 'none' as const,
    outline: 'none',
  },
  btnPrimary: {
    background: THEME.gradient.primary,
    color: '#fff',
    boxShadow: THEME.shadow.button,
  },
  btnGhost: {
    background: 'transparent',
    color: THEME.text.secondary,
    border: `1px solid ${THEME.border.default}`,
  },
  btnIcon: {
    padding: '8px 12px',
    borderRadius: THEME.radius.md,
    background: 'rgba(0, 136, 255, 0.1)',
    color: THEME.accent.secondary,
    border: `1px solid ${THEME.border.subtle}`,
  },
  card: {
    background: THEME.gradient.card,
    border: `1px solid ${THEME.border.default}`,
    borderRadius: THEME.radius.lg,
    padding: '20px',
    boxShadow: THEME.shadow.card,
  },
  section: {
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase' as const,
    color: THEME.text.muted,
    marginBottom: '12px',
  },
} as const;
