import React from 'react';
import { styled } from '@mui/system';
import MuiSlider, { SliderProps as MuiSliderProps } from '@mui/material/Slider';

import { colors } from '@theme';

export type SliderProps = MuiSliderProps;

const Slider: React.FunctionComponent<SliderProps> = ({ ...props }) => {
  return (
    <MuiSlider {...props} />
  );
};

export default styled(Slider)(({ theme }) => ({
  color: colors.apeBlueGreenLight,
}));
