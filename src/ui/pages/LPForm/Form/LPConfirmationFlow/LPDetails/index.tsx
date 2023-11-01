import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../../app';
import {
  selectAMMMaturityFormatted,
  selectAMMTokenFormatted,
  selectProspectiveLpMarginFormatted,
  selectProspectiveLpNotionalFormatted,
  selectUserInputFixedLower,
  selectUserInputFixedUpper,
} from '../../../../../../app/features/forms/lps/lp';
import { DetailBox, DetailsBox } from './LPDetails.styled';

type LPDetailsProps = {};

export const LPDetails: React.FunctionComponent<LPDetailsProps> = () => {
  const prospectiveLpNotionalFormatted = useAppSelector(selectProspectiveLpNotionalFormatted);
  const prospectiveLpMarginFormatted = useAppSelector(selectProspectiveLpMarginFormatted);
  const aMMMaturity = useAppSelector(selectAMMMaturityFormatted);
  const token = useAppSelector(selectAMMTokenFormatted);
  const fixedLower = useAppSelector(selectUserInputFixedLower);
  const fixedUpper = useAppSelector(selectUserInputFixedUpper);

  return (
    <DetailsBox>
      <DetailBox>
        <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
          Fixed Rate Low
        </Typography>
        <TokenTypography
          colorToken="white"
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={fixedLower}
        />
      </DetailBox>
      <DetailBox>
        <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
          Fixed Rate High
        </Typography>
        <TokenTypography
          colorToken="white"
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={fixedUpper}
        />
      </DetailBox>
      <DetailBox>
        <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
          Notional
        </Typography>
        <TokenTypography
          colorToken="white"
          token={token}
          typographyToken="secondaryBodySmallRegular"
          value={prospectiveLpNotionalFormatted}
        />
      </DetailBox>
      <DetailBox>
        <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
          Margin
        </Typography>
        <TokenTypography
          colorToken="white"
          token={token}
          typographyToken="secondaryBodySmallRegular"
          value={prospectiveLpMarginFormatted}
        />
      </DetailBox>
      <DetailBox>
        <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
          Maturity
        </Typography>
        <TokenTypography
          colorToken="white"
          token=" "
          typographyToken="secondaryBodySmallRegular"
          value={aMMMaturity}
        />
      </DetailBox>
    </DetailsBox>
  );
};
