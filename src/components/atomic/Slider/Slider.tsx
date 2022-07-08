import React from 'react';
import { SystemStyleObject, Theme } from '@theme';
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
  const commonOverrides: SystemStyleObject<Theme> = {
    borderRadius: 0,
  };
  const controlledStyleOverrides = (): SystemStyleObject<Theme> => {
    if (!controlled) {
      return {};
    }

    return {
      display: 'block',
      padding: 0,
      marginTop: (theme) => theme.spacing(1),
      '& .MuiSlider-thumb': {
        display: 'none',
      } as const,
    };
  };
  const colorStyleOverrides = (): SystemStyleObject<Theme> => {
    if (!color) {
      return {};
    }

    return {
      '& .MuiSlider-track': {
        color: `${color}.light`,
      },
      '& .MuiSlider-rail': {
        color: `${color}.main`,
      },
    };
  };

  return (
    <MuiSlider
      {...props}
      color={color}
      disabled={isDisabled}
      sx={{ ...commonOverrides, ...colorStyleOverrides(), ...controlledStyleOverrides() }}
    />
  );
};

export default Slider;
