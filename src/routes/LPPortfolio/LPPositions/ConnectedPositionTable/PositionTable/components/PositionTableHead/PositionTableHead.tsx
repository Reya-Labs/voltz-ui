import Box from '@mui/material/Box';
import isUndefined from 'lodash.isundefined';
import React from 'react';

import { PositionBadge } from '../../../../../../../components/atomic/PositionBadge/PositionBadge';
import { BulletLabel } from '../../../../../../../components/composite/BulletLabel/BulletLabel';
import {
  getHealthTextColor,
  HealthFactorText,
} from '../../../../../../../components/composite/HealthFactorText/HealthFactorText';
import { SystemStyleObject, Theme } from '../../../../../../../theme';
import { formatCurrency, formatNumber } from '../../../../../../../utilities/number';
import { ReactComponent as EditIcon } from './editPosition.svg';
import {
  ActionsBox,
  CurrentFixedRateBox,
  EditButton,
  FeesBox,
  FeesTypography,
  NegativeCurrentFixedRateTypography,
  NegativeFeesValueTypography,
  PositiveCurrentFixedRateTypography,
  PositiveFeesValueTypography,
  RolloverButton,
  SettleButton,
  SettledButton,
  WarningCurrentFixedRateTypography,
} from './PositionTableHead.styled';

export type PositionTableHeadProps = {
  currencyCode: string;
  currencySymbol: string;
  feesPositive: boolean;
  isSettled: boolean;
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
};

export const PositionTableHead: React.FunctionComponent<PositionTableHeadProps> = ({
  currencyCode = '',
  currencySymbol = '',
  feesPositive = true,
  isSettled,
  onRollover,
  onSettle,
  rolloverAvailable,
  gaButtonId,
  onSelect,
  beforeMaturity,
  healthFactor,
  fixedRateHealthFactor,
  fixedApr,
  fees,
}) => {
  const handleEditNotional = () => {
    onSelect && onSelect('notional');
  };
  const FeesValueTypography = feesPositive
    ? PositiveFeesValueTypography
    : NegativeFeesValueTypography;

  const CurrentFixedRateTypography =
    fixedRateHealthFactor === 1
      ? NegativeCurrentFixedRateTypography
      : fixedRateHealthFactor === 2
      ? WarningCurrentFixedRateTypography
      : PositiveCurrentFixedRateTypography;
  return (
    <Box sx={containerStyles}>
      <Box sx={{ display: 'flex' }}>
        <PositionBadge variant="LP" />
        {!isUndefined(fees) && (
          <FeesBox>
            <FeesTypography>FEES:&nbsp;</FeesTypography>
            <FeesValueTypography>
              {!feesPositive && '-'}
              {currencySymbol}
              {formatCurrency(Math.abs(fees))} {currencyCode}
            </FeesValueTypography>
          </FeesBox>
        )}
      </Box>

      <ActionsBox>
        {beforeMaturity && !isUndefined(fixedApr) && !isUndefined(healthFactor) && (
          <CurrentFixedRateBox>
            CURRENT FIXED:&nbsp;
            <CurrentFixedRateTypography>{formatNumber(fixedApr)}%</CurrentFixedRateTypography>
          </CurrentFixedRateBox>
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
              <EditButton id={gaButtonId} onClick={handleEditNotional}>
                Edit&nbsp;
                <EditIcon />
              </EditButton>
            )}
          </Box>
        )}

        {beforeMaturity === false && !isSettled && (
          <>
            <SettleButton id={gaButtonId} onClick={onSettle}>
              Settle
            </SettleButton>
            {rolloverAvailable && (
              <RolloverButton id={gaButtonId} onClick={onRollover}>
                Rollover
              </RolloverButton>
            )}
          </>
        )}

        {beforeMaturity === false && isSettled && (
          <SettledButton disabled={true}>Settled</SettledButton>
        )}
      </ActionsBox>
    </Box>
  );
};
