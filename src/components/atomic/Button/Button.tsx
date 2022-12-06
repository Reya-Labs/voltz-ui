import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { SxProps } from '@mui/system';
import React from 'react';

import { AgentProps, Agents } from '../../../contexts/AgentContext/types';
import { useAgentWithOverride } from '../../../hooks/useAgentWithOverride';
import { colors, SystemStyleObject, Theme } from '../../../theme';

export function Button<C extends React.ElementType>({
  agent: agentOverride,
  selected,
  link,
  ...props
}: Omit<MuiButtonProps<C, { component?: C }>, 'onClick' | 'sx'> &
  AgentProps & {
    sx?: SxProps<Theme>;
    selected?: boolean;
    link?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }) {
  const { agent } = useAgentWithOverride(agentOverride);
  const styleOverrides: SystemStyleObject<Theme> = {
    border: 1,
    borderColor: 'transparent',
    borderRadius: 1,
  };
  const agentStyleOverrides = (): SystemStyleObject<Theme> => {
    if (!agent) {
      return {};
    }

    // selecting different colours from the pallet to style the component
    if (agent === Agents.FIXED_TRADER) {
      return {
        backgroundColor: colors.skyBlueCrayola5,
        color: colors.skyBlueCrayola,
        '&:hover': {
          backgroundColor: colors.skyBlueCrayola5,
          borderColor: colors.skyBlueCrayola,
          boxShadow: '0px 4px 20px 0px #4de5ff33',
        },
      };
    }

    if (agent === Agents.VARIABLE_TRADER) {
      return {
        backgroundColor: 'tertiary.light',
        color: colors.lavenderWeb,
        '&:hover': {
          backgroundColor: 'tertiary.darken010',
          borderColor: 'tertiary.light',
          boxShadow: '0px 4px 20px 0px #2667FF4D',
        },
      };
    }

    if (agent === Agents.LIQUIDITY_PROVIDER) {
      return {
        backgroundColor: colors.lavenderWeb7,
        color: colors.skyBlueCrayola,
        '&:hover': {
          backgroundColor: colors.lavenderWeb6,
          boxShadow: '0px 4px 20px 0px #4DE5FF40',
        },
      };
    }

    return {};
  };
  const stateStyleOverrides = (): SystemStyleObject<Theme> => {
    if (props.disabled) {
      return {
        backgroundColor: colors.lavenderWeb7,
        color: colors.lavenderWeb2,
      };
    }

    if (props.variant === 'red') {
      return {
        backgroundColor: selected ? colors.lavenderWeb5 : colors.lavenderWeb7,
        color: colors.wildStrawberry,
        '&:hover': {
          backgroundColor: colors.lavenderWeb5,
        },
        borderWidth: 1,
        borderColor: colors.wildStrawberry,
      };
    }

    if (props.variant === 'red2') {
      return {
        backgroundColor: 'transparent',
        color: colors.wildStrawberry,
        border: `1px solid ${colors.wildStrawberry5}`,
        borderColor: colors.wildStrawberry5,
        '&:hover': {
          borderColor: colors.wildStrawberry,
          backgroundColor: 'transparent',
        },
      };
    }

    if (props.variant === 'healthy') {
      return {
        backgroundColor: colors.lavenderWeb7,
        '&:hover': {
          backgroundColor: 'transparent',
        },
        color: colors.skyBlueCrayola,
        border: `1px solid ${colors.skyBlueCrayola}`,
      };
    }

    if (props.variant === 'warning') {
      return {
        backgroundColor: colors.lavenderWeb7,
        '&:hover': {
          backgroundColor: 'transparent',
        },
        color: colors.orangeYellow,
        border: `1px solid ${colors.orangeYellow}`,
      };
    }

    if (props.variant === 'danger') {
      return {
        backgroundColor: colors.lavenderWeb7,
        '&:hover': {
          backgroundColor: 'transparent',
        },
        color: colors.wildStrawberry,
        border: `1px solid ${colors.wildStrawberry}`,
      };
    }

    if (props.variant === 'dark') {
      return {
        backgroundColor: selected ? colors.lavenderWeb5 : colors.lavenderWeb7,
        color: colors.lavenderWeb,
        '&:hover': {
          backgroundColor: colors.lavenderWeb5,
        },
      };
    }

    if (props.variant === 'dark-link') {
      return {
        backgroundColor: selected ? colors.lavenderWeb5 : colors.lavenderWeb7,
        color: colors.skyBlueCrayola,
        '&:hover': {
          backgroundColor: colors.lavenderWeb5,
        },
      };
    }

    if (props.variant === 'darker') {
      return {
        backgroundColor: selected ? colors.lavenderWeb7 : colors.lavenderWeb8,
        color: colors.lavenderWeb,
        '&:hover': {
          backgroundColor: colors.lavenderWeb6,
        },
      };
    }

    if (props.variant === 'darker-link') {
      return {
        backgroundColor: selected ? colors.lavenderWeb7 : colors.lavenderWeb8,
        color: colors.skyBlueCrayola,
        '&:hover': {
          backgroundColor: colors.lavenderWeb6,
        },
      };
    }

    if (props.variant === 'text') {
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        '&:hover': {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          textDecoration: 'underline',
        },
      };
    }

    if (props.variant === 'rollover1') {
      return {
        backgroundColor: colors.skyBlueCrayola,
        color: 'tertiary.darken035',
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: colors.skyBlueCrayola2,
          boxShadow: 'none',
        },
      };
    }

    if (props.variant === 'rollover2') {
      return {
        backgroundColor: 'tertiary.base',
        color: colors.lavenderWeb,
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: 'tertiary.darken015',
          boxShadow: 'none',
        },
      };
    }

    if (props.variant === 'rollover3') {
      return {
        backgroundColor: colors.lavenderWeb8,
        color: colors.skyBlueCrayola,
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: colors.lavenderWeb8,
          boxShadow: 'none',
        },
      };
    }

    return {};
  };

  return (
    <MuiButton
      disableRipple
      {...props}
      sx={{ ...styleOverrides, ...agentStyleOverrides(), ...stateStyleOverrides(), ...props.sx }}
    />
  );
}
