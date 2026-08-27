import React from 'react';
import { COLORS } from '../config';

// Deterministic jagged polygon (no Math.random — renders must be
// reproducible frame-to-frame and machine-to-machine).
const jaggedClipPath = (flip: boolean) => {
  const points: string[] = [];
  const teeth = 26;
  for (let i = 0; i <= teeth; i++) {
    const x = (i / teeth) * 100;
    const y = i % 2 === 0 ? 0 : 55 + ((i * 37) % 30);
    points.push(`${x}% ${flip ? 100 - y : y}%`);
  }
  const closingCorners = flip ? '100% 100%, 0% 100%' : '100% 0%, 0% 0%';
  return `polygon(${points.join(',')}, ${closingCorners})`;
};

export const TornEdge: React.FC<{ side: 'top' | 'bottom' }> = ({ side }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      [side]: 0,
      height: 70,
      background: COLORS.cream,
      clipPath: jaggedClipPath(side === 'bottom'),
      zIndex: 50,
    }}
  />
);
