import React from 'react';
import TableCell from '@mui/material/TableCell';

import { useBorrowAMMContext } from '../../../../../../../contexts';
import { Typography } from '@components/atomic';
import { formatDateTime } from '../../../../../../../utilities';

const BorrowMaturity: React.FunctionComponent = () => {
  const { endDate } = useBorrowAMMContext();

  const renderValue = () => {
    if (!endDate) {
      return '---';
    }

    return formatDateTime(endDate);
  };

  return (
    <TableCell width="20%">
      <Typography variant="body2" sx={{ fontSize: 18, color: 'primary.light' }}>
        {renderValue()}
      </Typography>
    </TableCell>
  );
};

export default BorrowMaturity;
