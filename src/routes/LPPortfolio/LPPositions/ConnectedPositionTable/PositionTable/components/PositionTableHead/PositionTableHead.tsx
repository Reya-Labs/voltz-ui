import Box from '@mui/material/Box';
import { HealthFactorStatus } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { formFormatNumber } from '../../../../../../../app/features/forms/common/utils';
import { PositionBadge } from '../../../../../../../components/atomic/PositionBadge/PositionBadge';
import { IconLabel } from '../../../../../../../components/composite/IconLabel/IconLabel';
import { SystemStyleObject, Theme } from '../../../../../../../theme';
import { PnLDetails } from '../../../../../../../ui/pages/LPForm/Main/PositionDetails/PnLDetails';
import { formatNumber } from '../../../../../../../utilities/number';
import { HealthFactorText } from './HealthFactorText/HealthFactorText';
import {
  ActionsBox,
  FeesTypography,
  InfoBox,
  NegativeTypography,
  PNLNegativeTypography,
  PNLPositiveTypography,
  PositiveTypography,
  RolloverButton,
  SettleButton,
  SettledButton,
  WarningTypography,
} from './PositionTableHead.styled';

export type PositionTableHeadProps = {
  isSettled: boolean;
  onRollover: () => void;
  onSettle: () => void;
  rolloverAvailable: boolean;
  gaButtonId: string;
  beforeMaturity?: boolean;
  healthFactor: HealthFactorStatus;
  fixedRateHealthFactor: HealthFactorStatus;
  fixedApr: number;
  isBothTraderAndLP: boolean;
  settlementCashflowInUSD: number;
  underlyingTokenName: string;
  realizedPnLFromFees: number;
  realizedPnLFromSwaps: number;
};

const containerStyles: SystemStyleObject<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const PositionTableHead: React.FunctionComponent<PositionTableHeadProps> = ({
  isSettled,
  onRollover,
  onSettle,
  rolloverAvailable,
  gaButtonId,
  beforeMaturity,
  healthFactor,
  fixedRateHealthFactor,
  fixedApr,
  isBothTraderAndLP,
  settlementCashflowInUSD,
  underlyingTokenName,
  realizedPnLFromFees,
  realizedPnLFromSwaps,
}) => {
  const realizedPnLTotal = realizedPnLFromFees + realizedPnLFromSwaps;
  const PNLValueTypography = realizedPnLTotal ? PNLPositiveTypography : PNLNegativeTypography;

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
      </Box>

      <ActionsBox>
        {beforeMaturity && (
          <>
            <InfoBox>
              <IconLabel
                icon="information-circle"
                info={
                  <PnLDetails
                    pnlFromFees={formFormatNumber(realizedPnLFromFees)}
                    pnlFromSwaps={formFormatNumber(realizedPnLFromSwaps)}
                    pnlTotal={formFormatNumber(realizedPnLTotal)}
                    underlyingTokenName={underlyingTokenName}
                  />
                }
                label={
                  <React.Fragment>
                    REALIZED PnL:&nbsp;
                    <PNLValueTypography>
                      {formFormatNumber(realizedPnLTotal)} {underlyingTokenName}
                    </PNLValueTypography>
                  </React.Fragment>
                }
                noMinWidth={true}
              />
            </InfoBox>
          </>
        )}

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
