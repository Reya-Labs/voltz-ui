import React from 'react';
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';

import { AgentProps, Agents } from '../../../contexts';
import { useAgentWithOverride } from '../../../hooks';
import { withLabel } from '../../hoc';
import { SystemStyleObject, Theme } from '../../../theme';

export type TypographyProps = React.ComponentProps<typeof Typography>;

function Typography<C extends React.ElementType>(
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

export default withLabel<TypographyProps>(Typography);
