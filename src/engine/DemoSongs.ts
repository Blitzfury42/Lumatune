import { AudioEngine, WaveType, NOTE_FREQUENCIES } from './AudioEngine';

export interface SongNote {
  note: string;
  duration: number;
  delay: number;
  wave?: WaveType;
  volume?: number;
  pan?: number;
  attack?: number;
  release?: number;
}

export interface DemoSong {
  id: string;
  emoji: string;
  name: string;
  description: string;
  bpm: number;
  durationSeconds: number;
  color: string;
  notes: SongNote[];
}

export const DEMO_SONGS: DemoSong[] = [
  {
    id: 'neon-dreams',
    emoji: '🌌',
    name: 'Neon Dreams',
    description: 'Atmosphérique & planant',
    bpm: 88,
    durationSeconds: 18,
    color: '#00aaff',
    notes: [
      // Pads - Em chord background (long)
      { note: 'E3', duration: 3.5, delay: 0, wave: 'sine', volume: 0.25, attack: 0.6, release: 1.0 },
      { note: 'G3', duration: 3.5, delay: 0, wave: 'sine', volume: 0.2, attack: 0.6, release: 1.0 },
      { note: 'B3', duration: 3.5, delay: 0, wave: 'sine', volume: 0.18, attack: 0.8, release: 1.0 },
      // Pads - D/G chord
      { note: 'D3', duration: 3.5, delay: 3.5, wave: 'sine', volume: 0.25, attack: 0.6, release: 1.0 },
      { note: 'G3', duration: 3.5, delay: 3.5, wave: 'sine', volume: 0.2, attack: 0.6, release: 1.0 },
      { note: 'A3', duration: 3.5, delay: 3.5, wave: 'sine', volume: 0.18, attack: 0.8, release: 1.0 },
      // Pads - C/E chord
      { note: 'E3', duration: 3.5, delay: 7, wave: 'sine', volume: 0.25, attack: 0.6, release: 1.0 },
      { note: 'G3', duration: 3.5, delay: 7, wave: 'sine', volume: 0.2, attack: 0.6, release: 1.0 },
      { note: 'C4', duration: 3.5, delay: 7, wave: 'sine', volume: 0.18, attack: 0.8, release: 1.0 },
      // Pads - Em resolve
      { note: 'E3', duration: 4, delay: 10.5, wave: 'sine', volume: 0.25, attack: 0.6, release: 1.5 },
      { note: 'B3', duration: 4, delay: 10.5, wave: 'sine', volume: 0.2, attack: 0.6, release: 1.5 },
      { note: 'E4', duration: 4, delay: 10.5, wave: 'sine', volume: 0.18, attack: 0.8, release: 1.5 },

      // Melody (triangle) - rises in
      { note: 'E4', duration: 0.6, delay: 1.0, wave: 'triangle', volume: 0.45, pan: 0.2 },
      { note: 'G4', duration: 0.6, delay: 1.7, wave: 'triangle', volume: 0.45, pan: 0.2 },
      { note: 'B4', duration: 0.8, delay: 2.4, wave: 'triangle', volume: 0.5, pan: 0.2 },
      { note: 'A4', duration: 0.6, delay: 3.8, wave: 'triangle', volume: 0.45, pan: -0.1 },
      { note: 'G4', duration: 0.6, delay: 4.5, wave: 'triangle', volume: 0.45, pan: -0.1 },
      { note: 'A4', duration: 1.0, delay: 5.2, wave: 'triangle', volume: 0.5, pan: 0.1 },
      { note: 'G4', duration: 0.5, delay: 6.7, wave: 'triangle', volume: 0.4, pan: 0.3 },
      { note: 'E4', duration: 1.2, delay: 7.3, wave: 'triangle', volume: 0.45, pan: 0.1 },
      { note: 'D4', duration: 0.5, delay: 8.7, wave: 'triangle', volume: 0.4, pan: -0.2 },
      { note: 'E4', duration: 0.5, delay: 9.3, wave: 'triangle', volume: 0.4, pan: 0 },
      { note: 'G4', duration: 0.5, delay: 9.9, wave: 'triangle', volume: 0.4, pan: 0.2 },

      // Melody variation (sine) - later section
      { note: 'B4', duration: 0.6, delay: 10.8, wave: 'sine', volume: 0.4, pan: -0.2, attack: 0.05 },
      { note: 'A4', duration: 0.5, delay: 11.5, wave: 'sine', volume: 0.38, pan: 0 },
      { note: 'G4', duration: 0.5, delay: 12.1, wave: 'sine', volume: 0.38, pan: 0.2 },
      { note: 'E4', duration: 0.6, delay: 12.7, wave: 'sine', volume: 0.4, pan: 0.1 },
      { note: 'D4', duration: 0.5, delay: 13.4, wave: 'sine', volume: 0.35, pan: -0.1 },
      { note: 'E4', duration: 2.5, delay: 14.0, wave: 'sine', volume: 0.4, pan: 0, release: 1.5 },
    ],
  },
  {
    id: 'cyber-pulse',
    emoji: '⚡',
    name: 'Cyber Pulse',
    description: 'Électro énergique',
    bpm: 128,
    durationSeconds: 14,
    color: '#ff6600',
    notes: [
      // Bass (sawtooth) - 16 notes alternating A3/G3
      ...[0,0.47,0.94,1.41,1.88,2.35,2.82,3.29,3.76,4.23,4.70,5.17,5.64,6.11,6.58,7.05].map((delay, i) => ({
        note: i % 2 === 0 ? 'A2' : 'G2',
        duration: 0.4,
        delay,
        wave: 'sawtooth' as WaveType,
        volume: 0.5,
        pan: (i % 4 < 2) ? -0.2 : 0.2,
      })),
      // Lead (square) — syncopated
      { note: 'A4', duration: 0.22, delay: 0.2, wave: 'square', volume: 0.35, pan: 0.3 },
      { note: 'C5', duration: 0.22, delay: 0.67, wave: 'square', volume: 0.35, pan: -0.3 },
      { note: 'E5', duration: 0.3, delay: 1.1, wave: 'square', volume: 0.38, pan: 0.2 },
      { note: 'G4', duration: 0.22, delay: 1.6, wave: 'square', volume: 0.35, pan: -0.2 },
      { note: 'A4', duration: 0.25, delay: 2.1, wave: 'square', volume: 0.36, pan: 0 },
      { note: 'B4', duration: 0.22, delay: 2.6, wave: 'square', volume: 0.35, pan: 0.3 },
      { note: 'A4', duration: 0.3, delay: 3.0, wave: 'square', volume: 0.38, pan: -0.1 },
      { note: 'G4', duration: 0.25, delay: 3.5, wave: 'square', volume: 0.35, pan: 0.2 },
      // Sawtooth section (mid energy)
      { note: 'E4', duration: 0.35, delay: 7.5, wave: 'sawtooth', volume: 0.35, pan: 0.3 },
      { note: 'G4', duration: 0.35, delay: 7.95, wave: 'sawtooth', volume: 0.35, pan: -0.3 },
      { note: 'A4', duration: 0.35, delay: 8.4, wave: 'sawtooth', volume: 0.38, pan: 0.2 },
      { note: 'B4', duration: 0.35, delay: 8.85, wave: 'sawtooth', volume: 0.35, pan: -0.2 },
      { note: 'A4', duration: 0.35, delay: 9.3, wave: 'sawtooth', volume: 0.36, pan: 0 },
      { note: 'G4', duration: 0.35, delay: 9.75, wave: 'sawtooth', volume: 0.35, pan: 0.3 },
      { note: 'E4', duration: 0.35, delay: 10.2, wave: 'sawtooth', volume: 0.38, pan: -0.3 },
      // Outro
      { note: 'A3', duration: 1.5, delay: 11.5, wave: 'sawtooth', volume: 0.45, pan: 0, release: 0.8 },
      { note: 'E3', duration: 2.0, delay: 12.5, wave: 'sine', volume: 0.4, pan: 0, release: 1.5 },
    ],
  },
  {
    id: 'midnight-waltz',
    emoji: '🌙',
    name: 'Midnight Waltz',
    description: 'Mélancolique & doux',
    bpm: 72,
    durationSeconds: 18,
    color: '#aa66ff',
    notes: [
      // Pads E major
      { note: 'E3', duration: 4, delay: 0, wave: 'sine', volume: 0.2, attack: 0.8, release: 1.2 },
      { note: 'G3', duration: 4, delay: 0, wave: 'sine', volume: 0.18, attack: 0.8, release: 1.2 },
      { note: 'B3', duration: 4, delay: 0, wave: 'sine', volume: 0.16, attack: 0.8, release: 1.2 },
      // Pads C# minor
      { note: 'A3', duration: 4, delay: 4, wave: 'sine', volume: 0.2, attack: 0.8, release: 1.2 },
      { note: 'C4', duration: 4, delay: 4, wave: 'sine', volume: 0.18, attack: 0.8, release: 1.2 },
      { note: 'E4', duration: 4, delay: 4, wave: 'sine', volume: 0.16, attack: 0.8, release: 1.2 },
      // Pads A major
      { note: 'A2', duration: 4, delay: 8, wave: 'sine', volume: 0.2, attack: 0.8, release: 1.2 },
      { note: 'E3', duration: 4, delay: 8, wave: 'sine', volume: 0.18, attack: 0.8, release: 1.2 },
      { note: 'A3', duration: 4, delay: 8, wave: 'sine', volume: 0.16, attack: 0.8, release: 1.2 },
      // Pads resolve
      { note: 'E3', duration: 5, delay: 12, wave: 'sine', volume: 0.2, attack: 0.8, release: 2.0 },
      { note: 'B3', duration: 5, delay: 12, wave: 'sine', volume: 0.18, attack: 0.8, release: 2.0 },
      { note: 'E4', duration: 5, delay: 12, wave: 'sine', volume: 0.16, attack: 0.8, release: 2.0 },
      // Melody (sine)
      { note: 'B4', duration: 0.7, delay: 0.8, wave: 'sine', volume: 0.48, pan: 0.1, attack: 0.1, release: 0.4 },
      { note: 'A4', duration: 0.6, delay: 1.6, wave: 'sine', volume: 0.45, pan: 0, release: 0.3 },
      { note: 'G4', duration: 0.7, delay: 2.3, wave: 'sine', volume: 0.45, pan: -0.1, release: 0.3 },
      { note: 'E4', duration: 1.0, delay: 3.1, wave: 'sine', volume: 0.48, pan: 0, release: 0.5 },
      { note: 'A4', duration: 0.6, delay: 4.5, wave: 'sine', volume: 0.45, pan: 0.2, release: 0.3 },
      { note: 'G4', duration: 0.5, delay: 5.2, wave: 'sine', volume: 0.42, pan: 0.1, release: 0.3 },
      { note: 'E4', duration: 0.6, delay: 5.8, wave: 'sine', volume: 0.45, pan: 0, release: 0.3 },
      { note: 'D4', duration: 1.0, delay: 6.5, wave: 'sine', volume: 0.48, pan: -0.1, release: 0.5 },
      // Melody (triangle) - second half
      { note: 'G4', duration: 0.6, delay: 8.5, wave: 'triangle', volume: 0.44, pan: 0.2, release: 0.3 },
      { note: 'A4', duration: 0.6, delay: 9.2, wave: 'triangle', volume: 0.44, pan: 0.1, release: 0.3 },
      { note: 'B4', duration: 0.7, delay: 9.9, wave: 'triangle', volume: 0.47, pan: 0, release: 0.4 },
      { note: 'A4', duration: 0.6, delay: 10.7, wave: 'triangle', volume: 0.44, pan: -0.1, release: 0.3 },
      { note: 'E4', duration: 1.2, delay: 11.4, wave: 'triangle', volume: 0.47, pan: 0, release: 0.6 },
      { note: 'B4', duration: 3.0, delay: 13.0, wave: 'sine', volume: 0.42, pan: 0, attack: 0.3, release: 2.0 },
    ],
  },
  {
    id: 'blue-horizon',
    emoji: '🎸',
    name: 'Blue Horizon',
    description: 'Chill lo-fi',
    bpm: 85,
    durationSeconds: 16,
    color: '#0066ff',
    notes: [
      // Chords (triangle) Am, F, G, Am
      { note: 'A2', duration: 3.5, delay: 0, wave: 'triangle', volume: 0.3, attack: 0.3, release: 0.8 },
      { note: 'E3', duration: 3.5, delay: 0, wave: 'triangle', volume: 0.25, attack: 0.3, release: 0.8 },
      { note: 'A3', duration: 3.5, delay: 0, wave: 'triangle', volume: 0.22, attack: 0.3, release: 0.8 },
      { note: 'F2', duration: 3.5, delay: 3.5, wave: 'triangle', volume: 0.3, attack: 0.3, release: 0.8 },
      { note: 'A2', duration: 3.5, delay: 3.5, wave: 'triangle', volume: 0.25, attack: 0.3, release: 0.8 },
      { note: 'C3', duration: 3.5, delay: 3.5, wave: 'triangle', volume: 0.22, attack: 0.3, release: 0.8 },
      { note: 'G2', duration: 3.5, delay: 7, wave: 'triangle', volume: 0.3, attack: 0.3, release: 0.8 },
      { note: 'B2', duration: 3.5, delay: 7, wave: 'triangle', volume: 0.25, attack: 0.3, release: 0.8 },
      { note: 'D3', duration: 3.5, delay: 7, wave: 'triangle', volume: 0.22, attack: 0.3, release: 0.8 },
      { note: 'A2', duration: 4, delay: 10.5, wave: 'triangle', volume: 0.3, attack: 0.3, release: 1.2 },
      { note: 'E3', duration: 4, delay: 10.5, wave: 'triangle', volume: 0.25, attack: 0.3, release: 1.2 },
      { note: 'A3', duration: 4, delay: 10.5, wave: 'triangle', volume: 0.22, attack: 0.3, release: 1.2 },
      // Melody (sine) with pan stereo
      { note: 'E4', duration: 0.55, delay: 0.5, wave: 'sine', volume: 0.5, pan: -0.3 },
      { note: 'A4', duration: 0.55, delay: 1.1, wave: 'sine', volume: 0.5, pan: 0 },
      { note: 'B4', duration: 0.55, delay: 1.7, wave: 'sine', volume: 0.5, pan: 0.3 },
      { note: 'C5', duration: 0.7, delay: 2.3, wave: 'sine', volume: 0.52, pan: 0.4 },
      { note: 'B4', duration: 0.55, delay: 3.2, wave: 'sine', volume: 0.48, pan: 0.2 },
      { note: 'A4', duration: 0.55, delay: 4.2, wave: 'sine', volume: 0.48, pan: -0.2 },
      { note: 'G4', duration: 0.55, delay: 4.8, wave: 'sine', volume: 0.48, pan: -0.4 },
      { note: 'F4', duration: 0.7, delay: 5.4, wave: 'sine', volume: 0.5, pan: -0.3 },
      { note: 'G4', duration: 0.55, delay: 6.2, wave: 'sine', volume: 0.48, pan: 0 },
      { note: 'A4', duration: 0.55, delay: 7.5, wave: 'sine', volume: 0.5, pan: 0.3 },
      { note: 'B4', duration: 0.55, delay: 8.1, wave: 'sine', volume: 0.5, pan: 0.1 },
      { note: 'A4', duration: 0.55, delay: 8.7, wave: 'sine', volume: 0.48, pan: -0.1 },
      { note: 'G4', duration: 0.55, delay: 9.3, wave: 'sine', volume: 0.48, pan: -0.2 },
      { note: 'E4', duration: 0.7, delay: 9.9, wave: 'sine', volume: 0.5, pan: 0 },
      { note: 'A4', duration: 3.5, delay: 11.0, wave: 'sine', volume: 0.45, pan: 0, attack: 0.2, release: 2.0 },
    ],
  },
  {
    id: 'digital-fire',
    emoji: '🔥',
    name: 'Digital Fire',
    description: 'Intense & rapide',
    bpm: 140,
    durationSeconds: 12,
    color: '#ff3344',
    notes: [
      // Bass (sawtooth aggressive) E3/C3/D3/A2
      ...[0,0.43,0.86,1.29,1.72,2.15,2.58,3.01].map((delay, i) => ({
        note: ['E3','E3','C3','C3','D3','D3','A2','A2'][i],
        duration: 0.35,
        delay,
        wave: 'sawtooth' as WaveType,
        volume: 0.55,
        pan: i % 2 === 0 ? -0.25 : 0.25,
      })),
      // Second bass sequence
      ...[3.44,3.87,4.30,4.73,5.16,5.59,6.02,6.45].map((delay, i) => ({
        note: ['E3','E3','C3','C3','D3','D3','A2','E3'][i],
        duration: 0.35,
        delay,
        wave: 'sawtooth' as WaveType,
        volume: 0.55,
        pan: i % 2 === 0 ? -0.25 : 0.25,
      })),
      // Lead (sawtooth fast)
      { note: 'E5', duration: 0.2, delay: 0.1, wave: 'sawtooth', volume: 0.38, pan: 0.4 },
      { note: 'D5', duration: 0.2, delay: 0.3, wave: 'sawtooth', volume: 0.36, pan: 0.3 },
      { note: 'C5', duration: 0.2, delay: 0.5, wave: 'sawtooth', volume: 0.36, pan: 0.2 },
      { note: 'B4', duration: 0.2, delay: 0.7, wave: 'sawtooth', volume: 0.36, pan: 0.1 },
      { note: 'A4', duration: 0.2, delay: 0.9, wave: 'sawtooth', volume: 0.38, pan: 0 },
      { note: 'G4', duration: 0.2, delay: 1.1, wave: 'sawtooth', volume: 0.36, pan: -0.1 },
      { note: 'E4', duration: 0.3, delay: 1.3, wave: 'sawtooth', volume: 0.38, pan: -0.2 },
      { note: 'A4', duration: 0.2, delay: 2.0, wave: 'sawtooth', volume: 0.36, pan: 0.3 },
      { note: 'B4', duration: 0.2, delay: 2.2, wave: 'sawtooth', volume: 0.36, pan: 0.1 },
      { note: 'C5', duration: 0.2, delay: 2.4, wave: 'sawtooth', volume: 0.36, pan: -0.1 },
      { note: 'E5', duration: 0.4, delay: 2.6, wave: 'sawtooth', volume: 0.42, pan: 0 },
      // Build ascendant
      { note: 'A3', duration: 0.25, delay: 6.5, wave: 'sawtooth', volume: 0.4, pan: -0.3 },
      { note: 'B3', duration: 0.25, delay: 6.8, wave: 'sawtooth', volume: 0.4, pan: -0.2 },
      { note: 'C4', duration: 0.25, delay: 7.1, wave: 'sawtooth', volume: 0.42, pan: -0.1 },
      { note: 'D4', duration: 0.25, delay: 7.4, wave: 'sawtooth', volume: 0.42, pan: 0 },
      { note: 'E4', duration: 0.25, delay: 7.7, wave: 'sawtooth', volume: 0.44, pan: 0.1 },
      { note: 'F4', duration: 0.25, delay: 8.0, wave: 'sawtooth', volume: 0.44, pan: 0.2 },
      { note: 'G4', duration: 0.25, delay: 8.3, wave: 'sawtooth', volume: 0.46, pan: 0.3 },
      { note: 'A4', duration: 0.25, delay: 8.6, wave: 'sawtooth', volume: 0.46, pan: 0.4 },
      { note: 'B4', duration: 0.25, delay: 8.9, wave: 'sawtooth', volume: 0.48, pan: 0.3 },
      { note: 'C5', duration: 0.25, delay: 9.2, wave: 'sawtooth', volume: 0.48, pan: 0.2 },
      { note: 'D5', duration: 0.25, delay: 9.5, wave: 'sawtooth', volume: 0.5, pan: 0.1 },
      { note: 'E5', duration: 0.25, delay: 9.8, wave: 'sawtooth', volume: 0.5, pan: 0 },
      // Final chord
      { note: 'A3', duration: 2.5, delay: 10.5, wave: 'sawtooth', volume: 0.45, pan: -0.2, release: 1.5 },
      { note: 'E4', duration: 2.5, delay: 10.5, wave: 'sawtooth', volume: 0.42, pan: 0, release: 1.5 },
      { note: 'A4', duration: 2.5, delay: 10.5, wave: 'sawtooth', volume: 0.4, pan: 0.2, release: 1.5 },
    ],
  },
];

export function playSong(
  engine: AudioEngine,
  song: DemoSong,
  onNotePlay?: (noteName: string) => void,
  onFinish?: () => void
): { stop: () => void } {
  let stopped = false;
  const timers: ReturnType<typeof setTimeout>[] = [];

  song.notes.forEach((sn) => {
    const freq = NOTE_FREQUENCIES[sn.note];
    if (!freq) return;

    const t = setTimeout(() => {
      if (stopped) return;
      engine.playNote({
        frequency: freq,
        wave: sn.wave ?? 'sine',
        volume: sn.volume ?? 0.4,
        duration: sn.duration,
        attack: sn.attack ?? 0.02,
        release: sn.release ?? 0.2,
        pan: sn.pan ?? 0,
      });
      onNotePlay?.(sn.note);
    }, sn.delay * 1000);

    timers.push(t);
  });

  const finishTimer = setTimeout(() => {
    if (!stopped) onFinish?.();
  }, song.durationSeconds * 1000 + 500);
  timers.push(finishTimer);

  return {
    stop: () => {
      stopped = true;
      timers.forEach(clearTimeout);
    },
  };
}
