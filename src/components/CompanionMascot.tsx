import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, RotateCw, Smile, MessageCircle } from 'lucide-react';
import { speechEngine } from '../utils/speechEngine';
import { soundEffects } from '../utils/soundEffects';

interface CompanionMascotProps {
  mode?: 'hero' | 'floating';
  customSpeech?: string;
  autoGreet?: boolean;
  onSpinEnd?: () => void;
}

export const CompanionMascot: React.FC<CompanionMascotProps> = ({
  mode = 'hero',
  customSpeech,
  autoGreet = false,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);

  // The official welcome text
  const welcomeText =
    customSpeech ||
    "أهلاً بكم يا أصدقائي الأبطال في منصة لغتي الخالدة للصف الثاني الإعدادي! هيا بنا نتعلم ونمرح ونكتشف أسرار لغتنا العربية الجميلة!";

  const mascotImagePath = "/src/assets/images/companion_faseeh_mascot_1793038658895.jpg";

  // Trigger spinning entrance and welcome voice
  const triggerEntrance = (speak: boolean = true) => {
    setIsSpinning(true);
    soundEffects.playSpinWhoosh();

    setTimeout(() => {
      setIsSpinning(false);
      if (speak) {
        handleSpeak();
      }
    }, 900);
  };

  useEffect(() => {
    if (mode === 'hero' && !hasGreeted) {
      setHasGreeted(true);
      triggerEntrance(autoGreet);
    }
  }, [mode, autoGreet, hasGreeted]);

  const handleSpeak = () => {
    setIsSpeaking(true);
    speechEngine.speakQuickPhrase(welcomeText, () => {
      setIsSpeaking(false);
    });
  };

  const handleStopSpeech = () => {
    speechEngine.stop();
    setIsSpeaking(false);
  };

  // FLOATING COMPANION MODE (Used in lesson views)
  if (mode === 'floating') {
    return (
      <aside
        aria-label="المرشد التفاعلي فصيح"
        className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3 select-none"
      >
        {isExpanded && (
          <div className="bg-white/98 backdrop-blur-md p-5 rounded-3xl shadow-2xl border-2 border-emerald-200 max-w-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
            <div className="flex items-center justify-between gap-3 mb-2.5 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[18px] font-black text-emerald-800">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>المرشد الذكي "فصيح"</span>
              </div>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="touch-target text-slate-400 hover:text-slate-700 text-[18px] font-bold p-1 rounded-xl"
                title="إخفاء مؤقت"
              >
                ✕
              </button>
            </div>

            <p className="text-[19px] sm:text-[20px] text-slate-800 leading-[1.7] font-bold">
              {welcomeText}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={isSpeaking ? handleStopSpeech : handleSpeak}
                className="touch-target inline-flex items-center gap-2 text-[18px] font-black text-emerald-800 hover:text-emerald-950 bg-emerald-100/80 hover:bg-emerald-200 px-4 py-2.5 rounded-2xl transition-all cursor-pointer shadow-xs active:scale-95"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-5 h-5" />
                    <span>إيقاف الصوت</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5" />
                    <span>استمع إلى فصيح 🔊</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => triggerEntrance(false)}
                className="touch-target p-2 text-slate-500 hover:text-amber-600 rounded-xl hover:bg-amber-50 transition-colors"
                title="حركة بهلوانية"
              >
                <RotateCw className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Mascot Avatar Orb */}
        <div className="relative group">
          <button
            type="button"
            onClick={() => {
              if (!isExpanded) setIsExpanded(true);
              else handleSpeak();
            }}
            className={`relative touch-target w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-emerald-500 to-teal-600 shadow-xl shadow-emerald-950/30 cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 ${
              isSpinning
                ? 'animate-[spin_0.8s_cubic-bezier(0.34,1.56,0.64,1)]'
                : 'animate-[bounce_3s_infinite]'
            }`}
            title="المرشد الذكي فصيح - اضغط للتحدث"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white relative flex items-center justify-center">
              {imageLoaded ? (
                <img
                  src={mascotImagePath}
                  alt="المرشد الكرتوني فصيح"
                  referrerPolicy="no-referrer"
                  onError={() => setImageLoaded(false)}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Smile className="w-10 h-10" />
                </div>
              )}
            </div>

            {/* Speaking Wave Glow */}
            {isSpeaking && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-amber-500 text-[11px] font-black text-white items-center justify-center">
                  ♪
                </span>
              </span>
            )}
          </button>

          {!isExpanded && (
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="touch-target absolute -top-2 -left-2 bg-slate-900 text-white rounded-full p-1.5 shadow-md hover:bg-slate-800"
              title="إظهار الرسالة"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      </aside>
    );
  }

  // HERO CENTER MODE (Home Screen Main Attraction)
  return (
    <div className="relative flex flex-col items-center justify-center py-6 my-2 select-none">
      {/* Background Sunburst Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full bg-gradient-to-tr from-amber-200/40 via-emerald-200/30 to-teal-200/40 blur-3xl" />
        <div
          className={`absolute w-96 sm:w-[540px] h-96 sm:h-[540px] opacity-40 transition-opacity duration-700 ${
            isSpinning ? 'opacity-90 scale-125' : 'opacity-35'
          } animate-[spin_25s_linear_infinite]`}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-amber-400/40">
            <path
              fill="currentColor"
              d="M100 0 L108 85 L190 50 L115 100 L190 150 L108 115 L100 200 L92 115 L10 150 L85 100 L10 50 L92 85 Z"
            />
          </svg>
        </div>
      </div>

      {/* Mascot Card & Character Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Floating Diacritics & Sparkles Orbit */}
        <div className="absolute -top-6 -right-6 text-amber-500 animate-bounce delay-100 pointer-events-none">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="absolute top-12 -left-10 text-emerald-600 animate-pulse pointer-events-none text-2xl font-black font-amiri">
          ضَ
        </div>
        <div className="absolute bottom-16 -right-12 text-teal-700 animate-pulse pointer-events-none text-2xl font-black font-amiri">
          فَصِيحْ
        </div>

        {/* The 3D Spinning Character Orb */}
        <div className="relative group cursor-pointer" onClick={() => triggerEntrance(true)}>
          <div
            className={`absolute -inset-3 rounded-full bg-gradient-to-r from-amber-400 via-emerald-500 to-teal-500 blur-lg opacity-70 group-hover:opacity-100 transition duration-500 ${
              isSpinning ? 'animate-spin scale-110 opacity-100' : 'animate-pulse'
            }`}
          />

          <div
            className={`relative w-48 h-48 sm:w-60 sm:h-60 rounded-full p-2.5 bg-gradient-to-b from-white via-slate-50 to-emerald-50 shadow-2xl border-4 border-white transition-all duration-700 ${
              isSpinning
                ? 'scale-105 rotate-[720deg] brightness-125 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]'
                : 'hover:scale-105 hover:-translate-y-1'
            }`}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-tr from-amber-50 to-emerald-50 shadow-inner flex items-center justify-center relative">
              {imageLoaded ? (
                <img
                  src={mascotImagePath}
                  alt="فصيح - مرشدك الذكي في لغتي الخالدة"
                  referrerPolicy="no-referrer"
                  onError={() => setImageLoaded(false)}
                  className="w-full h-full object-cover object-top filter contrast-105 hover:contrast-110 transition-all"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-700 text-white p-4 text-center">
                  <Smile className="w-20 h-20 mb-2" />
                  <span className="text-xl font-black">فَصِيحْ</span>
                  <span className="text-[17px] text-emerald-100">بطل اللغة العربية</span>
                </div>
              )}

              {isSpinning && (
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/30 to-white/60 animate-ping rounded-full pointer-events-none" />
              )}
            </div>

            {isSpeaking && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[17px] font-black px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span>يتحدث الآن...</span>
              </div>
            )}
          </div>
        </div>

        {/* Character Title / Role Tag */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-[18px] font-black tracking-wide text-emerald-950 bg-emerald-100/90 px-4 py-1.5 rounded-2xl border border-emerald-300 shadow-xs flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
            صديقك ومرشدك: فصيح
          </span>
          <button
            type="button"
            onClick={() => triggerEntrance(true)}
            className="touch-target text-[17px] font-black text-slate-700 hover:text-amber-700 bg-white hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 px-4 py-2 rounded-2xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="إعادة التدوير والترحيب"
          >
            <RotateCw className="w-4 h-4" />
            <span>لف فصيح</span>
          </button>
        </div>

        {/* Speech Bubble with Welcome Message (21–24px) */}
        <div className="relative mt-5 max-w-2xl w-full px-4">
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200/90 text-center space-y-4">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-t-2 border-l-2 border-slate-200 rotate-45 transform" />

            {/* Welcome Dialogue (21–24px) */}
            <p className="relative z-10 text-[21px] sm:text-[23px] font-bold text-slate-900 leading-[1.8] font-tajawal">
              "{welcomeText}"
            </p>

            {/* Audio Interaction Bar (Large 20px buttons with min 48x48 touch targets) */}
            <div className="relative z-10 pt-4 border-t-2 border-slate-100 flex flex-wrap items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={isSpeaking ? handleStopSpeech : handleSpeak}
                className="touch-target inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-[19px] sm:text-[20px] shadow-lg shadow-emerald-700/20 hover:shadow-xl transition-all active:scale-95 cursor-pointer"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-5 h-5" />
                    <span>إيقاف صوت فصيح</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5" />
                    <span>استمع إلى ترحيب فصيح 🔊</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEffects.playSuccessChime();
                  speechEngine.speakPraise(true);
                }}
                className="touch-target inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-950 font-black text-[19px] border-2 border-amber-300 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span>تشجيع فصيح ("أحسنت!")</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
