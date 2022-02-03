import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

import { AgentProps, Agents } from '@theme';

export type ButtonProps = MuiButtonProps &
  AgentProps & {
    selected?: boolean;
  };

const Button: React.FunctionComponent<ButtonProps> = ({ agent, selected, ...props }) => {
  const styleOverrides: SystemStyleObject<Theme> = {
    border: 1,
    borderColor: 'transparent',
    borderRadius: 1,
  };
  const agentStyleOverrides = (): SystemStyleObject<Theme> => {
    if (!agent) {
      return {};
    }

    if (agent === Agents.FIXED_TRADER) {
      return {
        backgroundColor: 'primary.darken030',
        color: 'primary.light',
        '&:hover': {
          backgroundColor: 'primary.darken030',
          borderColor: 'primary.light',
        },
      };
    }

    if (agent === Agents.VARIABLE_TRADER) {
      return {
        backgroundColor: 'tertiary.darken030',
        color: 'secondary.light',
        '&:hover': {
          backgroundColor: 'tertiary.darken030',
          borderColor: 'tertiary.light',
        },
      };
    }

    if (agent === Agents.LIQUIDITY_PROVIDER) {
      return {
        backgroundColor: 'secondary.dark',
        color: 'primary.light',
        '&:hover': {
          backgroundColor: 'secondary.darken035',
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

    if (props.variant === 'dark') {
      return {
        backgroundColor: selected ? 'secondary.darken030' : 'secondary.dark',
        color: 'secondary.light',
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

    if (props.variant === 'text') {
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        '&:hover': {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
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
};

export default Button;
