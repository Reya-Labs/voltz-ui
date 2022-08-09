import React, { ReactNode } from 'react';
import { colors, SystemStyleObject, Theme } from '@theme';
import { Typography } from '@components/atomic';
import Box from '@mui/material/Box';
import { BorrowPortfolioHeaderProps } from './BorrowPortfolioHeader';
import { formatCurrency, formatNumber } from '@utilities';

export type BorrowPortfolioHeaderBoxProps = {
    aggregatedDebt?: BorrowPortfolioHeaderProps['aggregatedDebt'];
    currencyCode?: BorrowPortfolioHeaderProps['currencyCode'];
    currencySymbol?: BorrowPortfolioHeaderProps['currencySymbol'];
};

const valueBoxStyles: SystemStyleObject<Theme> = { 
  background: colors.lavenderWeb.darken040,
  padding: (theme) => `${theme.spacing(2)} ${theme.spacing(4)}`,
  borderRadius: '4px',
  marginTop: (theme) => theme.spacing(2),
  display: 'inline-block'
};

const labelStyles: SystemStyleObject<Theme> = { 
    fontSize: '12px', 
    lineHeight: '1.2',
    textTransform: 'uppercase'
  };
const titleStyles: SystemStyleObject<Theme> = { 
fontSize: '40px', 
lineHeight: '1.2', 
marginTop: (theme) => theme.spacing(2)
};

const BorrowPortfolioHeaderBox = ({ 
    aggregatedDebt,
    currencyCode,
    currencySymbol
}: BorrowPortfolioHeaderBoxProps) => (
    <Box sx={{ textTransform: 'uppercase' }}>
    <Typography variant='body2' sx={labelStyles}>
      Total Borrowing
    </Typography>
    <Typography variant='h1' sx={titleStyles}>
      {currencySymbol}{formatCurrency(aggregatedDebt? aggregatedDebt : 0)} {currencyCode}
    </Typography>
  </Box>
);

export default BorrowPortfolioHeaderBox;
