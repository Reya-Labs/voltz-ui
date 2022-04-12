import React, { useEffect } from 'react';
import TableCell from '@mui/material/TableCell';

import { useAMMContext } from '@hooks';
import { Typography } from '@components/atomic';
import { isUndefined } from 'lodash';

export type EstimatedCashflowProps = {
  tickLower?: number;
  tickUpper?: number;
};

const EstimatedCashflow: React.FunctionComponent<EstimatedCashflowProps> = ({tickLower, tickUpper}) => {
  const { estimatedCashflow } = useAMMContext();
  const { result, loading, call } = estimatedCashflow;

  useEffect(() => {
    if (!isUndefined(tickLower) && !isUndefined(tickUpper)) {
      call({ tickLower, tickUpper });
    }
  }, [call, tickLower, tickUpper]);

  const renderValue = () => {
    if (loading) {
      return 'Loading...';
    }

    if (!result) {
      return 'No data';
    }

    return `${result.toFixed(2)} USDC`;
  };

  return (
    <TableCell>
      <Typography variant="body2" label="Estimated Cashflow" sx={{fontSize: 18}}>
        {renderValue()}
      </Typography>
    </TableCell>
  );
};

export default EstimatedCashflow;
