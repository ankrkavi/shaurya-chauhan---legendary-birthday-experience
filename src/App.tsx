import React, { useState, useEffect } from 'react';
import { BIRTHDAY_CONFIG } from './data/birthdayConfig';
import { MemoryPhoto } from './types';
import { BackgroundParticles } from './components/BackgroundParticles';
import { Navbar } from './components/Navbar';
import { MysteryEntry } from './components/MysteryEntry';
import { SecretInvestigation } from './components/SecretInvestigation';
import { BirthdayReveal } from './components/BirthdayReveal';
import { MemoryVault } from './components/MemoryVault';
import { RoastZone } from './components/RoastZone';
import { FriendshipWall } from './components/FriendshipWall';
import { FinalSurprise } from './components/FinalSurprise';
import { MissionComplete } from './components/MissionComplete';
import { PhotoManagerModal } from './components/PhotoManagerModal';
import { sounds } from './utils/soundEffects';

export default function App() {
  const [config, setConfig] = useState(BIRTHDAY_CONFIG);
  const [photos, setPhotos] = useState<MemoryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem('shaurya_birthday_photos');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
    return BIRTHDAY_CONFIG.photos;
  });

  const [activeSection, setActiveSection] = useState('entry');
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  // Sync photos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shaurya_birthday_photos', JSON.stringify(photos));
    } catch {
      // Ignore
    }
  }, [photos]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['entry', 'investigation', 'reveal', 'vault', 'roasts', 'letter', 'surprise'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnterExperience = () => {
    setHasEntered(true);
    scrollToSection('investigation');
  };

  const handleUpdatePhoto = (index: number, newUrl: string, newCaption?: string) => {
    setPhotos((prev) => {
      const next = [...prev];
      if (next[index]) {
        next[index] = {
          ...next[index],
          url: newUrl,
          ...(newCaption ? { caption: newCaption } : {})
        };
      }
      return next;
    });
  };

  const handleAddPhoto = (newPhoto: MemoryPhoto) => {
    setPhotos((prev) => [...prev, newPhoto]);
  };

  const handleResetPhotos = () => {
    sounds.playClick();
    setPhotos(BIRTHDAY_CONFIG.photos);
    try {
      localStorage.removeItem('shaurya_birthday_photos');
    } catch {
      // Ignore
    }
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('entry');
    sounds.playWhoosh();
  };

  return (
    <div className="relative min-h-screen bg-[#06060c] text-slate-100 selection:bg-purple-600 selection:text-white font-body overflow-x-hidden">
      {/* Dynamic Stardust Background Particles */}
      <BackgroundParticles />

      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenPhotoManager={() => setIsPhotoManagerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col">
        {/* Section 1: Mysterious Entry */}
        <MysteryEntry
          recipientName={config.recipientName}
          onEnter={handleEnterExperience}
        />

        {/* Section 2: The Secret Investigation */}
        <SecretInvestigation
          cards={config.mysteryCards}
          subtitle={config.investigationSubtitle}
          onProceedToReveal={() => scrollToSection('reveal')}
        />

        {/* Section 3: The Epic Birthday Reveal */}
        <BirthdayReveal
          recipientName={config.recipientName}
          subtitle={config.revealSubtitle}
          ageYears={config.ageYears}
        />

        {/* Section 4: Our Memory Vault */}
        <MemoryVault
          photos={photos}
          recipientName={config.recipientName}
          onOpenPhotoManager={() => setIsPhotoManagerOpen(true)}
        />

        {/* Section 5: The Roast Zone */}
        <RoastZone
          roasts={config.roasts}
          recipientName={config.recipientName}
        />

        {/* Section 6: The Friendship Wall */}
        <FriendshipWall
          title={config.letterTitle}
          paragraphs={config.letterContent}
          signoff={config.letterSignoff}
          senderName={config.senderName}
        />

        {/* Section 7: The Secret Final Surprise */}
        <FinalSurprise
          punchline={config.secretGiftPunchline}
          personalNote={config.secretGiftPersonalNote}
          recipientName={config.recipientName}
        />

        {/* Section 8 & 9: Mission Complete & Share */}
        <MissionComplete
          recipientName={config.recipientName}
          onReplay={handleReplay}
        />
      </main>

      {/* Photo & Media Customizer Modal */}
      <PhotoManagerModal
        isOpen={isPhotoManagerOpen}
        onClose={() => setIsPhotoManagerOpen(false)}
        photos={photos}
        onUpdatePhoto={handleUpdatePhoto}
        onAddPhoto={handleAddPhoto}
        onResetDefaults={handleResetPhotos}
      />
    </div>
  );
}
