import React, { useEffect } from 'react';
import TableCell from '@mui/material/TableCell';

import { useBorrowAMMContext } from '@contexts';
import { Typography } from '@components/atomic';

const Debt: React.FunctionComponent = () => {
  const { aggregatedDebt } = useBorrowAMMContext();
  const { result, loading, call } = aggregatedDebt;

  useEffect(() => {
    call();
  }, [call]);

  const renderValue = () => {
    if (loading) {
      return 'Loading...';
    }

    if (!result) {
      return '$0';
    }

    return `$${(result).toFixed(2)}`;
  };

  return (
    <TableCell>
      <Typography variant="body2" label="Debt" agentStyling sx={{fontSize: 18}}>
        {renderValue()}
      </Typography>
    </TableCell>
  );
};

export default Debt;
