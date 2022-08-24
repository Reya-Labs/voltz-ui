import React, { useEffect } from 'react';
import TableCell from '@mui/material/TableCell';

import { useBorrowAMMContext } from '@contexts';
import { Typography } from '@components/atomic';
import { formatNumber } from '@utilities';

const BorrowVariableAPY: React.FunctionComponent = () => {
  const { variableApy } = useBorrowAMMContext();
  const { result, loading, call } = variableApy;

  useEffect(() => {
    call();
  }, [call]);

  const renderValue = () => {
    if (loading) {
      return 'Loading...';
    }

    if (!result) {
      return '0%';
    }

    return `${formatNumber(result * 100)}%`;
  };

  return (
    <TableCell align='center' width="20%">
      <Typography variant="body2" sx={{fontSize: 18, color: '#2667FF', fontWeight: 700, letterSpacing: '0.02em',lineHeight: '130%'}}>
        {renderValue()}
      </Typography>
    </TableCell>
  );
};

export default BorrowVariableAPY;
