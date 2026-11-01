/**
 * Web Audio API Sound Effects Synthesizer & Confetti Engine
 * Zero external MP3 assets - reliable and instant across all browsers.
 */

import confetti from 'canvas-confetti';

class SoundEffectsEngine {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  /**
   * Cheerful success chime (C5 -> E5 -> G5 -> C6 arpeggio)
   */
  public playSuccessChime() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const startTime = ctx.currentTime;

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime + index * 0.08);

      gain.gain.setValueAtTime(0, startTime + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.25, startTime + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + index * 0.08 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + index * 0.08);
      osc.stop(startTime + index * 0.08 + 0.5);
    });
  }

  /**
   * Magical spinning flash whoosh sound for mascot entrance
   */
  public playSpinWhoosh() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const startTime = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    // Frequency sweep upward like magic whoosh
    osc.frequency.setValueAtTime(260, startTime);
    osc.frequency.exponentialRampToValueAtTime(980, startTime + 0.35);
    osc.frequency.exponentialRampToValueAtTime(600, startTime + 0.6);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, startTime);
    filter.frequency.linearRampToValueAtTime(2400, startTime + 0.3);

    gain.gain.setValueAtTime(0.01, startTime);
    gain.gain.linearRampToValueAtTime(0.2, startTime + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.7);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.75);
  }

  /**
   * Gentle, encouraging tone on incorrect attempt
   */
  public playGentleEncouragement() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const startTime = ctx.currentTime;
    const notes = [440, 392]; // A4 -> G4 gentle descending
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime + idx * 0.15);

      gain.gain.setValueAtTime(0.01, startTime + idx * 0.15);
      gain.gain.linearRampToValueAtTime(0.15, startTime + idx * 0.15 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + idx * 0.15 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + idx * 0.15);
      osc.stop(startTime + idx * 0.15 + 0.4);
    });
  }

  /**
   * Snappy click sound for card selection
   */
  public playClick() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const startTime = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, startTime);
    osc.frequency.exponentialRampToValueAtTime(400, startTime + 0.05);

    gain.gain.setValueAtTime(0.12, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.06);
  }

  /**
   * Multi-colored celebratory confetti explosion
   */
  public fireConfetti() {
    try {
      // Primary burst
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#10B981', '#3B82F6', '#F59E0B', '#EC4899', '#8B5CF6'],
      });

      // Side bursts
      setTimeout(() => {
        confetti({
          particleCount: 25,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#10B981', '#F59E0B', '#3B82F6'],
        });
        confetti({
          particleCount: 25,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#10B981', '#EC4899', '#8B5CF6'],
        });
      }, 150);
    } catch {
      // Confetti fallback if canvas not available
    }
  }
}

export const soundEffects = new SoundEffectsEngine();
