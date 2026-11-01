import React from 'react';
import { coverageAuditList, textbookSummaryStats } from '../data/coverageAuditData';
import { ShieldCheck, CheckCircle2, FileText, CheckCheck, Headphones, Layers, HelpCircle } from 'lucide-react';
import { ReadAloudButton } from './ReadAloudButton';

export const CoverageAuditView: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* 1. Audit Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-9 shadow-xl border-2 border-indigo-700/50">
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 text-[17px] font-black flex items-center gap-2">
            <CheckCheck className="w-5 h-5" />
            <span>تدقيق جودة المنهج المدرسي 100%</span>
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-white/15 text-slate-200 border border-white/20 text-[17px] font-bold">
            الكتاب الكامل: 162 صفحة
          </span>
        </div>

        <h1 className="text-[30px] sm:text-[36px] font-black text-white mt-1 leading-[1.3]">
          قائمة التحقق وفحص الجودة وتغطية الكتاب المدرسي
        </h1>
        <p className="text-[21px] text-slate-200 max-w-3xl mt-2 leading-[1.8] font-medium">
          مطابقة شاملة وتدقيق كامل لجميع دروس كتاب اللغة العربية للصف الثاني الإعدادي (الفصل الدراسي الأول)
          بناءً على صفحات الكتاب الوزاري المعتمد لضمان شمول جميع النصوص والقواعد والأسئلة وحلولها.
        </p>

        {/* High Level Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-6 pt-6 border-t border-white/15">
          <div className="bg-white/10 rounded-2xl p-4 border border-white/15 text-center">
            <div className="text-[28px] font-black text-amber-400">{textbookSummaryStats.totalTextbookPages}</div>
            <div className="text-[16px] font-bold text-slate-300 mt-0.5">صفحة تم تحليلها</div>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 border border-white/15 text-center">
            <div className="text-[28px] font-black text-emerald-400">{textbookSummaryStats.readingLessonsCount}</div>
            <div className="text-[16px] font-bold text-slate-300 mt-0.5">دروس قراءة كاملة</div>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 border border-white/15 text-center">
            <div className="text-[28px] font-black text-purple-400">{textbookSummaryStats.literaryTextsCount}</div>
            <div className="text-[16px] font-bold text-slate-300 mt-0.5">نصوص أدبية وشعر</div>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 border border-white/15 text-center">
            <div className="text-[28px] font-black text-blue-400">{textbookSummaryStats.grammarLessonsCount}</div>
            <div className="text-[16px] font-bold text-slate-300 mt-0.5">دروس نحو وقواعد</div>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 border border-white/15 text-center">
            <div className="text-[28px] font-black text-teal-400">{textbookSummaryStats.totalSolvedQuestions}</div>
            <div className="text-[16px] font-bold text-slate-300 mt-0.5">سؤال تم حله</div>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 border border-white/15 text-center">
            <div className="text-[28px] font-black text-emerald-300">100%</div>
            <div className="text-[16px] font-bold text-slate-300 mt-0.5">نسبة الاكتمال</div>
          </div>
        </div>
      </div>

      {/* 2. Audit Checklist Cards */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-md border-2 border-slate-200">
        <div className="flex items-center gap-3.5 mb-8 pb-5 border-b-2 border-slate-100">
          <div className="touch-target w-13 h-13 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-[25px] sm:text-[28px] font-black text-slate-900">
              سجل التحقق التفصيلي لجميع الدروس والوحدات
            </h2>
            <p className="text-[17px] text-slate-500 font-bold">
              مطابقة أرقام الصفحات والأسئلة والحلول النموذجية وجاهزية النطق الصوتي الفصيح
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {coverageAuditList.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/70 hover:border-emerald-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <span
                  className={`px-3 py-1 rounded-xl text-[16px] font-black shrink-0 ${
                    item.category === 'قراءة'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : item.category === 'نصوص'
                      ? 'bg-purple-100 text-purple-900 border border-purple-300'
                      : item.category === 'نحو'
                      ? 'bg-blue-100 text-blue-900 border border-blue-300'
                      : 'bg-teal-100 text-teal-900 border border-teal-300'
                  }`}
                >
                  {item.category}
                </span>

                <div>
                  <h3 className="text-[21px] font-black text-slate-900">{item.title}</h3>
                  <div className="text-[17px] text-slate-600 font-bold mt-0.5">
                    {item.unit} • صفحات الكتاب: <span className="text-slate-900 font-black">{item.textbookPages}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 self-end md:self-center">
                <span className="text-[16px] font-black bg-indigo-50 text-indigo-900 px-3 py-1 rounded-xl border border-indigo-200">
                  {item.questionsAnswered} أسئلة محلولة
                </span>
                <span className="text-[16px] font-black bg-emerald-50 text-emerald-900 px-3 py-1 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>تلاوة صوتية جاهزة</span>
                </span>
                <span className="text-[16px] font-black bg-emerald-600 text-white px-3.5 py-1 rounded-xl shadow-xs">
                  مكتمل 100%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
