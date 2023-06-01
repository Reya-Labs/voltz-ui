import { TokenTypography, Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionUI } from '../../../../../../../app/features/portfolio/types';

export type PositionUnrealizedPNLDetailsProps = {
  status: PositionUI['status'];
  textsTypographyToken: TypographyToken;
  numbersTypographyToken: TypographyToken;
  unrealizedPNLUSDCompactFormat: PositionUI['unrealizedPNLUSDCompactFormat'];
};
export const PositionUnrealizedPNLDetails: React.FunctionComponent<PositionUnrealizedPNLDetailsProps> =
  ({ numbersTypographyToken, textsTypographyToken, status, unrealizedPNLUSDCompactFormat }) => {
    if (status.variant === 'matured') {
      return (
        <Typography colorToken="skyBlueCrayola" typographyToken={textsTypographyToken}>
          Matured
        </Typography>
      );
    }
    if (status.variant === 'settled') {
      return (
        <Typography colorToken="lavenderWeb" typographyToken={textsTypographyToken}>
          ---
        </Typography>
      );
    }
    return (
      <TokenTypography
        colorToken={
          unrealizedPNLUSDCompactFormat.compactNumber.indexOf('-') === -1
            ? 'skyBlueCrayola'
            : 'wildStrawberry'
        }
        prefixToken={unrealizedPNLUSDCompactFormat.compactNumber.indexOf('-') === -1 ? '+$' : '-$'}
        token={unrealizedPNLUSDCompactFormat.compactSuffix}
        typographyToken={numbersTypographyToken}
        value={unrealizedPNLUSDCompactFormat.compactNumber.replace('-', '')}
      />
    );
  };
