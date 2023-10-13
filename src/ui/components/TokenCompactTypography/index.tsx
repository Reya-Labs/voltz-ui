import { Tokens } from '@voltz-protocol/api-sdk-v2';
import { TokenTypography, TokenTypographyProps } from 'brokoli-ui';
import React from 'react';

import { CompactFormatParts } from '../../../utilities/number';

type TokenCompactTypographyProps = {
  token: Tokens | '$';
  typographyToken: TokenTypographyProps['typographyToken'];
  colorToken: TokenTypographyProps['colorToken'];
  compactData: CompactFormatParts;
};
export const TokenCompactTypography = ({
  compactData,
  token,
  typographyToken,
  colorToken,
}: TokenCompactTypographyProps) => {
  if (token === '$') {
    return (
      <TokenTypography
        colorToken={colorToken}
        prefixToken="$"
        token={compactData.compactSuffix}
        typographyToken={typographyToken}
        value={compactData.compactNumber}
      />
    );
  }
  return (
    <TokenTypography
      colorToken={colorToken}
      token={`${compactData.compactSuffix} ${token.toUpperCase()}`}
      typographyToken={typographyToken}
      value={compactData.compactNumber}
    />
  );
};
