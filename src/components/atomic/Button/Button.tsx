import React from 'react';
import { SxProps, Theme } from '@mui/system';
import chroma from 'chroma-js';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

import { AgentProps } from '@theme';

export type ButtonProps = MuiButtonProps & AgentProps;

const Button: React.FunctionComponent<ButtonProps> = ({ agent, ...props }) => {
  const styleOverrides: SxProps<Theme> = {
    borderRadius: 1,
  };
  const agentStyleOverrides = (): SxProps<Theme> => {
    if (!agent) {
      return {};
    }

    return {
      backgroundColor: (theme) => theme.agent[agent].dark,
      color: (theme) => theme.agent[agent].light,
      '&:hover': {
        backgroundColor: (theme) => chroma(theme.agent[agent].dark).brighten(1).hex(),
        color: (theme) => chroma(theme.agent[agent].light).brighten(1).hex(),
      },
    };
  };

  return (
    <MuiButton disableRipple {...props} sx={{ ...styleOverrides, ...agentStyleOverrides() }} />
  );
};

export default Button;
