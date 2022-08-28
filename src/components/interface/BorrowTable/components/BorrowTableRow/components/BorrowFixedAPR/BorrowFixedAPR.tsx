import React, { useEffect } from 'react';

import { usePositionContext, useBorrowAMMContext } from '@contexts';
import { Typography } from '@components/atomic';
import TableCell from '@mui/material/TableCell';
import { formatNumber } from '@utilities';

export type BorrowBorrowFixedAPR = {
  loading: boolean;
  fixedApr: number | null | void;
};

const BorrowFixedAPR: React.FunctionComponent<BorrowBorrowFixedAPR> = ({loading, fixedApr}) => {

  const renderValue = () => {
    if (loading) {
      return '---';
    }

    if (!fixedApr) {
      return '0%';
    }

    return `${fixedApr.toFixed(2)}%`; 
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