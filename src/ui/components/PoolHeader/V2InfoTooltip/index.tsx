import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { formCompactFormatToParts } from '../../../../app/features/forms/common/utils';
import { isTestnet } from '../../../../app/features/network';
import { RowBox, RowsBox } from '../../RealizedPNLDetails/RealizedPnLDetails.styled';
import { V2InfoTooltipBox } from './V2InfoTooltip.styled';

export const V2InfoTooltip: React.FunctionComponent<{
  poolCap: number;
  chainId: SupportedChainId;
}> = ({ poolCap, chainId }) => {
  const { compactNumber, compactSuffix } = formCompactFormatToParts(poolCap);

  return (
    <V2InfoTooltipBox>
      <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
        This pool is a new pool operating on Voltz Protocol v2. The v2 contracts haven’t been
        audited yet, so trading is only available in an Alpha State. This means there’s a cap on the
        margin that can be deployed into the pool.
      </Typography>
      <RowsBox>
        <RowBox>
          <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
            Contracts
          </Typography>
          <Typography colorToken="warning100" typographyToken="primaryBodySmallRegular">
            Unaudited
          </Typography>
        </RowBox>
        {isTestnet(chainId) ? null : (
          <RowBox>
            <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
              Pool cap
            </Typography>
            <TokenTypography
              colorToken="white"
              prefixToken="$"
              token={compactSuffix}
              typographyToken="primaryBodySmallRegular"
              value={compactNumber}
            />
          </RowBox>
        )}
      </RowsBox>
    </V2InfoTooltipBox>
  );
};
