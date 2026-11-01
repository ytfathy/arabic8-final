import React, { useState } from 'react';
import { QuestionItem } from '../types/curriculum';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  Award, 
  Sparkles, 
  RotateCcw, 
  ArrowLeft,
  ArrowRight,
  ListOrdered,
  BookOpen
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';
import { speechEngine } from '../utils/speechEngine';
import { ReadAloudButton } from './ReadAloudButton';

interface QuestionsSectionProps {
  questions: QuestionItem[];
  lessonTitle: string;
}

export const QuestionsSection: React.FC<QuestionsSectionProps> = ({ questions, lessonTitle }) => {
  const [mode, setMode] = useState<'study' | 'practice'>('practice');
  const [currentIdx, setCurrentIdx] = useState(0);

  // Practice state
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  if (!questions || questions.length === 0) {
    return null;
  }

  const currentQ = questions[currentIdx] || questions[0];
  const qId = currentQ.id || `q-${currentIdx}`;
  const isCurrentSubmitted = !!submitted[qId];
  const isCurrentRevealed = !!revealed[qId];
  const currentAnswer = userAnswers[qId] || '';

  const checkIsCorrect = (q: QuestionItem, ans: string): boolean => {
    const trimmed = ans.trim();
    if (!trimmed) return false;
    if (q.type === 'mcq' || q.type === 'true_false') {
      return trimmed === q.correctAnswer;
    }
    return trimmed.length >= 3 && (q.correctAnswer.includes(trimmed) || trimmed.includes(q.correctAnswer.slice(0, 6)));
  };

  const isCurrentCorrect = checkIsCorrect(currentQ, currentAnswer);

  const handleSelectOption = (targetQId: string, option: string) => {
    if (submitted[targetQId]) return;
    setUserAnswers((prev) => ({ ...prev, [targetQId]: option }));
  };

  const handleTextInput = (targetQId: string, value: string) => {
    if (submitted[targetQId]) return;
    setUserAnswers((prev) => ({ ...prev, [targetQId]: value }));
  };

  const handleSubmitAnswer = (targetQ: QuestionItem) => {
    const id = targetQ.id || `q-${currentIdx}`;
    setSubmitted((prev) => ({ ...prev, [id]: true }));

    const userAns = userAnswers[id] || '';
    const isCorrect = checkIsCorrect(targetQ, userAns);

    if (isCorrect) {
      soundEffects.playSuccessChime();
      soundEffects.fireConfetti();
      speechEngine.speakPraise(true);
    } else {
      soundEffects.playGentleEncouragement();
      speechEngine.speakPraise(false);
    }
  };

  const handleToggleReveal = (id: string) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleResetPractice = () => {
    setUserAnswers({});
    setSubmitted({});
    setRevealed({});
    setCurrentIdx(0);
    soundEffects.playClick();
  };

  const handleNextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      soundEffects.playClick();
    }
  };

  const handlePrevQuestion = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
      soundEffects.playClick();
    }
  };

  // Score stats
  const answeredCount = Object.keys(submitted).length;
  const correctCount = questions.filter((q, idx) => {
    const id = q.id || `q-${idx}`;
    return submitted[id] && checkIsCorrect(q, userAnswers[id] || '');
  }).length;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-md border-2 border-slate-200/90 my-8">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 mb-8 pb-6 border-b-2 border-slate-100">
        <div className="flex items-center gap-4">
          <div className="touch-target w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-sky-500/20 shrink-0">
            <HelpCircle className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[17px] font-extrabold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-200">
                تدريبات تفاعلية ذكية
              </span>
              <span className="text-[17px] text-slate-500 font-bold">
                {questions.length} أسئلة
              </span>
            </div>
            <h2 className="text-[25px] sm:text-[28px] font-black text-slate-900 mt-1">
              أسئلة وتدريبات الكتاب الوزاري
            </h2>
            <p className="text-[18px] text-slate-600 mt-0.5">
              مقرر: <span className="font-bold text-slate-800">{lessonTitle}</span>
            </p>
          </div>
        </div>

        {/* Mode Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl border-2 border-slate-200/70 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              setMode('practice');
              soundEffects.playClick();
            }}
            className={`touch-target flex-1 sm:flex-initial px-5 py-3 rounded-xl font-bold text-[19px] transition-all cursor-pointer flex items-center justify-center gap-2 ${
              mode === 'practice'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>🎯</span>
            <span>نمط التدريب التفاعلي</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('study');
              soundEffects.playClick();
            }}
            className={`touch-target flex-1 sm:flex-initial px-5 py-3 rounded-xl font-bold text-[19px] transition-all cursor-pointer flex items-center justify-center gap-2 ${
              mode === 'study'
                ? 'bg-white text-indigo-900 shadow-md border border-indigo-200'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>📖 نمط المذاكرة مع الحلول</span>
          </button>
        </div>
      </div>

      {/* PRACTICE MODE (Interactive Question-by-Question Game Flow) */}
      {mode === 'practice' && (
        <div className="space-y-6">
          {/* Top Score & Progress Bar */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-indigo-800/40">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="touch-target w-13 h-13 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-[17px] text-amber-300 font-bold">لوحة نقاط التحدي</div>
                  <div className="text-[20px] sm:text-[22px] font-black">
                    أجبت عن <span className="text-amber-400 tabular-nums">{answeredCount}</span> من <span className="tabular-nums">{questions.length}</span> • الصحيحة: <span className="text-emerald-400 tabular-nums">{correctCount}</span> ⭐
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetPractice}
                className="touch-target px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[18px] font-bold transition-all flex items-center gap-2 cursor-pointer border border-white/20 self-end sm:self-center"
              >
                <RotateCcw className="w-5 h-5" />
                <span>إعادة من البداية</span>
              </button>
            </div>

            {/* Stepper Dots / Question Index Bar */}
            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-[17px] text-slate-300 mb-2 font-medium">
                <span>تقدم الأسئلة:</span>
                <span className="font-bold text-amber-300">
                  السؤال {currentIdx + 1} من {questions.length}
                </span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {questions.map((q, idx) => {
                  const itemQId = q.id || `q-${idx}`;
                  const isDone = submitted[itemQId];
                  const isRight = isDone && checkIsCorrect(q, userAnswers[itemQId] || '');
                  const isCurrent = idx === currentIdx;

                  return (
                    <button
                      key={itemQId}
                      type="button"
                      onClick={() => {
                        setCurrentIdx(idx);
                        soundEffects.playClick();
                      }}
                      className={`touch-target h-11 min-w-[44px] px-2.5 rounded-xl text-[17px] font-black transition-all flex items-center justify-center cursor-pointer border-2 ${
                        isCurrent
                          ? 'ring-4 ring-amber-400/50 scale-105 z-10'
                          : ''
                      } ${
                        isDone
                          ? isRight
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                            : 'bg-rose-500 text-white border-rose-400'
                          : isCurrent
                          ? 'bg-white text-indigo-950 border-white'
                          : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/20'
                      }`}
                      title={`الانتقال للسؤال ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SINGLE ACTIVE QUESTION CARD */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border-3 transition-all ${
              isCurrentSubmitted
                ? isCurrentCorrect
                  ? 'border-emerald-400 bg-gradient-to-b from-emerald-50/50 to-white shadow-lg shadow-emerald-500/10'
                  : 'border-rose-400 bg-gradient-to-b from-rose-50/40 to-white shadow-lg shadow-rose-500/10'
                : 'border-indigo-100 bg-white shadow-md'
            }`}
          >
            {/* Question Top Bar: Number + Reveal Answer toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="touch-target px-4 py-1.5 rounded-2xl bg-indigo-600 text-white text-[19px] font-black flex items-center justify-center shadow-md shadow-indigo-600/30">
                  سؤال {currentIdx + 1}
                </span>
                {currentQ.sourcePage && (
                  <span className="text-[17px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
                    الكتاب المدرسي: {currentQ.sourcePage}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleToggleReveal(qId)}
                className="touch-target px-3.5 py-2 rounded-xl text-slate-600 hover:text-indigo-700 bg-slate-100 hover:bg-indigo-50 border border-slate-200 transition-all flex items-center gap-2 text-[17px] font-bold cursor-pointer"
              >
                {isCurrentRevealed ? <EyeOff className="w-5 h-5 text-indigo-600" /> : <Eye className="w-5 h-5 text-slate-600" />}
                <span>{isCurrentRevealed ? 'إخفاء الإجابة النموذجية' : 'كشف الحل النموذجي'}</span>
              </button>
            </div>

            {/* Question Text (Large: 22–26px) + Dedicated READ QUESTION Button */}
            <div className="mb-6 bg-slate-50/90 rounded-2xl p-5 border-2 border-slate-200/80">
              <h3 className="text-[23px] sm:text-[25px] font-black text-slate-900 leading-[1.6] mb-4">
                {currentQ.question}
              </h3>

              {/* DEDICATED READ QUESTION BUTTON */}
              <div className="pt-2 border-t border-slate-200">
                <ReadAloudButton
                  id={`q-text-${qId}`}
                  textToRead={currentQ.question}
                  label="🔊 اقرأ السؤال كاملاً"
                  activeLabel="جارٍ قراءة السؤال... (إيقاف)"
                  variant="primary"
                  className="w-full sm:w-auto"
                />
              </div>
            </div>

            {/* Answer Options (20–23px) with Individual Read-Aloud Button for Each */}
            {currentQ.options && currentQ.options.length > 0 ? (
              <div className="space-y-3.5 mb-6">
                <div className="text-[18px] font-black text-slate-700 mb-2">
                  اختر الإجابة الصحيحة من الخيارات التالية:
                </div>
                <div className="grid grid-cols-1 gap-3.5">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = currentAnswer === opt;
                    let cardStyle = 'border-2 border-slate-200 hover:border-indigo-400 bg-white text-slate-900 hover:bg-indigo-50/20';

                    if (isCurrentSubmitted) {
                      if (opt === currentQ.correctAnswer) {
                        cardStyle = 'border-3 border-emerald-500 bg-emerald-50/90 text-emerald-950 font-black shadow-md';
                      } else if (isSelected && !isCurrentCorrect) {
                        cardStyle = 'border-3 border-rose-500 bg-rose-50/90 text-rose-950 font-black';
                      } else {
                        cardStyle = 'border-2 border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                      }
                    } else if (isSelected) {
                      cardStyle = 'border-3 border-indigo-600 bg-indigo-50 text-indigo-950 font-black shadow-md ring-2 ring-indigo-200';
                    }

                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectOption(qId, opt)}
                        className={`p-4 sm:p-5 rounded-2xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer ${cardStyle}`}
                      >
                        {/* Option Letter + Text */}
                        <div className="flex items-center gap-3.5 flex-1 min-w-0">
                          <span className={`touch-target w-10 h-10 rounded-xl flex items-center justify-center text-[19px] font-black shrink-0 ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}>
                            {optIdx === 0 ? 'أ' : optIdx === 1 ? 'ب' : optIdx === 2 ? 'ج' : 'د'}
                          </span>
                          <span className="text-[21px] sm:text-[22px] font-bold leading-[1.5] break-words">
                            {opt}
                          </span>
                        </div>

                        {/* Read Option Button (Touch target >= 48x48) */}
                        <div className="flex items-center justify-end gap-2 shrink-0">
                          <ReadAloudButton
                            id={`opt-${qId}-${optIdx}`}
                            textToRead={opt}
                            label="اقرأ الخيار"
                            activeLabel="قراءة..."
                            size="compact"
                            variant="secondary"
                          />

                          {isCurrentSubmitted && opt === currentQ.correctAnswer && (
                            <span className="touch-target w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                              <CheckCircle2 className="w-7 h-7" />
                            </span>
                          )}
                          {isCurrentSubmitted && isSelected && !isCurrentCorrect && (
                            <span className="touch-target w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center">
                              <XCircle className="w-7 h-7" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Written/open-ended question */
              <div className="mb-6 space-y-3">
                <label className="block text-[19px] font-bold text-slate-800">
                  اكتب إجابتك أو استخرج المطلوب هنا:
                </label>
                <textarea
                  rows={3}
                  value={currentAnswer}
                  onChange={(e) => handleTextInput(qId, e.target.value)}
                  disabled={isCurrentSubmitted}
                  placeholder="اكتب إجابتك بالتفصيل هنا..."
                  className="w-full p-4 text-[21px] font-medium rounded-2xl border-2 border-slate-300 focus:outline-none focus:ring-4 focus:ring-emerald-400 bg-slate-50 leading-[1.6]"
                />
              </div>
            )}

            {/* Immediate Feedback Card upon submission */}
            {isCurrentSubmitted && (
              <div
                className={`p-5 rounded-2xl border-2 mb-6 ${
                  isCurrentCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-black text-[20px] mb-3">
                  <div className="flex items-center gap-2.5">
                    {isCurrentCorrect ? (
                      <>
                        <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                        <span>إجابة صحيحة وممتازة! أحسنت يا بطل! 🎉</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-7 h-7 text-amber-600 shrink-0" />
                        <span>أحسنت المحاولة! قارن إجابتك بالحل المعتمد أدناه:</span>
                      </>
                    )}
                  </div>

                  <ReadAloudButton
                    id={`feedback-${qId}`}
                    textToRead={
                      isCurrentCorrect
                        ? `إجابة صحيحة وممتازة! أحسنت! الحل المعتمد هو: ${currentQ.correctAnswer}`
                        : `قارن إجابتك بالحل المعتمد: ${currentQ.correctAnswer}. ${currentQ.explanation || ''}`
                    }
                    label="اقرأ التقييم"
                    activeLabel="قراءة..."
                    size="compact"
                    variant={isCurrentCorrect ? 'emerald' : 'amber'}
                  />
                </div>

                <div className="p-3.5 bg-white/90 rounded-xl border border-slate-200">
                  <div className="text-[17px] font-bold text-slate-500 mb-1">الإجابة النموذجية المعتمدة:</div>
                  <p className="text-[21px] font-black text-slate-900 leading-[1.6]">
                    {currentQ.correctAnswer}
                  </p>
                </div>

                {currentQ.explanation && (
                  <div className="mt-3 p-3 bg-white/70 rounded-xl border border-slate-200 text-[19px] text-slate-700 leading-[1.6]">
                    <span className="font-bold text-indigo-900">💡 توضيح وشرح: </span>
                    {currentQ.explanation}
                  </div>
                )}
              </div>
            )}

            {/* Revealed Answer toggle box (when child requests hint/solution before submit) */}
            {isCurrentRevealed && !isCurrentSubmitted && (
              <div className="p-5 bg-indigo-50 border-2 border-indigo-200 rounded-2xl mb-6">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-[18px] font-black text-indigo-950">💡 الإجابة النموذجية في الكتاب:</span>
                  <ReadAloudButton
                    id={`reveal-read-${qId}`}
                    textToRead={currentQ.correctAnswer}
                    label="اقرأ الحل"
                    size="compact"
                    variant="purple"
                  />
                </div>
                <p className="text-[21px] font-bold text-indigo-950 leading-[1.6]">
                  {currentQ.correctAnswer}
                </p>
              </div>
            )}

            {/* ACTION CONTROLS: Submit & Next/Previous Buttons */}
            <div className="pt-5 border-t-2 border-slate-100 flex flex-wrap items-center justify-between gap-3">
              {/* Previous Button */}
              <button
                type="button"
                onClick={handlePrevQuestion}
                disabled={currentIdx === 0}
                className="touch-target px-5 py-3 rounded-2xl border-2 border-slate-300 font-bold text-[19px] text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowRight className="w-5 h-5" />
                <span>السؤال السابق</span>
              </button>

              {/* Submit or Next Question Action */}
              <div className="flex items-center gap-3">
                {!isCurrentSubmitted ? (
                  <button
                    type="button"
                    onClick={() => handleSubmitAnswer(currentQ)}
                    disabled={!currentAnswer}
                    className="touch-target px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-[20px] shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2.5 cursor-pointer active:scale-95"
                  >
                    <CheckCircle2 className="w-6 h-6" />
                    <span>تحقق من إجابتي</span>
                  </button>
                ) : currentIdx < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="touch-target px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-black text-[20px] shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2.5 cursor-pointer active:scale-95"
                  >
                    <span>السؤال التالي</span>
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleResetPractice}
                    className="touch-target px-7 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[20px] shadow-lg transition-all flex items-center gap-2.5 cursor-pointer active:scale-95"
                  >
                    <RotateCcw className="w-6 h-6" />
                    <span>إعادة التدريب مجدداً</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STUDY MODE: Comprehensive list with answers & individual read buttons */}
      {mode === 'study' && (
        <div className="space-y-6">
          <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-sky-700 shrink-0" />
              <p className="text-[19px] font-bold text-sky-950">
                في نمط المذاكرة، يمكنك قراءة والاستماع إلى جميع الأسئلة وإجاباتها النموذجية والشروحات التوضيحية مباشرة.
              </p>
            </div>
          </div>

          {questions.map((q, idx) => {
            const itemQId = q.id || `study-q-${idx}`;

            return (
              <div
                key={itemQId}
                className="p-6 rounded-3xl border-2 border-slate-200 bg-slate-50/50 hover:border-indigo-300 transition-all space-y-4"
              >
                {/* Question Header & Prompt */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="touch-target w-11 h-11 rounded-2xl bg-indigo-600 text-white text-[20px] font-black flex items-center justify-center shrink-0 shadow-sm">
                      س{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-[23px] font-black text-slate-900 leading-[1.6]">
                        {q.question}
                      </h4>
                      {q.sourcePage && (
                        <span className="text-[17px] text-slate-500 font-bold mt-1 inline-block">
                          الكتاب المدرسي: {q.sourcePage}
                        </span>
                      )}
                    </div>
                  </div>

                  <ReadAloudButton
                    id={`study-q-read-${itemQId}`}
                    textToRead={q.question}
                    label="🔊 اقرأ السؤال"
                    activeLabel="قراءة..."
                    size="compact"
                    variant="primary"
                  />
                </div>

                {/* Multiple choice choices preview if any */}
                {q.options && q.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {q.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-3.5 rounded-xl border-2 flex items-center justify-between gap-2 ${
                          opt === q.correctAnswer
                            ? 'bg-emerald-50 border-emerald-400 font-black text-emerald-950'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="text-[20px] leading-[1.5]">{opt}</span>
                        <ReadAloudButton
                          id={`study-opt-read-${itemQId}-${optIdx}`}
                          textToRead={opt}
                          label="اقرأ"
                          size="icon-only"
                          variant={opt === q.correctAnswer ? 'emerald' : 'subtle'}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Model Answer Box */}
                <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-300">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 text-[18px] font-black text-emerald-900">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>الإجابة النموذجية المعتمدة:</span>
                    </div>

                    <ReadAloudButton
                      id={`study-ans-read-${itemQId}`}
                      textToRead={`الإجابة النموذجية هي: ${q.correctAnswer}`}
                      label="اقرأ الإجابة"
                      size="compact"
                      variant="emerald"
                    />
                  </div>

                  <p className="text-[21px] font-black text-emerald-950 leading-[1.6]">
                    {q.correctAnswer}
                  </p>

                  {q.explanation && (
                    <div className="mt-3 pt-3 border-t border-emerald-200 text-[19px] text-slate-700 leading-[1.6]">
                      <span className="font-bold text-slate-900">💡 الشرح: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
