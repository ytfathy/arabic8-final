export type CategoryType = 'reading' | 'literature' | 'grammar' | 'listening' | 'spelling' | 'audit' | 'final_review';

export interface VocabularyItem {
  word: string;
  meaning: string;
  antonym?: string;
  singularOrPlural?: string;
  context?: string;
  isTextbookOriginal: boolean;
}

export interface QuestionItem {
  id: string;
  type: 'mcq' | 'true_false' | 'open' | 'parsing' | 'extraction' | 'error_correction' | 'transformation' | 'fill_in';
  question: string;
  originalSentence?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  acceptableVariations?: string[];
  sourcePage?: string;
}

export interface ReadingParagraph {
  order: number;
  heading?: string;
  content: string;
}

export interface ReadingLesson {
  id: string;
  title: string;
  category: 'reading';
  unit: string;
  unitOrder: number;
  pageRange: string;
  originalText: string;
  paragraphs: ReadingParagraph[];
  mainIdea: string;
  subIdeas: string[];
  lessonsLearned: string[];
  vocabulary: VocabularyItem[];
  questions: QuestionItem[];
  coverage: {
    textbookPages: string;
    questionsCount: number;
    solvedCount: number;
    audioSupported: boolean;
    auditStatus: 'verified' | 'review_required';
  };
}

export interface PoetryVerse {
  order: number;
  firstHemistich: string; // الصدر
  secondHemistich: string; // العجز
}

export interface AestheticFeature {
  targetText: string;
  deviceType: 'تشبيه' | 'استعارة' | 'كناية' | 'أسلوب توكيد' | 'أسلوب أمر' | 'أسلوب نداء' | 'أسلوب نهي' | 'تضاد / مقابلة' | 'إيحاء ودلالة لفظية' | 'إيقاع وموسيقى';
  explanation: string;
  literaryEffect: string;
  examModelAnswer: string;
  isTextbookExplicit: boolean;
}

export interface LiteraryText {
  id: string;
  title: string;
  category: 'literature';
  unit: string;
  unitOrder: number;
  pageRange: string;
  poet: string;
  authorBio: string;
  verses: PoetryVerse[];
  originalText: string;
  generalMeaning: string;
  versesExplanation: {
    verseOrder: number;
    verseText: string;
    explanation: string;
  }[];
  vocabulary: VocabularyItem[];
  aestheticFeatures: AestheticFeature[];
  questions: QuestionItem[];
  coverage: {
    textbookPages: string;
    questionsCount: number;
    solvedCount: number;
    audioSupported: boolean;
    auditStatus: 'verified' | 'review_required';
  };
}

export interface GrammarRuleCase {
  title: string;
  description: string;
  signs: string[];
  examples: string[];
}

export interface ParsingExample {
  sentence: string;
  targetedWord: string;
  grammaticalFunction: string;
  fullParsing: string;
  reason: string;
  isTextbookOriginal: boolean;
}

export interface GrammarLesson {
  id: string;
  title: string;
  category: 'grammar';
  unit: string;
  unitOrder: number;
  pageRange: string;
  originalDefinition: string;
  originalText: string;
  rule: {
    title: string;
    definition: string;
    conditions: string[];
    cases: GrammarRuleCase[];
    exceptions: string[];
    steps: string[];
    summary: string;
  };
  examples: ParsingExample[];
  exercises: QuestionItem[];
  coverage: {
    textbookPages: string;
    exercisesCount: number;
    solvedCount: number;
    auditStatus: 'verified' | 'review_required';
  };
}

export interface ListeningLesson {
  id: string;
  title: string;
  category: 'listening';
  unit: string;
  pageRange: string;
  scriptPage: string;
  narrator?: string;
  originalText: string;
  mainIdea: string;
  lessonsLearned: string[];
  questions: QuestionItem[];
}

export interface SpellingLesson {
  id: string;
  title: string;
  category: 'spelling';
  unit: string;
  pageRange: string;
  rule: string;
  examples: string[];
  exercises: QuestionItem[];
}

export interface CoverageAuditItem {
  id: string;
  title: string;
  category: 'قراءة' | 'نصوص' | 'نحو' | 'استماع' | 'إملاء وتعبير';
  unit: string;
  textbookPages: string;
  questionsFound: number;
  questionsAnswered: number;
  exercisesFound: number;
  exercisesSolved: number;
  audioStatus: 'يعمل بالنطق الصوتي الفوري' | 'جاهز ومفعل' | 'قيد التحقق';
  auditStatus: 'تم التدقيق والمطابقة بنسبة 100%' | 'يتطلب مراجعة يدوية';
  notes: string;
}
