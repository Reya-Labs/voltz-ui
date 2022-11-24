import React from 'react';
import TableCell from '@mui/material/TableCell';

import { Typography } from '@components/atomic';
import Box from '@mui/material/Box';
import { formatNumber } from '../../../../../../../utilities';

export type DebtProps = {
  debtInUSD: number | null | void;
  loadingDebt: boolean;
  debtInToken: number | null | void;
  tokenName: string | undefined;
};

export const Debt: React.FunctionComponent<DebtProps> = ({
  debtInUSD,
  loadingDebt,
  debtInToken,
  tokenName,
}) => {
  const renderValueInUSD = () => {
    if (loadingDebt) {
      return '---';
    }

    if (!debtInUSD) {
      return '$0';
    }

    return `$${formatNumber(debtInUSD)}`;
  };

  const renderValueInToken = () => {
    if (loadingDebt) {
      return '---';
    }

    if (!debtInToken) {
      return '$0';
    }

    let decimals = 2;
    if (tokenName === 'ETH') {
      decimals = 4;
    }
    return `${formatNumber(debtInToken, decimals, decimals)} ${tokenName ? tokenName : ''}`;
  };

  return (
    <TableCell align="left" width="25%">
      <Typography
        variant="body2"
        sx={{ fontSize: 18, fontWeight: 400, letterSpacing: '0.02em', lineHeight: '100%' }}
      >
        {renderValueInUSD()}
        <Box
          sx={{
            color: '#A6A2B4',
            fontSize: 12,
            align: 'left',
            marginLeft: (theme) => theme.spacing(-1.7),
          }}
        >
          {' '}
          &nbsp;
          {renderValueInToken()}
        </Box>
      </Typography>
    </TableCell>
  );
};
