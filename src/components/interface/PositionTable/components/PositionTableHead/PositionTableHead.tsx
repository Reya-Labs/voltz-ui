import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import { Box } from '@mui/material';
import { colors } from '@theme';
import { formatCurrency, formatNumber } from '@utilities';
import PositionBadge from '../PositionBadge';
import { Typography } from '@components/atomic';
import { isUndefined } from 'lodash';
import CircleIcon from '@mui/icons-material/Circle';

export type PositionTableHeadProps = {
  currencyCode?: string;
  currencySymbol?: string;
  currentFixedRate?: number;
  fcmBadge?: boolean;
  fees?: number;
  feesPositive?: boolean;
  positionType: number;
  healthFactor?: number;
  beforeMaturity: boolean;
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
  textTransform: 'uppercase',
  display: 'flex',
  verticalAlign: 'middle'
};

const PositionTableHead: React.FunctionComponent<PositionTableHeadProps> = ({
  currencyCode = '',
  currencySymbol = '',
  currentFixedRate, 
  fcmBadge = false,
  fees, 
  feesPositive = true,
  positionType,
  healthFactor,
  beforeMaturity
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

  const getHealthTextColor = () => {
    return (healthFactor === 1) ? '#F61067' : (healthFactor === 2 ? '#F1D302' : '#00d395');
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
        {beforeMaturity && !isUndefined(currentFixedRate) && !isUndefined(healthFactor) && (
          <Box sx={{ padding: (theme) => `${theme.spacing(1)} ${theme.spacing(2)}`, marginLeft: (theme) => theme.spacing(2) }}>
            <Typography variant='body2' sx={{ ...labelStyles, color: getHealthTextColor() }}>
              <CircleIcon 
                sx={{ 
                  width: 4, 
                  height: 14, 
                  borderRadius: '16px',
                  marginRight: (theme) => theme.spacing(2), 
                  color: getHealthTextColor(),
                }} 
              />
              Current fixed rate: {formatNumber(currentFixedRate)}%
            </Typography>
          </Box>
        )}

        {beforeMaturity && isUndefined(currentFixedRate) && !isUndefined(healthFactor) && (
          <Box sx={{ padding: (theme) => `${theme.spacing(1)} ${theme.spacing(2)}`, marginLeft: (theme) => theme.spacing(2) }}>
            <Typography variant='body2' sx={{ ...labelStyles, color: getHealthTextColor() }}>
              <CircleIcon 
                sx={{ 
                  width: 4, 
                  height: 14, 
                  borderRadius: '16px',
                  marginRight: (theme) => theme.spacing(2), 
                  color: getHealthTextColor(),
                }} 
              />
              {(healthFactor === 1) ? 'DANGER' : (healthFactor === 2 ? 'WARNING' : 'HEALTHY')}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PositionTableHead;
