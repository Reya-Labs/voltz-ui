import React from 'react';
import TableCell from '@mui/material/TableCell';

import { Typography } from '@components/atomic';
import { formatNumber } from '../../../../../../../utilities';

export type BorrowVariableAPYProps = {
  loading: boolean;
  variableApy: number | null | void;
};

const BorrowVariableAPY: React.FunctionComponent<BorrowVariableAPYProps> = ({
  loading,
  variableApy,
}) => {
  const renderValue = () => {
    if (loading) {
      return 'Loading...';
    }

    if (!variableApy) {
      return '0%';
    }

    return `${formatNumber(variableApy * 100)}%`;
  };

  return (
    <TableCell align="center" width="20%">
      <Typography
        variant="body2"
        sx={{
          fontSize: 18,
          color: '#2667FF',
          fontWeight: 700,
          letterSpacing: '0.02em',
          lineHeight: '130%',
        }}
      >
        {renderValue()}
      </Typography>
    </TableCell>
  );
};

export default BorrowVariableAPY;
