import React from 'react';
import { AbsoluteFill } from 'remotion';

export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(20,15,10,0.55) 100%)',
      pointerEvents: 'none',
    }}
  />
);
