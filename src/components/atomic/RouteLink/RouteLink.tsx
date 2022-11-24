import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useAgent } from '../../../hooks';
import { Agents } from '../../../contexts';

const StyledRouteLink = styled(Link)<LinkProps>(({}) => ({}));

const RouteLink = ({ children, to, ...props }: LinkProps) => {
  const agentCtx = useAgent();

  return (
    <StyledRouteLink
      to={to}
      {...props}
      sx={{
        fontSize: '18px',
        lineHeight: '14px',
        letterSpacing: '0.36px',
        fontFamily: 'PixelOperatorMono',
        color: () => {
          if (agentCtx.agent === Agents.FIXED_TRADER) return 'primary.base';
          if (agentCtx.agent === Agents.VARIABLE_TRADER) return 'tertiary.base';
          return 'error.base';
        },
      }}
    >
      {children}
    </StyledRouteLink>
  );
};

export default RouteLink;
