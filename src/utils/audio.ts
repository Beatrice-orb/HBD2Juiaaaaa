/**
 * Web Audio API synthesizer for sound effects and gentle music box BGM
 * No external assets required - 100% reliable and instantaneous!
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmTimeout: number | null = null;
  private isBgmPlaying: boolean = false;
  private bgmOscillators: OscillatorNode[] = [];

  private init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBgm();
    } else {
      this.playBgm();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getIsBgmPlaying(): boolean {
    return this.isBgmPlaying;
  }

  // Pop sound for UI interactions
  public playPop() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // AudioContext failed
    }
  }

  // Cute chime/sparkle for toppings or gifts
  public playSparkle() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.15, this.ctx!.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + idx * 0.05 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + idx * 0.05);
        osc.stop(this.ctx!.currentTime + idx * 0.05 + 0.2);
      });
    } catch {
      // ignore
    }
  }

  // Blow candle sound (wind puff)
  public playBlow() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch {
      // ignore
    }
  }

  // Celebration fanfare
  public playFanfare() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [
        { f: 523.25, d: 0.12, t: 0 },
        { f: 659.25, d: 0.12, t: 0.12 },
        { f: 783.99, d: 0.15, t: 0.24 },
        { f: 1046.5, d: 0.4, t: 0.39 },
      ];
      notes.forEach(({ f, d, t }) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime + t);

        gain.gain.setValueAtTime(0.25, this.ctx!.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + t + d);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + t);
        osc.stop(this.ctx!.currentTime + t + d);
      });
    } catch {
      // ignore
    }
  }

  // Camera shutter sound for photo wall
  public playCamera() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.setValueAtTime(400, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // ignore
    }
  }

  // Music Box "Happy Birthday" BGM loop
  public playBgm() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    this.stopBgm();
    this.isBgmPlaying = true;

    // "Happy Birthday to You" notes: (freq in Hz, duration in beats)
    // Scale: G4=392, A4=440, B4=493.88, C5=523.25, D5=587.33, E5=659.25, F5=698.46, G5=783.99
    const tempo = 0.38; // seconds per beat
    const melody = [
      { f: 392, d: 0.75 }, { f: 392, d: 0.25 }, { f: 440, d: 1 }, { f: 392, d: 1 }, { f: 523.25, d: 1 }, { f: 493.88, d: 2 },
      { f: 392, d: 0.75 }, { f: 392, d: 0.25 }, { f: 440, d: 1 }, { f: 392, d: 1 }, { f: 587.33, d: 1 }, { f: 523.25, d: 2 },
      { f: 392, d: 0.75 }, { f: 392, d: 0.25 }, { f: 783.99, d: 1 }, { f: 659.25, d: 1 }, { f: 523.25, d: 1 }, { f: 493.88, d: 1 }, { f: 440, d: 1 },
      { f: 698.46, d: 0.75 }, { f: 698.46, d: 0.25 }, { f: 659.25, d: 1 }, { f: 523.25, d: 1 }, { f: 587.33, d: 1 }, { f: 523.25, d: 2.5 }
    ];

    let totalDuration = 0;
    melody.forEach(note => totalDuration += note.d * tempo);

    const playLoop = () => {
      if (!this.isBgmPlaying || this.isMuted || !this.ctx) return;
      let timeOffset = 0;

      melody.forEach(note => {
        const noteTime = this.ctx!.currentTime + timeOffset;
        
        // Main celesta chime
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, noteTime);

        // Music box envelope (instant attack, gentle decay)
        const dur = note.d * tempo;
        gain.gain.setValueAtTime(0.08, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + Math.max(dur * 0.9, 0.2));

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(noteTime);
        osc.stop(noteTime + dur);
        this.bgmOscillators.push(osc);

        timeOffset += dur;
      });

      this.bgmTimeout = window.setTimeout(() => {
        if (this.isBgmPlaying) {
          playLoop();
        }
      }, (totalDuration + 1.2) * 1000);
    };

    playLoop();
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimeout) {
      clearTimeout(this.bgmTimeout);
      this.bgmTimeout = null;
    }
    this.bgmOscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // already stopped
      }
    });
    this.bgmOscillators = [];
  }
}

export const sound = new SoundManager();
