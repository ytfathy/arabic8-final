import React, { useState } from 'react';
import { listeningLessons } from '../data/supplementaryData';
import { AudioBar } from './AudioBar';
import { QuestionsSection } from './QuestionsSection';
import { ReadAloudButton } from './ReadAloudButton';
import { Headphones, CheckCircle, HeartHandshake, BookOpen } from 'lucide-react';

export const ListeningView: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = listeningLessons[selectedIdx];

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* 1. Listening Header */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-9 shadow-xl border-2 border-teal-600/40">
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <span className="px-3.5 py-1.5 rounded-xl bg-teal-500/30 text-teal-200 border border-teal-400/40 text-[17px] font-black">
            ملحق نصوص الاستماع (ص 149 - 155)
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-white/15 text-slate-200 border border-white/20 text-[17px] font-bold">
            3 نصوص وزارية مقررة
          </span>
        </div>

        <h1 className="text-[30px] sm:text-[36px] font-black text-white mt-1 leading-[1.3]">
          نصوص الاستماع المقررة والمهارات السمعية
        </h1>
        <p className="text-[21px] text-teal-100 max-w-3xl mt-2 leading-[1.8] font-medium">
          نصوص استماع كاملة مطابقة لملحق الكتاب المدرسي مع قراءة صوتية وتدريبات تفاعلية لتنمية الفهم القرائي والسمعي.
        </p>

        {/* Tab selector for the 3 texts with touch targets >= 48x48 */}
        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-white/15">
          {listeningLessons.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`touch-target px-5 py-3 rounded-2xl text-[19px] sm:text-[20px] font-black transition-all cursor-pointer ${
                selectedIdx === idx
                  ? 'bg-teal-400 text-teal-950 shadow-lg ring-4 ring-teal-300/40'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Audio Player for Listening Lesson */}
      <AudioBar
        fullText={current.originalText}
        title={current.title}
        activeSentence=""
      />

      {/* 3. Script & Text Passage */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-md border-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b-2 border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="touch-target w-13 h-13 rounded-2xl bg-teal-50 border-2 border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
              <Headphones className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-[25px] sm:text-[28px] font-black text-slate-900">
                {current.title}
              </h2>
              <p className="text-[17px] text-slate-500 font-bold">
                {current.unit} • صفحات ملحق الكتاب: {current.scriptPage}
              </p>
            </div>
          </div>

          <ReadAloudButton
            id={`listening-passage-${current.id}`}
            textToRead={current.originalText}
            label="🔊 اقرأ نص الاستماع كاملاً"
            activeLabel="تلاوة نص الاستماع..."
            variant="emerald"
          />
        </div>

        {/* The Text Passage (21–24px, 1.8 line height) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50/90 border-2 border-slate-200/80 font-tajawal text-[21px] sm:text-[23px] text-slate-900 leading-[1.8] text-justify mb-8 font-medium">
          {current.originalText}
        </div>

        {/* Values Learned */}
        <div className="p-6 rounded-3xl bg-teal-50/70 border-2 border-teal-200 mb-8 space-y-4">
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-teal-200">
            <h3 className="font-black text-teal-950 text-[23px] flex items-center gap-2.5">
              <HeartHandshake className="w-6 h-6 text-teal-700" />
              <span>القيم والدروس المستفادة من النص:</span>
            </h3>

            <ReadAloudButton
              id={`listen-values-${current.id}`}
              textToRead={current.lessonsLearned.join('. ')}
              label="اقرأ القيم"
              size="compact"
              variant="emerald"
            />
          </div>

          <ul className="space-y-3.5">
            {current.lessonsLearned.map((val, idx) => (
              <li key={idx} className="p-3.5 rounded-2xl bg-white border border-teal-100 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" />
                <span className="text-[21px] font-bold text-slate-900 leading-[1.7]">
                  {val}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Questions */}
        <QuestionsSection questions={current.questions} lessonTitle={current.title} />
      </div>
    </div>
  );
};
