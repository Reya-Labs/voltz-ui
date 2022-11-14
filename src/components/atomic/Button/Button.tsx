import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { SxProps } from '@mui/system';
import React from 'react';

import { AgentProps, Agents } from '../../../contexts/AgentContext/types';
import { useAgentWithOverride } from '../../../hooks/useAgentWithOverride';
import { SystemStyleObject, Theme } from '../../../theme';

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
        backgroundColor: 'primary.darken030',
        color: 'primary.light',
        '&:hover': {
          backgroundColor: 'primary.darken030',
          borderColor: 'primary.light',
          boxShadow: '0px 4px 20px 0px #4de5ff33',
        },
      };
    }

    if (agent === Agents.VARIABLE_TRADER) {
      return {
        backgroundColor: 'tertiary.light',
        color: 'secondary.light',
        '&:hover': {
          backgroundColor: 'tertiary.darken010',
          borderColor: 'tertiary.light',
          boxShadow: '0px 4px 20px 0px #2667FF4D',
        },
      };
    }

    if (agent === Agents.LIQUIDITY_PROVIDER) {
      return {
        backgroundColor: 'secondary.dark',
        color: 'primary.light',
        '&:hover': {
          backgroundColor: 'secondary.darken035',
          boxShadow: '0px 4px 20px 0px #4DE5FF40',
        },
      };
    }

    return {};
  };
  const stateStyleOverrides = (): SystemStyleObject<Theme> => {
    if (props.disabled) {
      return {
        backgroundColor: 'secondary.dark',
        color: 'secondary.darken015',
      };
    }

    if (props.variant === 'red') {
      return {
        backgroundColor: selected ? 'secondary.darken030' : 'secondary.dark',
        color: colors.wildStrawberry,
        '&:hover': {
          backgroundColor: 'secondary.darken030',
        },
        borderWidth: 1,
        borderColor: colors.wildStrawberry,
      };
    }

    if (props.variant === 'red2') {
      return {
        backgroundColor: 'transparent',
        color: colors.wildStrawberry,
        border: '1px solid #5C0026',
        borderColor: '#5C0026',
        '&:hover': {
          borderColor: colors.wildStrawberry,
          backgroundColor: 'transparent',
        },
      };
    }

    if (props.variant === 'healthy') {
      return {
        backgroundColor: 'secondary.dark',
        '&:hover': {
          backgroundColor: 'transparent',
        },
        color: '#40F99B',
        borderWidth: 1,
        borderColor: '#40F99B',
      };
    }

    if (props.variant === 'warning') {
      return {
        backgroundColor: 'secondary.dark',
        '&:hover': {
          backgroundColor: 'transparent',
        },
        color: '#F1D302',
        borderWidth: 1,
        borderColor: '#F1D302',
      };
    }

    if (props.variant === 'danger') {
      return {
        backgroundColor: 'secondary.dark',
        '&:hover': {
          backgroundColor: 'transparent',
        },
        color: '#F61067',
        borderWidth: 1,
        borderColor: '#F61067',
      };
    }

    if (props.variant === 'dark') {
      return {
        backgroundColor: selected ? 'secondary.darken030' : 'secondary.dark',
        color: 'secondary.light',
        '&:hover': {
          backgroundColor: 'secondary.darken030',
        },
      };
    }

    if (props.variant === 'dark-link') {
      return {
        backgroundColor: selected ? 'secondary.darken030' : 'secondary.dark',
        color: 'primary.base',
        '&:hover': {
          backgroundColor: 'secondary.darken030',
        },
      };
    }

    if (props.variant === 'darker') {
      return {
        backgroundColor: selected ? 'secondary.dark' : 'secondary.darken045',
        color: 'secondary.light',
        '&:hover': {
          backgroundColor: 'secondary.darken035',
        },
      };
    }

    if (props.variant === 'darker-link') {
      return {
        backgroundColor: selected ? 'secondary.dark' : 'secondary.darken045',
        color: 'primary.base',
        '&:hover': {
          backgroundColor: 'secondary.darken035',
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
        backgroundColor: 'primary.base',
        color: 'tertiary.darken035',
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: 'primary.darken015',
          boxShadow: 'none',
        },
      };
    }

    if (props.variant === 'rollover2') {
      return {
        backgroundColor: 'tertiary.base',
        color: 'secondary.base',
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: 'tertiary.darken015',
          boxShadow: 'none',
        },
      };
    }

    if (props.variant === 'rollover3') {
      return {
        backgroundColor: 'secondary.darken050',
        color: 'primary.base',
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: 'secondary.darken045',
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
