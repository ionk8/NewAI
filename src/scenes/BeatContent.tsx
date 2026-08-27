import React from 'react';
import { Caption } from '../components/Caption';
import { FlashCut } from '../components/FlashCut';
import { StickerPop } from '../components/StickerPop';
import { TrackingReticle } from '../components/TrackingReticle';
import { CallWaves } from '../components/CallWaves';
import { CrackBurst } from '../components/CrackBurst';
import { Shake } from '../components/Shake';
import { Stamp } from '../components/Stamp';
import { STICKERS, Beat } from '../config';

type Fonts = { display: string; typewriter: string; marker: string };

export const BeatContent: React.FC<{ beat: Beat; index: number; fonts: Fonts }> = ({ beat, index, fonts }) => {
  return (
    <>
      <FlashCut />
      {renderExtras(index, fonts)}
      <Caption
        text={beat.text}
        enterFrame={4}
        fontFamily={fonts.display}
        highlight={beat.highlight}
        y={beat.captionY ?? 900}
        fontSize={beat.fontSize ?? 74}
        shake={beat.shake}
      />
    </>
  );
};

// Maps script beats (by index into BEATS in config.ts) to the sticker/effect
// choreography for that line. This is the part you'll want to hand-tune
// once real timing is locked in — positions are in px on a 1920x1080 canvas.
function renderExtras(index: number, fonts: Fonts) {
  switch (index) {
    case 1: // "an AI"
      return (
        <>
          <StickerPop src={STICKERS.ai} x={960} y={560} width={340} enterFrame={2} rotate={-6} seed="ai-1" z={5} />
          <TrackingReticle x={960} y={560} size={420} enterFrame={10} label="Analyzing" />
        </>
      );

    case 2: // "hacked a company."
      return (
        <Shake start={8} end={16} amount={10} seed="hack-shake">
          <StickerPop src={STICKERS.company} x={1180} y={580} width={520} enterFrame={2} rotate={3} seed="company-1" z={2} />
          <StickerPop src={STICKERS.ai} x={900} y={520} width={300} enterFrame={0} rotate={-14} seed="ai-2" z={6} />
          <CrackBurst x={980} y={560} enterFrame={9} />
        </Shake>
      );

    case 4: // '"it" being OpenAI,'
      return (
        <StickerPop
          src={STICKERS.openai}
          x={960}
          y={560}
          width={420}
          enterFrame={2}
          rotate={-4}
          seed="openai-1"
          z={5}
          variant="photo"
        />
      );

    case 6: // "called the victim"
      return (
        <StickerPop src={STICKERS.victim} x={1360} y={580} width={360} enterFrame={2} rotate={6} seed="victim-1" z={5} />
      );

    case 7: // "to check if THEY were doing okay."
      return (
        <>
          <StickerPop
            src={STICKERS.openai}
            x={620}
            y={580}
            width={300}
            enterFrame={0}
            rotate={-6}
            seed="openai-2"
            z={4}
            variant="photo"
          />
          <StickerPop src={STICKERS.victim} x={1300} y={580} width={300} enterFrame={0} rotate={6} seed="victim-2" z={4} />
          <CallWaves x={780} y={580} enterFrame={4} />
        </>
      );

    case 13: // "of the summer." — closing collage
      return (
        <>
          <StickerPop src={STICKERS.ai} x={560} y={660} width={260} enterFrame={0} rotate={-10} seed="ai-end" z={3} />
          <StickerPop src={STICKERS.company} x={860} y={580} width={340} enterFrame={4} rotate={5} seed="company-end" z={2} />
          <StickerPop
            src={STICKERS.openai}
            x={1180}
            y={660}
            width={260}
            enterFrame={8}
            rotate={-6}
            seed="openai-end"
            z={4}
            variant="photo"
          />
          <StickerPop src={STICKERS.victim} x={1420} y={580} width={260} enterFrame={12} rotate={9} seed="victim-end" z={3} />
          <Stamp text="On The Record" enterFrame={20} x={960} y={900} rotate={-8} fontFamily={fonts.marker} />
        </>
      );

    default:
      return null;
  }
}
