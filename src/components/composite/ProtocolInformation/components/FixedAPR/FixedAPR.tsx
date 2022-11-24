import React from 'react';
import Box from '@mui/material/Box';

import { Typography } from '@components/atomic';
import { IconLabel } from '@components/composite';
import { Agents } from '../../../../../contexts';
import { formatNumber } from '../../../../../utilities';
import { isUndefined } from 'lodash';

export type FixedAPRProps = {
  agent?: Agents;
  fixedApr?: number;
};

export const FixedAPR: React.FunctionComponent<FixedAPRProps> = ({ agent, fixedApr }) => {
  return (
    <Typography
      variant="h3"
      label={<IconLabel label="fixed apr" icon="information-circle" info="something" removeIcon />}
      agentStyling
      agent={agent}
    >
      {isUndefined(fixedApr) ? (
        <Box sx={{ fontSize: 18 }}>Loading...</Box>
      ) : (
        `${formatNumber(fixedApr)}%`
      )}
    </Typography>
  );
};
