import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import {
  selectAMMMaturityFormatted,
  selectAMMTokenFormatted,
  selectProspectiveLpMarginFormatted,
  selectProspectiveLpNotionalFormatted,
} from '../../../../../../app/features/lp-form';
import { useAppSelector } from '../../../../../../app/hooks';
import { DetailBox, DetailsBox } from './MintDetails.styled';

type LPDetailsProps = {};

export const LPDetails: React.FunctionComponent<LPDetailsProps> = () => {
  const prospectiveLpNotionalFormatted = useAppSelector(selectProspectiveLpNotionalFormatted);
  const prospectiveLpMarginFormatted = useAppSelector(selectProspectiveLpMarginFormatted);
  const aMMMaturity = useAppSelector(selectAMMMaturityFormatted);
  const token = useAppSelector(selectAMMTokenFormatted);

  return (
    <DetailsBox>
      <DetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Notional
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={token}
          typographyToken="secondaryBodySmallRegular"
          value={prospectiveLpNotionalFormatted}
        />
      </DetailBox>
      <DetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Margin
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={token}
          typographyToken="secondaryBodySmallRegular"
          value={prospectiveLpMarginFormatted}
        />
      </DetailBox>
      <DetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Maturity
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token=" "
          typographyToken="secondaryBodySmallRegular"
          value={aMMMaturity}
        />
      </DetailBox>
    </DetailsBox>
  );
};
