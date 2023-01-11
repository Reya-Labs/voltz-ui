import TableCell from '@mui/material/TableCell';
import React from 'react';

import { Typography } from '../../../../../../../../components/atomic/Typography/Typography';
import { formatNumber } from '../../../../../../../../utilities/number';

export type BorrowVariableAPYProps = {
  loading: boolean;
  variableApy: number | null | void;
};

export const BorrowVariableAPY: React.FunctionComponent<BorrowVariableAPYProps> = ({
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
        sx={{
          fontSize: 18,
          color: '#2667FF',
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
