import React from 'react';
import TableCell from '@mui/material/TableCell';

import { Typography } from '@components/atomic';
import { formatNumber } from '../../../../../../../utilities';
import isUndefined from 'lodash/isUndefined';

export type VariableAPYProps = {
  variableApy?: number;
};

export const VariableAPY: React.FunctionComponent<VariableAPYProps> = ({ variableApy }) => {
  const renderValue = () => {
    if (isUndefined(variableApy)) {
      return 'Loading...';
    }

    return `${formatNumber(variableApy * 100)}%`;
  };

  return (
    <TableCell>
      <Typography variant="body2" label="Variable APY" agentStyling sx={{ fontSize: 18 }}>
        {renderValue()}
      </Typography>
    </TableCell>
  );
};
