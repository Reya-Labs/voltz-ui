import React from 'react';
import TableCell from '@mui/material/TableCell';

import { Typography } from '@components/atomic';

export type DebtProps = {
  debt: number | null | void;
};


const Debt: React.FunctionComponent<DebtProps> = ({debt}) => {

  const renderValue = () => {
    // if (loading) {
    //   return '---';
    // }

    if (!debt) {
      return '$0';
    }

    return `$${(debt).toFixed(2)}`;
  };

  return (
    <TableCell align="left" width="25%">
      <Typography variant="body2" sx={{fontSize: 18, fontWeight: 700, letterSpacing: '0.02em',lineHeight: '130%'}}>
        {renderValue()}
      </Typography>
    </TableCell>
  );
};

export default Debt;
