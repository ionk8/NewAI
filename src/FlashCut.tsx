import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const FlashCut: React.FC<{ color?: string; frames?: number }> = ({ color = '#FBF3E1', frames = 4 }) => {
  const frame = useCurrentFrame();
  if (frame > frames) return null;
  const opacity = interpolate(frame, [0, frames], [0.9, 0], { extrapolateRight: 'clamp' });
  return <AbsoluteFill style={{ backgroundColor: color, opacity, pointerEvents: 'none', zIndex: 40 }} />;
};
