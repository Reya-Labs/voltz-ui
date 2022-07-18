import React from 'react';
import TableCell from '@mui/material/TableCell';

import { useWallet } from '@hooks';
import { Typography } from '@components/atomic';
import { Button } from '@components/atomic';
import isNull from 'lodash/isNull';
import { isUndefined } from 'lodash';

export type CurrentMarginProps = {
  marginEdit?: boolean;
  margin?: number;
  accruedCashflow?: number;
  token: string;
  onSelect: () => void;
};

const CurrentMargin: React.FunctionComponent<CurrentMarginProps> = ({ marginEdit, margin, accruedCashflow, token, onSelect}) => {
  const wallet = useWallet();

  const handleClick = () => {
    if (isNull(wallet.account)) {
      wallet.setRequired(true);
    } else {
      onSelect();
    }
  };

  return (
    <TableCell>
      <Typography variant="body2" label={"Margin"} sx={{ fontSize: 18 }}>
        {!isUndefined(margin) ? `${margin.toFixed(2)} ${token}` : 'No Data'}
      </Typography>

      {marginEdit && (
        <Button 
          variant='red2' 
          onClick={handleClick} 
          size='small' 
          sx={{ width: '100%', display: 'flex' }}
        >
          Edit 
        </Button>
      )}
    </TableCell>
  );
};

// border: 1px solid #5C0026;
// box-sizing: border-box;
// border-radius: 4px;

export default CurrentMargin;