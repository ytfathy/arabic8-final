import React from 'react';
import { ParsingExample } from '../types/curriculum';
import { Sparkles } from 'lucide-react';
import { ReadAloudButton } from './ReadAloudButton';

interface GrammarExamplesTableProps {
  examples: ParsingExample[];
  lessonTitle: string;
}

export const GrammarExamplesTable: React.FC<GrammarExamplesTableProps> = ({
  examples,
  lessonTitle,
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-md border-2 border-slate-200 my-8">
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-8 pb-5 border-b-2 border-slate-100">
        <div className="touch-target w-13 h-13 rounded-2xl bg-teal-50 border-2 border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
          <Sparkles className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-[25px] sm:text-[28px] font-black text-slate-900">
            الأمثلة وجداول الإعراب النموذجي المفصل
          </h2>
          <p className="text-[17px] text-slate-500 font-bold">
            نماذج تطبيقية كاملة من الكتاب المدرسي مع الإعراب والتعليل لقاعدة: {lessonTitle}
          </p>
        </div>
      </div>

      {/* MOBILE-FIRST EXAMPLES CARDS (Allows full parsing text to wrap naturally without squishing) */}
      <div className="space-y-5">
        {examples.map((item, idx) => {
          const speechText = `المثال: ${item.sentence}. الكلمة المستهدفة: ${item.targetedWord}. الموقع الإعرابي: ${item.grammaticalFunction}. الإعراب الكامل: ${item.fullParsing}. السبب أو القاعدة: ${item.reason}`;

          return (
            <div
              key={idx}
              className="p-6 rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-slate-50/80 to-white hover:border-teal-400 hover:shadow-md transition-all space-y-4"
            >
              {/* Top Row: Sentence Quote + Targeted Word Badge + Read Aloud Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-slate-100">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="touch-target w-10 h-10 rounded-xl bg-teal-600 text-white text-[19px] font-black flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-[23px] sm:text-[25px] font-black text-slate-900 leading-[1.6]">
                    «{item.sentence}»
                  </span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <ReadAloudButton
                    id={`parse-ex-${idx}`}
                    textToRead={speechText}
                    label="🔊 اقرأ الإعراب"
                    activeLabel="قراءة الإعراب..."
                    size="compact"
                    variant="emerald"
                  />
                </div>
              </div>

              {/* Grid: Targeted Word, Grammatical Function, Reason */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200">
                  <span className="text-[16px] font-bold text-indigo-700 block mb-1">الكلمة المستهدفة:</span>
                  <span className="text-[21px] font-black text-indigo-950">{item.targetedWord}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200">
                  <span className="text-[16px] font-bold text-teal-700 block mb-1">الموقع الإعرابي:</span>
                  <span className="text-[21px] font-black text-teal-950">{item.grammaticalFunction}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200">
                  <span className="text-[16px] font-bold text-slate-600 block mb-1">السبب / القاعدة:</span>
                  <span className="text-[20px] font-bold text-slate-800">{item.reason}</span>
                </div>
              </div>

              {/* Detailed Parsing Box (Large text 21–24px) */}
              <div className="p-4 rounded-2xl bg-white border-2 border-teal-200/80 shadow-xs">
                <div className="text-[17px] font-bold text-teal-800 mb-1">
                  الإعراب الكامل والتفصيلي:
                </div>
                <p className="text-[21px] sm:text-[22px] font-black text-slate-900 leading-[1.8]">
                  {item.fullParsing}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
