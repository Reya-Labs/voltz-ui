import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import {
  selectAMMMaturityFormatted,
  selectAMMTokenFormatted,
  selectProspectiveSwapMarginFormatted,
} from '../../../../../../app/features/forms/trader/swap';
import { useAppSelector } from '../../../../../../app/hooks';
import { MarginUpdateDetailBox, MarginUpdateDetailsBox } from './MarginUpdateDetails.styled';

type MarginUpdateDetailsProps = {};

export const MarginUpdateDetails: React.FunctionComponent<MarginUpdateDetailsProps> = () => {
  const prospectiveSwapMarginFormFormatted = useAppSelector(selectProspectiveSwapMarginFormatted);
  const aMMMaturity = useAppSelector(selectAMMMaturityFormatted);
  const token = useAppSelector(selectAMMTokenFormatted);

  return (
    <MarginUpdateDetailsBox>
      <MarginUpdateDetailBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Margin
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={token}
          typographyToken="secondaryBodySmallRegular"
          value={prospectiveSwapMarginFormFormatted}
        />
      </MarginUpdateDetailBox>
      <MarginUpdateDetailBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Maturity
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token=" "
          typographyToken="secondaryBodySmallRegular"
          value={aMMMaturity}
        />
      </MarginUpdateDetailBox>
    </MarginUpdateDetailsBox>
  );
};
