import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import {
  selectInfoPostSwap,
  selectProspectiveSwapMode,
  selectProspectiveSwapNotional,
  selectSwapFormAMM,
  selectUserInputMarginInfo,
  selectVariableRateInfo,
} from '../../../../../app/features/swap-form';
import { useAppSelector } from '../../../../../app/hooks';
import { formatTimestamp } from '../../../../../utilities/date';
import { compactFormat, formatNumber } from '../../../../../utilities/number';
import { SwapDetailBox, SwapDetailsBox } from './SwapDetails.styled';

type SwapDetailsProps = {};

export const SwapDetails: React.FunctionComponent<SwapDetailsProps> = () => {
  const infoPostSwap = useAppSelector(selectInfoPostSwap);
  const variableRateInfo = useAppSelector(selectVariableRateInfo);
  const mode = useAppSelector(selectProspectiveSwapMode);
  const prospectiveSwapNotional = useAppSelector(selectProspectiveSwapNotional);
  const marginInfo = useAppSelector(selectUserInputMarginInfo);

  const aMM = useAppSelector(selectSwapFormAMM);
  const fixedRate = formatNumber(infoPostSwap.value.averageFixedRate);
  const variableRate = formatNumber(variableRateInfo.value);

  const receivingRate = mode === 'fixed' ? fixedRate : variableRate;
  const payingRate = mode === 'fixed' ? variableRate : fixedRate;

  if (!aMM || marginInfo.value === null) {
    return null;
  }

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
          token={` ${aMM.underlyingToken.name.toUpperCase()}`}
          typographyToken="secondaryBodySmallRegular"
          value={compactFormat(prospectiveSwapNotional)}
        />
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Margin
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={` ${aMM.underlyingToken.name.toUpperCase()}`}
          typographyToken="secondaryBodySmallRegular"
          value={compactFormat(marginInfo.value)}
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
          value={formatTimestamp(aMM.termEndTimestampInMS)}
        />
      </SwapDetailBox>
    </SwapDetailsBox>
  );
};
