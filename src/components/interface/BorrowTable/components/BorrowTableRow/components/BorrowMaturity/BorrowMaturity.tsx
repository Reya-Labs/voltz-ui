import React, { useEffect } from 'react';
import TableCell from '@mui/material/TableCell';

import { useBorrowAMMContext } from '@contexts';
import { Typography } from '@components/atomic';
import { formatDateTime } from '@utilities';

const BorrowMaturity: React.FunctionComponent = () => {
  const { endDate } = useBorrowAMMContext();

  const renderValue = () => {
    if (!endDate) {
      return '---';
    }

    return formatDateTime(endDate);
  };

  return (
    <TableCell>
      <Typography variant="body2" agentStyling sx={{fontSize: 18}}>
        {renderValue()}
      </Typography>
    </TableCell>
  );
};

export default BorrowMaturity;