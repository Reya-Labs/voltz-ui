import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import MuiToggleButton, {
  ToggleButtonProps as MuiToggleButtonProps,
} from '@mui/material/ToggleButton';

import { colors } from '@theme';
import { AgentProps, Agents } from '@contexts';
import { useAgentWithOverride } from '@hooks';

export type ToggleButtonProps = MuiToggleButtonProps & AgentProps;

const ToggleButton: React.FunctionComponent<ToggleButtonProps> = ({
  agent: agentOverride,
  selected,
  ...props
}) => {
  const { agent } = useAgentWithOverride(agentOverride);
  const styleOverrides: SystemStyleObject<Theme> = {
    '&.MuiToggleButtonGroup-grouped': {
      minHeight: (theme) => theme.spacing(8),
      zindex: '-1',
      '&.Mui-selected': {
        zIndex: '1',
      },
      // todo: ideally round the corners
      // '&:not(:first-of-type)': {
      //   borderTopLeftRadius: 0,
      //   borderBottomLeftRadius: 0,
      //   '&.Mui-selected': {
      //     borderRadius: 1,
      //   },
      // },
      // '&:not(:last-of-type)': {
      //   borderTopRightRadius: 0,
      //   borderBottomRightRadius: 0,
      //   '&.Mui-selected': {
      //     borderRadius: 1,
      //   },
      // },
    },
  };
  const agentStyleOverrides = (): SystemStyleObject<Theme> => {
    switch (agent) {
      case Agents.FIXED_TRADER: {
        return {
          backgroundColor: 'primary.darken010',
          color: 'primary.darken030',
          borderColor: 'primary.light',
          // '&:hover': {
          //   backgroundColor: 'primary.light',
          //   color: 'primary.light',
          // },
          '&.Mui-selected': {
            color: 'primary.light',
            backgroundColor: 'primary.darken030',
            '&:hover': {
              backgroundColor: 'primary.darken030',
            },
            '&:not(:first-of-type)': {
              borderColor: 'primary.light',
            },
          },
        };
      }

      case Agents.VARIABLE_TRADER: {
        return {
          backgroundColor: 'tertiary.base',
          color: 'secondary.light',
          borderColor: 'primary.light',
          // '&:hover': {
          //   backgroundColor: 'primary.light',
          // },
          '&.Mui-selected': {
            backgroundColor: 'tertiary.base',
            '&:hover': {
              backgroundColor: 'tertiary.base',
            },
            '&:not(:first-of-type)': {
              borderColor: 'secondary.light',
            },
          },
        };
      }

      case Agents.LIQUIDITY_PROVIDER: {
        return {
          backgroundColor: 'secondary.dark',
          color: 'primary.light',
          borderColor: 'secondary.light',
          '&:hover': {
            backgroundColor: 'secondary.darken035',
          },
          '&.Mui-selected': {
            backgroundColor: 'secondary.main',
            '&:hover': {
              backgroundColor: 'secondary.darken015',
            },
            '&:not(:first-of-type)': {
              borderColor: 'secondary.light',
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
