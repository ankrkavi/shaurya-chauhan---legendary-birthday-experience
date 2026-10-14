import React, { useState } from 'react';
import { Lock, Unlock, Crown, ShieldAlert, Sparkles, CheckCircle2, FileQuestion } from 'lucide-react';
import { MysteryCard } from '../types';
import { sounds } from '../utils/soundEffects';

interface SecretInvestigationProps {
  cards: MysteryCard[];
  subtitle: string;
  onProceedToReveal: () => void;
}

export const SecretInvestigation: React.FC<SecretInvestigationProps> = ({
  cards,
  subtitle,
  onProceedToReveal
}) => {
  const [unlockedCards, setUnlockedCards] = useState<Record<string, boolean>>({});

  const handleCardClick = (id: string) => {
    const isCurrentlyUnlocked = unlockedCards[id];
    sounds.playCardFlip();
    if (!isCurrentlyUnlocked) {
      sounds.playUnlock();
    }
    setUnlockedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Lock':
        return <Lock className="w-5 h-5 text-amber-400" />;
      case 'Crown':
        return <Crown className="w-5 h-5 text-amber-300" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-cyan-400" />;
      default:
        return <FileQuestion className="w-5 h-5 text-purple-400" />;
    }
  };

  const unlockedCount = Object.values(unlockedCards).filter(Boolean).length;
  const allUnlocked = unlockedCount === cards.length;

  return (
    <section id="investigation" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-3">
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
          <span>PHASE 1: SURVEILLANCE & INTEL</span>
          <span aria-hidden="true">·</span>
          <span>SUBJECT CODE: CHAUHAN-007</span>
        </div>

        <h2 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          The Secret Investigation
        </h2>

        <p className="font-body text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        {/* Status tracker */}
        <div className="mt-4 flex items-center justify-center gap-3 text-xs text-slate-400 font-mono">
          <span>Declassified Dossiers:</span>
          <span className="text-amber-400 font-semibold tabular-nums">{unlockedCount} of {cards.length}</span>
          {allUnlocked && (
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> All Clearance Granted
            </span>
          )}
        </div>
      </div>

      {/* 3 Interactive Mystery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
        {cards.map((card) => {
          const isUnlocked = !!unlockedCards[card.id];

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer overflow-hidden ${
                isUnlocked
                  ? 'glass-panel-elevated ring-1 ring-purple-500/50 shadow-[0_10px_35px_-10px_rgba(168,85,247,0.3)]'
                  : 'glass-panel hover:border-purple-500/40 hover:bg-[#151329]/80'
              }`}
            >
              {/* Subtle top indicator bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 transition-colors ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-purple-500 via-cyan-400 to-amber-400'
                    : 'bg-white/10 group-hover:bg-purple-500/40'
                }`}
              />

              {/* Header row */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isUnlocked
                        ? 'bg-purple-600/30 border border-purple-400/40'
                        : 'bg-white/5 border border-white/10 group-hover:border-purple-400/30'
                    }`}
                  >
                    {isUnlocked ? <Unlock className="w-5 h-5 text-emerald-400" /> : getIcon(card.icon)}
                  </div>
                  <div>
                    <h3 className="font-outfit text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400">{card.subtitle}</p>
                  </div>
                </div>

                <div className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded border border-white/10 text-slate-400 uppercase">
                  {isUnlocked ? 'DECLASSIFIED' : 'RESTRICTED'}
                </div>
              </div>

              {/* Classification label */}
              <div className="text-[11px] font-mono text-purple-400/80 mb-3 tracking-wider">
                {card.classifiedLevel}
              </div>

              {/* Content view */}
              {isUnlocked ? (
                <div className="space-y-3 animate-fadeIn">
                  <p className="text-sm text-slate-200 leading-relaxed font-body">
                    {card.content}
                  </p>
                  <div className="p-3 rounded-lg bg-black/40 border border-amber-500/30 text-xs text-amber-200 leading-snug">
                    <span className="font-semibold text-amber-400 block mb-1">
                      💡 Official Finding:
                    </span>
                    {card.punchline}
                  </div>
                </div>
              ) : (
                <div className="py-6 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Lock className="w-5 h-5 text-purple-400/70" />
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
                    {card.hint}
                  </span>
                  <span className="text-[10px] text-purple-400/60 font-mono mt-1">
                    [Click to decrypt]
                  </span>
                </div>
              )}

              {/* Bottom interaction cue */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>FILE STATUS</span>
                <span className={isUnlocked ? 'text-emerald-400' : 'text-amber-400'}>
                  {isUnlocked ? 'ACTIVE_UNSEALED' : 'ENCRYPTED'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Button to proceed to the epic reveal */}
      <div className="text-center">
        <button
          onClick={() => {
            sounds.playClick();
            onProceedToReveal();
          }}
          className="relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-outfit text-sm font-bold tracking-wider transition-all duration-300 transform active:scale-95 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>PROCEED TO THE BIG REVEAL 🎂</span>
        </button>
      </div>
    </section>
  );
};
