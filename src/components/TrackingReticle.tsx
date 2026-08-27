import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../config';

export const TrackingReticle: React.FC<{
  x: number;
  y: number;
  size: number;
  enterFrame: number;
  label?: string;
}> = ({ x, y, size, enterFrame, label }) => {
  const frame = useCurrentFrame();
  const local = frame - enterFrame;
  if (local < 0) return null;

  const scale = interpolate(local, [0, 8], [1.4, 1], { extrapolateRight: 'clamp' });
  const opacity = interpolate(local, [0, 6, 26, 34], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arm = size * 0.16;

  const corner = (cx: number, cy: number, dx: number, dy: number, key: string) => (
    <path
      key={key}
      d={`M ${cx} ${cy + dy * arm} L ${cx} ${cy} L ${cx + dx * arm} ${cy}`}
      stroke={COLORS.teal}
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
    />
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        pointerEvents: 'none',
      }}
    >
      <svg width={size} height={size} style={{ overflow: 'visible' }}>
        {corner(0, 0, 1, 1, 'tl')}
        {corner(size, 0, -1, 1, 'tr')}
        {corner(0, size, 1, -1, 'bl')}
        {corner(size, size, -1, -1, 'br')}
      </svg>
      {label ? (
        <div
          style={{
            position: 'absolute',
            top: size + 6,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'monospace',
            fontSize: 15,
            letterSpacing: 3,
            color: COLORS.teal,
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
};
