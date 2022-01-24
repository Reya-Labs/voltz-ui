import React from 'react';
import MuiSlider, { SliderProps as MuiSliderProps } from '@mui/material/Slider';

export type SliderProps = MuiSliderProps;

const Slider: React.FunctionComponent<SliderProps> = ({ ...props }) => {
  return <MuiSlider {...props} />;
};

export default Slider;
