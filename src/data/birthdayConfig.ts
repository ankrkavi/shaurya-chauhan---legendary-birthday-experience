import { BirthdayConfig } from '../types';

/**
 * =========================================================================
 * 🎂 SHAURYA CHAUHAN'S BIRTHDAY CONFIGURATION
 * =========================================================================
 * You can edit all messages, photos, captions, awards, and roasts here!
 *
 * HOW TO ADD YOUR OWN REAL PHOTOS:
 * 1. Method A (In-Browser): Click the "Customize / Add Real Photos" button in
 *    the Memory Vault section to upload or replace photos directly.
 * 2. Method B (Local files): Place your images inside the `public/photos/` folder
 *    (e.g., `public/photos/shaurya1.jpg`) and update the `url` fields below to
 *    `/photos/shaurya1.jpg`.
 * =========================================================================
 */

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  recipientName: "Shaurya Chauhan",
  nicknames: ["Chauhan Sahab", "The Myth, The Legend", "Bhai", "Nautanki King"],
  senderName: "Your Best Friend & Partner-in-Crime",
  ageYears: 22,
  heroPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
  entryMessage: "Hey Shaurya... Someone has a surprise for you.",
  revealSubtitle: "Today is all about celebrating the one and only Chauhan Sahab!",
  investigationSubtitle: "Today is not an ordinary day. Something suspicious is happening...",
  
  mysteryCards: [
    {
      id: "card-1",
      title: "Classified Information",
      subtitle: "Case File #1014: Code Red",
      icon: "Lock",
      classifiedLevel: "TOP SECRET // LEVEL 5",
      content: "Intelligence report confirms: Today at exactly 00:00 hours, subject Shaurya Chauhan officially turned a year older and wiser (questionable, but we remain hopeful).",
      punchline: "Sources say your age has increased, but your maturity level is still stuck on buffering.",
      hint: "Click to declassify file"
    },
    {
      id: "card-2",
      title: "The Legend of Shaurya",
      subtitle: "Ancient Archives & Lore",
      icon: "Crown",
      classifiedLevel: "CLASSIFIED DOSSIER",
      content: "Legend has it that whenever someone says 'bas 5 minute mein pahunch raha hoon', the spirit of Shaurya Chauhan smiles from under his blanket because he hasn't even woken up yet.",
      punchline: "From overthinking small texts to delivering legendary party vibes, no one does it like you.",
      hint: "Click to unveil legend"
    },
    {
      id: "card-3",
      title: "Top Secret Files",
      subtitle: "Surveillance Logs & Witness Reports",
      icon: "ShieldAlert",
      classifiedLevel: "RESTRICTED ACCESS",
      content: "Official interrogation summary: When asked about who is the real main character in the friend group, all evidence and dramatic walk-ins pointed directly at you.",
      punchline: "Warning: High risk of unprovoked bakchodi, spontaneous laughter attacks, and unforgettable memories.",
      hint: "Click to inspect evidence"
    }
  ],

  photos: [
    {
      id: "p1",
      url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
      caption: "Main Character vibes only. Look at that camera confidence! 📸",
      date: "The Legendary Evening",
      location: "Rooftop Sessions",
      rotation: -3,
      tag: "Hero Shot"
    },
    {
      id: "p2",
      url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
      caption: "When he said 'bas ek photo kheecho', and 45 minutes later we were still here.",
      date: "Golden Hour Diaries",
      location: "City Lights",
      rotation: 2.5,
      tag: "Behind The Scenes"
    },
    {
      id: "p3",
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      caption: "Proof that Chauhan Sahab can look civilized when he wants to.",
      date: "Suited & Booted",
      location: "Celebration Night",
      rotation: -1.8,
      tag: "Rare Dapper Moment"
    },
    {
      id: "p4",
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      caption: "Plotting world domination (or just choosing what to order on Swiggy for 40 mins).",
      date: "Late Night Talks",
      location: "The Chai Adda",
      rotation: 3,
      tag: "Brainstorming Session"
    },
    {
      id: "p5",
      url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
      caption: "That genuine million-dollar smile right before initiating extreme bakchodi.",
      date: "Unfiltered Laughs",
      location: "Road Trip Chronicles",
      rotation: -2.2,
      tag: "Pure Joy"
    },
    {
      id: "p6",
      url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
      caption: "Staring into the distance like a Bollywood hero waiting for his theme song.",
      date: "Mountain Getaway",
      location: "The High Point",
      rotation: 1.5,
      tag: "Scenic"
    },
    {
      id: "p7",
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      caption: "The gang isn't complete without the chaos you bring to the table.",
      date: "Squad Goals",
      location: "Weekend Madness",
      rotation: -3.5,
      tag: "Brotherhood"
    },
    {
      id: "p8",
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      caption: "Another year of greatness, another year of tolerating each other's terrible jokes.",
      date: "Timeless Memory",
      location: "Everywhere & Anywhere",
      rotation: 2,
      tag: "Forever"
    }
  ],

  roasts: [
    {
      id: "roast-1",
      award: "Professional Bakchod of the Year",
      badge: "🏆 Gold Trophy",
      quote: "Bhai trust me, mujhe sab pata hai.",
      details: "Awarded for unmatched consistency in giving unsolicited life advice while his own life is running on 3% battery and hope.",
      verdict: "Guilty on all counts of maximum entertainment.",
      reactionCount: 42
    },
    {
      id: "roast-2",
      award: "CEO of Late Replies",
      badge: "📱 99+ Unread",
      quote: "Bhai bas 5 min mein pahunch raha hoon... (still in bed)",
      details: "NASA scientists are still studying his definition of '5 minutes', which according to standard relativity usually equals 2 to 4 business days.",
      verdict: "Seen at 2:00 PM. Replying at 11:45 PM with 'haan bol'.",
      reactionCount: 88
    },
    {
      id: "roast-3",
      award: "International Champion of Overthinking",
      badge: "🧠 4D Chess",
      quote: "Bhai usne 'K.' likha tha, iska kya matlab hai?",
      details: "Can dissect a 2-word message into 14 psychological subplots, 3 existential dilemmas, and a full forensic case study.",
      verdict: "Doctorate in analyzing punctuation marks.",
      reactionCount: 56
    },
    {
      id: "roast-4",
      award: "Certified Main Character",
      badge: "🎬 Oscar Nominated",
      quote: "Entrance aisi honi chahiye ki sab dekhte reh jayein.",
      details: "Walks into ordinary cafes like slow-motion violins are playing in the background. Poses for 100 photos just to post one blurred story.",
      verdict: "Bollywood needs to hire him as the lead hero already.",
      reactionCount: 73
    },
    {
      id: "roast-5",
      award: "Lifetime Achievement in Nautanki",
      badge: "🎭 Drama King",
      quote: "Bhai mere saath hi hamesha aisa kyun hota hai?!",
      details: "Can turn a routine traffic red light into a dramatic 3-act tragedy where he is the wronged protagonist surviving against the odds.",
      verdict: "Deserves a Filmfare Award for everyday storytelling.",
      reactionCount: 95
    }
  ],

  letterTitle: "A Letter To Chauhan Sahab",
  letterContent: [
    "Dear Shaurya,",
    "Life gets a little more legendary when you're around. Through all the late-night tea talks, the endless roasting, the shared plans that we never actually executed, and the moments when we laughed until our stomachs hurt—you've always been more than just a friend. You're family.",
    "Keep being the crazy, funny, unpredictable person you are. The world has enough boring people; we need your brand of chaos to keep things interesting.",
    "Here's to more memories, more laughter, more victories, and endless adventures ahead.",
    "Happy Birthday, bhai! ❤️"
  ],
  letterSignoff: "Always your brother in chaos,",

  secretGiftPunchline: "Plot twist: You're getting older, but your stupidity is still timeless. Happy Birthday, Shaurya! 😂❤️",
  secretGiftPersonalNote: "No matter how old you get, how busy life becomes, or how many new chapters unfold, know that you've got a brother who will always have your back (and will never stop roasting you). Have the most amazing year ahead, Chauhan Sahab!",

  theme: {
    primaryAccent: "#a855f7",   // Electric Purple
    secondaryAccent: "#38bdf8", // Neon Cyan
    goldAccent: "#fbbf24"       // Warm Gold
  }
};
