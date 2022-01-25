import chroma from 'chroma-js';
import mapValues from 'lodash/mapValues';

const baseColors = {
  lavenderWeb: '#E5E1F9',
  wildStrawberry: '#FF4AA9',
  orangeYellow: '#FBC13A',
  skyBlueCrayola: '#4DE5FF',
  ultramarineBlue: '#2667FF',
};

const generateColorMap = (color: string) => ({
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

const newColors = mapValues(baseColors, (value) => generateColorMap(value));

const colors = {
  ...newColors,
  vzGrey: '#A6A2B4',
  vzGreyDarkish: '#6D6A77',
  vzGreyDark: '#5A576D',
  vzGreyDarker: '#1F1D2D',
  vzGreyDarkest: '#1B1929',
  vzGoldLight: '#FBC13A',
  vzGoldDark: '#473711',
  vzBlueDark: '#272531',
  vzBlueGreenDark: '#2C555C',
  vzBlueGreenLight: '#4DE5FF',
  vzPurpleLight: '#E5E1F9',
  vzPurpleDark: '#1F1D2D',
  vzPurpleDarker: '#1B1929',
  vzRedDark: '#100008',
  vzPink: '#FF4AA9',
  vzYellowDark: '#191406',
};

export default colors;
