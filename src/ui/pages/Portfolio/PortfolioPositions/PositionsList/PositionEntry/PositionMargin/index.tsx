import { TokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionUI } from '../../../../../../../app/features/portfolio/types';

type PositionMarginProps = {
  status: PositionUI['status'];
  typographyToken: TypographyToken;

  marginCompactFormat: PositionUI['marginCompactFormat'];
};

export const PositionMargin: React.FunctionComponent<PositionMarginProps> = ({
  marginCompactFormat,
  status,
  typographyToken,
}) => {
  if (status.variant === 'matured') {
    return null;
  }
  return (
    <TokenTypography
      colorToken="lavenderWeb"
      token={marginCompactFormat.compactSuffix}
      typographyToken={typographyToken}
      value={marginCompactFormat.compactNumber}
    />
  );
};
