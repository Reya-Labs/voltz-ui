import React, { useEffect } from 'react';

import { usePositionContext, useBorrowAMMContext } from '@contexts';
import { Typography } from '@components/atomic';
import TableCell from '@mui/material/TableCell';

const BorrowFixedAPR: React.FunctionComponent = () => {
  const { position } = usePositionContext();
  const { fixedApr } = useBorrowAMMContext();
  const { result, loading, call } = fixedApr;

  useEffect(() => {
    call(position);
  }, [call]);

  const renderValue = () => {
    if (loading) {
      return '---';
    }

    if (!result) {
      return '0%';
    }

    return `${result.toFixed(2)}%`; 
  };

  return (
    <TableCell align='center' width="20%">
      <Typography variant="body2" sx={{ fontSize: 18, color: 'primary.light', fontWeight: 700, letterSpacing: '0.02em',lineHeight: '130%'}}>
        {renderValue()}
      </Typography>
    </TableCell>
  );
};

export default BorrowFixedAPR;