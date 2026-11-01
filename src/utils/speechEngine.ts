/**
 * Audio Speech Engine for Arabic Educational Platform
 * Features:
 * - Natural Arabic pronunciation (ar-EG / ar-SA) with child-friendly speed (0.88 - 0.95)
 * - Active element ID tracking with reactive listener subscriptions
 * - Single-utterance and multi-sentence passage reading
 * - Strict single-voice guarantee (cancels previous speech before starting new)
 * - Stop / pause / resume controls
 * - Graceful error handling
 */

export type SpeechStatus = 'stopped' | 'playing' | 'paused' | 'loading';

export interface SpeechEngineState {
  status: SpeechStatus;
  activeId: string | null;
  activeText: string | null;
  currentSentenceIdx: number;
}

export type StateListener = (state: SpeechEngineState) => void;

class ArabicSpeechEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private status: SpeechStatus = 'stopped';
  private activeId: string | null = null;
  private activeText: string | null = null;
  private sentences: string[] = [];
  private currentSentenceIdx = 0;
  private defaultRate = 0.9;
  private currentRate = 0.9;
  private currentPitch = 1.0;
  private arabicVoice: SpeechSynthesisVoice | null = null;
  private listeners: Set<StateListener> = new Set();

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    try {
      const voices = this.synth.getVoices();
      // Look for Egyptian or Saudi / general Arabic voices
      this.arabicVoice =
        voices.find(v => v.lang === 'ar-EG') ||
        voices.find(v => v.lang.startsWith('ar') && (
          v.name.includes('Natural') ||
          v.name.includes('Google') ||
          v.name.includes('Maged') ||
          v.name.includes('Tarik') ||
          v.name.includes('Laila') ||
          v.name.includes('Salma') ||
          v.name.includes('Naayf') ||
          v.name.includes('Zeina')
        )) ||
        voices.find(v => v.lang.startsWith('ar')) ||
        null;
    } catch (e) {
      console.warn('Voice initialization notice:', e);
    }
  }

  public subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    // Notify immediately with current state
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch (err) {
        console.warn('Listener notification error:', err);
      }
    });
  }

  public getState(): SpeechEngineState {
    return {
      status: this.status,
      activeId: this.activeId,
      activeText: this.activeText,
      currentSentenceIdx: this.currentSentenceIdx,
    };
  }

  public getStatus(): SpeechStatus {
    return this.status;
  }

  public getActiveId(): string | null {
    return this.activeId;
  }

  public isReading(id?: string): boolean {
    if (!id) return this.status === 'playing';
    return this.status === 'playing' && this.activeId === id;
  }

  public setSpeed(newRate: number) {
    this.currentRate = newRate;
    if (this.status === 'playing' && this.sentences.length > 0) {
      const currIdx = this.currentSentenceIdx;
      const currId = this.activeId;
      const currText = this.activeText;
      this.stop();
      if (currId && currText) {
        this.playPassage(currId, currText, currIdx);
      }
    }
  }

  public getSpeed(): number {
    return this.currentRate;
  }

  /**
   * Primary method for individual Read-Aloud buttons across all UI components
   */
  public playItem(id: string, text: string, options?: { rate?: number; pitch?: number; lang?: string }) {
    if (!text || !text.trim()) return;

    // If already playing this item, toggle stop
    if (this.activeId === id && this.status === 'playing') {
      this.stop();
      return;
    }

    // Cancel any previous speech immediately
    this.stop();

    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      return;
    }

    const cleanText = text.trim();
    this.activeId = id;
    this.activeText = cleanText;
    this.status = 'playing';
    this.notify();

    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = options?.lang || (this.arabicVoice?.lang || 'ar-SA');
      utterance.rate = options?.rate || this.defaultRate;
      utterance.pitch = options?.pitch || this.currentPitch;

      if (this.arabicVoice) {
        utterance.voice = this.arabicVoice;
      }

      utterance.onend = () => {
        if (this.activeId === id) {
          this.status = 'stopped';
          this.activeId = null;
          this.activeText = null;
          this.currentUtterance = null;
          this.notify();
        }
      };

      utterance.onerror = (e) => {
        if (e.error !== 'canceled' && e.error !== 'interrupted') {
          console.warn('Speech error for item:', id, e);
        }
        if (this.activeId === id) {
          this.status = 'stopped';
          this.activeId = null;
          this.activeText = null;
          this.currentUtterance = null;
          this.notify();
        }
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch (err) {
      console.warn('Speech execution error:', err);
      this.stop();
    }
  }

  /**
   * Split passage into sentences
   */
  public prepareText(fullText: string): string[] {
    if (!fullText) return [];
    const raw = fullText.split(/(?<=[.!?؟\n])\s+/g);
    this.sentences = raw.map(s => s.trim()).filter(s => s.length > 0);
    return this.sentences;
  }

  /**
   * Play full passage sentence-by-sentence with progress (Used in AudioBar)
   */
  public playPassage(id: string, fullText: string, startIndex = 0) {
    if (!fullText) return;
    this.stop();

    if (!this.synth) return;

    this.activeId = id;
    this.activeText = fullText;
    this.prepareText(fullText);
    if (this.sentences.length === 0) return;

    this.playPassageSentenceAt(startIndex);
  }

  private playPassageSentenceAt(index: number) {
    if (!this.synth || index >= this.sentences.length) {
      this.status = 'stopped';
      this.activeId = null;
      this.activeText = null;
      this.currentUtterance = null;
      this.currentSentenceIdx = 0;
      this.notify();
      return;
    }

    this.currentSentenceIdx = index;
    this.status = 'playing';
    this.notify();

    const sentence = this.sentences[index];
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = this.arabicVoice?.lang || 'ar-SA';
    utterance.rate = this.currentRate || this.defaultRate;
    utterance.pitch = this.currentPitch;

    if (this.arabicVoice) {
      utterance.voice = this.arabicVoice;
    }

    utterance.onend = () => {
      if (this.status === 'playing') {
        this.playPassageSentenceAt(index + 1);
      }
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Passage speech error:', e);
      }
      this.stop();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public getCurrentSentence(): string {
    if (this.sentences.length > 0 && this.currentSentenceIdx < this.sentences.length) {
      return this.sentences[this.currentSentenceIdx];
    }
    return '';
  }

  public pause() {
    if (this.synth && this.status === 'playing') {
      this.synth.pause();
      this.status = 'paused';
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.status === 'paused') {
      this.synth.resume();
      this.status = 'playing';
      this.notify();
    }
  }

  public togglePlayPause() {
    if (this.status === 'playing') {
      this.pause();
    } else if (this.status === 'paused') {
      this.resume();
    }
  }

  public stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        console.warn('Error during synth.cancel():', e);
      }
    }
    this.status = 'stopped';
    this.activeId = null;
    this.activeText = null;
    this.currentUtterance = null;
    this.currentSentenceIdx = 0;
    this.notify();
  }

  /**
   * Backwards compatible method for legacy callers
   */
  public startReading(text: string, startIndex = 0) {
    this.playPassage('global-passage', text, startIndex);
  }

  /**
   * Speak arbitrary text via Arabic synthesizer (one-shot for companion)
   */
  public speakQuickPhrase(text: string, onEnd?: () => void) {
    if (!this.synth) return;
    try {
      this.stop();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 1.0;
      utterance.pitch = 1.15; // slightly higher pitch for cartoon character
      if (this.arabicVoice) {
        utterance.voice = this.arabicVoice;
      }
      utterance.onend = () => {
        this.status = 'stopped';
        this.activeId = null;
        this.notify();
        if (onEnd) onEnd();
      };
      utterance.onerror = () => {
        this.status = 'stopped';
        this.activeId = null;
        this.notify();
      };
      this.status = 'playing';
      this.activeId = 'companion-phrase';
      this.notify();
      this.synth.speak(utterance);
    } catch (e) {
      console.warn('Companion speech error:', e);
      this.stop();
    }
  }

  public speakCompanionWelcome(onEnd?: () => void) {
    const welcome = "أهلاً بكم يا أصدقائي في منصة لغتي الخالدة للصف الثاني الإعدادي! هيا بنا نتعلم ونمرح ونكتشف أسرار لغتنا الجميلة!";
    this.speakQuickPhrase(welcome, onEnd);
  }

  public speakPraise(isCorrect: boolean, onEnd?: () => void) {
    const correctPhrases = [
      "أحسنت يا بطل! إجابة رائعة وممتازة!",
      "ممتاز جداً! استمر في التألق والنجاح!",
      "بطل اللغة العربية! إجابة دقيقة وصحيحة!",
      "أحسنت! إجابتك متقنة وذكية!",
      "رائع! نقطة جديدة تضاف إلى رصيدك يا عبقري!",
    ];

    const encouragementPhrases = [
      "حاول مرة أخرى يا بطل، أنت قادر على ذلك!",
      "لا بأس يا صديقي، الخطوة الأولى للتعلم هي المحاولة، فكر مجدداً!",
      "اقتربت كثيراً! راجع القاعدة وجرب مرة ثانية!",
    ];

    const pool = isCorrect ? correctPhrases : encouragementPhrases;
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    this.speakQuickPhrase(chosen, onEnd);
  }

  public setCallbacks(callbacks: {
    onStatusChange?: (status: SpeechStatus) => void;
    onSentenceChange?: (sentenceIndex: number, text: string) => void;
    onError?: (errorMsg: string) => void;
  }) {
    this.subscribe((state) => {
      callbacks.onStatusChange?.(state.status);
      if (state.activeId === 'global-passage') {
        callbacks.onSentenceChange?.(state.currentSentenceIdx, this.getCurrentSentence());
      }
    });
  }
}

export const speechEngine = new ArabicSpeechEngine();
