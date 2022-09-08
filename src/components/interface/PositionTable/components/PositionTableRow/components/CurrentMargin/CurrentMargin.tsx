import React from 'react';
import TableCell from '@mui/material/TableCell';

import { useWallet } from '@hooks';
import { Typography } from '@components/atomic';
import { Button } from '@components/atomic';
import isNull from 'lodash/isNull';
import { isUndefined } from 'lodash';
import { formatCurrency, formatNumber } from '@utilities';

import Box from '@mui/material/Box';
import { colors } from '@theme';

export type CurrentMarginProps = {
  marginEdit?: boolean;
  margin?: number;
  accruedCashflow?: number;
  token: string;
  onSelect?: () => void;
};

const CurrentMargin: React.FunctionComponent<CurrentMarginProps> = ({ 
  marginEdit, 
  margin, 
  accruedCashflow, 
  token, 
  onSelect
}) => {
  const wallet = useWallet();

  const handleClick = () => {
    if (onSelect) {
      if (isNull(wallet.account)) {
        wallet.setRequired(true);
      } else {
       onSelect();
      }
    }
  };

  const getNetMarginLabel = () => (
    <>
      Margin 
      {!isUndefined(accruedCashflow) && (
        <Box component='span' sx={{ color: accruedCashflow >= 0 ? colors.vzCustomGreen1 : colors.vzCustomRed1 }}>
          {' '}
          {accruedCashflow > 0 && '+'}
          {accruedCashflow < 0 && '-'}
          {formatCurrency(Math.abs(accruedCashflow))} {token}
        </Box>
      )}
    </>
  );

  return (
    <TableCell>
      <Typography variant="body2" label={getNetMarginLabel()} sx={{ fontSize: 18 }}>
        {!isUndefined(margin) ? `${formatNumber(margin)} ${token}` : 'Loading...'}
      </Typography>

      {marginEdit && onSelect && (
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