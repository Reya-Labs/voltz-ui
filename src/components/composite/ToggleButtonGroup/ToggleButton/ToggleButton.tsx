import MuiToggleButton, {
  ToggleButtonProps as MuiToggleButtonProps,
} from '@mui/material/ToggleButton';
import React from 'react';

import { colors, SystemStyleObject, Theme } from '../../../../theme';

export type ToggleButtonProps = MuiToggleButtonProps;

export const ToggleButton: React.FunctionComponent<ToggleButtonProps> = ({
  selected,
  ...props
}) => {
  const styleOverrides: SystemStyleObject<Theme> = {
    '&.MuiToggleButtonGroup-grouped': {
      minHeight: (theme) => theme.spacing(8),
      zindex: '-1',
      '&.Mui-selected': {
        zIndex: '1',
      },
    },
  };

  const stateStyleOverrides = (): SystemStyleObject<Theme> => {
    if (!selected) {
      return {
        backgroundColor: colors.vzGreyDarker.base,
        color: colors.vzGreyDark.base,
        borderColor: colors.vzGreyDark.base,
      };
    }

    return {};
  };

  return (
    <MuiToggleButton
      {...props}
      selected={selected}
      sx={{ ...styleOverrides, ...stateStyleOverrides() }}
      disableFocusRipple
      disableRipple
      disableTouchRipple
    />
  );
};
