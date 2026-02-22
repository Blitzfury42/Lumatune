import React, { useState, useEffect, useCallback } from 'react';
import { AudioEngine, WaveType, NOTE_FREQUENCIES } from '../engine/AudioEngine';
import { THEME } from '../styles/theme';

interface PianoProps {
  engine: AudioEngine | null;
  waveType: WaveType;
  onNotePlay?: (note: string) => void;
}

// Keys from C4 to E5 (17 white + black layout)
const WHITE_KEYS = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5'];
const WHITE_KEY_SHORTCUTS = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'];

const BLACK_KEYS: (string | null)[] = [
  'C#4', 'D#4', null, 'F#4', 'G#4', 'A#4', null, 'C#5', 'D#5', null,
];
const BLACK_KEY_SHORTCUTS: (string | null)[] = [
  'W', 'E', null, 'T', 'Y', 'U', null, 'O', 'P', null,
];

// Map keyboard key → note
const KEY_TO_NOTE: Record<string, string> = {};
WHITE_KEYS.forEach((note, i) => { KEY_TO_NOTE[WHITE_KEY_SHORTCUTS[i].toLowerCase()] = note; });
BLACK_KEYS.forEach((note, i) => {
  if (note && BLACK_KEY_SHORTCUTS[i]) {
    KEY_TO_NOTE[(BLACK_KEY_SHORTCUTS[i] as string).toLowerCase()] = note;
  }
});

const Piano: React.FC<PianoProps> = ({ engine, waveType, onNotePlay }) => {
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());

  const startNote = useCallback((note: string) => {
    if (!engine) return;
    const freq = NOTE_FREQUENCIES[note];
    if (!freq) return;
    engine.startNote(note, freq, waveType, 0.5);
    setActiveNotes((prev) => new Set(prev).add(note));
    onNotePlay?.(note);
  }, [engine, waveType, onNotePlay]);

  const stopNote = useCallback((note: string) => {
    if (!engine) return;
    engine.stopNote(note);
    setActiveNotes((prev) => {
      const next = new Set(prev);
      next.delete(note);
      return next;
    });
  }, [engine]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const note = KEY_TO_NOTE[e.key.toLowerCase()];
      if (note && !activeNotes.has(note)) startNote(note);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const note = KEY_TO_NOTE[e.key.toLowerCase()];
      if (note) stopNote(note);
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [startNote, stopNote, activeNotes]);

  const whiteKeyStyle = (note: string): React.CSSProperties => {
    const active = activeNotes.has(note);
    return {
      width: '52px',
      height: '170px',
      borderRadius: `0 0 ${THEME.radius.sm} ${THEME.radius.sm}`,
      border: `1px solid ${active ? THEME.border.active : 'rgba(0, 100, 200, 0.3)'}`,
      background: active
        ? 'linear-gradient(180deg, #a0d8ff 0%, #e0f4ff 40%, #ffffff 100%)'
        : 'linear-gradient(180deg, #cce6ff 0%, #e8f4ff 40%, #ffffff 100%)',
      cursor: 'pointer',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: '8px',
      userSelect: 'none',
      transition: 'background 0.05s ease, box-shadow 0.05s ease',
      boxShadow: active
        ? `0 0 14px ${THEME.accent.glow}, inset 0 -3px 8px rgba(0,100,255,0.3)`
        : '2px 2px 6px rgba(0,0,0,0.5)',
      zIndex: 1,
      flexShrink: 0,
    };
  };

  const blackKeyStyle = (note: string): React.CSSProperties => {
    const active = activeNotes.has(note);
    return {
      width: '36px',
      height: '108px',
      borderRadius: `0 0 ${THEME.radius.sm} ${THEME.radius.sm}`,
      border: `1px solid ${active ? THEME.border.active : 'rgba(0,80,200,0.4)'}`,
      background: active
        ? 'linear-gradient(180deg, #0044aa 0%, #0066cc 100%)'
        : 'linear-gradient(180deg, #0a0e1a 0%, #0d1f3c 100%)',
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: '6px',
      userSelect: 'none',
      transition: 'background 0.05s ease, box-shadow 0.05s ease',
      boxShadow: active
        ? `0 0 12px ${THEME.accent.glow}`
        : '1px 4px 8px rgba(0,0,0,0.8)',
    };
  };

  return (
    <div
      style={{
        overflowX: 'auto',
        padding: '12px 0 20px',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          userSelect: 'none',
          width: 'fit-content',
          margin: '0 auto',
        }}
      >
        {/* White keys */}
        {WHITE_KEYS.map((note, i) => (
          <div
            key={note}
            style={whiteKeyStyle(note)}
            onMouseDown={() => startNote(note)}
            onMouseUp={() => stopNote(note)}
            onMouseLeave={() => { if (activeNotes.has(note)) stopNote(note); }}
            onTouchStart={(e) => { e.preventDefault(); startNote(note); }}
            onTouchEnd={(e) => { e.preventDefault(); stopNote(note); }}
          >
            <span style={{ fontSize: '10px', color: '#4488aa', fontWeight: 700, marginBottom: '2px' }}>
              {note.replace(/\d/, '')}
            </span>
            <span style={{ fontSize: '9px', color: '#88aabb' }}>{WHITE_KEY_SHORTCUTS[i]}</span>
          </div>
        ))}

        {/* Black keys overlay */}
        {BLACK_KEYS.map((note, i) => {
          if (!note) return null;
          // Position: each white key is 52px wide, black keys sit between whites
          // Indices: 0→between 0-1, 1→between 1-2, 3→between 3-4, 4→between 4-5, 5→between 5-6, 7→between 7-8, 8→between 8-9
          const whiteOffset = i * 52 + 52 - 18; // center on gap
          return (
            <div
              key={note}
              style={{ ...blackKeyStyle(note), left: `${whiteOffset}px` }}
              onMouseDown={(e) => { e.stopPropagation(); startNote(note); }}
              onMouseUp={(e) => { e.stopPropagation(); stopNote(note); }}
              onMouseLeave={() => { if (activeNotes.has(note)) stopNote(note); }}
              onTouchStart={(e) => { e.preventDefault(); startNote(note); }}
              onTouchEnd={(e) => { e.preventDefault(); stopNote(note); }}
            >
              <span style={{ fontSize: '8px', color: '#5588cc', fontWeight: 700 }}>
                {note.replace(/\d/, '')}
              </span>
              <span style={{ fontSize: '8px', color: '#335577' }}>{BLACK_KEY_SHORTCUTS[i]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Piano;
