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
} from '../../../../../../app/features/swap-form';
import { useAppSelector } from '../../../../../../app/hooks';
import { formatNumber } from '../../../../../../utilities/number';
import { MintDetailBox, MintDetailsBox } from './MintDetails.styled';

type MintDetailsProps = {};

export const MintDetails: React.FunctionComponent<MintDetailsProps> = () => {
  const infoPostSwap = useAppSelector(selectInfoPostSwap);
  const variableRateInfo = useAppSelector(selectVariableRateInfo);
  const mode = useAppSelector(selectProspectiveSwapMode);
  const prospectiveSwapNotionalFormatted = useAppSelector(selectProspectiveSwapNotionalFormatted);
  const prospectiveSwapMarginFormatted = useAppSelector(selectProspectiveSwapMarginFormatted);
  const fixedRate = formatNumber(infoPostSwap.value.averageFixedRate);
  const variableRate = formatNumber(variableRateInfo.value);

  const receivingRate = mode === 'fixed' ? fixedRate : variableRate;
  const payingRate = mode === 'fixed' ? variableRate : fixedRate;
  const aMMMaturity = useAppSelector(selectAMMMaturityFormatted);
  const token = useAppSelector(selectAMMTokenFormatted);

  return (
    <MintDetailsBox>
      <MintDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          {mode === 'fixed' ? 'Fixed' : 'Variable'} Rate Receiving
        </Typography>
        <TokenTypography
          colorToken={mode === 'fixed' ? 'skyBlueCrayola' : 'ultramarineBlue'}
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={receivingRate}
        />
      </MintDetailBox>
      <MintDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          {mode === 'fixed' ? 'Variable' : 'Fixed'} Rate Paying
        </Typography>
        <TokenTypography
          colorToken={mode === 'fixed' ? 'ultramarineBlue' : 'skyBlueCrayola'}
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={payingRate}
        />
      </MintDetailBox>
      <MintDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Notional
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={token}
          typographyToken="secondaryBodySmallRegular"
          value={prospectiveSwapNotionalFormatted}
        />
      </MintDetailBox>
      <MintDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Margin
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={token}
          typographyToken="secondaryBodySmallRegular"
          value={prospectiveSwapMarginFormatted}
        />
      </MintDetailBox>
      <MintDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Maturity
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token=" "
          typographyToken="secondaryBodySmallRegular"
          value={aMMMaturity}
        />
      </MintDetailBox>
    </MintDetailsBox>
  );
};
