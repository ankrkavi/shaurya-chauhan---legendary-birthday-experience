import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, AlertTriangle, Sparkles, Heart, Check, PartyPopper } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface FinalSurpriseProps {
  punchline: string;
  personalNote: string;
  recipientName: string;
}

export const FinalSurprise: React.FC<FinalSurpriseProps> = ({
  punchline,
  personalNote,
  recipientName
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleOpenGift = () => {
    if (isOpened) return;

    sounds.playClick();
    setIsShaking(true);

    setTimeout(() => {
      setIsShaking(false);
      setIsOpened(true);
      sounds.playConfettiPop();
      sounds.playFanfare();

      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#fbbf24', '#38bdf8', '#ec4899']
      });
    }, 650);
  };

  return (
    <section id="surprise" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-400 uppercase mb-3">
          <Gift className="w-4 h-4 text-amber-400" />
          <span>PHASE 5: THE FINAL ENIGMA</span>
          <span aria-hidden="true">·</span>
          <span>HIGH HAZARD REVELATION</span>
        </div>

        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          The Secret Final Surprise
        </h2>

        <p className="font-body text-slate-300 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
          There is one last package left. Under strict orders: proceed with extreme caution.
        </p>
      </div>

      {/* 3D Animated Gift Box or Opened Treasure */}
      <div className="flex flex-col items-center">
        {!isOpened ? (
          <div className="flex flex-col items-center">
            {/* Gift Box Graphic */}
            <div
              onClick={handleOpenGift}
              className={`relative cursor-pointer transition-transform duration-200 mb-8 ${
                isShaking ? 'animate-bounce scale-110' : 'hover:scale-105'
              }`}
            >
              {/* Pulsing ambient halo */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 rounded-3xl blur-2xl opacity-40 animate-pulse pointer-events-none" />

              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-br from-purple-800 via-indigo-900 to-[#120d2b] border-2 border-purple-400/50 shadow-2xl flex flex-col items-center justify-center p-4">
                {/* Ribbon Vertical */}
                <div className="absolute inset-y-0 w-8 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 shadow-md flex items-center justify-center" />
                {/* Ribbon Horizontal */}
                <div className="absolute inset-x-0 h-8 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-md" />

                {/* Bow on Top */}
                <div className="absolute -top-4 w-14 h-10 flex items-center justify-center z-20">
                  <div className="w-6 h-6 rounded-full bg-amber-300 shadow-lg border border-amber-100 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-slate-900" />
                  </div>
                </div>

                <div className="z-10 bg-black/60 px-3 py-1.5 rounded-lg border border-amber-300/40 text-[10px] font-mono tracking-widest text-amber-200 uppercase mt-12">
                  TOP HAZARD
                </div>
              </div>
            </div>

            {/* Warning CTA Button */}
            <button
              onClick={handleOpenGift}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-outfit text-sm sm:text-base font-bold tracking-wider uppercase shadow-xl shadow-red-600/30 hover:shadow-red-600/50 transition-all active:scale-95 flex items-center gap-2.5 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>DON'T OPEN THIS ⚠️</span>
            </button>
            <span className="text-[11px] font-mono text-slate-500 mt-2">
              (We know you're definitely going to click it anyway)
            </span>
          </div>
        ) : (
          /* Opened Surprise Card */
          <div className="w-full max-w-2xl rounded-3xl glass-panel-elevated p-6 sm:p-10 border border-purple-400/50 shadow-2xl animate-fadeIn relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-amber-400 to-rose-500" />

            <div className="w-14 h-14 rounded-full bg-purple-600/20 border border-purple-400/40 flex items-center justify-center mx-auto mb-6">
              <PartyPopper className="w-7 h-7 text-amber-300" />
            </div>

            {/* Punchline */}
            <h3 className="font-outfit text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-6 leading-tight">
              {punchline}
            </h3>

            {/* Friend's Personal Message */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 text-slate-200 text-sm sm:text-base font-body leading-relaxed mb-6 text-left">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
                <Heart className="w-3.5 h-3.5 fill-amber-400" />
                <span>DIRECT NOTE TO {recipientName.toUpperCase()}:</span>
              </div>
              <p>{personalNote}</p>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-purple-300 font-mono">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>All Classified Directives Successfully Executed</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
