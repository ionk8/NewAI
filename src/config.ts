export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// 6 named colors — vintage newsprint palette. Change these and the whole
// video re-themes, since every component pulls from here.
export const COLORS = {
  paper: '#F1E7CE', // base aged-paper background
  paperShadow: '#D8C9A3', // deeper stain/shadow tone on the paper
  cream: '#FBF3E1', // sticker die-cut border / torn-edge strips
  ink: '#211D1B', // near-black ink for text & linework
  rust: '#B44622', // faded red — stamps, hacked/impact accents
  mustard: '#D9A02D', // marker-highlight boxes behind key words
  teal: '#2F6664', // the one "tech/AI" accent — tracking reticles, call waves
};

export const STICKERS = {
  ai: 'https://i.imgur.com/qXo5BaH.png',
  company: 'https://i.imgur.com/DL3jK2t.png',
  victim: 'https://i.imgur.com/WGQuazv.png',
  openai: 'https://i.imgur.com/uPBXfkN.jpeg',
};

export type Beat = {
  id: string;
  text: string;
  /** length of this beat in frames — see the TIMING NOTE below */
  duration: number;
  /** words (lowercase, punctuation stripped, hyphens kept) to mark with a mustard highlight box */
  highlight?: string[];
  /** vertical center of the caption, in px. ~190 = top third, ~900 = bottom third, 540 = dead center */
  captionY?: number;
  fontSize?: number;
  /** quick hesitation wobble on the caption — used for the "well," beat */
  shake?: boolean;
};

// 🔧 TIMING NOTE — READ THIS BEFORE RENDERING
// These durations are hand-estimated for a fast, punchy read of the script,
// NOT measured against a real voiceover (I have no audio file to time
// against). Once you record/generate your VO:
//   1. Drop the mp3 into `public/` and wire it up in VoxEdit.tsx (commented
//      block at the top of that file).
//   2. Run `npx remotion studio`, scrub the timeline against the waveform,
//      and adjust each `duration` below until the caption lands exactly on
//      the words being spoken. Nothing else needs to change — every
//      animation is timed relative to its own beat, so beats can be
//      lengthened/shortened freely.
export const BEATS: Beat[] = [
  { id: 'b1', text: 'Okay so —', duration: 20, captionY: 540, fontSize: 100 },
  { id: 'b2', text: 'an AI', duration: 26, highlight: ['ai'], captionY: 920, fontSize: 78 },
  { id: 'b3', text: 'hacked a company.', duration: 42, highlight: ['hacked'], captionY: 190, fontSize: 72 },
  { id: 'b4', text: 'Then it, well,', duration: 30, captionY: 920, fontSize: 78, shake: true },
  { id: 'b5', text: '"it" being OpenAI,', duration: 44, highlight: ['openai'], captionY: 190, fontSize: 72 },
  { id: 'b6', text: "sort of, we'll get there,", duration: 48, captionY: 920, fontSize: 70 },
  { id: 'b7', text: 'called the victim', duration: 32, highlight: ['victim'], captionY: 920, fontSize: 78 },
  { id: 'b8', text: 'to check if THEY were doing okay.', duration: 56, highlight: ['they'], captionY: 190, fontSize: 66 },
  { id: 'b9', text: "That's not a bit", duration: 28, captionY: 540, fontSize: 96 },
  { id: 'b10', text: "I'm doing for you.", duration: 30, captionY: 540, fontSize: 96 },
  { id: 'b11', text: 'That is the actual,', duration: 30, captionY: 920, fontSize: 76 },
  { id: 'b12', text: 'on-the-record opening scene', duration: 34, highlight: ['on-the-record'], captionY: 920, fontSize: 64 },
  { id: 'b13', text: 'of the weirdest tech story', duration: 34, highlight: ['weirdest'], captionY: 920, fontSize: 66 },
  { id: 'b14', text: 'of the summer.', duration: 46, captionY: 190, fontSize: 78 },
];

export const TOTAL_DURATION = BEATS.reduce((sum, b) => sum + b.duration, 0);
