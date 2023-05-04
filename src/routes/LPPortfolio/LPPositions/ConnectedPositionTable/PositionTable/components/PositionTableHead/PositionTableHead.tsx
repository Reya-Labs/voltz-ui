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
  realizedPnLFromFeesInUSD: number;
  realizedPnLFromSwapsInUSD: number;
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
  realizedPnLFromFeesInUSD,
  realizedPnLFromSwapsInUSD,
}) => {
  const realizedPnLTotalInUSD = realizedPnLFromFeesInUSD + realizedPnLFromSwapsInUSD;
  const PNLValueTypography =
    realizedPnLTotalInUSD > 0 ? PNLPositiveTypography : PNLNegativeTypography;

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
                    pnlFromFees={formFormatNumber(realizedPnLFromFeesInUSD)}
                    pnlFromSwaps={formFormatNumber(realizedPnLFromSwapsInUSD)}
                    pnlTotal={formFormatNumber(realizedPnLTotalInUSD)}
                    underlyingTokenName={underlyingTokenName}
                  />
                }
                label={
                  <React.Fragment>
                    REALIZED PnL:&nbsp;
                    <PNLValueTypography>
                      {formFormatNumber(realizedPnLTotalInUSD)} {underlyingTokenName}
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
