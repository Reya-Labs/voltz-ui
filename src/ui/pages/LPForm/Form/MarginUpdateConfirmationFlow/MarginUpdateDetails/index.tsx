import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import {
  selectAMMMaturityFormatted,
  selectAMMTokenFormatted,
  selectProspectiveLpMarginFormatted,
  selectUserInputFixedLower,
  selectUserInputFixedUpper,
} from '../../../../../../app/features/lp-form';
import { useAppSelector } from '../../../../../../app/hooks';
import { MarginUpdateDetailBox, MarginUpdateDetailsBox } from './MarginUpdateDetails.styled';

type MarginUpdateDetailsProps = {};

export const MarginUpdateDetails: React.FunctionComponent<MarginUpdateDetailsProps> = () => {
  const prospectiveLpMarginFormFormatted = useAppSelector(selectProspectiveLpMarginFormatted);
  const aMMMaturity = useAppSelector(selectAMMMaturityFormatted);
  const token = useAppSelector(selectAMMTokenFormatted);
  const fixedLower = useAppSelector(selectUserInputFixedLower);
  const fixedUpper = useAppSelector(selectUserInputFixedUpper);

  return (
    <MarginUpdateDetailsBox>
      <MarginUpdateDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Fixed Low
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={fixedLower}
        />
      </MarginUpdateDetailBox>
      <MarginUpdateDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Fixed High
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={fixedUpper}
        />
      </MarginUpdateDetailBox>
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
