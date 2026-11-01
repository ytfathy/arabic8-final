import React, { useState } from 'react';
import { readingLessons } from '../data/readingLessonsData';
import { literaryTexts } from '../data/literaryTextsData';
import { grammarLessons } from '../data/grammarLessonsData';
import {
  BookOpen,
  Feather,
  Scale,
  Headphones,
  PenTool,
  CheckCircle2,
  Award,
  ShieldCheck,
  ChevronDown,
  ChevronLeft,
  Search,
  X,
  Home,
  Layers
} from 'lucide-react';

interface SidebarProps {
  currentCategory: string;
  currentLessonId: string;
  completedLessonIds: string[];
  onSelectLesson: (category: string, id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentCategory,
  currentLessonId,
  completedLessonIds,
  onSelectLesson,
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    reading: true,
    literature: true,
    grammar: true,
    supplementary: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLessonPick = (cat: string, id: string) => {
    onSelectLesson(cat, id);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[76px] right-0 h-screen lg:h-[calc(100vh-5rem)] w-88 bg-white border-l-2 border-slate-200 z-50 flex flex-col transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b-2 border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            <span className="font-black text-slate-900 text-[20px]">فهرس دروس المنهج</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="touch-target p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Search Input (18px font) */}
        <div className="p-4 border-b-2 border-slate-100">
          <div className="relative">
            <Search className="w-5 h-5 absolute right-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن درس أو قاعدة..."
              className="w-full pl-3 pr-11 py-3 text-[18px] font-bold rounded-2xl border-2 border-slate-200 focus:outline-none focus:ring-4 focus:ring-emerald-300 bg-slate-50"
            />
          </div>
        </div>

        {/* Scrollable Navigation Sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Home Button */}
          <button
            type="button"
            onClick={() => handleLessonPick('home', 'home')}
            className={`touch-target w-full flex items-center justify-between p-3.5 rounded-2xl text-[19px] font-black transition-all cursor-pointer ${
              currentCategory === 'home'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-700/20'
                : 'bg-emerald-50/80 text-emerald-950 hover:bg-emerald-100 border-2 border-emerald-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <Home className="w-6 h-6" />
              <span>الرئيسية • المرشد "فصيح"</span>
            </div>
            <span className="text-[15px] font-bold opacity-80">البداية</span>
          </button>

          {/* Section 1: دروس القراءة (6 دروس) */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => toggleSection('reading')}
              className="w-full flex items-center justify-between text-[19px] font-black text-slate-900 mb-2 px-2 py-1.5 rounded-xl hover:bg-slate-100 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>1. دروس القراءة (6 دروس)</span>
              </div>
              {openSections.reading ? (
                <ChevronDown className="w-5 h-5 text-slate-500" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-slate-500" />
              )}
            </button>

            {openSections.reading && (
              <div className="space-y-1.5 pr-2">
                {readingLessons
                  .filter((l) => l.title.includes(searchTerm) || l.unit.includes(searchTerm))
                  .map((l) => {
                    const isSelected = currentCategory === 'reading' && currentLessonId === l.id;
                    const isDone = completedLessonIds.includes(l.id);

                    return (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => handleLessonPick('reading', l.id)}
                        className={`touch-target w-full text-right p-3 rounded-2xl text-[18px] transition-all flex items-center justify-between cursor-pointer border ${
                          isSelected
                            ? 'bg-emerald-600 text-white font-black shadow-md border-emerald-600'
                            : 'text-slate-800 hover:bg-slate-100 border-transparent font-bold'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <span
                            className={`w-3 h-3 rounded-full shrink-0 ${
                              isDone
                                ? isSelected
                                  ? 'bg-white'
                                  : 'bg-emerald-500'
                                : isSelected
                                ? 'bg-emerald-300'
                                : 'bg-slate-300'
                            }`}
                          ></span>
                          <span className="truncate">{l.title}</span>
                        </div>
                        <span
                          className={`text-[15px] shrink-0 font-bold ${
                            isSelected ? 'text-emerald-100' : 'text-slate-400'
                          }`}
                        >
                          ص {l.pageRange}
                        </span>
                      </button>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Section 2: دروس النصوص الأدبية (3 نصوص) */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => toggleSection('literature')}
              className="w-full flex items-center justify-between text-[19px] font-black text-slate-900 mb-2 px-2 py-1.5 rounded-xl hover:bg-slate-100 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
                  <Feather className="w-4 h-4" />
                </div>
                <span>2. دروس النصوص الأدبية (3 نصوص)</span>
              </div>
              {openSections.literature ? (
                <ChevronDown className="w-5 h-5 text-slate-500" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-slate-500" />
              )}
            </button>

            {openSections.literature && (
              <div className="space-y-1.5 pr-2">
                {literaryTexts
                  .filter((l) => l.title.includes(searchTerm) || l.poet.includes(searchTerm))
                  .map((l) => {
                    const isSelected = currentCategory === 'literature' && currentLessonId === l.id;
                    const isDone = completedLessonIds.includes(l.id);

                    return (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => handleLessonPick('literature', l.id)}
                        className={`touch-target w-full text-right p-3 rounded-2xl text-[18px] transition-all flex items-center justify-between cursor-pointer border ${
                          isSelected
                            ? 'bg-purple-600 text-white font-black shadow-md border-purple-600'
                            : 'text-slate-800 hover:bg-slate-100 border-transparent font-bold'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <span
                            className={`w-3 h-3 rounded-full shrink-0 ${
                              isDone
                                ? isSelected
                                  ? 'bg-white'
                                  : 'bg-purple-500'
                                : isSelected
                                ? 'bg-purple-300'
                                : 'bg-slate-300'
                            }`}
                          ></span>
                          <span className="truncate">{l.title}</span>
                        </div>
                        <span
                          className={`text-[15px] shrink-0 font-bold ${
                            isSelected ? 'text-purple-100' : 'text-slate-400'
                          }`}
                        >
                          ص {l.pageRange}
                        </span>
                      </button>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Section 3: دروس النحو وقواعد الإعراب (6 دروس) */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => toggleSection('grammar')}
              className="w-full flex items-center justify-between text-[19px] font-black text-slate-900 mb-2 px-2 py-1.5 rounded-xl hover:bg-slate-100 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <span>3. دروس النحو والإعراب (6 دروس)</span>
              </div>
              {openSections.grammar ? (
                <ChevronDown className="w-5 h-5 text-slate-500" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-slate-500" />
              )}
            </button>

            {openSections.grammar && (
              <div className="space-y-1.5 pr-2">
                {grammarLessons
                  .filter((l) => l.title.includes(searchTerm) || l.unit.includes(searchTerm))
                  .map((l) => {
                    const isSelected = currentCategory === 'grammar' && currentLessonId === l.id;
                    const isDone = completedLessonIds.includes(l.id);

                    return (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => handleLessonPick('grammar', l.id)}
                        className={`touch-target w-full text-right p-3 rounded-2xl text-[18px] transition-all flex items-center justify-between cursor-pointer border ${
                          isSelected
                            ? 'bg-indigo-600 text-white font-black shadow-md border-indigo-600'
                            : 'text-slate-800 hover:bg-slate-100 border-transparent font-bold'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <span
                            className={`w-3 h-3 rounded-full shrink-0 ${
                              isDone
                                ? isSelected
                                  ? 'bg-white'
                                  : 'bg-indigo-500'
                                : isSelected
                                ? 'bg-indigo-300'
                                : 'bg-slate-300'
                            }`}
                          ></span>
                          <span className="truncate">{l.title}</span>
                        </div>
                        <span
                          className={`text-[15px] shrink-0 font-bold ${
                            isSelected ? 'text-indigo-100' : 'text-slate-400'
                          }`}
                        >
                          ص {l.pageRange}
                        </span>
                      </button>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Section 4: ملاحق إضافية */}
          <div className="space-y-2 pt-2 border-t-2 border-slate-100">
            <span className="text-[17px] font-black text-slate-500 px-2 block mb-1">
              الملاحق والتقييمات
            </span>

            <button
              type="button"
              onClick={() => handleLessonPick('listening', 'listening-amna')}
              className={`touch-target w-full text-right p-3 rounded-2xl text-[18px] transition-all flex items-center gap-2.5 cursor-pointer font-bold ${
                currentCategory === 'listening'
                  ? 'bg-teal-600 text-white font-black'
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Headphones className="w-5 h-5" />
              <span>نصوص الاستماع (3 نصوص)</span>
            </button>

            <button
              type="button"
              onClick={() => handleLessonPick('spelling', 'spelling-hamza')}
              className={`touch-target w-full text-right p-3 rounded-2xl text-[18px] transition-all flex items-center gap-2.5 cursor-pointer font-bold ${
                currentCategory === 'spelling'
                  ? 'bg-amber-600 text-white font-black'
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <PenTool className="w-5 h-5" />
              <span>قواعد الإملاء (ص 44، 93، 138)</span>
            </button>

            <button
              type="button"
              onClick={() => handleLessonPick('final_review', 'review')}
              className={`touch-target w-full text-right p-3 rounded-2xl text-[18px] transition-all flex items-center gap-2.5 cursor-pointer font-bold ${
                currentCategory === 'final_review'
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Award className="w-5 h-5 text-amber-600" />
              <span>بنك الأسئلة والاختبارات</span>
            </button>

            <button
              type="button"
              onClick={() => handleLessonPick('audit', 'audit')}
              className={`touch-target w-full text-right p-3 rounded-2xl text-[18px] transition-all flex items-center gap-2.5 cursor-pointer font-bold ${
                currentCategory === 'audit'
                  ? 'bg-emerald-700 text-white font-black'
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>تقرير تدقيق ومطابقة الكتاب (100%)</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
