import Box from '@mui/material/Box';
import isUndefined from 'lodash.isundefined';
import React from 'react';

import { PositionBadge } from '../../../../../../../components/atomic/PositionBadge/PositionBadge';
import { SystemStyleObject, Theme } from '../../../../../../../theme';
import { formatCurrency, formatNumber } from '../../../../../../../utilities/number';
import { HealthFactorText } from './HealthFactorText/HealthFactorText';
import {
  ActionsBox,
  FeesBox,
  FeesTypography,
  InfoBox,
  NegativeFeesValueTypography,
  NegativeTypography,
  PositiveFeesValueTypography,
  PositiveTypography,
  RolloverButton,
  SettleButton,
  SettledButton,
  WarningTypography,
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
  beforeMaturity,
  healthFactor,
  fixedRateHealthFactor,
  fixedApr,
  fees,
}) => {
  const FeesValueTypography = feesPositive
    ? PositiveFeesValueTypography
    : NegativeFeesValueTypography;

  const CurrentFixedRateTypography =
    fixedRateHealthFactor === 1
      ? NegativeTypography
      : fixedRateHealthFactor === 2
      ? WarningTypography
      : PositiveTypography;

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
        {beforeMaturity && !isUndefined(fixedApr) && (
          <InfoBox>
            CURRENT FIXED:&nbsp;
            <CurrentFixedRateTypography>{formatNumber(fixedApr)}%</CurrentFixedRateTypography>
          </InfoBox>
        )}

        {beforeMaturity && !isUndefined(healthFactor) && (
          <HealthFactorText healthFactor={healthFactor} />
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
