import { TokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionUI } from '../../../../../../../app/features/portfolio/types';

type PositionMarginProps = {
  status: PositionUI['status'];
  typographyToken: TypographyToken;
  marginUSDCompactFormat: PositionUI['marginUSDCompactFormat'];
};

export const PositionMargin: React.FunctionComponent<PositionMarginProps> = ({
  marginUSDCompactFormat,
  status,
  typographyToken,
}) => {
  if (status.variant === 'matured' || status.variant === 'settled') {
    return null;
  }
  return (
    <TokenTypography
      colorToken="lavenderWeb"
      prefixToken="$"
      token={marginUSDCompactFormat.compactSuffix}
      typographyToken={typographyToken}
      value={marginUSDCompactFormat.compactNumber}
    />
  );
};
