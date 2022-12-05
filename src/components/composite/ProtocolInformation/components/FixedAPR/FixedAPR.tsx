import isUndefined from 'lodash.isundefined';
import React from 'react';

import { Agents } from '../../../../../contexts/AgentContext/types';
import { formatNumber } from '../../../../../utilities/number';
import { Typography } from '../../../../atomic/Typography/Typography';
import { IconLabel } from '../../../IconLabel/IconLabel';

export type FixedAPRProps = {
  agent?: Agents;
  fixedApr?: number;
};

export const FixedAPR: React.FunctionComponent<FixedAPRProps> = ({ agent, fixedApr }) => {
  return (
    <Typography
      agent={agent}
      data-testid="FixedAPR"
      label={<IconLabel icon="information-circle" info="something" label="fixed apr" removeIcon />}
      variant="h3"
      agentStyling
    >
      {isUndefined(fixedApr) ? 'Loading...' : `${formatNumber(fixedApr)}%`}
    </Typography>
  );
};
