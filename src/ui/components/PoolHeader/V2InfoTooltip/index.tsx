import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { formCompactFormatToParts } from '../../../../app/features/forms/common/utils';
import { RowBox, RowsBox } from '../../RealizedPNLDetails/RealizedPnLDetails.styled';
import { V2InfoTooltipBox } from './V2InfoTooltip.styled';

export const V2InfoTooltip: React.FunctionComponent<{
  poolCap: number;
}> = ({ poolCap }) => {
  const { compactNumber, compactSuffix } = formCompactFormatToParts(poolCap);

  return (
    <V2InfoTooltipBox>
      <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
        This pool is a new pool operating on Voltz v2. The v2 contracts haven’t been audited yet, so
        it is only tradable in an Alpha state where aggregate margin that can be deployed into the
        pool is capped.
      </Typography>
      <RowsBox>
        <RowBox>
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Contracts
          </Typography>
          <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
            Unaudited
          </Typography>
        </RowBox>
        <RowBox>
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Pool cap
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            prefixToken="Pool cap: $"
            token={compactSuffix}
            typographyToken="primaryBodySmallRegular"
            value={compactNumber}
          />
        </RowBox>
      </RowsBox>
    </V2InfoTooltipBox>
  );
};
