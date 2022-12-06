import { styled } from '@mui/material/styles';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { Agents } from '../../../contexts/AgentContext/types';
import { useAgent } from '../../../hooks/useAgent';
import { colors } from '../../../theme';

const StyledRouteLink = styled(Link)<LinkProps>(({}) => ({}));

export const RouteLink = ({ children, to, ...props }: LinkProps) => {
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
          if (agentCtx.agent === Agents.FIXED_TRADER) return colors.skyBlueCrayola;
          if (agentCtx.agent === Agents.VARIABLE_TRADER) return 'tertiary.base';
          return 'error.base';
        },
      }}
    >
      {children}
    </StyledRouteLink>
  );
};
