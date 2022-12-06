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
          backgroundColor: colors.ultramarineBlue,
          color: colors.lavenderWeb,
          borderColor: colors.skyBlueCrayola,
          '&.Mui-selected': {
            backgroundColor: colors.ultramarineBlue,
            '&:hover': {
              backgroundColor: colors.ultramarineBlue,
            },
            '&:not(:first-of-type)': {
              borderColor: colors.lavenderWeb,
            },
          },
        };
      }

      case Agents.LIQUIDITY_PROVIDER: {
        return {
          backgroundColor: colors.lavenderWeb7,
          color: colors.skyBlueCrayola,
          borderColor: colors.lavenderWeb,
          '&:hover': {
            backgroundColor: colors.lavenderWeb6,
          },
          '&.Mui-selected': {
            backgroundColor: colors.lavenderWeb3,
            '&:hover': {
              backgroundColor: colors.lavenderWeb2,
            },
            '&:not(:first-of-type)': {
              borderColor: colors.lavenderWeb,
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
