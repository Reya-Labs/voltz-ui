import React, { useEffect } from 'react';
import TableCell from '@mui/material/TableCell';

import { useBorrowAMMContext } from '@contexts';
import { Typography } from '@components/atomic';

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

    return `${(result * 100).toFixed(2)}%`;
  };

  return (
    <TableCell>
      <Typography variant="body2" sx={{fontSize: 18, fontWeight: 'bold', color: 'tertiary.light'}}>
        {renderValue()}
      </Typography>
    </TableCell>
  );
};

export default BorrowVariableAPY;
