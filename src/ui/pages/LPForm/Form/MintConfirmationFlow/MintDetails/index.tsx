import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import {
  selectAMMMaturityFormatted,
  selectAMMTokenFormatted,
  selectInfoPostLp,
  selectProspectiveLpMarginFormatted,
  selectProspectiveLpNotionalFormatted,
} from '../../../../../../app/features/lp-form';
import { useAppSelector } from '../../../../../../app/hooks';
import { formatNumber } from '../../../../../../utilities/number';
import { MintDetailBox, MintDetailsBox } from './MintDetails.styled';

type MintDetailsProps = {};

export const MintDetails: React.FunctionComponent<MintDetailsProps> = () => {
  // todo: check if need this
  const infoPostLp = useAppSelector(selectInfoPostLp);
  const prospectiveLpNotionalFormatted = useAppSelector(selectProspectiveLpNotionalFormatted);
  const prospectiveLpMarginFormatted = useAppSelector(selectProspectiveLpMarginFormatted);
  const aMMMaturity = useAppSelector(selectAMMMaturityFormatted);
  const token = useAppSelector(selectAMMTokenFormatted);

  return (
    <MintDetailsBox>
      <MintDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Notional
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={token}
          typographyToken="secondaryBodySmallRegular"
          value={prospectiveLpNotionalFormatted}
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
          value={prospectiveLpMarginFormatted}
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
