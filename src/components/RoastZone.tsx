import React, { useState } from 'react';
import { Laugh, Award, ThumbsUp, Shield, Sparkles, Flame, Check } from 'lucide-react';
import { RoastItem } from '../types';
import { sounds } from '../utils/soundEffects';

interface RoastZoneProps {
  roasts: RoastItem[];
  recipientName: string;
}

export const RoastZone: React.FC<RoastZoneProps> = ({ roasts, recipientName }) => {
  const [reactions, setReactions] = useState<Record<string, { agree: number; defend: number; userVote?: 'agree' | 'defend' }>>(() => {
    const initial: Record<string, { agree: number; defend: number }> = {};
    roasts.forEach(r => {
      initial[r.id] = {
        agree: r.reactionCount,
        defend: Math.floor(r.reactionCount * 0.15)
      };
    });
    return initial;
  });

  const handleVote = (id: string, type: 'agree' | 'defend') => {
    sounds.playClick();
    setReactions(prev => {
      const current = prev[id] || { agree: 0, defend: 0 };
      if (current.userVote === type) {
        // Toggle off
        return {
          ...prev,
          [id]: {
            ...current,
            [type]: current[type] - 1,
            userVote: undefined
          }
        };
      } else {
        // Switch or vote
        const prevVote = current.userVote;
        return {
          ...prev,
          [id]: {
            ...current,
            [type]: current[type] + 1,
            ...(prevVote ? { [prevVote]: current[prevVote] - 1 } : {}),
            userVote: type
          }
        };
      }
    });
  };

  return (
    <section id="roasts" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-400 uppercase mb-3">
          <Laugh className="w-4 h-4 text-amber-400" />
          <span>PHASE 3: CRITICAL EVALUATION</span>
          <span aria-hidden="true">·</span>
          <span>FRIENDSHIP TRIBUNAL</span>
        </div>

        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
          {recipientName}: The Unofficial Menace
        </h2>

        <p className="font-body text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Celebrating your unique talents that constantly test the patience and sanity of everyone around you. With unconditional love, of course.
        </p>
      </div>

      {/* 5 Funny Roast Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
        {roasts.map((roast, index) => {
          const voteData = reactions[roast.id] || { agree: roast.reactionCount, defend: 5 };
          const isUserAgree = voteData.userVote === 'agree';
          const isUserDefend = voteData.userVote === 'defend';

          return (
            <div
              key={roast.id}
              className={`rounded-2xl glass-panel p-6 border transition-all duration-300 flex flex-col justify-between hover:border-amber-400/40 hover:bg-[#151326] relative overflow-hidden group ${
                index === 0 ? 'md:col-span-2 lg:col-span-1 border-amber-500/30' : 'border-white/10'
              }`}
            >
              {/* Top ambient highlight */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/15 transition-colors" />

              <div>
                {/* Award Badge row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold">
                    {roast.badge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    AWARD #{index + 1}
                  </span>
                </div>

                {/* Award Title */}
                <h3 className="font-outfit text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                  {roast.award}
                </h3>

                {/* Famous Quote in Hinglish */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 mb-4 italic text-sm text-purple-200">
                  "{roast.quote}"
                </div>

                {/* Details */}
                <p className="text-sm text-slate-300 font-body leading-relaxed mb-4">
                  {roast.details}
                </p>

                {/* Official Verdict */}
                <div className="text-xs font-mono text-slate-400 bg-white/5 p-2.5 rounded-lg border border-white/5 mb-6">
                  <span className="text-amber-400 font-semibold block mb-0.5">⚖️ Jury Verdict:</span>
                  {roast.verdict}
                </div>
              </div>

              {/* Interactive Reaction Poll */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
                <button
                  onClick={() => handleVote(roast.id, 'agree')}
                  className={`flex-1 py-2 px-3 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer font-medium ${
                    isUserAgree
                      ? 'bg-amber-500/20 border-amber-400/60 text-amber-300'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>100% Agree</span>
                  <span className="font-mono text-[11px] opacity-80 tabular-nums">({voteData.agree})</span>
                </button>

                <button
                  onClick={() => handleVote(roast.id, 'defend')}
                  className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer font-medium ${
                    isUserDefend
                      ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-300'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                  title="Try defending him (impossible)"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Defend</span>
                  <span className="font-mono text-[11px] opacity-80 tabular-nums">({voteData.defend})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Friendship disclaimer */}
      <div className="text-center text-xs text-slate-400 font-mono">
        <span>* All roasts are certified 100% genuine friendship affection. Zero refund policy applicable.</span>
      </div>
    </section>
  );
};
