import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';

import { AgentProps, Agents } from '@components/contexts';
import { useAgentWithOverride } from '@hooks';
import { withLabel } from '../../utilities';

export type TypographyProps = MuiTypographyProps &
  AgentProps & {
    agentStyling?: boolean;
  };

const Typography: React.FunctionComponent<TypographyProps> = ({
  agent: agentOverride,
  agentStyling = false,
  sx,
  ...props
}) => {
  const { agent } = useAgentWithOverride(agentOverride);
    
  const agentStyleOverrides = (): SystemStyleObject<Theme> => {
    if (!agent || !agentStyling) {
      return {};
    }

    if (agent === Agents.FIXED_TRADER) {
      return {
        color: 'primary.base',
      };
    }

    if (agent === Agents.VARIABLE_TRADER) {
      return {
        color: 'tertiary.light',
      };
    }

    if (agent === Agents.LIQUIDITY_PROVIDER) {
      return {
        color: 'error.base',
      };
    }

    return {};
  };

  return (
    <MuiTypography
      {...props}
      sx={{ ...(sx as SystemStyleObject<Theme>), ...agentStyleOverrides() }}
    />
  );
};

export default withLabel<TypographyProps>(Typography);
