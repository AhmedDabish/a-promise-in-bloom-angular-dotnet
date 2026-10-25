import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private context: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gain: GainNode | null = null;
  private isPlaying = false;

  get playing(): boolean { return this.isPlaying; }

  async toggle(): Promise<boolean> {
    if (this.isPlaying) { this.stop(); return false; }
    try {
      this.context ??= new AudioContext();
      if (this.context.state === 'suspended') await this.context.resume();
      this.oscillator = this.context.createOscillator();
      this.gain = this.context.createGain();
      const lfo = this.context.createOscillator();
      const lfoGain = this.context.createGain();
      this.oscillator.type = 'sine';
      this.oscillator.frequency.value = 174.61;
      lfo.frequency.value = 0.12;
      lfoGain.gain.value = 7;
      this.gain.gain.value = 0.035;
      lfo.connect(lfoGain);
      lfoGain.connect(this.oscillator.frequency);
      this.oscillator.connect(this.gain);
      this.gain.connect(this.context.destination);
      lfo.start(); this.oscillator.start();
      this.isPlaying = true;
      return true;
    } catch { return false; }
  }

  private stop(): void {
    try { this.oscillator?.stop(); } catch { /* already stopped */ }
    this.oscillator = null;
    this.isPlaying = false;
  }
}
