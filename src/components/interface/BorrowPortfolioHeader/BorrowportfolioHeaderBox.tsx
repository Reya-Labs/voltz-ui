import Box from '@mui/material/Box';

import { colors, SystemStyleObject, Theme } from '../../../theme';
import { formatCurrency } from '../../../utilities/number';
import { Typography } from '../../atomic/Typography/Typography';

export type BorrowPortfolioHeaderBoxProps = {
  aggregatedDebt?: number;
  loading?: boolean;
  currencyCode: string;
  currencySymbol: string;
};

const labelStyles: SystemStyleObject<Theme> = {
  textTransform: 'uppercase',
  fontWeight: 400,
  fontSize: 14,
  color: colors.lavenderWeb1,
};
const titleStyles: SystemStyleObject<Theme> = {
  fontSize: '40px',
  lineHeight: '1.2',
  marginTop: (theme) => theme.spacing(2),
};

export const BorrowPortfolioHeaderBox = ({
  aggregatedDebt,
  loading,
  currencyCode,
  currencySymbol,
}: BorrowPortfolioHeaderBoxProps) => {
  const renderedValue =
    aggregatedDebt !== undefined && !loading
      ? `${currencySymbol}${formatCurrency(aggregatedDebt)} ${currencyCode}`
      : 'Loading...';
  return (
    <Box sx={{ textTransform: 'uppercase' }}>
      <Typography sx={labelStyles} variant="subtitle1">
        Total Borrowing
      </Typography>
      <Typography sx={titleStyles} variant="h1">
        {renderedValue}
      </Typography>
    </Box>
  );
};
