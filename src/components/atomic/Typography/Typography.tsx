import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';
import React from 'react';

import { AgentProps, Agents } from '../../../contexts/AgentContext/types';
import { useAgentWithOverride } from '../../../hooks/useAgentWithOverride';
import { colors, SystemStyleObject, Theme } from '../../../theme';
import { withLabel } from '../../hoc/withLabel/withLabel';

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
        color: colors.skyBlueCrayola,
      };
    }

    if (agent === Agents.VARIABLE_TRADER) {
      return {
        color: colors.ultramarineBlue,
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
