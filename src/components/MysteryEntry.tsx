import React, { useState } from 'react';
import { Eye, ShieldAlert, Sparkles, ChevronDown } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface MysteryEntryProps {
  onEnter: () => void;
  recipientName: string;
}

export const MysteryEntry: React.FC<MysteryEntryProps> = ({ onEnter, recipientName }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleEnterClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    sounds.playWhoosh();
    sounds.startAmbientMusic();

    setTimeout(() => {
      onEnter();
      setIsTransitioning(false);
    }, 600);
  };

  return (
    <section
      id="entry"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 text-center overflow-hidden pt-16 pb-12"
    >
      {/* Background mysterious spotlight & ring pulse */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full blur-[100px] transition-all duration-700 ${
            isHovered
              ? 'bg-purple-600/25 scale-110'
              : 'bg-purple-900/15 scale-95'
          }`}
        />
        <div className="absolute w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] rounded-full blur-[80px] bg-cyan-600/15" />
      </div>

      {/* Mysterious pulsing orb */}
      <div className="relative mb-8 flex items-center justify-center">
        <div className="relative flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-purple-500/30 bg-purple-950/20 backdrop-blur-md shadow-[0_0_50px_rgba(168,85,247,0.25)]">
          <div className="absolute inset-2 rounded-full border border-cyan-400/20 animate-spin" style={{ animationDuration: '18s' }} />
          <div className="absolute inset-5 rounded-full border border-dashed border-amber-400/30 animate-spin" style={{ animationDuration: '24s', animationDirection: 'reverse' }} />
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/50">
            <Eye className="w-6 h-6 text-white animate-pulse" />
          </div>
        </div>
      </div>

      {/* Confidential Header Tag (No pills, clean unboxed text) */}
      <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-purple-300 uppercase mb-4">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
        <span>CLASSIFIED BIRTHDAY DOSSIER</span>
        <span aria-hidden="true">·</span>
        <span>SECURITY LEVEL: ULTRA</span>
      </div>

      {/* Main Cinematic Message */}
      <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight mb-6">
        Hey <span className="gold-shimmer-text">{recipientName}</span>...
        <br />
        <span className="text-slate-300 text-2xl sm:text-4xl md:text-5xl font-light">
          Someone has a surprise for you.
        </span>
      </h1>

      {/* Subtext description */}
      <p className="font-body text-slate-400 max-w-xl text-sm sm:text-base mb-10 leading-relaxed">
        A covert investigation into your questionable life choices, legendary moments, and your official status as the undisputed main character.
      </p>

      {/* Glowing CTA Button */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-cyan-500 to-amber-500 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse" />
        <button
          onClick={handleEnterClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={isTransitioning}
          className="relative px-8 py-4 sm:px-10 sm:py-5 rounded-xl bg-gradient-to-b from-[#18152e] to-[#0c0a1a] border border-purple-400/40 text-white font-outfit text-sm sm:text-base font-bold tracking-wider uppercase transition-all duration-300 transform active:scale-95 shadow-2xl cursor-pointer flex items-center gap-3"
        >
          <Sparkles className="w-5 h-5 text-amber-400 animate-bounce" />
          <span>ENTER AT YOUR OWN RISK 👀</span>
        </button>
      </div>

      {/* Ambient scroll down prompt */}
      <div className="mt-14 flex flex-col items-center gap-2 text-slate-500 text-xs tracking-wider uppercase">
        <span>Proceed to uncover the files</span>
        <ChevronDown className="w-4 h-4 text-purple-400 animate-bounce" />
      </div>

      {/* Cinematic Flash Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-gradient-to-b from-purple-900/60 to-black z-50 pointer-events-none animate-pulse transition-opacity duration-500" />
      )}
    </section>
  );
};
