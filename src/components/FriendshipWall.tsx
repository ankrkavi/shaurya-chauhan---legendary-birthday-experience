import React, { useState, useEffect } from 'react';
import { Mail, MailOpen, Heart, Sparkles, Send, Award, Feather } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface FriendshipWallProps {
  title: string;
  paragraphs: string[];
  signoff: string;
  senderName: string;
}

export const FriendshipWall: React.FC<FriendshipWallProps> = ({
  title,
  paragraphs,
  signoff,
  senderName
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleLinesCount, setVisibleLinesCount] = useState(0);
  const [hugCount, setHugCount] = useState(1);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const handleOpenLetter = () => {
    if (isOpen) return;
    sounds.playWhoosh();
    sounds.playCardFlip();
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen && visibleLinesCount < paragraphs.length) {
      const timer = setTimeout(() => {
        sounds.playClick();
        setVisibleLinesCount(prev => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen, visibleLinesCount, paragraphs.length]);

  const handleSendHug = () => {
    sounds.playClick();
    setHugCount(prev => prev + 1);
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 1200);
  };

  return (
    <section id="letter" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-rose-400 uppercase mb-3">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <span>PHASE 4: THE UNFILTERED TRUTH</span>
          <span aria-hidden="true">·</span>
          <span>BROTHERHOOD PACT</span>
        </div>

        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
          The Friendship Wall
        </h2>

        <p className="font-body text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Enough with the jokes for a moment. This one comes straight from the heart.
        </p>
      </div>

      {/* Sealed Envelope vs Unfolded Letter */}
      {!isOpen ? (
        <div className="flex flex-col items-center">
          <div
            onClick={handleOpenLetter}
            className="group relative w-full max-w-md h-64 sm:h-72 rounded-2xl bg-gradient-to-br from-[#1c1836] via-[#121024] to-[#0c0a1a] border border-purple-500/30 hover:border-amber-400/60 p-6 flex flex-col items-center justify-center cursor-pointer shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
          >
            {/* Ambient gold glow */}
            <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />

            {/* Envelope flap aesthetic */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 border border-amber-200/40 shadow-lg shadow-amber-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8 text-slate-950" />
            </div>

            <div className="text-center z-10">
              <span className="font-cinzel text-lg font-bold text-white block mb-1">
                A Letter For Shaurya
              </span>
              <span className="text-xs text-amber-300 font-mono tracking-wider">
                CONFIDENTIAL · PERSONAL DISPATCH
              </span>
            </div>

            {/* Wax seal simulation */}
            <div className="mt-6 px-6 py-2.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-wider uppercase group-hover:bg-amber-500 group-hover:text-slate-950 transition-all flex items-center gap-2">
              <Feather className="w-3.5 h-3.5" />
              <span>Open Your Letter</span>
            </div>
          </div>
        </div>
      ) : (
        /* Unfolded Parchment / Glass Letter */
        <div className="rounded-3xl glass-panel-gold p-6 sm:p-12 relative overflow-hidden shadow-2xl border border-amber-500/40 animate-fadeIn">
          {/* Subtle watermark feather */}
          <div className="absolute top-6 right-6 opacity-10 text-amber-400 pointer-events-none">
            <Feather className="w-32 h-32" />
          </div>

          {/* Letter header */}
          <div className="border-b border-amber-500/20 pb-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MailOpen className="w-5 h-5 text-amber-400" />
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200">
                {title}
              </h3>
            </div>
            <span className="text-xs font-mono text-amber-400/80">
              ORIGINAL MEMOIR
            </span>
          </div>

          {/* Typewriter Line-by-Line Paragraphs */}
          <div className="space-y-6 text-slate-200 font-body text-base sm:text-lg leading-relaxed">
            {paragraphs.map((para, index) => {
              const isVisible = index < visibleLinesCount;
              if (!isVisible) return null;

              const isHighlight = para.includes("Life gets a little more legendary") || para.includes("Happy Birthday, bhai!");

              return (
                <p
                  key={index}
                  className={`transition-all duration-700 animate-fadeIn ${
                    isHighlight
                      ? 'text-amber-200 font-medium text-lg sm:text-xl pl-4 border-l-2 border-amber-400'
                      : 'text-slate-300'
                  }`}
                >
                  {para}
                </p>
              );
            })}
          </div>

          {/* Signoff */}
          {visibleLinesCount >= paragraphs.length && (
            <div className="mt-12 pt-6 border-t border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 animate-fadeIn">
              <div>
                <p className="text-xs text-amber-400/80 font-mono mb-1">{signoff}</p>
                <p className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide">
                  {senderName}
                </p>
              </div>

              {/* Heart reaction / virtual hug */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSendHug}
                  className="px-4 py-2.5 rounded-xl bg-rose-600/20 border border-rose-500/40 hover:bg-rose-600/30 text-rose-300 text-xs font-medium transition-all flex items-center gap-2 cursor-pointer relative"
                >
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
                  <span>Send Virtual Bhai Hug</span>
                  <span className="font-mono bg-rose-950/60 px-1.5 py-0.5 rounded text-[11px] text-rose-200 tabular-nums">
                    {hugCount}
                  </span>
                  {showHeartBurst && (
                    <span className="absolute -top-6 right-2 text-rose-400 text-sm font-bold animate-bounce">
                      +1 ❤️
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
