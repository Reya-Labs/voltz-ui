import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import {
  selectAMMMaturityFormatted,
  selectAMMTokenFormatted,
  selectInfoPostSwap,
  selectProspectiveSwapMarginFormatted,
  selectProspectiveSwapMode,
  selectProspectiveSwapNotionalFormatted,
  selectVariableRateInfo,
} from '../../../../../../app/features/forms/trader/rollover-swap';
import { useAppSelector } from '../../../../../../app/hooks';
import { formatNumber } from '../../../../../../utilities/number';
import { RolloverDetailBox, RolloverDetailsBox } from './RolloverDetails.styled';

export const RolloverDetails: React.FunctionComponent = () => {
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
    <RolloverDetailsBox>
      <RolloverDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          {mode === 'fixed' ? 'Fixed' : 'Variable'} Rate Receiving
        </Typography>
        <TokenTypography
          colorToken={mode === 'fixed' ? 'skyBlueCrayola' : 'ultramarineBlue'}
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={receivingRate}
        />
      </RolloverDetailBox>
      <RolloverDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          {mode === 'fixed' ? 'Variable' : 'Fixed'} Rate Paying
        </Typography>
        <TokenTypography
          colorToken={mode === 'fixed' ? 'ultramarineBlue' : 'skyBlueCrayola'}
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={payingRate}
        />
      </RolloverDetailBox>
      <RolloverDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Notional
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={token}
          typographyToken="secondaryBodySmallRegular"
          value={prospectiveSwapNotionalFormatted}
        />
      </RolloverDetailBox>
      <RolloverDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Margin
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={token}
          typographyToken="secondaryBodySmallRegular"
          value={prospectiveSwapMarginFormatted}
        />
      </RolloverDetailBox>
      <RolloverDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Maturity
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token=" "
          typographyToken="secondaryBodySmallRegular"
          value={aMMMaturity}
        />
      </RolloverDetailBox>
    </RolloverDetailsBox>
  );
};
