import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Pause, Play, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenPhotoManager: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenPhotoManager
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sounds.setMuted(nextMuted);
    if (!nextMuted) {
      sounds.playClick();
    }
  };

  const handleToggleMusic = () => {
    sounds.playClick();
    const playing = sounds.toggleMusic();
    setIsMusicPlaying(playing);
  };

  const navLinks = [
    { id: 'investigation', label: 'Investigation' },
    { id: 'reveal', label: 'The Reveal' },
    { id: 'vault', label: 'Memory Vault' },
    { id: 'roasts', label: 'Roast Zone' },
    { id: 'letter', label: 'Letter' },
    { id: 'surprise', label: 'Final Gift' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled
          ? 'bg-[#080811]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#entry"
          onClick={(e) => {
            e.preventDefault();
            sounds.playClick();
            onNavigate('entry');
          }}
          className="font-cinzel text-sm sm:text-base font-bold tracking-wider text-amber-300 hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>SHAURYA CHAUHAN</span>
        </a>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  sounds.playClick();
                  onNavigate(link.id);
                }}
                className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer relative py-1 hover:text-white ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-slate-400'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Media & Audio Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Photos Customizer Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenPhotoManager();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-purple-300 bg-purple-950/40 border border-purple-500/30 hover:bg-purple-900/50 hover:text-white transition-all whitespace-nowrap shrink-0 cursor-pointer"
            title="Customise Photos & Notes"
          >
            <span>Photos & Setup</span>
          </button>

          {/* Music Play/Pause */}
          <button
            onClick={handleToggleMusic}
            aria-label={isMusicPlaying ? 'Pause Ambient Music' : 'Play Ambient Music'}
            className={`p-2 rounded-lg border transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 text-xs ${
              isMusicPlaying
                ? 'bg-purple-600/30 border-purple-400/60 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10'
            }`}
            title={isMusicPlaying ? 'Pause Ambient Birthday Synth' : 'Play Ambient Birthday Synth'}
          >
            {isMusicPlaying ? (
              <>
                <Pause className="w-4 h-4 text-purple-300" />
                <span className="hidden md:inline text-purple-200">Music</span>
              </>
            ) : (
              <>
                <Music className="w-4 h-4" />
                <span className="hidden md:inline">Music</span>
              </>
            )}
          </button>

          {/* Sound FX Mute Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className={`p-2 rounded-lg border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              isMuted
                ? 'bg-red-950/40 border-red-500/40 text-red-300'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10'
            }`}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
