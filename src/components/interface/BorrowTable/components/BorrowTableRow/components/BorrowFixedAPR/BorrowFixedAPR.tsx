import TableCell from '@mui/material/TableCell';
import React from 'react';

import { colors } from '../../../../../../../theme';
import { formatNumber } from '../../../../../../../utilities/number';
import { Typography } from '../../../../../../atomic/Typography/Typography';

export type BorrowBorrowFixedAPR = {
  loading: boolean;
  fixedApr: number | null | void;
};

export const BorrowFixedAPR: React.FunctionComponent<BorrowBorrowFixedAPR> = ({
  loading,
  fixedApr,
}) => {
  const renderValue = () => {
    if (loading) {
      return '---';
    }

    if (!fixedApr) {
      return '0%';
    }

    return `${formatNumber(fixedApr)}%`;
  };

  return (
    <TableCell align="center" width="20%">
      <Typography
        sx={{
          fontSize: 18,
          color: colors.skyBlueCrayola,
          fontWeight: 700,
          letterSpacing: '0.02em',
          lineHeight: '130%',
        }}
        variant="body2"
      >
        {renderValue()}
      </Typography>
    </TableCell>
  );
};
