import React from 'react';
import { useCurrentFrame, random } from 'remotion';

export const Shake: React.FC<{
  children: React.ReactNode;
  start?: number;
  end?: number;
  amount?: number;
  seed?: string;
}> = ({ children, start = 0, end = 8, amount = 6, seed = 'shake' }) => {
  const frame = useCurrentFrame();
  const active = frame >= start && frame <= end;
  const dx = active ? (random(`${seed}-x-${frame}`) - 0.5) * amount : 0;
  const dy = active ? (random(`${seed}-y-${frame}`) - 0.5) * amount : 0;

  return <div style={{ position: 'absolute', inset: 0, transform: `translate(${dx}px, ${dy}px)` }}>{children}</div>;
};
