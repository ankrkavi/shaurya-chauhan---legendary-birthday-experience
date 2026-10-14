import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, RotateCcw, PartyPopper, Share2, Copy, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface MissionCompleteProps {
  recipientName: string;
  onReplay: () => void;
}

export const MissionComplete: React.FC<MissionCompleteProps> = ({
  recipientName,
  onReplay
}) => {
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const handleConfettiBlast = () => {
    sounds.playConfettiPop();
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#38bdf8', '#fbbf24', '#f43f5e']
    });
  };

  const handleShareOrCopy = async () => {
    sounds.playClick();
    const currentUrl = window.location.href;
    const shareData = {
      title: `Happy Birthday ${recipientName}! 🎂`,
      text: `Check out this legendary birthday surprise website built for ${recipientName}!`,
      url: currentUrl
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        setCopyFeedback('Shared successfully! 🚀');
        setTimeout(() => setCopyFeedback(null), 3000);
        return;
      } catch (err: unknown) {
        // User cancelled or share failed, fallback to copy
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
      }
    }

    // Fallback: Copy to clipboard
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentUrl);
        setCopyFeedback('Link copied to clipboard! Send it to Shaurya 🚀');
      } else {
        // Fallback for environments where clipboard API might be restricted
        const textArea = document.createElement('textarea');
        textArea.value = currentUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopyFeedback('Link copied to clipboard! Send it to Shaurya 🚀');
      }
      setTimeout(() => setCopyFeedback(null), 3500);
    } catch {
      setCopyFeedback('Unable to copy automatically. Please copy the URL from browser bar.');
      setTimeout(() => setCopyFeedback(null), 4000);
    }
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center border-t border-white/10 mt-12">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-400 uppercase mb-4">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>MISSION STATUS: COMPLETE</span>
        <span aria-hidden="true">·</span>
        <span>AGENT HONORS CONFERRED</span>
      </div>

      {/* Main Title */}
      <h2 className="font-cinzel text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">
        YOUR MISSION IS COMPLETE,{' '}
        <span className="text-amber-300">{recipientName.toUpperCase()}</span>.
      </h2>

      <p className="font-body text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-10 leading-relaxed">
        You have survived the investigation, unsealed the secret dossiers, endured the affectionate roasts, and claimed your birthday crown.
      </p>

      {/* Action Buttons Grid */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
        {/* Replay */}
        <button
          onClick={() => {
            sounds.playClick();
            onReplay();
          }}
          className="px-6 py-3 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 text-white font-outfit text-sm font-semibold tracking-wide transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-purple-400" />
          <span>Replay Experience</span>
        </button>

        {/* Confetti */}
        <button
          onClick={handleConfettiBlast}
          className="px-6 py-3 rounded-xl bg-purple-600/30 border border-purple-400/40 hover:bg-purple-600/50 text-purple-200 font-outfit text-sm font-semibold tracking-wide transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-900/30"
        >
          <PartyPopper className="w-4 h-4 text-amber-300" />
          <span>Trigger Confetti Again!</span>
        </button>

        {/* Share */}
        <button
          onClick={handleShareOrCopy}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-outfit text-sm font-bold tracking-wide transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/25"
        >
          <Share2 className="w-4 h-4 text-slate-950" />
          <span>Share with Shaurya</span>
        </button>
      </div>

      {/* Verified feedback message */}
      {copyFeedback && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-mono animate-fadeIn mb-8">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{copyFeedback}</span>
        </div>
      )}

      {/* Footer copyright & tribute credits */}
      <div className="pt-12 text-xs text-slate-500 font-mono">
        <p>Crafted exclusively for Shaurya Chauhan's Birthday Celebration.</p>
        <p className="mt-1">Midnight Electric Edition · All Rights to Extreme Bakchodi Reserved.</p>
      </div>
    </section>
  );
};
