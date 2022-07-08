import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SystemStyleObject } from '@mui/system';
import { Theme } from '@mui/material';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

import { AgentProps, Agents } from '@contexts';
import { useAgentWithOverride } from '@hooks';

export type ButtonProps = MuiButtonProps &
  AgentProps & {
    selected?: boolean;
    link?: string;
  };

const Button: React.FunctionComponent<ButtonProps> = ({
  agent: agentOverride,
  selected,
  link,
  ...props
}) => {
  const { agent } = useAgentWithOverride(agentOverride);
  const navigate = useNavigate();
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
          boxShadow: '0px 4px 20px 0px #4de5ff33',
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
        color: '#ff4aa9',
        '&:hover': {
          backgroundColor: 'secondary.darken030',
        },
        borderWidth: 1,
        borderColor: '#ff4aa9'
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
        borderColor: '#40F99B'
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
        borderColor: '#F1D302'
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
        borderColor: '#F61067'
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
          textDecoration: 'underline',
        },
      };
    }

    return {};
  };
  const handleClick = () => link && navigate(link);

  return (
    <MuiButton
      disableRipple
      onClick={handleClick}
      {...props}
      sx={{ ...styleOverrides, ...agentStyleOverrides(), ...stateStyleOverrides(), ...props.sx }}
    />
  );
};

export default Button;
