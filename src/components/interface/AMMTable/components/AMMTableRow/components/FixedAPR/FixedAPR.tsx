import React, { useEffect } from 'react';

import { useAMMContext } from '@contexts';
import { Typography } from '@components/atomic';
import TableCell from '@mui/material/TableCell';
import { formatNumber } from '@utilities';
import { isUndefined } from 'lodash';

export type FixedAPRProps = {
  fixedApr?: number;
};

const FixedAPR: React.FunctionComponent<FixedAPRProps> = ({fixedApr}) => {

  const renderValue = () => {
    if (isUndefined(fixedApr)) {
      return 'Loading...';
    }

    return `${formatNumber(fixedApr)}%`;
  };

  return (
    <TableCell>
      <Typography variant="body2" label="Fixed APR" agentStyling sx={{ fontSize: 18 }}>
        {renderValue()}
      </Typography>
    </TableCell>
  );
};

export default FixedAPR;
