import TableCell from '@mui/material/TableCell';
import isUndefined from 'lodash/isUndefined';
import React from 'react';

import { formatNumber } from '../../../../../../../utilities/number';
import { Typography } from '../../../../../../atomic/Typography/Typography';

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
      <Typography label="Variable APY" sx={{ fontSize: 18 }} variant="body2" agentStyling>
        {renderValue()}
      </Typography>
    </TableCell>
  );
};
