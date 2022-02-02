import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import MuiToggleButton, {
  ToggleButtonProps as MuiToggleButtonProps,
} from '@mui/material/ToggleButton';

import { colors, AgentProps, Agents } from '@theme';

export type ToggleButtonProps = MuiToggleButtonProps & AgentProps;

const ToggleButton: React.FunctionComponent<ToggleButtonProps> = ({
  agent,
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
      '&:not(:first-of-type)': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        '&.Mui-selected': {
          borderRadius: 1,
        },
      },
      '&:not(:last-of-type)': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        '&.Mui-selected': {
          borderRadius: 1,
        },
      },
    },
  };
  const agentStyleOverrides = (): SystemStyleObject<Theme> => {
    switch (agent) {
      case Agents.FIXED_TRADER: {
        return {
          backgroundColor: (theme) => theme.palette.primary.darken030,
          color: (theme) => theme.palette.primary.light,
          borderColor: (theme) => theme.palette.primary.light,
          '&:hover': {
            backgroundColor: (theme) => theme.palette.primary.darken030,
            color: (theme) => theme.palette.primary.light,
          },
          '&.Mui-selected': {
            backgroundColor: (theme) => theme.palette.primary.main,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.primary.darken015,
            },
            '&:not(:first-of-type)': {
              borderColor: (theme) => theme.palette.primary.light,
            },
          },
        };
      }

      case Agents.VARIABLE_TRADER: {
        return {
          backgroundColor: (theme) => theme.palette.tertiary.darken030,
          color: (theme) => theme.palette.secondary.light,
          borderColor: (theme) => theme.palette.tertiary.light,
          '&:hover': {
            backgroundColor: (theme) => theme.palette.tertiary.darken030,
          },
          '&.Mui-selected': {
            backgroundColor: (theme) => theme.palette.tertiary.main,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.tertiary.darken015,
            },
            '&:not(:first-of-type)': {
              borderColor: (theme) => theme.palette.tertiary.light,
            },
          },
        };
      }

      case Agents.LIQUIDITY_PROVIDER: {
        return {
          backgroundColor: (theme) => theme.palette.secondary.dark,
          color: (theme) => theme.palette.primary.light,
          borderColor: (theme) => theme.palette.secondary.light,
          '&:hover': {
            backgroundColor: (theme) => theme.palette.secondary.darken035,
          },
          '&.Mui-selected': {
            backgroundColor: (theme) => theme.palette.secondary.main,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.secondary.darken015,
            },
            '&:not(:first-of-type)': {
              borderColor: (theme) => theme.palette.secondary.light,
            },
          },
        };
      }

      default:
        return {};
    }
  };
  const stateStyleOverrides = (): SystemStyleObject<Theme> => {
    if (!selected) {
      return {
        backgroundColor: colors.vzGreyDarker,
        color: colors.vzGreyDark,
        borderColor: colors.vzGreyDark,
      };
    }

    return {};
  };

  return (
    <MuiToggleButton
      {...props}
      selected={selected}
      disableRipple
      disableTouchRipple
      disableFocusRipple
      sx={{ ...styleOverrides, ...agentStyleOverrides(), ...stateStyleOverrides() }}
    />
  );
};

export default ToggleButton;
