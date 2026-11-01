import React, { useState } from 'react';
import { LiteraryText } from '../types/curriculum';
import { AudioBar } from './AudioBar';
import { VocabularyTable } from './VocabularyTable';
import { AestheticFeaturesTable } from './AestheticFeaturesTable';
import { QuestionsSection } from './QuestionsSection';
import { ReadAloudButton } from './ReadAloudButton';
import { Feather, BookOpen, User, CheckCircle, Sparkles } from 'lucide-react';

interface LiteraryTextViewProps {
  text: LiteraryText;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
}

export const LiteraryTextView: React.FC<LiteraryTextViewProps> = ({
  text,
  isCompleted,
  onToggleComplete,
}) => {
  const [activeSentence, setActiveSentence] = useState('');

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* 1. Literary Text Hero Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-9 shadow-xl border-2 border-purple-600/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1.5 rounded-xl bg-purple-500/30 text-purple-200 border border-purple-400/40 text-[17px] font-black">
                {text.unit}
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/15 text-slate-200 border border-white/20 text-[17px] font-bold">
                صفحات الكتاب: {text.pageRange}
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/30 text-indigo-200 border border-indigo-400/40 text-[17px] font-bold">
                ✒️ نصوص أدبية وبلاغة
              </span>
            </div>

            <h1 className="text-[30px] sm:text-[36px] font-black tracking-tight text-white mt-1 leading-[1.3]">
              {text.title}
            </h1>

            <p className="text-[22px] sm:text-[24px] font-bold text-amber-300">
              للشاعر: {text.poet}
            </p>

            <p className="text-[21px] text-purple-100 leading-[1.8] max-w-3xl font-medium">
              {text.generalMeaning}
            </p>

            <div className="pt-2">
              <ReadAloudButton
                id={`hero-lit-${text.id}`}
                textToRead={`نص ${text.title} للشاعر ${text.poet}. الفكرة العامة: ${text.generalMeaning}`}
                label="🔊 اقرأ عنوان وفكرة النص"
                activeLabel="جارٍ قراءة العنوان... (إيقاف)"
                variant="purple"
              />
            </div>
          </div>

          {/* Completion Status Toggle Button */}
          <button
            type="button"
            onClick={() => onToggleComplete(text.id)}
            className={`touch-target px-6 py-4 rounded-2xl font-black text-[20px] flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 cursor-pointer shrink-0 ${
              isCompleted
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 ring-4 ring-amber-300/40'
                : 'bg-white/15 hover:bg-white/25 text-white border-2 border-white/30'
            }`}
          >
            <CheckCircle className={`w-6 h-6 ${isCompleted ? 'fill-current' : ''}`} />
            <span>{isCompleted ? 'تم إتقان النص بنجاح ✓' : 'تحديد النص كمكتمل'}</span>
          </button>
        </div>
      </div>

      {/* 2. Poet Biography Card */}
      <div className="bg-purple-50/80 rounded-3xl p-6 sm:p-7 border-2 border-purple-200 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="touch-target w-13 h-13 rounded-2xl bg-purple-200 text-purple-900 flex items-center justify-center shrink-0 shadow-sm">
            <User className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-black text-purple-950 text-[23px] mb-1">
              بطاقة التعريف بالشاعر / الأديب
            </h3>
            <p className="text-[21px] text-slate-800 leading-[1.8] font-medium">
              {text.authorBio}
            </p>
          </div>
        </div>

        <ReadAloudButton
          id={`bio-${text.id}`}
          textToRead={`التعريف بالشاعر: ${text.authorBio}`}
          label="🔊 اقرأ بطاقة الشاعر"
          activeLabel="قراءة..."
          variant="purple"
          className="self-end sm:self-center shrink-0"
        />
      </div>

      {/* 3. Audio Recitation Bar */}
      <AudioBar
        fullText={text.originalText}
        title={text.title}
        activeSentence={activeSentence}
      />

      {/* 4. Section A: Original Poetry Verses (With individual Read Aloud button for each verse) */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-md border-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b-2 border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="touch-target w-13 h-13 rounded-2xl bg-purple-50 border-2 border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
              <Feather className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-[25px] sm:text-[28px] font-black text-slate-900">
                أ. نص القصيدة الكامل بالتشكيل
              </h2>
              <p className="text-[17px] text-slate-500 font-bold">
                أبيات القصيدة طبق الأصل من الكتاب المدرسي مع زر تلاوة مستقل لكل بيت
              </p>
            </div>
          </div>

          <ReadAloudButton
            id={`read-all-poem-${text.id}`}
            textToRead={text.originalText}
            label="🔊 اقرأ القصيدة كاملة"
            activeLabel="تلاوة القصيدة كاملة..."
            variant="purple"
          />
        </div>

        {/* Verses List */}
        <div className="space-y-5 max-w-4xl mx-auto">
          {text.verses.map((v) => {
            const verseSpeech = `${v.firstHemistich} ... ${v.secondHemistich}`;
            return (
              <div
                key={v.order}
                className="p-5 sm:p-6 rounded-3xl bg-slate-50/90 border-2 border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
              >
                {/* Verse Number Badge & Content */}
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <span className="touch-target w-10 h-10 rounded-xl bg-purple-600 text-white text-[19px] font-black flex items-center justify-center shrink-0 shadow-sm">
                    {v.order}
                  </span>

                  <div className="poetry-verse gap-3 sm:gap-6 flex-1 font-amiri text-[23px] sm:text-[26px] font-bold text-slate-900 leading-[1.7]">
                    <div className="text-right sm:text-left text-purple-950">
                      {v.firstHemistich}
                    </div>
                    <div className="text-[18px] text-purple-400 font-sans font-black flex items-center justify-center">
                      ❖
                    </div>
                    <div className="text-left sm:text-right text-slate-900">
                      {v.secondHemistich}
                    </div>
                  </div>
                </div>

                {/* Individual Read Verse Button */}
                <ReadAloudButton
                  id={`verse-${text.id}-${v.order}`}
                  textToRead={verseSpeech}
                  label="اقرأ البيت"
                  activeLabel="تلاوة البيت..."
                  size="compact"
                  variant="purple"
                  className="self-end md:self-center shrink-0"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Section E: Verse-by-Verse Detailed Explanation */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-md border-2 border-slate-200">
        <div className="flex items-center gap-3.5 mb-8 pb-5 border-b-2 border-slate-100">
          <div className="touch-target w-13 h-13 rounded-2xl bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-[25px] sm:text-[28px] font-black text-slate-900">
              هـ. شرح أبيات النص الأدبي بالتفصيل
            </h2>
            <p className="text-[17px] text-slate-500 font-bold">
              شرح ميسر ووافٍ لمعاني وأبعاد كل بيت مع إمكانية الاستماع
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {text.versesExplanation.map((item) => (
            <div
              key={item.verseOrder}
              className="p-5 sm:p-6 rounded-3xl border-2 border-slate-200/80 bg-slate-50/70 hover:border-indigo-300 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="touch-target w-9 h-9 rounded-xl bg-indigo-600 text-white text-[18px] font-black flex items-center justify-center shrink-0">
                    {item.verseOrder}
                  </span>
                  <span className="font-amiri text-[22px] sm:text-[24px] font-black text-indigo-950">
                    «{item.verseText}»
                  </span>
                </div>

                <ReadAloudButton
                  id={`expl-${text.id}-${item.verseOrder}`}
                  textToRead={`شرح البيت: ${item.verseText}. الشرح هو: ${item.explanation}`}
                  label="🔊 اقرأ الشرح"
                  activeLabel="قراءة الشرح..."
                  size="compact"
                  variant="secondary"
                />
              </div>

              <p className="text-[21px] text-slate-800 leading-[1.8] font-medium pr-2">
                {item.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Section C: Vocabulary Table */}
      <VocabularyTable vocabulary={text.vocabulary} />

      {/* 7. Section D: Aesthetic Features Table */}
      <AestheticFeaturesTable features={text.aestheticFeatures} textTitle={text.title} />

      {/* 8. Section F: Complete Textbook Questions and Answers */}
      <QuestionsSection questions={text.questions} lessonTitle={text.title} />
    </div>
  );
};
