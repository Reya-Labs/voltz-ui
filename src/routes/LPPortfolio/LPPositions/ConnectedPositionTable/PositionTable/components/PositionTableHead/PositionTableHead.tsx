import Box from '@mui/material/Box';
import { HealthFactorStatus } from '@voltz-protocol/v1-sdk';
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
  healthFactor: HealthFactorStatus;
  fixedRateHealthFactor: HealthFactorStatus;
  fixedApr: number;
  fees: number;
  isBothTraderAndLP: boolean;
  settlementCashflowInUSD: number;
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
  isBothTraderAndLP,
  settlementCashflowInUSD,
}) => {
  const FeesValueTypography = feesPositive
    ? PositiveFeesValueTypography
    : NegativeFeesValueTypography;

  const CurrentFixedRateTypography =
    fixedRateHealthFactor === HealthFactorStatus.DANGER
      ? NegativeTypography
      : fixedRateHealthFactor === HealthFactorStatus.WARNING
      ? WarningTypography
      : PositiveTypography;

  return (
    <Box sx={containerStyles}>
      <Box sx={{ display: 'flex' }}>
        <PositionBadge isBothTraderAndLP={isBothTraderAndLP} variant="LP" />
        {!isSettled && (
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
        {beforeMaturity && (
          <InfoBox>
            CURRENT FIXED:&nbsp;
            <CurrentFixedRateTypography>{formatNumber(fixedApr)}%</CurrentFixedRateTypography>
          </InfoBox>
        )}

        {beforeMaturity && <HealthFactorText healthFactor={healthFactor} />}

        {beforeMaturity === false && !isSettled && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FeesTypography>
                SETTLEMENT CASHFLOW: {formatNumber(settlementCashflowInUSD)} USD&nbsp;
              </FeesTypography>
            </Box>
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
