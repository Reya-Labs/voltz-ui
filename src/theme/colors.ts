import chroma from 'chroma-js';

import { BaseColors, ColorSet } from './types';

const baseColors: Record<BaseColors, string> = {
  lavenderWeb: '#E5E1F9',
  wildStrawberry: '#FF4AA9',
  orangeYellow: '#FBC13A',
  skyBlueCrayola: '#4DE5FF',
  ultramarineBlue: '#2667FF',
  // todo: Align with Brokoli to make it part of base colors
  vzGrey: '#A6A2B4',
  vzGreyDarkish: '#6D6A77',
  vzGreyDarkish2: '#6C697E',
  vzGreyDark: '#5A576D',
  vzGreyDarker: '#1F1D2D',
  vzCustomRed1: '#F61067',
  vzCustomRed2: '#FF0000',
  vzCustomYellow1: '#F1D302',
  vzCustomGreen1: '#40F99B',
  vzCustomGreen2: '#00D395',
};

const generateColorMap = (color: string): ColorSet => ({
  base: color,
  darken010: chroma(color).darken(1).hex(),
  darken015: chroma(color).darken(1.5).hex(),
  darken020: chroma(color).darken(2).hex(),
  darken025: chroma(color).darken(2.5).hex(),
  darken030: chroma(color).darken(3).hex(),
  darken035: chroma(color).darken(3.5).hex(),
  darken040: chroma(color).darken(4).hex(),
  darken045: chroma(color).darken(4.5).hex(),
  darken050: chroma(color).darken(5).hex(),
});

const colors: Record<BaseColors, ColorSet> = Object.keys(baseColors).reduce(
  (colorSets, baseColor) => ({
    [baseColor]: generateColorMap(baseColors[baseColor as BaseColors]),
    ...colorSets,
  }),
  {} as Record<BaseColors, ColorSet>,
);

export default colors;
