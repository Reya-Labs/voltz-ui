import { TokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionUI } from '../../../../../../../../../../../app/features/portfolio/types';

type PositionMarginProps = {
  typographyToken: TypographyToken;
  marginUSDCompactFormat: PositionUI['marginUSDCompactFormat'];
};

export const PositionMargin: React.FunctionComponent<PositionMarginProps> = ({
  marginUSDCompactFormat,
  typographyToken,
}) => {
  return (
    <TokenTypography
      colorToken="white"
      prefixToken="$"
      token={marginUSDCompactFormat.compactSuffix}
      typographyToken={typographyToken}
      value={marginUSDCompactFormat.compactNumber}
    />
  );
};
