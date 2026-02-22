import { AudioEngine, NOTE_FREQUENCIES, WaveType } from './AudioEngine';

export function playArpeggio(
  engine: AudioEngine,
  notes: string[],
  wave: WaveType = 'triangle',
  intervalMs: number = 150,
  volume: number = 0.4
): { stop: () => void } {
  let idx = 0;
  let stopped = false;
  const panOptions = [-0.4, -0.2, 0, 0.2, 0.4];

  const tick = () => {
    if (stopped) return;
    const note = notes[idx % notes.length];
    const freq = NOTE_FREQUENCIES[note];
    if (freq) {
      engine.playNote({
        frequency: freq,
        wave,
        volume,
        duration: intervalMs / 1000 + 0.05,
        attack: 0.01,
        release: 0.1,
        pan: panOptions[idx % panOptions.length],
      });
    }
    idx++;
    timer = setTimeout(tick, intervalMs);
  };

  let timer = setTimeout(tick, 0);

  return {
    stop: () => {
      stopped = true;
      clearTimeout(timer);
    },
  };
}
