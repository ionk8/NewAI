import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, random } from 'remotion';
import { COLORS } from '../config';

type Props = {
  text: string;
  /** local frame the first word starts popping in */
  enterFrame: number;
  fontFamily: string;
  /** words (lowercase, punctuation stripped, hyphens kept) to mark with a highlight box */
  highlight?: string[];
  fontSize?: number;
  align?: 'center' | 'left';
  /** vertical center in px */
  y?: number;
  color?: string;
  /** quick decaying wobble on the whole line — for hesitation/glitch beats */
  shake?: boolean;
};

const strip = (w: string) => w.toLowerCase().replace(/[^a-z'-]/g, '');

export const Caption: React.FC<Props> = ({
  text,
  enterFrame,
  fontFamily,
  highlight = [],
  fontSize = 74,
  align = 'center',
  y = 900,
  color = COLORS.ink,
  shake = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(' ');

  const sinceStart = frame - enterFrame;
  const shakeX = shake ? Math.sin(sinceStart * 2.4) * Math.max(0, 6 - sinceStart * 0.6) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: y,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        paddingLeft: align === 'left' ? 120 : 0,
        paddingRight: align === 'left' ? 0 : 60,
        gap: '0 20px',
        transform: `translate(${shakeX}px, -50%)`,
        zIndex: 20,
      }}
    >
      {words.map((word, i) => {
        const wordDelay = enterFrame + i * 2; // ~66ms apart at 30fps — fast cascade, not a slow typewriter
        const local = frame - wordDelay;
        const pop = spring({ frame: local, fps, config: { damping: 11, stiffness: 200, mass: 0.5 } });
        const scale = Math.max(0, pop);
        const isHi = highlight.includes(strip(word));
        const jitterRotate = local > 0 ? (random(`${text}-${i}`) - 0.5) * 6 : 0;

        return (
          <span
            key={i}
            style={{
              position: 'relative',
              display: 'inline-block',
              transform: `scale(${scale}) rotate(${jitterRotate}deg)`,
              fontFamily,
              fontSize,
              color,
              lineHeight: 1,
              textShadow: '3px 3px 0 rgba(0,0,0,0.12)',
              whiteSpace: 'nowrap',
            }}
          >
            {isHi ? (
              <span
                style={{
                  position: 'absolute',
                  left: -8,
                  right: -8,
                  top: '18%',
                  bottom: '10%',
                  background: COLORS.mustard,
                  transform: `rotate(${(random(`${text}-hi-${i}`) - 0.5) * 4}deg)`,
                  zIndex: -1,
                }}
              />
            ) : null}
            {word}
          </span>
        );
      })}
    </div>
  );
};
