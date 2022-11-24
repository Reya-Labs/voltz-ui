import React from 'react';
import Box from '@mui/material/Box';
import { colors, SystemStyleObject, Theme } from '../../../../../theme';
import { formatCurrency, formatNumber } from '../../../../../utilities';
import { Button, getPositionBadgeVariant, PositionBadge, Typography } from '@components/atomic';
import { BulletLabel, getHealthTextColor, HealthFactorText } from '@components/composite';
import { isUndefined } from 'lodash';
import { useAgent } from '../../../../../hooks';
import { Agents } from '../../../../../contexts';
import { ReactComponent as EditIcon } from './editPosition.svg';

export type PositionTableHeadProps = {
  currencyCode: string;
  currencySymbol: string;
  feesPositive: boolean;
  isSettled: boolean;
  positionType: number;
  onRollover: () => void;
  onSettle: () => void;
  rolloverAvailable: boolean;
  gaButtonId: string;
  onSelect?: (mode: 'margin' | 'liquidity' | 'notional') => void;
  beforeMaturity?: boolean;
  healthFactor?: number;
  fixedRateHealthFactor?: number;
  fixedApr?: number;
  fees?: number;
};

const containerStyles: SystemStyleObject<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: (theme) => `${theme.spacing(4)} 0`,
};

const labelStyles: SystemStyleObject<Theme> = {
  fontSize: '14px',
  lineHeight: '1',
  textTransform: 'uppercase',
  display: 'flex',
  verticalAlign: 'middle',
};

const PositionTableHead: React.FunctionComponent<PositionTableHeadProps> = ({
  currencyCode = '',
  currencySymbol = '',
  feesPositive = true,
  isSettled,
  positionType,
  onRollover,
  onSettle,
  rolloverAvailable,
  gaButtonId,
  onSelect,
  beforeMaturity,
  healthFactor,
  fixedRateHealthFactor,
  fixedApr,
  fees: feesProp,
}) => {
  const { agent } = useAgent();
  const currentFixedRate = agent === Agents.LIQUIDITY_PROVIDER ? fixedApr : undefined;
  const fees = agent === Agents.LIQUIDITY_PROVIDER ? feesProp : undefined;

  const getTextColor = (positive: boolean) => {
    return positive ? colors.vzCustomGreen1.base : colors.vzCustomRed1.base;
  };

  const handleEditNotional = () => {
    onSelect && onSelect('notional');
  };

  return (
    <Box sx={containerStyles}>
      <Box sx={{ display: 'flex' }}>
        <PositionBadge variant={getPositionBadgeVariant(positionType)} />

        {!isUndefined(fees) && (
          <Box
            sx={{
              padding: (theme) => `${theme.spacing(1)} ${theme.spacing(2)}`,
              marginLeft: (theme) => theme.spacing(4),
            }}
          >
            <Typography variant="body2" sx={{ ...labelStyles }}>
              Fees:
              <Box component="span" sx={{ color: getTextColor(feesPositive) }}>
                {' '}
                {!feesPositive && '-'}
                {currencySymbol}
                {formatCurrency(Math.abs(fees))} {currencyCode}
              </Box>
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex' }}>
        {beforeMaturity && !isUndefined(currentFixedRate) && !isUndefined(healthFactor) && (
          <Box
            sx={{
              padding: (theme) => `${theme.spacing(1)} ${theme.spacing(2)}`,
              marginLeft: (theme) => theme.spacing(2),
            }}
          >
            <BulletLabel
              sx={{ color: getHealthTextColor(fixedRateHealthFactor) }}
              text={<>Current fixed rate: {formatNumber(currentFixedRate)}%</>}
            />
          </Box>
        )}

        {beforeMaturity && !isUndefined(healthFactor) && (
          <Box
            sx={{
              padding: (theme) => `${theme.spacing(1)} ${theme.spacing(2)}`,
              marginLeft: (theme) => theme.spacing(2),
              display: 'flex',
            }}
          >
            <BulletLabel
              sx={{
                color: getHealthTextColor(healthFactor),
                alignItems: 'center',
                marginRight: '8px',
                fontSize: '14px',
              }}
              text={<HealthFactorText healthFactor={healthFactor} />}
            />
            {onSelect && (
              <Button
                variant="darker"
                onClick={handleEditNotional}
                size="vs"
                sx={{ display: 'flex', padding: '4px 8px', fontSize: '14px' }}
                id={gaButtonId}
              >
                <Box sx={{ marginRight: '4px' }}>Edit </Box>
                <EditIcon />
              </Button>
            )}
          </Box>
        )}

        {beforeMaturity === false && !isSettled && (
          <>
            <Button
              variant={positionType === 1 ? 'darker-link' : 'darker'}
              size="xs"
              onClick={onSettle}
              id={gaButtonId}
            >
              Settle
            </Button>
            {rolloverAvailable && (
              <Button
                variant={
                  positionType === 1 ? 'rollover1' : positionType === 2 ? 'rollover2' : 'rollover3'
                }
                size="xs"
                sx={{ marginLeft: (theme) => theme.spacing(4) }}
                onClick={onRollover}
                id={gaButtonId}
              >
                Rollover
              </Button>
            )}
          </>
        )}

        {beforeMaturity === false && isSettled && (
          <Button variant={positionType === 1 ? 'darker-link' : 'darker'} size="xs" disabled>
            Settled
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default PositionTableHead;
