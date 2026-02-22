import React from 'react';
import { THEME } from '../styles/theme';
import { AudioEngine } from '../engine/AudioEngine';
import { DemoSong, DEMO_SONGS, playSong } from '../engine/DemoSongs';

interface SongLibraryProps {
  engine: AudioEngine | null;
  currentSong: string | null;
  onPlaySong: (song: DemoSong) => void;
  onStop: () => void;
}

const SongLibrary: React.FC<SongLibraryProps> = ({ engine, currentSong, onPlaySong, onStop }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '14px',
      }}
    >
      {DEMO_SONGS.map((song) => {
        const isPlaying = currentSong === song.id;
        return (
          <div
            key={song.id}
            style={{
              background: 'linear-gradient(135deg, #0a1830 0%, #0d1f3c 100%)',
              border: `1px solid ${isPlaying ? song.color : THEME.border.default}`,
              borderRadius: THEME.radius.lg,
              padding: '16px',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: isPlaying
                ? `0 0 24px ${song.color}55, 0 4px 24px rgba(0,50,150,0.4)`
                : THEME.shadow.card,
              transform: isPlaying ? 'translateY(-2px)' : 'translateY(0)',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              if (!isPlaying) {
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = THEME.shadow.cardHover;
                el.style.borderColor = THEME.border.active;
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              if (!isPlaying) {
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = THEME.shadow.card;
                el.style.borderColor = THEME.border.default;
              }
            }}
          >
            {/* Playing indicator */}
            {isPlaying && (
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#00ff88',
                  animation: 'lumatune-dotPulse 1s ease-in-out infinite',
                  boxShadow: '0 0 8px #00ff88',
                }}
              />
            )}

            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{song.emoji}</div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: 700,
                marginBottom: '4px',
                color: isPlaying ? song.color : THEME.text.primary,
              }}
            >
              {song.name}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: THEME.text.muted,
                marginBottom: '8px',
              }}
            >
              {song.description}
            </div>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '12px',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: THEME.radius.full,
                  background: 'rgba(0, 100, 200, 0.15)',
                  color: THEME.text.muted,
                }}
              >
                {song.bpm} BPM
              </span>
              <span
                style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: THEME.radius.full,
                  background: 'rgba(0, 100, 200, 0.15)',
                  color: THEME.text.muted,
                }}
              >
                {song.durationSeconds}s
              </span>
            </div>

            <button
              onClick={() => (isPlaying ? onStop() : onPlaySong(song))}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: THEME.radius.md,
                border: `1px solid ${isPlaying ? song.color : THEME.border.default}`,
                background: isPlaying
                  ? `rgba(${parseInt(song.color.slice(1,3),16)}, ${parseInt(song.color.slice(3,5),16)}, ${parseInt(song.color.slice(5,7),16)}, 0.2)`
                  : 'rgba(0, 136, 255, 0.1)',
                color: isPlaying ? '#fff' : THEME.accent.secondary,
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: THEME.font,
                transition: 'all 0.2s ease',
              }}
            >
              {isPlaying ? '⏹ Stop' : '▶ Play'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SongLibrary;
