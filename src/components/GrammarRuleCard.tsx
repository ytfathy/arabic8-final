import React from 'react';
import { GrammarLesson } from '../types/curriculum';
import { BookOpen, CheckCircle, AlertTriangle, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { ReadAloudButton } from './ReadAloudButton';

interface GrammarRuleCardProps {
  lesson: GrammarLesson;
}

export const GrammarRuleCard: React.FC<GrammarRuleCardProps> = ({ lesson }) => {
  const { rule, originalDefinition } = lesson;

  return (
    <div className="space-y-8 my-8">
      {/* 1. Original Definition Box (Large 22–24px with Read Aloud) */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-indigo-700/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-indigo-700/60">
          <div className="flex items-center gap-2.5 text-indigo-300 text-[18px] font-black uppercase tracking-wider">
            <BookOpen className="w-6 h-6" />
            <span>تعريف الكتاب المدرسي المعتمد (صفحة {lesson.pageRange})</span>
          </div>

          <ReadAloudButton
            id={`def-${lesson.id}`}
            textToRead={`تعريف القاعدة في الكتاب المدرسي: ${originalDefinition}`}
            label="🔊 اقرأ التعريف"
            activeLabel="قراءة التعريف..."
            variant="primary"
          />
        </div>

        <p className="text-[23px] sm:text-[25px] font-bold leading-[1.8] text-indigo-50">
          «{originalDefinition}»
        </p>
      </div>

      {/* 2. Conditions & Application Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Conditions */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <h3 className="font-black text-slate-900 text-[23px] flex items-center gap-2.5">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
              <span>شروط وضوابط القاعدة</span>
            </h3>

            <ReadAloudButton
              id={`cond-all-${lesson.id}`}
              textToRead={rule.conditions.join('. ')}
              label="اقرأ الشروط"
              size="compact"
              variant="emerald"
            />
          </div>

          <ul className="space-y-3.5">
            {rule.conditions.map((c, idx) => (
              <li key={idx} className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3">
                <span className="touch-target w-7 h-7 rounded-lg bg-emerald-600 text-white text-[16px] font-black flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="text-[21px] text-slate-900 font-bold leading-[1.7]">
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <h3 className="font-black text-slate-900 text-[23px] flex items-center gap-2.5">
              <ArrowRight className="w-6 h-6 text-indigo-600" />
              <span>خطوات التطبيق العملي</span>
            </h3>

            <ReadAloudButton
              id={`steps-all-${lesson.id}`}
              textToRead={rule.steps.join('. ')}
              label="اقرأ الخطوات"
              size="compact"
              variant="secondary"
            />
          </div>

          <ol className="space-y-3.5">
            {rule.steps.map((s, idx) => (
              <li key={idx} className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3">
                <span className="touch-target w-7 h-7 rounded-lg bg-indigo-600 text-white text-[16px] font-black flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-[21px] text-slate-900 font-bold leading-[1.7]">
                  {s}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* 3. Rule Cases & Signs (With individual read buttons) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b-2 border-slate-100">
          <div className="touch-target w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-[25px]">
              حالات القاعدة وعلامات الإعراب والبناء
            </h3>
            <p className="text-[17px] text-slate-500 font-bold">
              جميع أقسام وتفاصيل القاعدة النحوية مع الأمثلة والعلامات الإعرابية
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {rule.cases.map((c, idx) => {
            const speechText = `الحالة: ${c.title}. التوضيح: ${c.description}. العلامات المميزة هي: ${c.signs.join('، ')}. ${
              c.examples && c.examples.length > 0 ? `أمثلة: ${c.examples.join('، ')}` : ''
            }`;

            return (
              <div
                key={idx}
                className="p-6 rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-slate-50/80 to-white hover:border-indigo-300 transition-all space-y-4"
              >
                <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-200">
                  <h4 className="font-black text-indigo-950 text-[22px] sm:text-[23px]">
                    {c.title}
                  </h4>

                  <ReadAloudButton
                    id={`case-${lesson.id}-${idx}`}
                    textToRead={speechText}
                    label="اقرأ الحالة"
                    activeLabel="قراءة..."
                    size="compact"
                    variant="purple"
                  />
                </div>

                <p className="text-[21px] text-slate-800 leading-[1.8] font-medium">
                  {c.description}
                </p>

                {/* Signs */}
                <div className="space-y-2">
                  <span className="text-[17px] font-black text-slate-700 block">
                    العلامات المميزة:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {c.signs.map((sign, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[19px] font-black text-emerald-950 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-300"
                      >
                        {sign}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Examples */}
                {c.examples && c.examples.length > 0 && (
                  <div className="pt-3 border-t border-slate-200">
                    <span className="text-[17px] font-black text-indigo-900 block mb-1">
                      أمثلة توضيحية:
                    </span>
                    <p className="text-[21px] font-bold text-slate-900 leading-[1.7]">
                      {c.examples.join(' • ')}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Exceptions and Warnings */}
      {rule.exceptions && rule.exceptions.length > 0 && (
        <div className="bg-amber-50/90 rounded-3xl p-6 sm:p-7 border-2 border-amber-300 shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-amber-200">
            <h4 className="font-black text-amber-950 text-[23px] flex items-center gap-2.5">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
              <span>تنبيهات واستثناءات الكتاب المدرسي الهامة</span>
            </h4>

            <ReadAloudButton
              id={`exc-${lesson.id}`}
              textToRead={rule.exceptions.join('. ')}
              label="اقرأ التنبيهات"
              size="compact"
              variant="amber"
            />
          </div>

          <ul className="space-y-3">
            {rule.exceptions.map((ex, idx) => (
              <li key={idx} className="text-[21px] text-amber-950 leading-[1.8] font-bold flex items-start gap-3">
                <span className="text-amber-600 font-black text-[22px]">•</span>
                <span>{ex}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 5. Summary Box */}
      <div className="bg-gradient-to-r from-slate-100 to-indigo-50/60 rounded-3xl p-6 border-2 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[18px] font-black text-indigo-950 block mb-1">خلاصة القاعدة النحوية:</span>
          <p className="text-[21px] text-slate-800 leading-[1.8] font-bold">
            {rule.summary}
          </p>
        </div>

        <ReadAloudButton
          id={`summary-${lesson.id}`}
          textToRead={`خلاصة القاعدة: ${rule.summary}`}
          label="اقرأ الخلاصة"
          size="compact"
          variant="secondary"
          className="self-end sm:self-center shrink-0"
        />
      </div>
    </div>
  );
};
