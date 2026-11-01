import React, { useState } from 'react';
import { ReadingLesson } from '../types/curriculum';
import { AudioBar } from './AudioBar';
import { VocabularyTable } from './VocabularyTable';
import { QuestionsSection } from './QuestionsSection';
import { ReadAloudButton } from './ReadAloudButton';
import { BookOpen, Lightbulb, Compass, HeartHandshake, CheckCircle, Sparkles } from 'lucide-react';

interface ReadingLessonViewProps {
  lesson: ReadingLesson;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
}

export const ReadingLessonView: React.FC<ReadingLessonViewProps> = ({
  lesson,
  isCompleted,
  onToggleComplete,
}) => {
  const [activeSentence, setActiveSentence] = useState('');

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* 1. Lesson Hero Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-9 shadow-xl border-2 border-emerald-600/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-[17px] font-black">
                {lesson.unit}
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/15 text-slate-200 border border-white/20 text-[17px] font-bold">
                صفحات الكتاب: {lesson.pageRange}
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-teal-500/30 text-teal-200 border border-teal-400/40 text-[17px] font-bold">
                📖 فرع القراءة والفهم
              </span>
            </div>

            <h1 className="text-[30px] sm:text-[36px] font-black tracking-tight text-white mt-1 leading-[1.3]">
              {lesson.title}
            </h1>

            <p className="text-[21px] text-emerald-100 leading-[1.8] max-w-3xl font-medium">
              {lesson.mainIdea}
            </p>

            {/* Read Aloud Button for Title & Main Idea */}
            <div className="pt-2">
              <ReadAloudButton
                id={`hero-title-${lesson.id}`}
                textToRead={`درس القراءة: ${lesson.title}. الفكرة الرئيسة: ${lesson.mainIdea}`}
                label="🔊 اقرأ عنوان وفكرة الدرس"
                activeLabel="جارٍ قراءة العنوان... (إيقاف)"
                variant="primary"
              />
            </div>
          </div>

          {/* Completion Status Toggle Button */}
          <button
            type="button"
            onClick={() => onToggleComplete(lesson.id)}
            className={`touch-target px-6 py-4 rounded-2xl font-black text-[20px] flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 cursor-pointer shrink-0 ${
              isCompleted
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 ring-4 ring-amber-300/40'
                : 'bg-white/15 hover:bg-white/25 text-white border-2 border-white/30'
            }`}
          >
            <CheckCircle className={`w-6 h-6 ${isCompleted ? 'fill-current' : ''}`} />
            <span>{isCompleted ? 'تم إتقان الدرس بنجاح ✓' : 'تحديد الدرس كمكتمل'}</span>
          </button>
        </div>
      </div>

      {/* 2. Audio Reading Bar */}
      <AudioBar
        fullText={lesson.originalText}
        title={lesson.title}
        activeSentence={activeSentence}
      />

      {/* 3. Section A: Original Reading Passage (Each paragraph has its own Read-Aloud Button) */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-md border-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b-2 border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="touch-target w-13 h-13 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-[25px] sm:text-[28px] font-black text-slate-900">
                أ. نص موضوع القراءة الأصلي كاملاً
              </h2>
              <p className="text-[17px] text-slate-500 font-bold">
                من الكتاب المدرسي المعتمد - يمكنك الاستماع لكل فقرة مستقلة بالضغط على زر "اقرأ الفقرة"
              </p>
            </div>
          </div>

          <ReadAloudButton
            id={`read-all-text-${lesson.id}`}
            textToRead={lesson.originalText}
            label="🔊 اقرأ النص كاملاً"
            activeLabel="قراءة النص كاملاً..."
            variant="emerald"
          />
        </div>

        {/* Paragraphs with individual read buttons and font size 21–24px */}
        <div className="space-y-6">
          {lesson.paragraphs.map((p) => {
            const pId = `reading-${lesson.id}-p-${p.order}`;
            const fullParagraphSpeech = p.heading ? `${p.heading}. ${p.content}` : p.content;

            return (
              <div
                key={p.order}
                className="p-6 sm:p-7 rounded-3xl bg-slate-50/90 border-2 border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all space-y-4"
              >
                {/* Paragraph Title & Order Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="touch-target w-10 h-10 rounded-xl bg-emerald-600 text-white text-[19px] font-black flex items-center justify-center shadow-sm shrink-0">
                      {p.order}
                    </span>
                    {p.heading && (
                      <h3 className="font-black text-slate-900 text-[23px] sm:text-[24px]">
                        {p.heading}
                      </h3>
                    )}
                  </div>

                  {/* Individual READ ALOUD button for this paragraph */}
                  <ReadAloudButton
                    id={pId}
                    textToRead={fullParagraphSpeech}
                    label="🔊 اقرأ الفقرة"
                    activeLabel="جارٍ قراءة الفقرة... (إيقاف)"
                    variant="emerald"
                  />
                </div>

                {/* Paragraph Text (21–24px, 1.8 line-height) */}
                <p className="text-slate-900 leading-[1.8] text-[21px] sm:text-[23px] font-tajawal font-medium text-justify">
                  {p.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Section C: Comprehensive Educational Explanation */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-md border-2 border-slate-200">
        <div className="flex items-center gap-3.5 mb-8 pb-5 border-b-2 border-slate-100">
          <div className="touch-target w-13 h-13 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
            <Lightbulb className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-[25px] sm:text-[28px] font-black text-slate-900">
              جـ. الشرح التعليمي الشامل لموضوع الدرس
            </h2>
            <p className="text-[17px] text-slate-500 font-bold">
              الأفكار الرئيسة والفرعية، القيم المكتسبة، والدروس المستفادة في حياتنا
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sub ideas */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50/90 to-sky-50/60 border-2 border-indigo-200 space-y-4">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-indigo-200">
              <h3 className="font-black text-indigo-950 text-[23px] flex items-center gap-2.5">
                <Compass className="w-6 h-6 text-indigo-700" />
                <span>الأفكار الرئيسة والفرعية</span>
              </h3>
              <ReadAloudButton
                id={`all-ideas-${lesson.id}`}
                textToRead={lesson.subIdeas.join('. ')}
                label="اقرأ الأفكار"
                size="compact"
                variant="purple"
              />
            </div>

            <ul className="space-y-4">
              {lesson.subIdeas.map((idea, idx) => (
                <li key={idx} className="p-4 rounded-2xl bg-white/90 border border-indigo-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="touch-target w-8 h-8 rounded-lg bg-indigo-600 text-white text-[17px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-[21px] font-bold text-slate-900 leading-[1.6]">
                      {idea}
                    </span>
                  </div>
                  <ReadAloudButton
                    id={`idea-${lesson.id}-${idx}`}
                    textToRead={idea}
                    label="اقرأ"
                    size="icon-only"
                    variant="purple"
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Lessons & Values Learned */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50/90 to-teal-50/60 border-2 border-emerald-200 space-y-4">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-emerald-200">
              <h3 className="font-black text-emerald-950 text-[23px] flex items-center gap-2.5">
                <HeartHandshake className="w-6 h-6 text-emerald-700" />
                <span>القيم والدروس المستفادة</span>
              </h3>
              <ReadAloudButton
                id={`all-lessons-${lesson.id}`}
                textToRead={lesson.lessonsLearned.join('. ')}
                label="اقرأ القيم"
                size="compact"
                variant="emerald"
              />
            </div>

            <ul className="space-y-4">
              {lesson.lessonsLearned.map((val, idx) => (
                <li key={idx} className="p-4 rounded-2xl bg-white/90 border border-emerald-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="touch-target w-8 h-8 rounded-lg bg-emerald-600 text-white text-[17px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      ⭐
                    </span>
                    <span className="text-[21px] font-bold text-slate-900 leading-[1.6]">
                      {val}
                    </span>
                  </div>
                  <ReadAloudButton
                    id={`value-${lesson.id}-${idx}`}
                    textToRead={val}
                    label="اقرأ"
                    size="icon-only"
                    variant="emerald"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 5. Section D: Vocabulary Table */}
      <VocabularyTable vocabulary={lesson.vocabulary} />

      {/* 6. Section E: Complete Textbook Questions and Answers */}
      <QuestionsSection questions={lesson.questions} lessonTitle={lesson.title} />
    </div>
  );
};
