import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { formCompactFormatToParts } from '../../../app/features/forms/common';
import { isTestnet } from '../../../app/features/network';
import { V2BorderDetailBox, V2Box, V2DetailBox } from './V2EntryInformation.styled';

export const V2EntryInformation: React.FunctionComponent<{
  poolCap: number;
  chainId: SupportedChainId;
}> = ({ poolCap, chainId }) => {
  const { compactNumber, compactSuffix } = formCompactFormatToParts(poolCap);
  return (
    <V2Box>
      <V2BorderDetailBox>
        <Typography colorToken="rainbow" typographyToken="primaryBodyXSmallRegular">
          Voltz Protocol v2 Alpha Launch
        </Typography>
      </V2BorderDetailBox>
      {isTestnet(chainId) ? null : (
        <V2BorderDetailBox>
          <TokenTypography
            colorToken="white"
            prefixToken="Pool cap: $"
            token={compactSuffix}
            typographyToken="primaryBodyXSmallRegular"
            value={compactNumber}
          />
        </V2BorderDetailBox>
      )}
      <V2DetailBox>
        <Typography colorToken="white400" typographyToken="primaryBodyXSmallRegular">
          Unaudited Contracts
        </Typography>
      </V2DetailBox>
    </V2Box>
  );
};
