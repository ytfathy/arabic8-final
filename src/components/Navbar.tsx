import React, { useState } from 'react';
import { BookOpen, Award, CheckCircle2, Menu, Home, Volume2, VolumeX } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface NavbarProps {
  completedCount: number;
  totalLessons: number;
  onToggleSidebar: () => void;
  onGoHome: () => void;
  onOpenAudit: () => void;
  onOpenReview: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  completedCount,
  totalLessons,
  onToggleSidebar,
  onGoHome,
  onOpenAudit,
  onOpenReview,
}) => {
  const [isMuted, setIsMuted] = useState(soundEffects.getIsMuted());
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const handleToggleSound = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b-2 border-slate-200 shadow-xs">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 min-h-[76px] py-2 flex items-center justify-between gap-4">
        {/* Right Section: Mobile Toggle & App Branding */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="touch-target lg:hidden p-2.5 rounded-2xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
            title="فهرس الدروس"
            aria-label="فتح فهرس الدروس"
          >
            <Menu className="w-7 h-7" />
          </button>

          <div
            onClick={onGoHome}
            className="flex items-center gap-3 cursor-pointer group select-none"
            title="العودة إلى الصفحة الرئيسية وشخصية فصيح"
          >
            <div className="touch-target w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform shrink-0">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-black uppercase px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300">
                  الصف الثاني الإعدادي
                </span>
                <span className="text-[15px] text-slate-500 font-bold hidden sm:inline">
                  الكتاب الوزاري المعتمد
                </span>
              </div>
              <h1 className="text-[20px] sm:text-[23px] font-black text-slate-900 tracking-tight leading-tight group-hover:text-emerald-700 transition-colors mt-0.5">
                منصة لغتي الخالدة
              </h1>
            </div>
          </div>
        </div>

        {/* Center / Left Section: Actions & Progress */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Home Button */}
          <button
            type="button"
            onClick={onGoHome}
            className="touch-target flex items-center gap-2 text-[18px] font-black px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-900 text-slate-800 border-2 border-slate-200 hover:border-emerald-300 transition-all cursor-pointer shadow-xs"
            title="الصفحة الرئيسية"
          >
            <Home className="w-5 h-5 text-emerald-600" />
            <span className="hidden sm:inline">الرئيسية</span>
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            className={`touch-target p-3 rounded-2xl border-2 transition-all cursor-pointer shadow-xs ${
              isMuted
                ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
            }`}
            title={isMuted ? 'تشغيل المؤثرات الصوتية' : 'كتم المؤثرات الصوتية'}
            aria-label={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>

          {/* Progress Tracker (Desktop) */}
          <div className="hidden md:flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border-2 border-slate-200">
            <div className="touch-target w-10 h-10 rounded-full bg-emerald-100 text-emerald-900 font-black text-[17px] flex items-center justify-center border border-emerald-300">
              {progressPercent}%
            </div>
            <div className="text-right">
              <div className="text-[17px] font-black text-slate-800">إنجاز المنهج</div>
              <div className="text-[15px] text-slate-500 font-bold">
                {completedCount} من {totalLessons} درساً
              </div>
            </div>
          </div>

          {/* Final Exam Button */}
          <button
            type="button"
            onClick={onOpenReview}
            className="touch-target hidden sm:flex items-center gap-2 text-[18px] font-black px-4 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-950 border-2 border-amber-300 transition-all cursor-pointer shadow-xs"
          >
            <Award className="w-5 h-5 text-amber-600" />
            <span>امتحان شامل</span>
          </button>

          {/* Quality Audit Button */}
          <button
            type="button"
            onClick={onOpenAudit}
            className="touch-target flex items-center gap-2 text-[18px] font-black px-3.5 sm:px-4 py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-2 border-emerald-300 transition-all cursor-pointer shadow-xs"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="hidden sm:inline">فحص الجودة</span>
            <span className="sm:hidden font-black">100%</span>
          </button>
        </div>
      </div>
    </header>
  );
};
