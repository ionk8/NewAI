import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

/**
 * Flickering film-grain layer. Re-seeds the turbulence every couple of
 * frames so the noise crawls instead of sitting static — that crawl is
 * what actually reads as "old film/newsprint" instead of just "blurry".
 */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.16 }) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2) % 9;

  return (
    <AbsoluteFill style={{ mixBlendMode: 'overlay', opacity, pointerEvents: 'none' }}>
      <svg width="100%" height="100%">
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency={0.85} numOctaves={2} seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </AbsoluteFill>
  );
};
