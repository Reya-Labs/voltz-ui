import React from 'react';
import TableCell from '@mui/material/TableCell';

import { useWallet } from '../../../../../../../hooks';
import { Typography, Button } from '@components/atomic';
import isUndefined from 'lodash/isUndefined';
import { formatCurrency, formatNumber } from '../../../../../../../utilities';

import { colors } from '../../../../../../../theme';

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

    const formattedAccFlow = formatCurrency(Math.abs(accruedCashflow));
    const accFlowValue = parseFloat(formattedAccFlow);

    return (
      <>
        Margin
        <span
          style={{
            color:
              accFlowValue > 0
                ? colors.vzCustomGreen1.base
                : accFlowValue < 0
                ? colors.vzCustomRed1.base
                : undefined,
          }}
        >
          {' '}
          {accFlowValue > 0 ? '+' : accFlowValue < 0 ? '-' : ''}
          {formattedAccFlow} {token}
        </span>
      </>
    );
  };

  return (
    <TableCell>
      <Typography variant="body2" label={getNetMarginLabel()} sx={{ fontSize: 18 }}>
        {!isUndefined(margin) ? `${formatNumber(margin)} ${token}` : 'Loading...'}
      </Typography>

      {marginEdit && onSelect && (
        <Button
          variant="red2"
          onClick={handleClick}
          size="small"
          sx={{ width: '100%', display: 'flex' }}
        >
          Edit
        </Button>
      )}
    </TableCell>
  );
};
