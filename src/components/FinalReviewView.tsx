import React, { useState } from 'react';
import { readingLessons } from '../data/readingLessonsData';
import { literaryTexts } from '../data/literaryTextsData';
import { grammarLessons } from '../data/grammarLessonsData';
import { QuestionsSection } from './QuestionsSection';
import { Award, BookOpen, Feather, PenTool, CheckCircle, Sparkles } from 'lucide-react';
import { ReadAloudButton } from './ReadAloudButton';

export const FinalReviewView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'reading' | 'literature' | 'grammar'>('all');

  const allReadingQuestions = readingLessons.flatMap((l) =>
    l.questions.map((q) => ({ ...q, sourcePage: `${l.title} (${q.sourcePage || ''})` }))
  );

  const allLiteratureQuestions = literaryTexts.flatMap((l) =>
    l.questions.map((q) => ({ ...q, sourcePage: `${l.title} (${q.sourcePage || ''})` }))
  );

  const allGrammarQuestions = grammarLessons.flatMap((l) =>
    l.exercises.map((q) => ({ ...q, sourcePage: `${l.title} (${q.sourcePage || ''})` }))
  );

  const totalQuestions =
    allReadingQuestions.length + allLiteratureQuestions.length + allGrammarQuestions.length;

  const currentQuestions =
    activeTab === 'reading'
      ? allReadingQuestions
      : activeTab === 'literature'
      ? allLiteratureQuestions
      : activeTab === 'grammar'
      ? allGrammarQuestions
      : [...allReadingQuestions, ...allLiteratureQuestions, ...allGrammarQuestions];

  const currentTitle =
    activeTab === 'reading'
      ? 'بنك أسئلة القراءة والفهم القرائي'
      : activeTab === 'literature'
      ? 'بنك أسئلة النصوص والبلاغة الأدبية'
      : activeTab === 'grammar'
      ? 'بنك أسئلة وتدريبات النحو الشاملة'
      : 'الاختبار النهائي الشامل لجميع فروع المنهج';

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* 1. Final Review Hero Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-9 shadow-xl border-2 border-amber-600/50">
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/30 text-amber-300 border border-amber-400/40 text-[17px] font-black flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>المراجعة النهائية الشاملة للفصل الدراسي الأول</span>
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-white/15 text-slate-200 border border-white/20 text-[17px] font-bold">
            {totalQuestions} سؤالاً وتدريباً وزارياً
          </span>
        </div>

        <h1 className="text-[30px] sm:text-[36px] font-black text-white mt-1 leading-[1.3]">
          بنك الأسئلة الشامل واختبارات نصف العام
        </h1>
        <p className="text-[21px] text-slate-200 max-w-3xl mt-2 leading-[1.8] font-medium">
          تدرّب على أسئلة امتحانات وزارة التربية والتعليم لمحافظات الجمهورية، مع إمكانية الاستماع لكل سؤال وخيار بالصوت الواضح.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-white/15">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`touch-target px-5 py-3 rounded-2xl text-[19px] sm:text-[20px] font-black transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-amber-400 text-amber-950 shadow-lg ring-4 ring-amber-300/40'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            🌟 جميع فروع المنهج ({totalQuestions})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reading')}
            className={`touch-target px-5 py-3 rounded-2xl text-[19px] sm:text-[20px] font-black transition-all cursor-pointer ${
              activeTab === 'reading'
                ? 'bg-emerald-500 text-slate-950 shadow-lg ring-4 ring-emerald-300/40'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            📖 القراءة ({allReadingQuestions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('literature')}
            className={`touch-target px-5 py-3 rounded-2xl text-[19px] sm:text-[20px] font-black transition-all cursor-pointer ${
              activeTab === 'literature'
                ? 'bg-purple-500 text-white shadow-lg ring-4 ring-purple-300/40'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            ✒️ النصوص ({allLiteratureQuestions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('grammar')}
            className={`touch-target px-5 py-3 rounded-2xl text-[19px] sm:text-[20px] font-black transition-all cursor-pointer ${
              activeTab === 'grammar'
                ? 'bg-blue-500 text-white shadow-lg ring-4 ring-blue-300/40'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            ⚖️ النحو ({allGrammarQuestions.length})
          </button>
        </div>
      </div>

      {/* Questions Module */}
      <QuestionsSection questions={currentQuestions} lessonTitle={currentTitle} />
    </div>
  );
};
