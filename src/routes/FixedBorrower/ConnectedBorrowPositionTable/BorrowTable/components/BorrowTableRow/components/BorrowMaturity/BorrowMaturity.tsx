import TableCell from '@mui/material/TableCell';
import React from 'react';

import { Typography } from '../../../../../../../../components/atomic/Typography/Typography';
import { useBorrowAMMContext } from '../../../../../../../../contexts/BorrowAMMContext/BorrowAMMContext';
import { formatDateTime } from '../../../../../../../../utilities/date';

export const BorrowMaturity: React.FunctionComponent = () => {
  const { endDate } = useBorrowAMMContext();

  const renderValue = () => {
    if (!endDate) {
      return '---';
    }

    return formatDateTime(endDate);
  };

  return (
    <TableCell width="20%">
      <Typography sx={{ fontSize: 18, color: 'primary.light' }} variant="body2">
        {renderValue()}
      </Typography>
    </TableCell>
  );
};