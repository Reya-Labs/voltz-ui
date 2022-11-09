import TableCell from '@mui/material/TableCell';
import isUndefined from 'lodash.isundefined';
import React from 'react';

import { Button } from '../../../../../../../../components/atomic/Button/Button';
import { Typography } from '../../../../../../../../components/atomic/Typography/Typography';
import { useWallet } from '../../../../../../../../hooks/useWallet';
import { colors } from '../../../../../../../../theme';
import { formatCurrency, formatNumber } from '../../../../../../../../utilities/number';

export type CurrentMarginProps = {
  marginEdit?: boolean;
  margin?: number;
  accruedCashflow?: number;
  token: string;
  onSelect?: () => void;
  isSettled: boolean;
};

export const CurrentMargin: React.FunctionComponent<CurrentMarginProps> = ({
  marginEdit,
  margin,
  accruedCashflow,
  token,
  onSelect,
  isSettled,
}) => {
  const wallet = useWallet();

  const handleClick = () => {
    if (onSelect) {
      if (!wallet.account) {
        wallet.setRequired(true);
      } else {
        onSelect();
      }
    }
  };

  const getNetMarginLabel = () => {
    if (isUndefined(accruedCashflow) || isSettled) {
      return 'Margin';
    }

    const formattedAccFlow = formatCurrency(accruedCashflow, false, true);

    return (
      <>
        Margin
        <span
          style={{
            color:
              accruedCashflow > 0
                ? colors.skyBlueCrayola
                : accruedCashflow < 0
                ? colors.wildStrawberry
                : undefined,
          }}
        >
          {' '}
          {formattedAccFlow} {token}
        </span>
      </>
    );
  };

  return (
    <TableCell>
      <Typography label={getNetMarginLabel()} sx={{ fontSize: 18 }} variant="body2">
        {!isUndefined(margin) ? `${formatNumber(margin)} ${token}` : 'Loading...'}
      </Typography>

      {marginEdit && onSelect && (
        <Button
          size="small"
          sx={{ width: '100%', display: 'flex' }}
          variant="red2"
          onClick={handleClick}
        >
          Edit
        </Button>
      )}
    </TableCell>
  );
};
