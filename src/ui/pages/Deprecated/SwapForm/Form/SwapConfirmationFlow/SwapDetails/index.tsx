import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../../../app';
import {
  selectAMMMaturityFormatted,
  selectAMMTokenFormatted,
  selectInfoPostSwap,
  selectProspectiveSwapMarginFormatted,
  selectProspectiveSwapMode,
  selectProspectiveSwapNotionalFormatted,
  selectVariableRateInfo,
} from '../../../../../../../app/features/forms/trader/deprecated/swap';
import { formatNumber } from '../../../../../../../utilities/number';
import { SwapDetailBox, SwapDetailsBox } from './SwapDetails.styled';

type SwapDetailsProps = {};

export const SwapDetails: React.FunctionComponent<SwapDetailsProps> = () => {
  const infoPostSwap = useAppSelector(selectInfoPostSwap);
  const variableRateInfo = useAppSelector(selectVariableRateInfo);
  const mode = useAppSelector(selectProspectiveSwapMode);
  const prospectiveSwapNotionalFormatted = useAppSelector(selectProspectiveSwapNotionalFormatted);
  const prospectiveSwapMarginFormatted = useAppSelector(selectProspectiveSwapMarginFormatted);
  const fixedRate = formatNumber(infoPostSwap.value.averageFixedRate);
  const variableRate = formatNumber(variableRateInfo || 0);

  const receivingRate = mode === 'fixed' ? fixedRate : variableRate;
  const payingRate = mode === 'fixed' ? variableRate : fixedRate;
  const aMMMaturity = useAppSelector(selectAMMMaturityFormatted);
  const token = useAppSelector(selectAMMTokenFormatted);

  return (
    <SwapDetailsBox>
      <SwapDetailBox>
        <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
          {mode === 'fixed' ? 'Fixed' : 'Variable'} Rate Receiving
        </Typography>
        <TokenTypography
          colorToken={mode === 'fixed' ? 'primary' : 'secondary'}
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={receivingRate}
        />
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
          {mode === 'fixed' ? 'Variable' : 'Fixed'} Rate Paying
        </Typography>
        <TokenTypography
          colorToken={mode === 'fixed' ? 'secondary' : 'primary'}
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={payingRate}
        />
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
          Notional
        </Typography>
        <TokenTypography
          colorToken="white"
          token={token}
          typographyToken="secondaryBodySmallRegular"
          value={prospectiveSwapNotionalFormatted}
        />
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
          Margin
        </Typography>
        <TokenTypography
          colorToken="white"
          token={token}
          typographyToken="secondaryBodySmallRegular"
          value={prospectiveSwapMarginFormatted}
        />
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
          Maturity
        </Typography>
        <TokenTypography
          colorToken="white"
          token=" "
          typographyToken="secondaryBodySmallRegular"
          value={aMMMaturity}
        />
      </SwapDetailBox>
    </SwapDetailsBox>
  );
};
