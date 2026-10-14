export interface MysteryCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  classifiedLevel: string;
  content: string;
  punchline: string;
  hint: string;
}

export interface MemoryPhoto {
  id: string;
  url: string;
  caption: string;
  date: string;
  location?: string;
  rotation?: number; // degrees for polaroid tilt
  tag: string;
}

export interface RoastItem {
  id: string;
  award: string;
  badge: string;
  quote: string;
  details: string;
  verdict: string;
  reactionCount: number;
}

export interface BirthdayConfig {
  recipientName: string;
  nicknames: string[];
  senderName: string;
  ageYears?: number;
  heroPhoto: string;
  entryMessage: string;
  revealSubtitle: string;
  investigationSubtitle: string;
  mysteryCards: MysteryCard[];
  photos: MemoryPhoto[];
  roasts: RoastItem[];
  letterTitle: string;
  letterContent: string[];
  letterSignoff: string;
  secretGiftPunchline: string;
  secretGiftPersonalNote: string;
  theme: {
    primaryAccent: string;
    secondaryAccent: string;
    goldAccent: string;
  };
}
