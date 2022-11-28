import TableCell from '@mui/material/TableCell';
import React from 'react';

import { useBorrowAMMContext } from '../../../../../../../contexts/BorrowAMMContext/BorrowAMMContext';
import { formatDateTime } from '../../../../../../../utilities/date';
import { Typography } from '../../../../../../atomic/Typography/Typography';

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
