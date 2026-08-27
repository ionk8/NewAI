import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS } from '../config';
import { Halftone } from './Halftone';
import { Grain } from './Grain';
import { Vignette } from './Vignette';

export const PaperBackground: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.paper }}>
    {/* aged stain blotches, so the paper isn't a flat fill */}
    <AbsoluteFill
      style={{
        background: `
          radial-gradient(circle at 12% 18%, ${COLORS.paperShadow} 0%, transparent 35%),
          radial-gradient(circle at 85% 78%, ${COLORS.paperShadow} 0%, transparent 40%),
          radial-gradient(circle at 60% 6%, rgba(180,70,34,0.08) 0%, transparent 30%)
        `,
        opacity: 0.85,
      }}
    />
    {/* a single faint fold crease down the middle, like a folded broadsheet */}
    <AbsoluteFill
      style={{
        background: 'linear-gradient(100deg, transparent 49.6%, rgba(0,0,0,0.06) 50%, transparent 50.4%)',
      }}
    />
    <Halftone />
    <Grain />
    <Vignette />
  </AbsoluteFill>
);
