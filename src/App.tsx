import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AudioEngine, WaveType } from './engine/AudioEngine';
import { DemoSong, DEMO_SONGS, playSong } from './engine/DemoSongs';
import { THEME } from './styles/theme';

import WelcomeScreen from './components/WelcomeScreen';
import Header from './components/Header';
import Visualizer from './components/Visualizer';
import ControlPanel from './components/ControlPanel';
import Piano from './components/Piano';
import DrumPad from './components/DrumPad';
import SongLibrary from './components/SongLibrary';
import Tutorial from './components/Tutorial';
import Footer from './components/Footer';

type VizMode = 'bars' | 'wave' | 'circle';
const VIZ_MODES: VizMode[] = ['bars', 'wave', 'circle'];

function App() {
  const [started, setStarted] = useState(false);
  const [waveType, setWaveType] = useState<WaveType>('sine');
  const [volume, setVolume] = useState(0.7);
  const [reverb, setReverb] = useState(0.3);
  const [vizMode, setVizMode] = useState<VizMode>('bars');
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);

  const engineRef = useRef<AudioEngine | null>(null);
  const songStopRef = useRef<(() => void) | null>(null);
  const noteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleStart = useCallback(() => {
    const engine = new AudioEngine();
    engine.resume();
    engine.setMasterVolume(volume);
    engine.setReverbAmount(reverb);
    engineRef.current = engine;
    setStarted(true);

    // Auto-play Neon Dreams after 300ms
    setTimeout(() => {
      const firstSong = DEMO_SONGS[0];
      const handle = playSong(
        engine,
        firstSong,
        (note) => {
          setCurrentNote(note);
          if (noteTimerRef.current) clearTimeout(noteTimerRef.current);
          noteTimerRef.current = setTimeout(() => setCurrentNote(null), 600);
        },
        () => {
          setCurrentSong(null);
        }
      );
      songStopRef.current = handle.stop;
      setCurrentSong(firstSong.id);
    }, 300);
  }, [volume, reverb]);

  const handlePlaySong = useCallback((song: DemoSong) => {
    const engine = engineRef.current;
    if (!engine) return;

    // Stop current song
    songStopRef.current?.();
    songStopRef.current = null;
    setCurrentSong(null);

    const handle = playSong(
      engine,
      song,
      (note) => {
        setCurrentNote(note);
        if (noteTimerRef.current) clearTimeout(noteTimerRef.current);
        noteTimerRef.current = setTimeout(() => setCurrentNote(null), 600);
      },
      () => {
        setCurrentSong(null);
      }
    );
    songStopRef.current = handle.stop;
    setCurrentSong(song.id);
  }, []);

  const handleStop = useCallback(() => {
    songStopRef.current?.();
    songStopRef.current = null;
    setCurrentSong(null);
  }, []);

  // Sync volume
  useEffect(() => {
    engineRef.current?.setMasterVolume(volume);
  }, [volume]);

  // Sync reverb
  useEffect(() => {
    engineRef.current?.setReverbAmount(reverb);
  }, [reverb]);

  const handleVizModeChange = useCallback(() => {
    setVizMode((prev) => {
      const idx = VIZ_MODES.indexOf(prev);
      return VIZ_MODES[(idx + 1) % VIZ_MODES.length];
    });
  }, []);

  if (!started) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: THEME.gradient.bg,
        fontFamily: THEME.font,
        color: THEME.text.primary,
        animation: 'lumatune-fadeIn 0.5s ease',
      }}
    >
      <Header currentNote={currentNote} onShowTutorial={() => setShowTutorial(true)} />

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 20px' }}>
        {/* Visualizer */}
        <section style={{ marginBottom: '24px' }}>
          <Visualizer engine={engineRef.current} mode={vizMode} onModeChange={handleVizModeChange} />
        </section>

        {/* Control Panel */}
        <section style={{ marginBottom: '24px' }}>
          <ControlPanel
            waveType={waveType}
            volume={volume}
            reverb={reverb}
            onWaveChange={setWaveType}
            onVolumeChange={setVolume}
            onReverbChange={setReverb}
          />
        </section>

        {/* Piano */}
        <section style={{ marginBottom: '24px' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #0a1830 0%, #0d1f3c 100%)',
              border: `1px solid ${THEME.border.default}`,
              borderRadius: THEME.radius.lg,
              padding: '16px 20px',
              boxShadow: THEME.shadow.card,
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: THEME.text.muted,
                marginBottom: '8px',
              }}
            >
              🎹 Piano (C4 → E5)
            </div>
            <Piano
              engine={engineRef.current}
              waveType={waveType}
              onNotePlay={(note) => {
                setCurrentNote(note);
                if (noteTimerRef.current) clearTimeout(noteTimerRef.current);
                noteTimerRef.current = setTimeout(() => setCurrentNote(null), 600);
              }}
            />
          </div>
        </section>

        {/* Drum Pads */}
        <section style={{ marginBottom: '24px' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #0a1830 0%, #0d1f3c 100%)',
              border: `1px solid ${THEME.border.default}`,
              borderRadius: THEME.radius.lg,
              padding: '16px 20px',
              boxShadow: THEME.shadow.card,
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: THEME.text.muted,
                marginBottom: '12px',
              }}
            >
              🥁 Drum Pads
            </div>
            <DrumPad engine={engineRef.current} />
          </div>
        </section>

        {/* Song Library */}
        <section style={{ marginBottom: '24px' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #0a1830 0%, #0d1f3c 100%)',
              border: `1px solid ${THEME.border.default}`,
              borderRadius: THEME.radius.lg,
              padding: '16px 20px',
              boxShadow: THEME.shadow.card,
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: THEME.text.muted,
                marginBottom: '12px',
              }}
            >
              🎵 Bibliothèque de morceaux
            </div>
            <SongLibrary
              engine={engineRef.current}
              currentSong={currentSong}
              onPlaySong={handlePlaySong}
              onStop={handleStop}
            />
          </div>
        </section>

        <Footer />
      </main>

      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
    </div>
  );
}

export default App;
