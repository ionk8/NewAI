import { Config } from '@remotion/cli/config';

// jpeg is faster to encode than png and we don't need per-frame alpha
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
