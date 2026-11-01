import React, { useEffect, useState } from 'react';
import { Volume2, Square, Sparkles } from 'lucide-react';
import { speechEngine, SpeechEngineState } from '../utils/speechEngine';

export interface ReadAloudButtonProps {
  id: string;
  textToRead: string;
  label?: string;
  activeLabel?: string;
  size?: 'normal' | 'compact' | 'icon-only';
  variant?: 'primary' | 'secondary' | 'emerald' | 'amber' | 'purple' | 'subtle';
  className?: string;
}

export const ReadAloudButton: React.FC<ReadAloudButtonProps> = ({
  id,
  textToRead,
  label = 'اقرأ لي',
  activeLabel = 'جارٍ القراءة... (إيقاف)',
  size = 'normal',
  variant = 'secondary',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = speechEngine.subscribe((state: SpeechEngineState) => {
      const active = state.status === 'playing' && state.activeId === id;
      setIsPlaying(active);
    });

    return () => {
      unsubscribe();
    };
  }, [id]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      speechEngine.stop();
    } else {
      speechEngine.playItem(id, textToRead);
    }
  };

  // Variant colour definitions with rich, child-friendly high contrast
  const variantStyles = {
    primary: isPlaying
      ? 'bg-rose-600 text-white border-rose-700 shadow-md animate-pulse ring-4 ring-rose-200'
      : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700 shadow-sm hover:shadow-md hover:scale-[1.02]',
    secondary: isPlaying
      ? 'bg-rose-500 text-white border-rose-600 shadow-md animate-pulse ring-4 ring-rose-200'
      : 'bg-sky-50 hover:bg-sky-100 text-sky-900 border-sky-300 hover:border-sky-400 hover:scale-[1.02]',
    emerald: isPlaying
      ? 'bg-rose-600 text-white border-rose-700 shadow-md animate-pulse ring-4 ring-rose-200'
      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300 hover:border-emerald-400 hover:scale-[1.02]',
    amber: isPlaying
      ? 'bg-rose-600 text-white border-rose-700 shadow-md animate-pulse ring-4 ring-rose-200'
      : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 hover:border-amber-400 hover:scale-[1.02]',
    purple: isPlaying
      ? 'bg-rose-600 text-white border-rose-700 shadow-md animate-pulse ring-4 ring-rose-200'
      : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border-purple-300 hover:border-purple-400 hover:scale-[1.02]',
    subtle: isPlaying
      ? 'bg-rose-100 text-rose-800 border-rose-300 ring-2 ring-rose-300'
      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300',
  }[variant];

  // Minimum touch target 48x48px guaranteed
  if (size === 'icon-only') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={isPlaying ? 'إيقاف القراءة الصوتية' : `استمع: ${label}`}
        title={isPlaying ? 'إيقاف القراءة الصوتية' : `🔊 ${label}`}
        className={`touch-target w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all cursor-pointer shrink-0 select-none ${variantStyles} ${className}`}
      >
        {isPlaying ? (
          <Square className="w-6 h-6 fill-current animate-bounce" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </button>
    );
  }

  if (size === 'compact') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={isPlaying ? 'إيقاف القراءة الصوتية' : label}
        className={`touch-target min-h-[48px] px-3.5 py-2 rounded-2xl border-2 flex items-center gap-2 font-bold text-[18px] transition-all cursor-pointer shrink-0 select-none ${variantStyles} ${className}`}
      >
        {isPlaying ? (
          <>
            <Square className="w-5 h-5 fill-current animate-spin" />
            <span className="text-[17px] font-black">{activeLabel}</span>
          </>
        ) : (
          <>
            <Volume2 className="w-5 h-5" />
            <span className="text-[17px]">{label}</span>
          </>
        )}
      </button>
    );
  }

  // Standard large button (19–22 px text, min-h-[48px], clear icon, child-friendly)
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isPlaying ? 'إيقاف القراءة' : label}
      className={`touch-target min-h-[48px] px-4 py-2.5 rounded-2xl border-2 flex items-center justify-center gap-2.5 font-bold text-[19px] sm:text-[20px] transition-all cursor-pointer select-none ${variantStyles} ${className}`}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-4 bg-white rounded-full animate-wave-1"></span>
            <span className="w-1.5 h-5 bg-white rounded-full animate-wave-2"></span>
            <span className="w-1.5 h-3 bg-white rounded-full animate-wave-3"></span>
          </div>
          <Square className="w-5 h-5 fill-current" />
          <span className="font-black text-[18px] sm:text-[19px]">{activeLabel}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-6 h-6 text-current shrink-0" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
