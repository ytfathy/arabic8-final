import React from 'react';
import { 
  BookOpen, 
  Feather, 
  Layers, 
  Trophy, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Headphones, 
  PenTool, 
  FileCheck,
  Award,
  Star
} from 'lucide-react';
import { CompanionMascot } from './CompanionMascot';
import { ReadAloudButton } from './ReadAloudButton';
import { readingLessons } from '../data/readingLessonsData';
import { literaryTexts } from '../data/literaryTextsData';
import { grammarLessons } from '../data/grammarLessonsData';
import { soundEffects } from '../utils/soundEffects';

interface HomeScreenProps {
  onNavigate: (category: string, lessonId?: string) => void;
  completedLessonIds: string[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  completedLessonIds,
}) => {
  // Lesson counts
  const readingCount = readingLessons.length; // 6
  const literatureCount = literaryTexts.length; // 3
  const grammarCount = grammarLessons.length; // 6
  const totalLessons = readingCount + literatureCount + grammarCount; // 15

  // Completed counts per module
  const completedReading = readingLessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const completedLiterature = literaryTexts.filter((t) => completedLessonIds.includes(t.id)).length;
  const completedGrammar = grammarLessons.filter((g) => completedLessonIds.includes(g.id)).length;
  const totalCompleted = completedLessonIds.length;

  // Gamification: XP & Level Calculation
  const xp = totalCompleted * 150 + 200; // Base XP
  const level = Math.floor(xp / 400) + 1;
  const levelTitle =
    level === 1
      ? 'مستكشف الحروف'
      : level === 2
      ? 'فارس المعاني'
      : level === 3
      ? 'أمير البيان'
      : 'علامة اللغة العربية';

  const handleCardClick = (category: string, defaultId?: string) => {
    soundEffects.playClick();
    onNavigate(category, defaultId);
  };

  return (
    <div className="space-y-12 pb-16 select-none">
      {/* 1. HERO MASCOT SECTION WITH ANIMATED WELCOME */}
      <section className="text-center">
        <CompanionMascot mode="hero" autoGreet={false} />
      </section>

      {/* 2. PLAYER XP & PROGRESS BAR (Large readable metrics) */}
      <section className="max-w-5xl mx-auto bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-indigo-800/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="touch-target w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/30 shrink-0">
              <Zap className="w-8 h-8 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-[18px] text-amber-300 font-black">المستوى {level}</span>
                <span className="text-[18px] text-slate-400">•</span>
                <span className="text-[18px] text-slate-200 font-bold">{levelTitle}</span>
              </div>
              <h2 className="text-[23px] sm:text-[26px] font-black tracking-tight mt-0.5">
                رصيد خبرتك: <span className="text-amber-400 tabular-nums">{xp}</span> نقطة تفوق ⭐
              </h2>
            </div>
          </div>

          <div className="w-full md:w-80 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[18px] text-slate-200 font-bold">
              <span>إنجاز المنهج المعتمد:</span>
              <span className="font-black text-amber-400 tabular-nums">
                {Math.round((totalCompleted / totalLessons) * 100)}%
              </span>
            </div>
            <div className="w-full h-4 bg-white/15 rounded-full overflow-hidden p-0.5 border border-white/20">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${Math.max(8, Math.round((totalCompleted / totalLessons) * 100))}%` }}
              />
            </div>
            <div className="text-[17px] text-slate-300 font-bold text-left">
              {totalCompleted} من أصل {totalLessons} درساً مكتملاً
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 4 MAIN MODULE CARDS */}
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <span className="text-[18px] font-black text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-2xl border-2 border-emerald-300 inline-block shadow-xs">
            أقسام المنهج الرئيسية الأربعة
          </span>
          <h2 className="text-[30px] sm:text-[36px] font-black text-slate-900 mt-3 leading-[1.3]">
            اختر البوابة التعليمية وابدأ التعلم والمرح
          </h2>
          <p className="text-[21px] text-slate-600 mt-2 max-w-2xl mx-auto leading-[1.8] font-medium">
            جميع الدروس والنصوص والقواعد مستخرجة طبق الأصل من كتاب وزارة التربية والتعليم المعتمد.
          </p>
        </div>

        {/* 4 Primary Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CARD 1: القراءة */}
          <div
            onClick={() => handleCardClick('reading', readingLessons[0].id)}
            className="group relative bg-white hover:bg-gradient-to-br hover:from-white hover:to-emerald-50/50 rounded-3xl p-7 sm:p-8 border-3 border-emerald-100 hover:border-emerald-400 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between space-y-6"
          >
            <div>
              {/* Top Accent Icon & Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="touch-target w-18 h-18 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-9 h-9" />
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 text-[17px] font-black text-emerald-900 bg-emerald-100 px-3.5 py-1.5 rounded-2xl border border-emerald-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>{completedReading} / {readingCount} مكتمل</span>
                  </span>
                  <div className="text-[17px] text-slate-500 mt-1 font-bold">الوحدات 1، 2، 3</div>
                </div>
              </div>

              {/* Card Title & Content */}
              <div>
                <span className="text-[17px] font-black text-emerald-700 block mb-1">البوابة الأولى</span>
                <h3 className="text-[26px] sm:text-[28px] font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                  ١. القراءة والفهم القرائي
                </h3>
                <p className="text-[21px] text-slate-700 mt-3 leading-[1.8] font-medium">
                  6 دروس قراءة مشوقة: كبرياء طفل، لو أنني ضابط شرطة، نصر أكتوبر العظيم، عالم من ذهب، لغة خالدة، وثمرات العمل.
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-[17px] text-slate-700 font-bold">
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">معاني المفردات</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">تلاوة صوتية طبيعية</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">أنشطة الوزارة</span>
                </div>
              </div>
            </div>

            {/* Read Summary & Enter Action */}
            <div className="pt-4 border-t-2 border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <ReadAloudButton
                id="home-card-reading"
                textToRead="بوابة القراءة والفهم القرائي: تتضمن ستة دروس قراءة مشوقة مع معاني المفردات وتلاوة صوتية وأنشطة الكتاب المدرسي."
                label="اقرأ نبذة البوابة"
                size="compact"
                variant="emerald"
              />

              <div className="flex items-center gap-2 text-emerald-800 font-black text-[20px] group-hover:underline">
                <span>ادخل إلى عالم القراءة</span>
                <div className="touch-target w-11 h-11 rounded-2xl bg-emerald-100 group-hover:bg-emerald-600 text-emerald-700 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: النصوص */}
          <div
            onClick={() => handleCardClick('literature', literaryTexts[0].id)}
            className="group relative bg-white hover:bg-gradient-to-br hover:from-white hover:to-amber-50/50 rounded-3xl p-7 sm:p-8 border-3 border-amber-100 hover:border-amber-400 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between space-y-6"
          >
            <div>
              {/* Top Accent Icon & Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="touch-target w-18 h-18 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-lg shadow-amber-600/30 group-hover:scale-105 transition-transform">
                  <Feather className="w-9 h-9" />
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 text-[17px] font-black text-amber-950 bg-amber-100 px-3.5 py-1.5 rounded-2xl border border-amber-300">
                    <CheckCircle2 className="w-5 h-5 text-amber-600" />
                    <span>{completedLiterature} / {literatureCount} مكتمل</span>
                  </span>
                  <div className="text-[17px] text-slate-500 mt-1 font-bold">شعر وبلاغة</div>
                </div>
              </div>

              {/* Card Title & Content */}
              <div>
                <span className="text-[17px] font-black text-amber-700 block mb-1">البوابة الثانية</span>
                <h3 className="text-[26px] sm:text-[28px] font-black text-slate-900 group-hover:text-amber-800 transition-colors">
                  ٢. النصوص الأدبية والبلاغة
                </h3>
                <p className="text-[21px] text-slate-700 mt-3 leading-[1.8] font-medium">
                  3 روائع شعرية وبلاغية: قصيدة "مصر التي في خاطري"، قصيدة "ريفنا المصري"، وقصيدة "الكد سبيل المعالي" مع الشرح ومظاهر الجمال.
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-[17px] text-slate-700 font-bold">
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">الأبيات الشعرية كاملة</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">مظاهر الجمال البلاغية</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">تراجم الشعراء</span>
                </div>
              </div>
            </div>

            {/* Read Summary & Enter Action */}
            <div className="pt-4 border-t-2 border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <ReadAloudButton
                id="home-card-literature"
                textToRead="بوابة النصوص الأدبية والبلاغة: تتضمن ثلاث قصائد شعرية كاملة مع الشرح ومظاهر الجمال وتراجم الشعراء."
                label="اقرأ نبذة البوابة"
                size="compact"
                variant="amber"
              />

              <div className="flex items-center gap-2 text-amber-900 font-black text-[20px] group-hover:underline">
                <span>استكشف كنوز النصوص</span>
                <div className="touch-target w-11 h-11 rounded-2xl bg-amber-100 group-hover:bg-amber-600 text-amber-700 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: النحو */}
          <div
            onClick={() => handleCardClick('grammar', grammarLessons[0].id)}
            className="group relative bg-white hover:bg-gradient-to-br hover:from-white hover:to-indigo-50/50 rounded-3xl p-7 sm:p-8 border-3 border-indigo-100 hover:border-indigo-400 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between space-y-6"
          >
            <div>
              {/* Top Accent Icon & Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="touch-target w-18 h-18 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                  <Layers className="w-9 h-9" />
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 text-[17px] font-black text-indigo-950 bg-indigo-100 px-3.5 py-1.5 rounded-2xl border border-indigo-300">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                    <span>{completedGrammar} / {grammarCount} مكتمل</span>
                  </span>
                  <div className="text-[17px] text-slate-500 mt-1 font-bold">قواعد وإعراب كامل</div>
                </div>
              </div>

              {/* Card Title & Content */}
              <div>
                <span className="text-[17px] font-black text-indigo-700 block mb-1">البوابة الثالثة</span>
                <h3 className="text-[26px] sm:text-[28px] font-black text-slate-900 group-hover:text-indigo-800 transition-colors">
                  ٣. قواعد النحو والإعراب
                </h3>
                <p className="text-[21px] text-slate-700 mt-3 leading-[1.8] font-medium">
                  6 وحدات نحوية تفصيلية: المعرب والمبني من الأسماء والأفعال والضمائر، وأدوات الشرط الجازمة وغير الجازمة مع نماذج إعراب كاملة.
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-[17px] text-slate-700 font-bold">
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">نماذج إعراب تفصيلية</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">قواعد ملخصة</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">تدريبات تطبيقية</span>
                </div>
              </div>
            </div>

            {/* Read Summary & Enter Action */}
            <div className="pt-4 border-t-2 border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <ReadAloudButton
                id="home-card-grammar"
                textToRead="بوابة قواعد النحو والإعراب: تتضمن ست وحدات نحوية مع الشرح وجداول الإعراب النموذجي والتدريبات التفاعلية."
                label="اقرأ نبذة البوابة"
                size="compact"
                variant="purple"
              />

              <div className="flex items-center gap-2 text-indigo-900 font-black text-[20px] group-hover:underline">
                <span>أتقن قواعد النحو</span>
                <div className="touch-target w-11 h-11 rounded-2xl bg-indigo-100 group-hover:bg-indigo-600 text-indigo-700 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* CARD 4: بنك الأسئلة والمراجعة الشاملة */}
          <div
            onClick={() => handleCardClick('final_review', 'review')}
            className="group relative bg-white hover:bg-gradient-to-br hover:from-white hover:to-sky-50/50 rounded-3xl p-7 sm:p-8 border-3 border-sky-100 hover:border-sky-400 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between space-y-6"
          >
            <div>
              {/* Top Accent Icon & Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="touch-target w-18 h-18 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-sky-600/30 group-hover:scale-105 transition-transform">
                  <Trophy className="w-9 h-9" />
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 text-[17px] font-black text-sky-950 bg-sky-100 px-3.5 py-1.5 rounded-2xl border border-sky-300">
                    <Sparkles className="w-5 h-5 text-sky-600" />
                    <span>شامل لكل الفروع</span>
                  </span>
                  <div className="text-[17px] text-slate-500 mt-1 font-bold">نماذج الامتحانات</div>
                </div>
              </div>

              {/* Card Title & Content */}
              <div>
                <span className="text-[17px] font-black text-sky-700 block mb-1">البوابة الرابعة</span>
                <h3 className="text-[26px] sm:text-[28px] font-black text-slate-900 group-hover:text-sky-800 transition-colors">
                  ٤. بنك الأسئلة والاختبارات
                </h3>
                <p className="text-[21px] text-slate-700 mt-3 leading-[1.8] font-medium">
                  جميع تدريبات وأنشطة الكتاب المدرسي المعتمدة مجمعة في بنك أسئلة متكامل مع إمكانية المذاكرة أو التدريب الذاتي.
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-[17px] text-slate-700 font-bold">
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">تصحيح فوري</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">إجابات نموذجية</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">أصوات تشجيعية</span>
                </div>
              </div>
            </div>

            {/* Read Summary & Enter Action */}
            <div className="pt-4 border-t-2 border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <ReadAloudButton
                id="home-card-review"
                textToRead="بوابة بنك الأسئلة والاختبارات: تتضمن جميع أنشطة وتدريبات الكتاب الوزاري مع التصحيح الفوري والإجابات النموذجية."
                label="اقرأ نبذة البوابة"
                size="compact"
                variant="secondary"
              />

              <div className="flex items-center gap-2 text-sky-900 font-black text-[20px] group-hover:underline">
                <span>ابدأ الاختبارات الشاملة</span>
                <div className="touch-target w-11 h-11 rounded-2xl bg-sky-100 group-hover:bg-sky-600 text-sky-700 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SUPPLEMENTARY CARDS (الاستماع، الإملاء، فحص التغطية) */}
      <section className="max-w-6xl mx-auto">
        <h3 className="text-[26px] font-black text-slate-900 mb-6 text-center">
          الملاحق التعليمية وأدوات الإتقان الإضافية
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Card: الاستماع */}
          <div
            onClick={() => handleCardClick('listening', 'listening-amna')}
            className="p-6 rounded-3xl bg-white border-2 border-teal-200 hover:border-teal-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="touch-target w-13 h-13 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                <Headphones className="w-7 h-7" />
              </div>
              <h4 className="text-[23px] font-black text-slate-900 mb-1">نصوص الاستماع</h4>
              <p className="text-[18px] text-slate-600 leading-[1.6]">
                3 نصوص مقررة ص 149 - 155 لتنمية المهارات السمعية.
              </p>
            </div>
            <div className="text-[19px] font-black text-teal-700 flex items-center gap-2">
              <span>افتح ملحق الاستماع</span>
              <ArrowLeft className="w-5 h-5" />
            </div>
          </div>

          {/* Card: الإملاء */}
          <div
            onClick={() => handleCardClick('spelling', 'spelling-hamza')}
            className="p-6 rounded-3xl bg-white border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="touch-target w-13 h-13 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                <PenTool className="w-7 h-7" />
              </div>
              <h4 className="text-[23px] font-black text-slate-900 mb-1">قواعد الإملاء</h4>
              <p className="text-[18px] text-slate-600 leading-[1.6]">
                ضوابط الرسم الإملائي للهمزات والألف اللينة والتطبيقات.
              </p>
            </div>
            <div className="text-[19px] font-black text-amber-800 flex items-center gap-2">
              <span>افتح ملحق الإملاء</span>
              <ArrowLeft className="w-5 h-5" />
            </div>
          </div>

          {/* Card: فحص الجودة والتغطية */}
          <div
            onClick={() => handleCardClick('audit', 'audit')}
            className="p-6 rounded-3xl bg-white border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="touch-target w-13 h-13 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-3">
                <FileCheck className="w-7 h-7" />
              </div>
              <h4 className="text-[23px] font-black text-slate-900 mb-1">فحص التغطية والتدقيق</h4>
              <p className="text-[18px] text-slate-600 leading-[1.6]">
                مطابقة كاملة بنسبة 100% مع صفحات الكتاب المدرسي (162 ص).
              </p>
            </div>
            <div className="text-[19px] font-black text-indigo-800 flex items-center gap-2">
              <span>عرض تقرير التدقيق</span>
              <ArrowLeft className="w-5 h-5" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
