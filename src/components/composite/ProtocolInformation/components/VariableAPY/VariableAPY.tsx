import Box from '@mui/material/Box';
import isUndefined from 'lodash/isUndefined';
import React from 'react';

import { Agents } from '../../../../../contexts/AgentContext/types';
import { formatNumber } from '../../../../../utilities/number';
import { Typography } from '../../../../atomic/Typography/Typography';
import { IconLabel } from '../../../IconLabel/IconLabel';

export type VariableAPYProps = {
  agent?: Agents;
  variableApy?: number;
};

export const VariableAPY: React.FunctionComponent<VariableAPYProps> = ({ agent, variableApy }) => {
  const renderValue = () => {
    if (isUndefined(variableApy)) {
      return <Box sx={{ fontSize: 18 }}>Loading...</Box>;
    }

    return `${formatNumber(variableApy * 100)}%`;
  };

  return (
    <Typography
      agent={agent}
      label={
        <IconLabel
          icon="information-circle"
          info="The historical Annual Percentage Yield of the pool. The value is computed by aggregating the historical rates of the underlying rate oracle over a fixed look-back window."
          label="variable apy"
          removeIcon
        />
      }
      variant="h3"
      agentStyling
    >
      {renderValue()}
    </Typography>
  );
};
