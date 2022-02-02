import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

import { AgentProps, Agents } from '@theme';

export type ButtonProps = MuiButtonProps & AgentProps;

const Button: React.FunctionComponent<ButtonProps> = ({ agent, ...props }) => {
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
        backgroundColor: (theme) => theme.palette.primary.darken030,
        color: (theme) => theme.palette.primary.light,
        '&:hover': {
          backgroundColor: (theme) => theme.palette.primary.darken030,
          borderColor: (theme) => theme.palette.primary.light,
        },
      };
    }

    if (agent === Agents.VARIABLE_TRADER) {
      return {
        backgroundColor: (theme) => theme.palette.tertiary.darken030,
        color: (theme) => theme.palette.secondary.light,
        '&:hover': {
          backgroundColor: (theme) => theme.palette.tertiary.darken030,
          borderColor: (theme) => theme.palette.tertiary.light,
        },
      };
    }

    if (agent === Agents.LIQUIDITY_PROVIDER) {
      return {
        backgroundColor: (theme) => theme.palette.secondary.dark,
        color: (theme) => theme.palette.primary.light,
        '&:hover': {
          backgroundColor: (theme) => theme.palette.secondary.darken035,
        },
      };
    }

    return {};
  };
  const stateStyleOverrides = (): SystemStyleObject<Theme> => {
    if (props.disabled) {
      return {
        backgroundColor: (theme) => theme.palette.secondary.dark,
        color: (theme) => theme.palette.secondary.darken015,
      };
    }

    if (props.variant === 'dark') {
      return {
        backgroundColor: (theme) => theme.palette.secondary.dark,
        color: (theme) => theme.palette.secondary.light,
        '&:hover': {
          backgroundColor: (theme) => theme.palette.secondary.darken030,
        },
      };
    }

    if (props.variant === 'darker') {
      return {
        backgroundColor: (theme) => theme.palette.secondary.darken045,
        color: (theme) => theme.palette.secondary.light,
        '&:hover': {
          backgroundColor: (theme) => theme.palette.secondary.darken035,
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
