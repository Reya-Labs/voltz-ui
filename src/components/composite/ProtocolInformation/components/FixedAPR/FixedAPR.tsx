import Box from '@mui/material/Box';
import isUndefined from 'lodash/isUndefined';
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
      label={<IconLabel icon="information-circle" info="something" label="fixed apr" removeIcon />}
      variant="h3"
      agentStyling
    >
      {isUndefined(fixedApr) ? (
        <Box sx={{ fontSize: 18 }}>Loading...</Box>
      ) : (
        `${formatNumber(fixedApr)}%`
      )}
    </Typography>
  );
};
