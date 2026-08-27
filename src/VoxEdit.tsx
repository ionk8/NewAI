import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { loadFont as loadAnton } from '@remotion/google-fonts/Anton';
import { loadFont as loadSpecialElite } from '@remotion/google-fonts/SpecialElite';
import { loadFont as loadPermanentMarker } from '@remotion/google-fonts/PermanentMarker';

import { BEATS, COLORS } from './config';
import { PaperBackground } from './components/PaperBackground';
import { TornEdge } from './components/TornEdge';
import { BeatContent } from './scenes/BeatContent';

// Uncomment once you have a voiceover file in `public/audio.mp3`:
// import { Audio, staticFile } from 'remotion';

const { fontFamily: display } = loadAnton(); // big punchy headline/caption face
const { fontFamily: typewriter } = loadSpecialElite(); // small vintage press details
const { fontFamily: marker } = loadPermanentMarker(); // the closing ink-stamp text

// cumulative start frame for every beat, derived from BEATS durations in config.ts
const starts: number[] = [];
BEATS.reduce((acc, b) => {
  starts.push(acc);
  return acc + b.duration;
}, 0);

export const VoxEdit: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.paper }}>
      {/* Uncomment once you've added your VO: */}
      {/* <Audio src={staticFile('audio.mp3')} /> */}

      <PaperBackground />

      {/* small vintage press detail, sits above the texture, under the captions */}
      <div
        style={{
          position: 'absolute',
          top: 48,
          left: 120,
          fontFamily: typewriter,
          fontSize: 22,
          color: COLORS.ink,
          letterSpacing: 3,
          opacity: 0.7,
          textTransform: 'uppercase',
          zIndex: 10,
        }}
      >
        Tech Desk — Summer Dispatch
      </div>

      {BEATS.map((beat, i) => (
        <Sequence key={beat.id} from={starts[i]} durationInFrames={beat.duration}>
          <BeatContent beat={beat} index={i} fonts={{ display, typewriter, marker }} />
        </Sequence>
      ))}

      <TornEdge side="top" />
      <TornEdge side="bottom" />
    </AbsoluteFill>
  );
};
