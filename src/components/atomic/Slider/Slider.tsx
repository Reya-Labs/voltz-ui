import React from 'react';
import { SxProps, Theme } from '@mui/system';
import MuiSlider, { SliderProps as MuiSliderProps } from '@mui/material/Slider';

export type SliderProps = MuiSliderProps & {
  controlled?: boolean;
};

const Slider: React.FunctionComponent<SliderProps> = ({
  color,
  controlled = false,
  disabled,
  ...props
}) => {
  const isDisabled = controlled ? controlled : disabled;
  const colorStyleOverrides = (): SxProps<Theme> => {
    if (!color) {
      return {};
    }

    return {
      '& .MuiSlider-thumb': {
        display: 'none',
      },
      '& .MuiSlider-track': {
        color: `${color}.light`,
      },
      '& .MuiSlider-rail': {
        color: `${color}.dark`,
      },
    };
  };

  return (
    <MuiSlider {...props} color={color} disabled={isDisabled} sx={{ ...colorStyleOverrides() }} />
  );
};

export default Slider;
