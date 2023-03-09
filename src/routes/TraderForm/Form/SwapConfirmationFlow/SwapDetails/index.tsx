import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import {
  selectAMMMaturityFormatted,
  selectAMMTokenFormatted,
  selectInfoPostSwap,
  selectProspectiveSwapMargin,
  selectProspectiveSwapMode,
  selectProspectiveSwapNotional,
  selectVariableRateInfo,
  SwapFormNumberLimits,
} from '../../../../../app/features/swap-form';
import { useAppSelector } from '../../../../../app/hooks';
import { compactFormat, formatNumber } from '../../../../../utilities/number';
import { SwapDetailBox, SwapDetailsBox } from './SwapDetails.styled';

type SwapDetailsProps = {};

export const SwapDetails: React.FunctionComponent<SwapDetailsProps> = () => {
  const infoPostSwap = useAppSelector(selectInfoPostSwap);
  const variableRateInfo = useAppSelector(selectVariableRateInfo);
  const mode = useAppSelector(selectProspectiveSwapMode);
  const prospectiveSwapNotional = useAppSelector(selectProspectiveSwapNotional);
  const prospectiveSwapMargin = useAppSelector(selectProspectiveSwapMargin);
  const fixedRate = formatNumber(infoPostSwap.value.averageFixedRate);
  const variableRate = formatNumber(variableRateInfo.value);

  const notional =
    prospectiveSwapNotional < 1
      ? compactFormat(prospectiveSwapNotional, 0, SwapFormNumberLimits.decimalLimit)
      : compactFormat(prospectiveSwapNotional);
  const margin =
    prospectiveSwapMargin < 1
      ? compactFormat(prospectiveSwapMargin, 0, SwapFormNumberLimits.decimalLimit)
      : compactFormat(prospectiveSwapMargin);
  const receivingRate = mode === 'fixed' ? fixedRate : variableRate;
  const payingRate = mode === 'fixed' ? variableRate : fixedRate;
  const aMMMaturity = useAppSelector(selectAMMMaturityFormatted);
  const token = useAppSelector(selectAMMTokenFormatted);

  return (
    <SwapDetailsBox>
      <SwapDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          {mode === 'fixed' ? 'Fixed' : 'Variable'} Rate Receiving
        </Typography>
        <TokenTypography
          colorToken={mode === 'fixed' ? 'skyBlueCrayola' : 'ultramarineBlue'}
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={receivingRate}
        />
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          {mode === 'fixed' ? 'Variable' : 'Fixed'} Rate Paying
        </Typography>
        <TokenTypography
          colorToken={mode === 'fixed' ? 'ultramarineBlue' : 'skyBlueCrayola'}
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={payingRate}
        />
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Notional
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={token}
          typographyToken="secondaryBodySmallRegular"
          value={notional}
        />
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Margin
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={token}
          typographyToken="secondaryBodySmallRegular"
          value={margin}
        />
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Maturity
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token=" "
          typographyToken="secondaryBodySmallRegular"
          value={aMMMaturity}
        />
      </SwapDetailBox>
    </SwapDetailsBox>
  );
};
