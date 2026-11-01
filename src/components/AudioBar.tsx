import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, Gauge } from 'lucide-react';
import { speechEngine, SpeechEngineState, SpeechStatus } from '../utils/speechEngine';

interface AudioBarProps {
  fullText: string;
  title: string;
  activeSentence: string;
}

export const AudioBar: React.FC<AudioBarProps> = ({ fullText, title }) => {
  const [status, setStatus] = useState<SpeechStatus>('stopped');
  const [speed, setSpeed] = useState<number>(0.9);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [activeSentenceText, setActiveSentenceText] = useState('');

  const audioBarId = 'lesson-audiobar';

  useEffect(() => {
    const unsubscribe = speechEngine.subscribe((state: SpeechEngineState) => {
      if (state.activeId === audioBarId) {
        setStatus(state.status);
        setActiveSentenceText(speechEngine.getCurrentSentence());
      } else if (state.status === 'playing') {
        // another item is playing
        setStatus('stopped');
        setActiveSentenceText('');
      } else {
        setStatus('stopped');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [audioBarId]);

  const handlePlayToggle = () => {
    if (status === 'stopped') {
      speechEngine.playPassage(audioBarId, fullText);
    } else {
      speechEngine.togglePlayPause();
    }
  };

  const handleReplay = () => {
    speechEngine.playPassage(audioBarId, fullText, 0);
  };

  const changeSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
    speechEngine.setSpeed(newSpeed);
    setShowSpeedMenu(false);
  };

  return (
    <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white rounded-3xl p-5 sm:p-7 shadow-xl border-2 border-emerald-600/50 my-8 transition-all">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        {/* Title and Voice Info */}
        <div className="flex items-center gap-4">
          <div className="touch-target w-14 h-14 rounded-2xl bg-emerald-500/30 border-2 border-emerald-400/40 flex items-center justify-center text-emerald-200 shrink-0 shadow-sm">
            <Volume2 className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-[17px] px-3.5 py-1 rounded-xl bg-emerald-500/40 text-emerald-100 border border-emerald-400/40 font-black">
                تلاوة صوتية باللغة العربية الفصحى
              </span>
              {status === 'playing' && (
                <span className="flex items-center gap-2 text-[17px] text-amber-300 font-black animate-pulse">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  جارٍ القراءة الآن...
                </span>
              )}
            </div>
            <h3 className="font-black text-white text-[23px] sm:text-[25px] mt-1.5 leading-[1.4]">
              استمع إلى قراءة: {title}
            </h3>
          </div>
        </div>

        {/* Player Controls (Buttons >= 48x48) */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
          {/* Replay Button */}
          <button
            type="button"
            onClick={handleReplay}
            title="إعادة القراءة من البداية"
            className="touch-target w-13 h-13 rounded-2xl bg-white/15 hover:bg-white/25 text-white transition-all active:scale-95 flex items-center justify-center cursor-pointer border border-white/20 shadow-xs"
          >
            <RotateCcw className="w-6 h-6" />
          </button>

          {/* Main Play / Pause Button */}
          <button
            type="button"
            onClick={handlePlayToggle}
            className={`touch-target px-6 py-3.5 rounded-2xl font-black text-[19px] sm:text-[20px] flex items-center gap-3 shadow-lg transition-all active:scale-95 cursor-pointer ${
              status === 'playing'
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 ring-4 ring-amber-300/40'
                : 'bg-emerald-300 hover:bg-emerald-200 text-slate-950 ring-4 ring-emerald-300/40'
            }`}
          >
            {status === 'playing' ? (
              <>
                <Pause className="w-6 h-6 fill-current" />
                <span>إيقاف مؤقت</span>
              </>
            ) : status === 'paused' ? (
              <>
                <Play className="w-6 h-6 fill-current" />
                <span>استئناف القراءة</span>
              </>
            ) : (
              <>
                <Play className="w-6 h-6 fill-current" />
                <span>تشغيل القراءة الصوتية</span>
              </>
            )}
          </button>

          {/* Speed Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              className="touch-target px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white transition-all flex items-center gap-2 text-[18px] font-black cursor-pointer border border-white/20 shadow-xs"
              title="سرعة القراءة"
            >
              <Gauge className="w-5 h-5" />
              <span>{speed}x</span>
            </button>

            {showSpeedMenu && (
              <div className="absolute left-0 sm:right-0 mt-2 w-36 bg-slate-900 border-2 border-slate-700 rounded-2xl shadow-2xl py-2 z-30">
                {[0.8, 0.9, 1.0, 1.25].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => changeSpeed(s)}
                    className={`w-full text-right px-4 py-2.5 text-[18px] font-bold transition-colors hover:bg-emerald-600 hover:text-white ${
                      speed === s ? 'text-amber-300 font-black bg-white/10' : 'text-slate-200'
                    }`}
                  >
                    سرعة {s}x {s === 0.9 && '(موصى بها)'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Live Sentence Highlight Preview */}
      {status !== 'stopped' && activeSentenceText && (
        <div className="mt-4 pt-4 border-t-2 border-emerald-700/50 text-[20px] text-emerald-100 flex items-start gap-3 bg-emerald-950/60 p-4 rounded-2xl">
          <span className="text-amber-300 font-black shrink-0">الجملة المقروءة:</span>
          <span className="font-bold text-white animate-fade-in leading-[1.6]">
            «{activeSentenceText}»
          </span>
        </div>
      )}
    </div>
  );
};
