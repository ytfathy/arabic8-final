import React from 'react';
import { GrammarLesson } from '../types/curriculum';
import { GrammarRuleCard } from './GrammarRuleCard';
import { GrammarExamplesTable } from './GrammarExamplesTable';
import { QuestionsSection } from './QuestionsSection';
import { ReadAloudButton } from './ReadAloudButton';
import { BookMarked, CheckCircle, Scale, Sparkles } from 'lucide-react';

interface GrammarLessonViewProps {
  lesson: GrammarLesson;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
}

export const GrammarLessonView: React.FC<GrammarLessonViewProps> = ({
  lesson,
  isCompleted,
  onToggleComplete,
}) => {
  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* 1. Grammar Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-9 shadow-xl border-2 border-blue-600/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1.5 rounded-xl bg-blue-500/30 text-blue-200 border border-blue-400/40 text-[17px] font-black">
                {lesson.unit}
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/15 text-slate-200 border border-white/20 text-[17px] font-bold">
                صفحات الكتاب: {lesson.pageRange}
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/30 text-indigo-200 border border-indigo-400/40 text-[17px] font-bold">
                ⚖️ قواعد النحو والإعراب
              </span>
            </div>

            <h1 className="text-[30px] sm:text-[36px] font-black tracking-tight text-white mt-1 leading-[1.3]">
              {lesson.title}
            </h1>

            <p className="text-[21px] text-blue-100 leading-[1.8] max-w-3xl font-medium">
              {lesson.rule.summary}
            </p>

            <div className="pt-2">
              <ReadAloudButton
                id={`hero-grammar-${lesson.id}`}
                textToRead={`درس النحو: ${lesson.title}. خلاصة القاعدة: ${lesson.rule.summary}`}
                label="🔊 اقرأ عنوان وخلاصة القاعدة"
                activeLabel="جارٍ قراءة العنوان... (إيقاف)"
                variant="primary"
              />
            </div>
          </div>

          {/* Completion Status Toggle Button */}
          <button
            type="button"
            onClick={() => onToggleComplete(lesson.id)}
            className={`touch-target px-6 py-4 rounded-2xl font-black text-[20px] flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 cursor-pointer shrink-0 ${
              isCompleted
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 ring-4 ring-amber-300/40'
                : 'bg-white/15 hover:bg-white/25 text-white border-2 border-white/30'
            }`}
          >
            <CheckCircle className={`w-6 h-6 ${isCompleted ? 'fill-current' : ''}`} />
            <span>{isCompleted ? 'تم إتقان القاعدة بنجاح ✓' : 'تحديد الدرس كمكتمل'}</span>
          </button>
        </div>
      </div>

      {/* 2. Grammar Rule & Definition Cards */}
      <GrammarRuleCard lesson={lesson} />

      {/* 3. Examples & Full Parsing Table */}
      <GrammarExamplesTable examples={lesson.examples} lessonTitle={lesson.title} />

      {/* 4. Complete Grammar Exercises & Interactive Practice */}
      <div className="mt-8">
        <QuestionsSection questions={lesson.exercises} lessonTitle={lesson.title} />
      </div>
    </div>
  );
};
