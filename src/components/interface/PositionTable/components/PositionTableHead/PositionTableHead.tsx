import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import { Box } from '@mui/material';
import { colors } from '@theme';
import { formatCurrency, formatNumber } from '@utilities';
import PositionBadge from '../PositionBadge';
import { Typography } from '@components/atomic';
import { isUndefined } from 'lodash';

export type PositionTableHeadProps = {
  currencyCode?: string;
  currencySymbol?: string;
  currentFixedRate?: number;
  currentFixedRatePositive?: boolean;
  fcmBadge?: boolean;
  fees?: number;
  feesPositive?: boolean;
  positionType: number;
};

const containerStyles: SystemStyleObject<Theme> = { 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  padding: (theme) => `${theme.spacing(4)} 0`
};

const labelStyles: SystemStyleObject<Theme> = { 
  fontSize: '14px', 
  lineHeight: '1', 
  textTransform: 'uppercase'
};

const PositionTableHead: React.FunctionComponent<PositionTableHeadProps> = ({
  currencyCode = '',
  currencySymbol = '',
  currentFixedRate, 
  currentFixedRatePositive = true, 
  fcmBadge = false,
  fees, 
  feesPositive = true,
  positionType,
}) => {
  const getPositionBadgeVariant = () => {
    switch(positionType) {
      case 1:
        return 'FT';
      case 2:
        return 'VT';
      case 3:
        return 'LP';
    }
  };

  const getTextColor = (positive: boolean) => {
    return positive ? colors.vzCustomGreen1 : colors.vzCustomRed1;
  }

  return (
    <Box sx={containerStyles}>
      <Box sx={{ display: 'flex' }}>
        <PositionBadge variant={getPositionBadgeVariant()} />

        {fcmBadge && (
          <PositionBadge variant='FC' sx={{ marginLeft: (theme) => theme.spacing(2) }} />
        )}

        {!isUndefined(fees) && (
          <Box sx={{ padding: (theme) => `${theme.spacing(1)} ${theme.spacing(2)}`, marginLeft: (theme) => theme.spacing(4) }}>
            <Typography variant='body2' sx={{ ...labelStyles }}>
              Fees: 
              <Box component='span' sx={{ color: getTextColor(feesPositive) }}>
                {' '}
                {!feesPositive && '-'}
                {currencySymbol}{formatCurrency(Math.abs(fees))}
                {' '}
                {currencyCode}
              </Box>
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex' }}>
        {!isUndefined(currentFixedRate) && (
          <Typography variant='body2' sx={{ ...labelStyles, color: getTextColor(currentFixedRatePositive) }}>
            &bull; Current fixed rate: {formatNumber(currentFixedRate)}%
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default PositionTableHead;
