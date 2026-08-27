import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../config';

const BOLTS = [
  'M 0 0 L 40 -30 L 20 -10 L 70 -60',
  'M 0 0 L -50 -20 L -20 -5 L -80 -40',
  'M 0 0 L 30 40 L 10 20 L 60 70',
  'M 0 0 L -40 30 L -15 15 L -70 55',
];

export const CrackBurst: React.FC<{ x: number; y: number; enterFrame: number }> = ({ x, y, enterFrame }) => {
  const frame = useCurrentFrame();
  const local = frame - enterFrame;
  if (local < 0 || local > 18) return null;

  const opacity = interpolate(local, [0, 3, 14, 18], [0, 1, 1, 0]);
  const grow = interpolate(local, [0, 6], [0.3, 1], { extrapolateRight: 'clamp' });

  return (
    <svg style={{ position: 'absolute', left: x, top: y, overflow: 'visible' }} width={1} height={1}>
      <g transform={`scale(${grow})`} opacity={opacity}>
        {BOLTS.map((d, i) => (
          <path key={i} d={d} stroke={COLORS.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
};
