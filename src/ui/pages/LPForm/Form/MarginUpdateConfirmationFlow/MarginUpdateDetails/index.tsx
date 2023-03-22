import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import {
  selectAMMMaturityFormatted,
  selectAMMTokenFormatted,
  selectProspectiveLpMarginFormatted,
} from '../../../../../../app/features/lp-form';
import { useAppSelector } from '../../../../../../app/hooks';
import { MarginUpdateDetailBox, MarginUpdateDetailsBox } from './MarginUpdateDetails.styled';

type MarginUpdateDetailsProps = {};

export const MarginUpdateDetails: React.FunctionComponent<MarginUpdateDetailsProps> = () => {
  const prospectiveLpMarginFormFormatted = useAppSelector(selectProspectiveLpMarginFormatted);
  const aMMMaturity = useAppSelector(selectAMMMaturityFormatted);
  const token = useAppSelector(selectAMMTokenFormatted);

  return (
    <MarginUpdateDetailsBox>
      <MarginUpdateDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Margin
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={token}
          typographyToken="secondaryBodySmallRegular"
          value={prospectiveLpMarginFormFormatted}
        />
      </MarginUpdateDetailBox>
      <MarginUpdateDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
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
