import MuiToggleButton, {
  ToggleButtonProps as MuiToggleButtonProps,
} from '@mui/material/ToggleButton';
import React from 'react';

import { AgentProps, Agents } from '../../../../contexts/AgentContext/types';
import { useAgentWithOverride } from '../../../../hooks/useAgentWithOverride';
import { colors, SystemStyleObject, Theme } from '../../../../theme';

export type ToggleButtonProps = MuiToggleButtonProps & AgentProps;

export const ToggleButton: React.FunctionComponent<ToggleButtonProps> = ({
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
    },
  };
  const agentStyleOverrides = (): SystemStyleObject<Theme> => {
    switch (agent) {
      case Agents.FIXED_TRADER: {
        return {
          backgroundColor: colors.skyBlueCrayola1,
          color: colors.skyBlueCrayola5,
          borderColor: colors.skyBlueCrayola,
          '&.Mui-selected': {
            color: colors.skyBlueCrayola,
            backgroundColor: colors.skyBlueCrayola5,
            '&:hover': {
              backgroundColor: colors.skyBlueCrayola5,
            },
            '&:not(:first-of-type)': {
              borderColor: colors.skyBlueCrayola,
            },
          },
        };
      }

      case Agents.VARIABLE_TRADER: {
        return {
          backgroundColor: 'tertiary.base',
          color: 'secondary.light',
          borderColor: colors.skyBlueCrayola,
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
          color: colors.skyBlueCrayola,
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
        backgroundColor: colors.lavenderWeb8,
        color: colors.lavenderWeb6,
        borderColor: colors.lavenderWeb6,
      };
    }

    return {};
  };

  return (
    <MuiToggleButton
      {...props}
      selected={selected}
      sx={{ ...styleOverrides, ...agentStyleOverrides(), ...stateStyleOverrides() }}
      disableFocusRipple
      disableRipple
      disableTouchRipple
    />
  );
};
