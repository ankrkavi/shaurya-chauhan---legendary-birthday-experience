import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Flame, Wind, PartyPopper, Heart, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface BirthdayRevealProps {
  recipientName: string;
  subtitle: string;
  ageYears?: number;
}

export const BirthdayReveal: React.FC<BirthdayRevealProps> = ({
  recipientName,
  subtitle,
  ageYears = 22
}) => {
  const [stage, setStage] = useState<'anticipation' | 'revealed'>('anticipation');
  const [countdown, setCountdown] = useState(3);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const fireCinematicConfetti = () => {
    sounds.playConfettiPop();

    // Side cannon bursts
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#a855f7', '#38bdf8', '#fbbf24']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#c084fc', '#fef08a', '#e879f9']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#fbbf24', '#38bdf8', '#ffffff']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  };

  // Anticipation countdown trigger
  useEffect(() => {
    if (stage === 'anticipation') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setStage('revealed');
            sounds.playFanfare();
            fireCinematicConfetti();
            return 0;
          }
          sounds.playClick();
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [stage]);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    sounds.playCandleBlow();
    setCandlesBlown(true);
    setWishMade(true);

    setTimeout(() => {
      fireCinematicConfetti();
      sounds.playFanfare();
    }, 400);
  };

  const handleRelightCandles = () => {
    sounds.playClick();
    setCandlesBlown(false);
    setWishMade(false);
  };

  return (
    <section
      id="reveal"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background radial celebratory glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[450px] sm:w-[700px] h-[450px] sm:h-[700px] rounded-full blur-[140px] bg-purple-700/20" />
        <div className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full blur-[110px] bg-amber-500/15" />
      </div>

      {stage === 'anticipation' ? (
        /* Dramatic anticipation screen */
        <div className="relative z-10 max-w-xl mx-auto py-16 animate-pulse">
          <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300 text-xs font-mono tracking-widest uppercase mb-6">
            INCOMING TRANSMISSION
          </div>
          <h2 className="font-cinzel text-4xl sm:text-6xl font-black text-white tracking-wider mb-6">
            WAIT FOR IT...
          </h2>
          <div className="text-6xl sm:text-8xl font-black font-outfit gold-shimmer-text my-8 tabular-nums">
            {countdown}
          </div>
          <p className="font-body text-slate-400 text-sm">
            Hold your breath. The celebration sequence is synchronizing...
          </p>
        </div>
      ) : (
        /* Full massive reveal */
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          {/* Top celebratory kicker */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-400 uppercase mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>OFFICIAL CELEBRATION UNLOCKED</span>
            <span aria-hidden="true">·</span>
            <span>LEVEL {ageYears} REACHED</span>
          </div>

          {/* Massive Glowing Title */}
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-white leading-tight mb-6 max-w-4xl">
            HAPPY BIRTHDAY
            <br />
            <span className="gold-shimmer-text block mt-2 text-4xl sm:text-6xl md:text-8xl">
              {recipientName.toUpperCase()} 🎂
            </span>
          </h2>

          <p className="font-body text-slate-300 text-base sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            {subtitle} May this year bring you next-level victories, legendary memories, and zero regrets!
          </p>

          {/* Interactive Birthday Cake & Candles Card */}
          <div className="w-full max-w-lg mx-auto rounded-3xl glass-panel-elevated p-6 sm:p-8 relative overflow-hidden mb-12 shadow-2xl border border-purple-500/30">
            {/* Cake Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-amber-400/20 blur-2xl pointer-events-none" />

            <div className="text-xs font-mono text-slate-400 tracking-wider uppercase mb-6 flex items-center justify-between">
              <span>TRADITIONAL RITUAL</span>
              <span className="text-amber-400">
                {candlesBlown ? 'WISH REGISTERED' : 'READY TO BLOW'}
              </span>
            </div>

            {/* Custom Interactive Cake Illustration */}
            <div className="relative py-4 flex flex-col items-center">
              {/* Candles Row */}
              <div className="flex items-end justify-center gap-4 sm:gap-6 mb-2 relative z-10">
                {[1, 2, 3, 4, 5].map((candleIndex) => (
                  <div key={candleIndex} className="flex flex-col items-center">
                    {/* Flame */}
                    {!candlesBlown ? (
                      <div className="relative flex flex-col items-center">
                        <div className="w-3.5 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 animate-flicker cursor-pointer shadow-[0_0_15px_#f59e0b]" />
                        <div className="w-1 h-2 bg-amber-400/50 rounded-full blur-[1px]" />
                      </div>
                    ) : (
                      <div className="h-6 flex items-center justify-center">
                        {/* Smoke puff */}
                        <div className="w-1.5 h-3 bg-slate-400/40 rounded-full blur-[2px] -translate-y-1 animate-pulse" />
                      </div>
                    )}
                    {/* Candle wick & stick */}
                    <div className="w-0.5 h-2 bg-slate-600" />
                    <div className="w-3 h-10 sm:h-12 rounded-t-sm bg-gradient-to-b from-purple-400 via-indigo-500 to-purple-800 shadow-md border-x border-white/20" />
                  </div>
                ))}
              </div>

              {/* Cake Top Layer */}
              <div className="w-44 sm:w-56 h-12 rounded-t-2xl bg-gradient-to-r from-amber-800 via-amber-600 to-amber-900 border-t-2 border-amber-300/40 relative shadow-inner flex items-center justify-center">
                <div className="absolute inset-x-2 top-1 h-2 rounded-full bg-amber-200/20 blur-[1px]" />
                <span className="text-[11px] font-outfit font-semibold text-amber-200 tracking-wider uppercase">
                  Chauhan Edition
                </span>
              </div>

              {/* Cake Bottom Layer */}
              <div className="w-60 sm:w-72 h-16 rounded-b-2xl bg-gradient-to-r from-[#1e1338] via-[#2d1b54] to-[#1e1338] border-b-2 border-purple-500/40 relative flex items-center justify-around px-4 shadow-xl">
                {/* Decorative golden rosettes */}
                <div className="w-3 h-3 rounded-full bg-amber-400/80 shadow-[0_0_6px_#fbbf24]" />
                <div className="w-3 h-3 rounded-full bg-purple-400/80 shadow-[0_0_6px_#c084fc]" />
                <div className="w-3 h-3 rounded-full bg-cyan-400/80 shadow-[0_0_6px_#38bdf8]" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80 shadow-[0_0_6px_#fbbf24]" />
              </div>

              {/* Cake Stand Base */}
              <div className="w-72 sm:w-84 h-3 bg-gradient-to-r from-slate-700 via-slate-400 to-slate-800 rounded-full mt-1 shadow-lg" />
            </div>

            {/* Interaction Button */}
            <div className="mt-6 flex flex-col items-center gap-3">
              {!candlesBlown ? (
                <button
                  onClick={handleBlowCandles}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-outfit font-bold text-sm tracking-wide shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Wind className="w-4 h-4" />
                  <span>Make a Wish & Blow the Candles 🎂</span>
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm animate-fadeIn">
                    <p className="font-semibold flex items-center justify-center gap-1.5 mb-1 text-emerald-300">
                      <Sparkles className="w-4 h-4 text-emerald-400" /> Wish Sent to the Universe!
                    </p>
                    <span>May all your dreams, ambitions, and crazy schemes come true, Shaurya! ✨</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => fireCinematicConfetti()}
                      className="px-4 py-2 rounded-lg bg-purple-600/30 border border-purple-400/40 text-purple-200 text-xs hover:bg-purple-600/50 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <PartyPopper className="w-3.5 h-3.5 text-amber-300" /> More Confetti!
                    </button>
                    <button
                      onClick={handleRelightCandles}
                      className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-xs hover:text-slate-200 hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Re-light Candles
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick stats grid (tabular numerals, natural styling) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
            <div className="p-4 rounded-xl glass-panel text-center">
              <span className="block text-2xl font-bold text-amber-400 font-outfit tabular-nums">
                {ageYears}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">Years of Royalty</span>
            </div>
            <div className="p-4 rounded-xl glass-panel text-center">
              <span className="block text-2xl font-bold text-purple-400 font-outfit tabular-nums">
                8,000+
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">Days of Bakchodi</span>
            </div>
            <div className="p-4 rounded-xl glass-panel text-center">
              <span className="block text-2xl font-bold text-cyan-400 font-outfit tabular-nums">
                100%
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">Main Character Aura</span>
            </div>
            <div className="p-4 rounded-xl glass-panel text-center">
              <span className="block text-2xl font-bold text-rose-400 font-outfit tabular-nums">
                ∞
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">Friendship Rating</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
