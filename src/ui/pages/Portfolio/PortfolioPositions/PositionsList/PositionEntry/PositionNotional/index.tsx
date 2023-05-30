import { TokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionUI } from '../../../../../../../app/features/portfolio/types';

type PositionNotionalProps = {
  status: PositionUI['status'];
  typographyToken: TypographyToken;

  notionalCompactFormat: PositionUI['notionalCompactFormat'];
};

export const PositionNotional: React.FunctionComponent<PositionNotionalProps> = ({
  notionalCompactFormat,
  status,
  typographyToken,
}) => {
  if (status.variant === 'matured') {
    return null;
  }
  return (
    <TokenTypography
      colorToken="lavenderWeb"
      token={notionalCompactFormat.compactSuffix}
      typographyToken={typographyToken}
      value={notionalCompactFormat.compactNumber}
    />
  );
};
