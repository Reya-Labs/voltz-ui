import React from 'react';
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';

import { useAgentWithOverride } from '../../../hooks/useAgentWithOverride';
import { withLabel } from '../../hoc/withLabel/withLabel';
import { SystemStyleObject, Theme } from '../../../theme';
import { AgentProps, Agents } from '../../../contexts/AgentContext/types';

export type TypographyProps = React.ComponentProps<typeof TypographyComponent>;

function TypographyComponent<C extends React.ElementType>(
  props: MuiTypographyProps<C, { component?: C }> &
    AgentProps & {
      agentStyling?: boolean;
    },
) {
  const { agent: agentOverride, agentStyling = false, sx, ...restProps } = props;

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
      {...restProps}
      sx={{ ...(sx as SystemStyleObject<Theme>), ...agentStyleOverrides() }}
    />
  );
}

export const Typography = withLabel<TypographyProps>(TypographyComponent);
