import React, { ReactNode } from 'react';
import { colors, SystemStyleObject, Theme } from '@theme';
import { Typography } from '@components/atomic';
import Box from '@mui/material/Box';
import { BorrowPortfolioHeaderProps } from './BorrowPortfolioHeader';
import { formatCurrency, formatNumber } from '@utilities';

export type BorrowPortfolioHeaderBoxProps = {
    aggregatedDebt?: number;
    loading?: boolean;
    currencyCode: string;
    currencySymbol: string;
};

const valueBoxStyles: SystemStyleObject<Theme> = { 
  background: colors.lavenderWeb.darken040,
  padding: (theme) => `${theme.spacing(2)} ${theme.spacing(4)}`,
  borderRadius: '4px',
  marginTop: (theme) => theme.spacing(2),
  display: 'inline-block'
};

const labelStyles: SystemStyleObject<Theme> = { 
    textTransform: "uppercase",
    fontWeight: 400, 
    fontSize: 14,
    color: "#B3AFC6"
  };
const titleStyles: SystemStyleObject<Theme> = { 
fontSize: '40px', 
lineHeight: '1.2', 
marginTop: (theme) => theme.spacing(2)
};

const BorrowPortfolioHeaderBox = ({ 
    aggregatedDebt,
    loading,
    currencyCode,
    currencySymbol
}: BorrowPortfolioHeaderBoxProps) => {

  const renderedValue = (aggregatedDebt !== undefined && !loading) ?
   (currencySymbol + formatCurrency(aggregatedDebt) +" "+ currencyCode) : "Loading...";
  return (
  <Box sx={{ textTransform: 'uppercase' }}>
    <Typography variant='subtitle1' sx={labelStyles}>
      Total Borrowing
    </Typography>
    <Typography variant='h1' sx={titleStyles}>
      {renderedValue}
    </Typography>
  </Box>
  );
}
    ;

export default BorrowPortfolioHeaderBox;
