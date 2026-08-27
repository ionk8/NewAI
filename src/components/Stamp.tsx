import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { COLORS } from '../config';

export const Stamp: React.FC<{
  text: string;
  enterFrame: number;
  x: number;
  y: number;
  fontFamily: string;
  rotate?: number;
}> = ({ text, enterFrame, x, y, fontFamily, rotate = -8 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - enterFrame;
  if (local < 0) return null;

  const pop = spring({ frame: local, fps, config: { damping: 7, stiffness: 260, mass: 0.5 } });
  const scale = Math.min(1, pop);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`,
        border: `5px solid ${COLORS.rust}`,
        outline: `2px solid ${COLORS.rust}`,
        outlineOffset: 4,
        padding: '10px 28px',
        color: COLORS.rust,
        fontFamily,
        fontSize: 44,
        letterSpacing: 3,
        textTransform: 'uppercase',
        opacity: 0.85,
        mixBlendMode: 'multiply',
        whiteSpace: 'nowrap',
        zIndex: 30,
      }}
    >
      {text}
    </div>
  );
};
