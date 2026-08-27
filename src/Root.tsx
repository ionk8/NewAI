import React from 'react';
import { Composition } from 'remotion';
import { VoxEdit } from './VoxEdit';
import { FPS, WIDTH, HEIGHT, TOTAL_DURATION } from './config';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VoxEdit"
        component={VoxEdit}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
