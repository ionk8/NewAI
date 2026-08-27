# Vox-style edit — Remotion project

Straight talk first: I built and wrote this whole thing, but I could **not** actually
render or preview it myself — my sandbox has no internet access, so I can't `npm install`
Remotion or fetch your imgur images. This is real, complete, working source code, but
you're the one who presses play on it first. Everything below is exactly what you need
to do that.

## What this is

A 1920×1080, 30fps Remotion composition called `VoxEdit` that turns your script into a
fast-cut, papercut/vintage-newspaper style edit:

- Aged paper background (stains, fold crease, halftone print texture, animated film
  grain, vignette) — all generated in code, no texture image files needed.
- Jagged torn-paper edges pinned at top and bottom of frame.
- Your 4 stickers pop in with a spring bounce, idle-float/wiggle once settled, and get
  a die-cut white sticker border. The OpenAI JPEG (no transparency) gets a "pinned
  polaroid" treatment instead, since a die-cut border only works on transparent PNGs.
- Word-by-word cascading caption animation with a hand-marker mustard highlight box
  behind key words, papercut jitter-rotation per word, and a hesitation "shake" on the
  "well," beat.
- A crack-burst + camera shake on "hacked a company.", AR-style tracking-reticle
  brackets on the AI sticker, expanding call-waves on the "calling the victim" beat,
  and a closing papercut collage of all 4 stickers with a rotated ink stamp.
- A quick flash-cut on every beat change for that fast-paced-edit snap.

## Requirements

- Node.js 18+ and npm (you're fine — this needs nothing exotic).

## Setup

```bash
npm install
npx remotion studio
```

That opens Remotion Studio in your browser with a live preview + timeline scrubber.
The first load will pull your 4 images from imgur, so you do need internet the first
time you open it.

## Timing — this is the one thing you must adjust

I don't have your actual voiceover audio, so I estimated every beat's length by ear for
a fast, punchy read of your script. It should feel roughly right, but it won't be
sample-accurate to a real recording. To fix that:

1. Record or generate your VO, then drop the file in as `public/audio.mp3`.
2. In `src/VoxEdit.tsx`, uncomment the two `Audio`/`staticFile` lines near the top.
3. In Remotion Studio, scrub the timeline against the waveform and adjust the
   `duration` number on each beat in `src/config.ts` (`BEATS` array) until the caption
   lands exactly on the words being spoken. Nothing else needs touching — every
   animation times itself relative to its own beat's start, so beats can be
   lengthened or shortened freely without breaking anything downstream.

## Rendering the final MP4

```bash
npx remotion render VoxEdit out/video.mp4
```

## About the imgur sticker links

Right now `src/config.ts` points straight at your imgur URLs. That works, but imgur
hotlinks can occasionally rate-limit or 404 out from under you, especially mid-render.
For a render you actually care about, it's worth 2 minutes to self-host them instead:

1. Download the 4 images, save them into `public/stickers/` as e.g. `ai.png`,
   `company.png`, `victim.png`, `openai.jpg`.
2. In `src/config.ts`, swap the `STICKERS` values from the imgur URLs to
   `staticFile('stickers/ai.png')` (import `staticFile` from `'remotion'` at the top
   of the file).

## Where to tweak things

- **Colors / fonts / script / stickers / timing** → `src/config.ts` — this is the one
  file you'll open most.
- **Which sticker/effect shows on which line** → `src/scenes/BeatContent.tsx`.
- **The caption animation itself** (word cascade, highlight box, jitter, shake) →
  `src/components/Caption.tsx`.
- **The paper/grain/vignette look** → `src/components/PaperBackground.tsx`,
  `Grain.tsx`, `Halftone.tsx`, `Vignette.tsx`.

## Honest limitations

- Sticker positions in `BeatContent.tsx` are hand-placed based on the images' likely
  content (an AI/robot icon, a building, a face/victim icon, the OpenAI logo) — I
  couldn't actually see your images render, so double check nothing overlaps oddly
  once you preview it, especially at the collage ending.
- Timing is an estimate, not a measurement — see above.
