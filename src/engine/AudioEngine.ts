export type WaveType = 'sine' | 'square' | 'sawtooth' | 'triangle';

export interface NoteConfig {
  frequency: number;
  wave?: WaveType;
  volume?: number;
  duration?: number;
  attack?: number;
  decay?: number;
  sustain?: number;
  release?: number;
  detune?: number;
  pan?: number;
}

export const NOTE_FREQUENCIES: Record<string, number> = {
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, B2: 123.47,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, 'C#4': 277.18, D4: 293.66, 'D#4': 311.13, E4: 329.63,
  F4: 349.23, 'F#4': 369.99, G4: 392.00, 'G#4': 415.30, A4: 440.00,
  'A#4': 466.16, B4: 493.88,
  C5: 523.25, 'C#5': 554.37, D5: 587.33, 'D#5': 622.25, E5: 659.25,
  F5: 698.46, 'F#5': 739.99, G5: 783.99, 'G#5': 830.61, A5: 880.00,
  'A#5': 932.33, B5: 987.77,
  C6: 1046.50,
};

export class AudioEngine {
  private ctx: AudioContext;
  private masterGain: GainNode;
  private compressor: DynamicsCompressorNode;
  private analyser: AnalyserNode;
  private convolver: ConvolverNode;
  private dryGain: GainNode;
  private wetGain: GainNode;
  private activeNotes: Map<string, { osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode }> = new Map();

  constructor() {
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Compressor
    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.value = -18;
    this.compressor.knee.value = 12;
    this.compressor.ratio.value = 6;
    this.compressor.attack.value = 0.003;
    this.compressor.release.value = 0.15;

    // Master gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.8;

    // Analyser
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.8;

    // Reverb
    this.convolver = this.ctx.createConvolver();
    this.convolver.buffer = this._generateImpulseResponse(2.5, 2, false);

    this.dryGain = this.ctx.createGain();
    this.dryGain.gain.value = 1;

    this.wetGain = this.ctx.createGain();
    this.wetGain.gain.value = 0;

    // Chain: compressor → dryGain → masterGain → analyser → destination
    //        compressor → convolver → wetGain → masterGain
    this.compressor.connect(this.dryGain);
    this.compressor.connect(this.convolver);
    this.convolver.connect(this.wetGain);
    this.dryGain.connect(this.masterGain);
    this.wetGain.connect(this.masterGain);
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
  }

  private _generateImpulseResponse(duration: number, decay: number, reverse: boolean): AudioBuffer {
    const sampleRate = this.ctx.sampleRate;
    const length = sampleRate * duration;
    const impulse = this.ctx.createBuffer(2, length, sampleRate);
    for (let c = 0; c < 2; c++) {
      const ch = impulse.getChannelData(c);
      for (let i = 0; i < length; i++) {
        const n = reverse ? length - i : i;
        ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
      }
    }
    return impulse;
  }

  private _createPanner(pan: number): StereoPannerNode {
    const panner = this.ctx.createStereoPanner();
    panner.pan.value = Math.max(-1, Math.min(1, pan));
    return panner;
  }

  playNote(config: NoteConfig): void {
    const {
      frequency,
      wave = 'sine',
      volume = 0.5,
      duration = 0.5,
      attack = 0.01,
      decay = 0.1,
      sustain = 0.7,
      release = 0.3,
      detune = 0,
      pan = 0,
    } = config;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const panner = this._createPanner(pan);

    osc.type = wave;
    osc.frequency.value = frequency;
    osc.detune.value = detune;

    // ADSR envelope
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + attack);
    gainNode.gain.linearRampToValueAtTime(volume * sustain, now + attack + decay);
    gainNode.gain.setValueAtTime(volume * sustain, now + duration - release);
    gainNode.gain.linearRampToValueAtTime(0, now + duration);

    osc.connect(gainNode);
    gainNode.connect(panner);
    panner.connect(this.compressor);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  startNote(id: string, freq: number, wave: WaveType = 'sine', vol: number = 0.5): void {
    if (this.activeNotes.has(id)) this.stopNote(id);

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc1.type = wave;
    osc1.frequency.value = freq;
    osc1.detune.value = -6;

    osc2.type = wave;
    osc2.frequency.value = freq;
    osc2.detune.value = 6;

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(vol * 0.5, now + 0.015);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.compressor);

    osc1.start(now);
    osc2.start(now);

    this.activeNotes.set(id, { osc1, osc2, gain: gainNode });
  }

  stopNote(id: string): void {
    const note = this.activeNotes.get(id);
    if (!note) return;
    const now = this.ctx.currentTime;
    note.gain.gain.setTargetAtTime(0, now, 0.05);
    setTimeout(() => {
      try {
        note.osc1.stop();
        note.osc2.stop();
      } catch (_) {}
    }, 300);
    this.activeNotes.delete(id);
  }

  playKick(): void {
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.35);

    gain.gain.setValueAtTime(1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.compressor);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  playSnare(): void {
    const now = this.ctx.currentTime;

    // White noise
    const bufferSize = this.ctx.sampleRate * 0.2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.8, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    // Triangle body
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = 200;
    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.7, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    noise.connect(noiseGain);
    osc.connect(oscGain);
    noiseGain.connect(this.compressor);
    oscGain.connect(this.compressor);

    noise.start(now);
    noise.stop(now + 0.22);
    osc.start(now);
    osc.stop(now + 0.14);
  }

  playHihat(open: boolean = false): void {
    const now = this.ctx.currentTime;
    const dur = open ? 0.4 : 0.08;

    const bufferSize = this.ctx.sampleRate * (open ? 0.45 : 0.12);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.compressor);

    noise.start(now);
    noise.stop(now + dur + 0.02);
  }

  playClap(): void {
    const now = this.ctx.currentTime;
    [0, 0.01, 0.02].forEach((offset) => {
      const bufferSize = this.ctx.sampleRate * 0.1;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2000;
      filter.Q.value = 1.5;

      const gain = this.ctx.createGain();
      const t = now + offset;
      gain.gain.setValueAtTime(0.6, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.compressor);
      noise.start(t);
      noise.stop(t + 0.1);
    });
  }

  setMasterVolume(v: number): void {
    const clamped = Math.max(0, Math.min(1, v));
    this.masterGain.gain.setTargetAtTime(clamped, this.ctx.currentTime, 0.02);
  }

  setReverbAmount(v: number): void {
    const wet = Math.max(0, Math.min(1, v));
    const dry = 1 - wet * 0.5;
    this.wetGain.gain.setTargetAtTime(wet, this.ctx.currentTime, 0.02);
    this.dryGain.gain.setTargetAtTime(dry, this.ctx.currentTime, 0.02);
  }

  getFrequencyData(): Uint8Array {
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  getWaveformData(): Uint8Array {
    const data = new Uint8Array(this.analyser.fftSize);
    this.analyser.getByteTimeDomainData(data);
    return data;
  }

  resume(): void {
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }
}
