import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import { Box } from '@mui/material';
import { colors } from '@theme';
import { formatCurrency, formatNumber } from '@utilities';
import PositionBadge from '../PositionBadge';
import { Typography } from '@components/atomic';
import { isUndefined } from 'lodash';
import { Button } from '@components/atomic';
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
  textTransform: 'uppercase'
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
          <Typography variant='body2' sx={{ ...labelStyles, color: (healthFactor === 1) ? '#F61067' : (healthFactor === 2 ? '#F1D302' : '#00d395') }}>
            &bull; Current fixed rate: {formatNumber(currentFixedRate)}%
          </Typography>
        )}
      </Box>
      {
        beforeMaturity && isUndefined(currentFixedRate) && !isUndefined(healthFactor) && (
          <Box sx={{ marginLeft: (theme) => theme.spacing(4), display: 'flex' }}>
            <Button
              variant={(healthFactor === 1) ? 'danger' : (healthFactor === 2 ? 'warning' : 'healthy')}
              sx={{ zIndex: 1, left: (theme) => theme.spacing(-2), fontSize: 16, borderWidth: 0 }}
              startIcon={
                <CircleIcon 
                  sx={{ 
                    width: 4, 
                    height: 4, 
                    borderRadius: 200, 
                    color: (healthFactor === 1) ? '#F61067' : (healthFactor === 2 ? '#F1D302' : '#00d395'),
                  }} 
                />
              }
            >
              {(healthFactor === 1) ? 'DANGER' : (healthFactor === 2 ? 'WARNING' : 'HEALTHY')}
            </Button>
          </Box>
        )
      }
    </Box>
  );
};

export default PositionTableHead;
