import React from 'react';
import { SxProps, Theme } from '@mui/system';
import chroma from 'chroma-js';
import MuiToggleButton, {
  ToggleButtonProps as MuiToggleButtonProps,
} from '@mui/material/ToggleButton';

import { colors, AgentProps } from '@theme';

export type ToggleButtonProps = MuiToggleButtonProps & AgentProps;

const ToggleButton: React.FunctionComponent<ToggleButtonProps> = ({
  agent,
  selected,
  ...props
}) => {
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
      borderColor: (theme) => theme.agent[agent].light,
      '&:hover': {
        backgroundColor: (theme) => theme.agent[agent].dark,
        color: (theme) => theme.agent[agent].light,
      },
      '&.Mui-selected': {
        backgroundColor: (theme) => theme.agent[agent].dark,
        color: (theme) => theme.agent[agent].light,
        '&:hover': {
          backgroundColor: (theme) => chroma(theme.agent[agent].dark).brighten(1).hex(),
          color: (theme) => chroma(theme.agent[agent].light).brighten(1).hex(),
        },
      },
    };
  };
  const stateStyleOverrides = (): SxProps<Theme> => {
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
