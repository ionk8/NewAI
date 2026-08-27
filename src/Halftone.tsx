import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS } from '../config';

export const Halftone: React.FC<{ opacity?: number }> = ({ opacity = 0.06 }) => (
  <AbsoluteFill style={{ mixBlendMode: 'multiply', opacity, pointerEvents: 'none' }}>
    <svg width="100%" height="100%">
      <defs>
        <pattern id="halftone-dots" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.3" fill={COLORS.ink} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#halftone-dots)" />
    </svg>
  </AbsoluteFill>
);
