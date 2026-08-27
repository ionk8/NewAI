import React from 'react';
import { Img, useCurrentFrame, useVideoConfig, spring, random } from 'remotion';
import { COLORS } from '../config';

type Props = {
  src: string;
  /** center position in px */
  x: number;
  y: number;
  /** rendered width in px (height follows the image's natural aspect ratio) */
  width: number;
  /** local frame (relative to the enclosing Sequence) the pop-in spring starts at */
  enterFrame: number;
  /** resting rotation, in degrees */
  rotate?: number;
  /** unique-ish string so idle float/wiggle isn't perfectly synced across stickers */
  seed?: string;
  z?: number;
  /**
   * 'cutout'  — die-cut sticker look, assumes a transparent PNG.
   * 'photo'   — pinned-polaroid look (cream border), safe for flat JPEGs
   *             with no alpha channel (like a logo screenshot).
   */
  variant?: 'cutout' | 'photo';
};

export const StickerPop: React.FC<Props> = ({
  src,
  x,
  y,
  width,
  enterFrame,
  rotate = 0,
  seed = 'sticker',
  z = 1,
  variant = 'cutout',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - enterFrame;

  const pop = spring({
    frame: local,
    fps,
    config: { damping: 9, mass: 0.7, stiffness: 160 },
  });
  const scale = Math.max(0, pop);

  // idle life once it's settled in: a slow float + a slightly faster wiggle,
  // phase-offset per sticker via `seed` so a group of stickers never moves
  // in lockstep (that's what reads as "hand glued", not "template").
  const phase = random(seed) * 60;
  const settled = local > 20;
  const wiggle = settled ? Math.sin((frame + phase) * 0.09) * 3 : 0;
  const float = settled ? Math.sin((frame + phase) * 0.06) * 6 : 0;

  const cutoutFilter = `
    drop-shadow(3px 0 0 ${COLORS.cream})
    drop-shadow(-3px 0 0 ${COLORS.cream})
    drop-shadow(0 3px 0 ${COLORS.cream})
    drop-shadow(0 -3px 0 ${COLORS.cream})
    drop-shadow(8px 10px 10px rgba(0,0,0,0.35))
  `;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + float,
        width,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotate + wiggle}deg)`,
        zIndex: z,
      }}
    >
      {variant === 'photo' ? (
        <div
          style={{
            background: COLORS.cream,
            padding: 10,
            paddingBottom: 34,
            boxShadow: '8px 10px 14px rgba(0,0,0,0.35)',
            border: '1px solid rgba(0,0,0,0.15)',
          }}
        >
          <Img src={src} style={{ width: '100%', display: 'block', filter: 'sepia(0.25) contrast(1.05)' }} />
        </div>
      ) : (
        <Img src={src} style={{ width: '100%', display: 'block', filter: cutoutFilter }} />
      )}
    </div>
  );
};
