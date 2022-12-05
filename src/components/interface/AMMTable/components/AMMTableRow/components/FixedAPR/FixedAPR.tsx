import TableCell from '@mui/material/TableCell';
import isUndefined from 'lodash.isundefined';
import React from 'react';

import { formatNumber } from '../../../../../../../utilities/number';
import { Typography } from '../../../../../../atomic/Typography/Typography';

export type FixedAPRProps = {
  fixedApr?: number;
};

export const FixedAPR: React.FunctionComponent<FixedAPRProps> = ({ fixedApr }) => {
  const renderValue = () => {
    if (isUndefined(fixedApr)) {
      return 'Loading...';
    }

    return `${formatNumber(fixedApr)}%`;
  };

  return (
    <TableCell>
      <Typography label="Fixed APR" sx={{ fontSize: 18 }} variant="body2" agentStyling>
        {renderValue()}
      </Typography>
    </TableCell>
  );
};
