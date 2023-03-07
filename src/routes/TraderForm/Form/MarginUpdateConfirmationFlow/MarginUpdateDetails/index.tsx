import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import {
  selectProspectiveSwapMargin,
  selectSwapFormAMM,
} from '../../../../../app/features/swap-form';
import { useAppSelector } from '../../../../../app/hooks';
import { formatTimestamp } from '../../../../../utilities/date';
import { compactFormat } from '../../../../../utilities/number';
import { MarginUpdateDetailBox, MarginUpdateDetailsBox } from './MarginUpdateDetails.styled';

type MarginUpdateDetailsProps = {};

export const MarginUpdateDetails: React.FunctionComponent<MarginUpdateDetailsProps> = () => {
  const prospectiveSwapMargin = useAppSelector(selectProspectiveSwapMargin);
  const aMM = useAppSelector(selectSwapFormAMM);

  if (!aMM) {
    return null;
  }

  return (
    <MarginUpdateDetailsBox>
      <MarginUpdateDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Margin
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={` ${aMM.underlyingToken.name.toUpperCase()}`}
          typographyToken="secondaryBodySmallRegular"
          value={compactFormat(prospectiveSwapMargin)}
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
          value={formatTimestamp(aMM.termEndTimestampInMS)}
        />
      </MarginUpdateDetailBox>
    </MarginUpdateDetailsBox>
  );
};
