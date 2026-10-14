/**
 * Web Audio Synthesizer for Cinematic Sound Effects & Ambient Music
 * Works 100% offline and in all browsers without external dependencies.
 */

class SoundSystem {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private musicGainNode: GainNode | null = null;
  private isMusicPlaying: boolean = false;
  private musicInterval: number | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private customAudioUrl: string | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.musicGainNode && this.ctx) {
      this.musicGainNode.gain.setValueAtTime(muted ? 0 : 0.15, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.muted = muted;
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getMusicPlaying(): boolean {
    return this.isMusicPlaying;
  }

  // Cinematic deep bass whoosh
  public playWhoosh() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.8);

      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.7);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.85);
    } catch {
      // Ignore audio errors
    }
  }

  // Declassify / dossier mystery unlock beep & sweep
  public playUnlock() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + index * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.01, start);
        gain.gain.linearRampToValueAtTime(0.12, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.26);
      });
    } catch {
      // Ignore
    }
  }

  // Celebratory birthday fanfare
  public playFanfare() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const chords = [
        [523.25, 659.25, 783.99], // C
        [587.33, 739.99, 880.00], // D
        [659.25, 830.61, 987.77], // E
        [1046.50, 1318.51, 1567.98] // C high
      ];

      chords.forEach((chord, step) => {
        const chordTime = ctx.currentTime + step * 0.22;
        chord.forEach(freq => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, chordTime);

          const dur = step === chords.length - 1 ? 0.9 : 0.2;
          gain.gain.setValueAtTime(0.01, chordTime);
          gain.gain.linearRampToValueAtTime(0.08, chordTime + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, chordTime + dur);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(chordTime);
          osc.stop(chordTime + dur + 0.05);
        });
      });
    } catch {
      // Ignore
    }
  }

  // Confetti pop sound
  public playConfettiPop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      // Noise burst + low boom
      const bufferSize = ctx.sampleRate * 0.1;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(ctx.currentTime);
      noise.stop(ctx.currentTime + 0.16);

      // Sparkle ping
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, ctx.currentTime + 0.05);
      osc.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + 0.2);
      oscGain.gain.setValueAtTime(0.08, ctx.currentTime + 0.05);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(ctx.currentTime + 0.05);
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Ignore
    }
  }

  // Blow out candle sound (soft breath whoosh)
  public playCandleBlow() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(ctx.currentTime);
      noise.stop(ctx.currentTime + 0.45);
    } catch {
      // Ignore
    }
  }

  // Click & tap sound
  public playClick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Ignore
    }
  }

  // Card flip / paper ruffle
  public playCardFlip() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Ignore
    }
  }

  // Ambient synth music player (generative warm cinematic chords)
  public startAmbientMusic() {
    if (this.isMusicPlaying) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // If custom audio element exists, play it
    if (this.customAudio) {
      this.customAudio.play().catch(() => {});
      this.isMusicPlaying = true;
      return;
    }

    try {
      if (!this.musicGainNode) {
        this.musicGainNode = ctx.createGain();
        this.musicGainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.12, ctx.currentTime);
        this.musicGainNode.connect(ctx.destination);
      }

      this.isMusicPlaying = true;

      // Chord progression: Dm -> Bb -> F -> C (atmospheric & inspiring)
      const chordNotes = [
        [293.66, 349.23, 440.0, 587.33], // Dm9
        [233.08, 293.66, 349.23, 466.16], // Bbmaj7
        [349.23, 440.0, 523.25, 698.46],  // Fmaj7
        [261.63, 329.63, 392.0, 523.25]   // C
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!this.isMusicPlaying || !this.ctx || !this.musicGainNode) return;
        const now = this.ctx.currentTime;
        const currentChord = chordNotes[chordIndex % chordNotes.length];
        chordIndex++;

        currentChord.forEach((freq, i) => {
          if (!this.ctx || !this.musicGainNode) return;
          const osc = this.ctx.createOscillator();
          const filter = this.ctx.createBiquadFilter();
          const voiceGain = this.ctx.createGain();

          osc.type = i % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          // Subtle slow vibrato
          osc.frequency.linearRampToValueAtTime(freq * 1.002, now + 1.5);
          osc.frequency.linearRampToValueAtTime(freq, now + 3.0);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(650 + i * 150, now);

          // Soft slow envelope
          voiceGain.gain.setValueAtTime(0.001, now);
          voiceGain.gain.linearRampToValueAtTime(0.04, now + 0.8);
          voiceGain.gain.exponentialRampToValueAtTime(0.001, now + 3.4);

          osc.connect(filter);
          filter.connect(voiceGain);
          voiceGain.connect(this.musicGainNode);

          osc.start(now);
          osc.stop(now + 3.5);
        });
      };

      // Play first chord immediately, then every 3.2s
      playChord();
      this.musicInterval = window.setInterval(playChord, 3200);
    } catch {
      // Ignore
    }
  }

  public stopAmbientMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggleMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopAmbientMusic();
      return false;
    } else {
      this.startAmbientMusic();
      return true;
    }
  }

  // Allow custom audio track file or URL
  public setCustomAudio(fileOrUrl: File | string) {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }

    if (typeof fileOrUrl === 'string') {
      this.customAudioUrl = fileOrUrl;
      this.customAudio = new Audio(fileOrUrl);
    } else {
      const url = URL.createObjectURL(fileOrUrl);
      this.customAudioUrl = url;
      this.customAudio = new Audio(url);
    }

    this.customAudio.loop = true;
    this.customAudio.volume = this.isMuted ? 0 : 0.4;

    if (this.isMusicPlaying) {
      this.customAudio.play().catch(() => {});
    }
  }

  public getCustomAudioUrl(): string | null {
    return this.customAudioUrl;
  }
}

export const sounds = new SoundSystem();
