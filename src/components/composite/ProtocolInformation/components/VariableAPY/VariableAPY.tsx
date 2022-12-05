import isUndefined from 'lodash.isundefined';
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
      return 'Loading...';
    }

    return `${formatNumber(variableApy * 100)}%`;
  };

  return (
    <Typography
      agent={agent}
      data-testid="VariableAPY"
      label={
        <IconLabel
          data-testid="VariableAPY-Icon"
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
