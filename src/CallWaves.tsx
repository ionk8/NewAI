import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../config';

export const CallWaves: React.FC<{ x: number; y: number; enterFrame: number }> = ({ x, y, enterFrame }) => {
  const frame = useCurrentFrame();
  const local = frame - enterFrame;
  if (local < 0) return null;

  const loop = 42;
  const offsets = [0, 14, 28];

  return (
    <svg style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', pointerEvents: 'none' }} width={1} height={1}>
      {offsets.map((offset, i) => {
        const t = (local - offset) % loop;
        if (local < offset) return null;
        const r = interpolate(t, [0, loop], [10, 90], { extrapolateRight: 'clamp' });
        const opacity = interpolate(t, [0, loop * 0.7, loop], [0.9, 0.4, 0], { extrapolateRight: 'clamp' });
        return <circle key={i} cx={x} cy={y} r={r} stroke={COLORS.teal} strokeWidth={3} fill="none" opacity={opacity} />;
      })}
    </svg>
  );
};
