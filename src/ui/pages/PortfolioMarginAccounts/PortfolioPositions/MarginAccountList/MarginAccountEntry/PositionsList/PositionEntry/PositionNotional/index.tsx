import { TokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionUI } from '../../../../../../../../../app/features/portfolio/types';

type PositionNotionalProps = {
  status: PositionUI['status'];
  typographyToken: TypographyToken;
  notionalUSDCompactFormat: PositionUI['notionalUSDCompactFormat'];
};

export const PositionNotional: React.FunctionComponent<PositionNotionalProps> = ({
  notionalUSDCompactFormat,
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
      token={notionalUSDCompactFormat.compactSuffix}
      typographyToken={typographyToken}
      value={notionalUSDCompactFormat.compactNumber}
    />
  );
};
