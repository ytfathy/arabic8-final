import React, { useState } from 'react';
import { spellingLessons } from '../data/supplementaryData';
import { QuestionsSection } from './QuestionsSection';
import { ReadAloudButton } from './ReadAloudButton';
import { PenTool, CheckCircle, BookOpen } from 'lucide-react';

export const SpellingView: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = spellingLessons[selectedIdx];

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* 1. Spelling Header */}
      <div className="bg-gradient-to-r from-orange-950 via-slate-900 to-amber-950 text-white rounded-3xl p-6 sm:p-9 shadow-xl border-2 border-orange-700/50">
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <span className="px-3.5 py-1.5 rounded-xl bg-orange-500/30 text-orange-200 border border-orange-400/40 text-[17px] font-black">
            القواعد الإملائية المقررة بالكتاب المدرسي
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-white/15 text-slate-200 border border-white/20 text-[17px] font-bold">
            ضوابط الرسم الإملائي
          </span>
        </div>

        <h1 className="text-[30px] sm:text-[36px] font-black text-white mt-1 leading-[1.3]">
          قواعد الإملاء والتطبيقات الكتابية
        </h1>
        <p className="text-[21px] text-orange-100 max-w-3xl mt-2 leading-[1.8] font-medium">
          قواعد الرسم الإملائي المعتمدة بالأمثلة والتصويبات النموذجية وفقاً لكتاب وزارة التربية والتعليم.
        </p>

        {/* Tab selector */}
        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-white/15">
          {spellingLessons.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`touch-target px-5 py-3 rounded-2xl text-[19px] sm:text-[20px] font-black transition-all cursor-pointer ${
                selectedIdx === idx
                  ? 'bg-amber-400 text-amber-950 shadow-lg ring-4 ring-amber-300/40'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Rule Details Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-md border-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b-2 border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="touch-target w-13 h-13 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
              <PenTool className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-[25px] sm:text-[28px] font-black text-slate-900">{current.title}</h2>
              <p className="text-[17px] text-slate-500 font-bold">
                {current.unit} • صفحات الكتاب: {current.pageRange}
              </p>
            </div>
          </div>

          <ReadAloudButton
            id={`spelling-rule-${current.id}`}
            textToRead={`قاعدة: ${current.title}. ${current.rule}`}
            label="🔊 اقرأ قاعدة الإملاء"
            activeLabel="قراءة القاعدة..."
            variant="amber"
          />
        </div>

        {/* Rule Content (21–24px) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/50 border-2 border-amber-200 mb-8 space-y-4">
          <div className="flex items-center gap-2.5 text-amber-950 font-black text-[23px]">
            <BookOpen className="w-6 h-6 text-amber-700" />
            <span>ضوابط وقواعد الرسم الإملائي:</span>
          </div>

          <p className="text-slate-900 text-[21px] sm:text-[23px] leading-[1.8] whitespace-pre-line font-medium">
            {current.rule}
          </p>
        </div>

        {/* Examples Grid with individual read aloud */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-black text-slate-900 text-[23px]">
              نماذج وتطبيقات من الكتاب المدرسي:
            </h3>

            <ReadAloudButton
              id={`spelling-ex-all-${current.id}`}
              textToRead={current.examples.join('، ')}
              label="اقرأ جميع النماذج"
              size="compact"
              variant="secondary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {current.examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50/80 border-2 border-slate-200 text-[20px] sm:text-[21px] font-black text-indigo-950 flex items-center justify-between gap-2.5"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                  <span className="truncate">{ex}</span>
                </div>

                <ReadAloudButton
                  id={`spelling-ex-${current.id}-${idx}`}
                  textToRead={ex}
                  label="اقرأ"
                  size="icon-only"
                  variant="subtle"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Exercises */}
        <QuestionsSection questions={current.exercises} lessonTitle={current.title} />
      </div>
    </div>
  );
};
