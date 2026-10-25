import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private context: AudioContext | null = null;
  private isPlaying = false;
  private timer: any = null;
  private step = 0;

  get playing(): boolean { return this.isPlaying; }

  // Romantic acoustic chord progression (Cmaj7 - Am9 - Fmaj7 - G6)
  private readonly chords: number[][] = [
    [130.81, 196.00, 246.94, 329.63, 392.00], // C3, G3, B3, E4, G4 (Cmaj7)
    [110.00, 164.81, 220.00, 261.63, 329.63], // A2, E3, A3, C4, E4 (Am9)
    [87.31, 130.81, 174.61, 220.00, 261.63],  // F2, C3, F3, A3, C4 (Fmaj7)
    [98.00, 146.83, 196.00, 246.94, 293.66]   // G2, D3, G3, B3, D4 (G6)
  ];

  async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.stop();
      return false;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.context ??= new AudioCtx();
      if (this.context.state === 'suspended') {
        await this.context.resume();
      }

      this.isPlaying = true;
      this.step = 0;
      this.playArpeggio();
      this.timer = setInterval(() => {
        if (this.isPlaying) this.playArpeggio();
      }, 700);

      return true;
    } catch {
      return false;
    }
  }

  private playArpeggio(): void {
    if (!this.context || !this.isPlaying) return;

    const chordIndex = Math.floor((this.step / 8) % this.chords.length);
    const chord = this.chords[chordIndex];
    const noteIndex = this.step % chord.length;
    const freq = chord[noteIndex];
    const now = this.context.currentTime;

    // Create warm plucked sound (Rhodes/Harp hybrid)
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = noteIndex === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Warm envelope (instant attack, slow natural decay)
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(noteIndex === 0 ? 0.09 : 0.05, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc.connect(gain);
    gain.connect(this.context.destination);

    osc.start(now);
    osc.stop(now + 1.85);

    this.step++;
  }

  stop(): void {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
