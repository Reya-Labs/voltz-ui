import React from 'react';
import Box from '@mui/material/Box';
import { colors, SystemStyleObject, Theme } from '@theme';
import { AugmentedAMM, formatCurrency, formatNumber } from '@utilities';
import { Button, getPositionBadgeVariant, PositionBadge, Typography } from '@components/atomic';
import { BulletLabel, getHealthTextColor, HealthFactorText } from '@components/composite';
import { isUndefined } from 'lodash';

export type PositionTableHeadProps = {
  currencyCode?: string;
  currencySymbol?: string;
  currentFixedRate?: number;
  fcmBadge?: boolean;
  fees?: number;
  feesPositive?: boolean;
  isSettled: boolean;
  positionType: number;
  healthFactor?: number;
  beforeMaturity: boolean;
  onRollover: () => void;
  onSettle: () => void;
  rolloverAmm?: AugmentedAMM;
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
  isSettled,
  positionType,
  healthFactor,
  beforeMaturity,
  onRollover,
  onSettle,
  rolloverAmm
}) => {
  const getTextColor = (positive: boolean) => {
    return positive ? colors.vzCustomGreen1 : colors.vzCustomRed1;
  }

  return (
    <Box sx={containerStyles}>
      <Box sx={{ display: 'flex' }}>
        <PositionBadge variant={getPositionBadgeVariant(positionType)} />

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
            <BulletLabel 
              sx={{ color: getHealthTextColor(healthFactor) }} 
              text={<>Current fixed rate: {formatNumber(currentFixedRate)}%</>}
            />
          </Box>
        )}

        {beforeMaturity && isUndefined(currentFixedRate) && !isUndefined(healthFactor) && (
          <Box sx={{ padding: (theme) => `${theme.spacing(1)} ${theme.spacing(2)}`, marginLeft: (theme) => theme.spacing(2) }}>
            <BulletLabel 
              sx={{ color: getHealthTextColor(healthFactor) }} 
              text={<HealthFactorText healthFactor={healthFactor} />} 
            />
          </Box>
        )}

        {(!beforeMaturity && !isSettled) && (
          <>
            <Button 
              variant={positionType === 1 ? 'darker-link' : 'darker'}
              size='xs'
              sx={{ marginRight: (theme) => theme.spacing(4) }}
              onClick={onSettle}
            >
              Settle
            </Button>
            {rolloverAmm && (
              <Button 
                variant={positionType === 1 ? 'rollover1' : positionType === 2 ? 'rollover2' : 'rollover3'}
                size='xs'
                onClick={onRollover}
              >
                Roll over
              </Button>
            )}
          </>
        )}

        {(!beforeMaturity && isSettled) && (
          <Button 
            variant={positionType === 1 ? 'darker-link' : 'darker'}
            size='xs'
            disabled
          >
            Settled
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default PositionTableHead;
