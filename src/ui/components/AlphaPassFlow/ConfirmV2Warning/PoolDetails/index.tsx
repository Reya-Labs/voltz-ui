import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { formCompactFormatToParts } from '../../../../../app/features/forms/common/utils';
import { DetailBox, DetailsBox } from './PoolDetails.styled';

export const PoolDetails: React.FunctionComponent<{
  poolCap: number;
}> = ({ poolCap }) => {
  const { compactNumber, compactSuffix } = formCompactFormatToParts(poolCap);

  return (
    <DetailsBox>
      <DetailBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Contracts
        </Typography>
        <Typography colorToken="orangeYellow" typographyToken="primaryBodySmallRegular">
          Unaudited
        </Typography>
      </DetailBox>
      <DetailBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Pool cap
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          prefixToken="$"
          token={compactSuffix}
          typographyToken="primaryBodySmallRegular"
          value={compactNumber}
        />
      </DetailBox>
    </DetailsBox>
  );
};
