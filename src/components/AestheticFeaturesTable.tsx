import React from 'react';
import { AestheticFeature } from '../types/curriculum';
import { Sparkles, Palette } from 'lucide-react';
import { ReadAloudButton } from './ReadAloudButton';

interface AestheticFeaturesTableProps {
  features: AestheticFeature[];
  textTitle: string;
}

export const AestheticFeaturesTable: React.FC<AestheticFeaturesTableProps> = ({
  features,
  textTitle,
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-md border-2 border-slate-200 my-8">
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-8 pb-5 border-b-2 border-slate-100">
        <div className="touch-target w-13 h-13 rounded-2xl bg-purple-50 border-2 border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
          <Palette className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-[25px] sm:text-[28px] font-black text-slate-900">
            مظاهر الجمال والتعبيرات البلاغية
          </h2>
          <p className="text-[17px] text-slate-500 font-bold">
            الصور الجمالية والأساليب البلاغية المقررة في الكتاب المدرسي لنص: {textTitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {features.map((f, idx) => {
          const speechText = `التعبير الجمالي: ${f.targetText}. نوع المظهر البلاغي: ${f.deviceType}. الشرح البلاغي: ${f.explanation}. ${
            f.literaryEffect ? `أثره في المعنى: ${f.literaryEffect}. ` : ''
          }إجابة الامتحان النموذجية: ${f.examModelAnswer}`;

          return (
            <div
              key={idx}
              className="p-6 rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-slate-50/70 to-white hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Badges & Read-aloud button */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[17px] font-black px-3.5 py-1 rounded-xl bg-purple-100 text-purple-900 border border-purple-200">
                      {f.deviceType}
                    </span>
                    {f.isTextbookExplicit && (
                      <span className="text-[15px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg font-bold border border-emerald-200">
                        مقرر نصّاً بالوزارة
                      </span>
                    )}
                  </div>

                  <ReadAloudButton
                    id={`aesthetic-${idx}`}
                    textToRead={speechText}
                    label="اقرأ المظهر الجمالي"
                    activeLabel="قراءة..."
                    size="compact"
                    variant="purple"
                  />
                </div>

                {/* Target text quote (large) */}
                <h3 className="font-amiri text-[24px] sm:text-[26px] font-black text-purple-950 mb-3 leading-[1.6]">
                  «{f.targetText}»
                </h3>

                {/* Explanation (21–24px) */}
                <div className="space-y-3">
                  <p className="text-[21px] text-slate-800 leading-[1.8] font-medium">
                    <span className="font-black text-slate-900">الشرح البلاغي: </span>
                    {f.explanation}
                  </p>

                  {f.literaryEffect && (
                    <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 text-[20px] text-indigo-950 leading-[1.7] font-medium">
                      <span className="font-black text-indigo-900">الأثر في المعنى: </span>
                      {f.literaryEffect}
                    </div>
                  )}
                </div>
              </div>

              {/* Exam Model Answer Box */}
              <div className="mt-4 pt-3 border-t-2 border-slate-100 bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
                <div className="flex items-center gap-2 text-[18px] font-black text-purple-950 mb-1">
                  <Sparkles className="w-5 h-5 text-purple-600 shrink-0" />
                  <span>إجابة الامتحان النموذجية:</span>
                </div>
                <p className="text-[20px] text-slate-900 leading-[1.7] font-bold">
                  {f.examModelAnswer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
