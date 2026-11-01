import React, { useState } from 'react';
import { VocabularyItem } from '../types/curriculum';
import { Search, BookOpen, Volume2, Sparkles } from 'lucide-react';
import { ReadAloudButton } from './ReadAloudButton';

interface VocabularyTableProps {
  vocabulary: VocabularyItem[];
}

export const VocabularyTable: React.FC<VocabularyTableProps> = ({ vocabulary }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = vocabulary.filter(
    (item) =>
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.context && item.context.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-md border-2 border-slate-200 my-8">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-5 border-b-2 border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="touch-target w-13 h-13 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-[25px] sm:text-[28px] font-black text-slate-900">
              معاني الكلمات والمفردات اللغوية
            </h2>
            <p className="text-[17px] text-slate-500 font-bold">
              مفردات الكتاب المدرسي المعتمدة مع الدلالة، والمضاد، والجمع، والاستخدام في السياق
            </p>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-5 h-5 absolute right-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث في الكلمات أو المعاني..."
            className="w-full pl-4 pr-11 py-3 text-[18px] font-bold rounded-2xl border-2 border-slate-200 focus:outline-none focus:ring-4 focus:ring-amber-300 bg-slate-50"
          />
        </div>
      </div>

      {/* MOBILE-FIRST CARD GRID (Ensures text wraps naturally, never shrinks, highly legible for children) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => {
          const speechText = `الكلمة: ${item.word}. المعنى: ${item.meaning}. ${
            item.antonym && item.antonym !== '-' ? `المضاد: ${item.antonym}. ` : ''
          }${
            item.singularOrPlural && item.singularOrPlural !== '-'
              ? `الجمع أو المفرد: ${item.singularOrPlural}. `
              : ''
          }${item.context ? `في سياق الجملة: ${item.context}` : ''}`;

          return (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-slate-50/80 to-white hover:border-amber-400 hover:shadow-md transition-all space-y-3.5 flex flex-col justify-between"
            >
              <div>
                {/* Word & Read Aloud Control */}
                <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[23px] sm:text-[25px] font-black text-emerald-800">
                      {item.word}
                    </span>
                  </div>

                  <ReadAloudButton
                    id={`vocab-word-${idx}`}
                    textToRead={speechText}
                    label="اقرأ الكلمة"
                    activeLabel="قراءة..."
                    size="compact"
                    variant="amber"
                  />
                </div>

                {/* Meaning (21–24px) */}
                <div className="pt-2">
                  <div className="text-[17px] font-bold text-slate-500 mb-0.5">المعنى والدلالة:</div>
                  <p className="text-[21px] sm:text-[22px] font-black text-slate-900 leading-[1.6]">
                    {item.meaning}
                  </p>
                </div>

                {/* Antonym and Plural/Singular Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.antonym && item.antonym !== '-' && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 flex-1 min-w-[120px]">
                      <span className="text-[16px] font-bold text-rose-700 block">المضاد (المعاكس):</span>
                      <span className="text-[19px] sm:text-[20px] font-black">{item.antonym}</span>
                    </div>
                  )}

                  {item.singularOrPlural && item.singularOrPlural !== '-' && (
                    <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-950 flex-1 min-w-[120px]">
                      <span className="text-[16px] font-bold text-indigo-700 block">المفرد / الجمع:</span>
                      <span className="text-[19px] sm:text-[20px] font-black">{item.singularOrPlural}</span>
                    </div>
                  )}
                </div>

                {/* Context in Lesson */}
                {item.context && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-[18px] text-slate-800 leading-[1.6]">
                    <span className="font-bold text-amber-900">سياق الجملة: </span>
                    <span className="italic">«{item.context}»</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-400 text-[20px] font-bold">
          لم يتم العثور على كلمات مطابقة لبحثك. جرب كتابة كلمة أخرى!
        </div>
      )}
    </div>
  );
};
