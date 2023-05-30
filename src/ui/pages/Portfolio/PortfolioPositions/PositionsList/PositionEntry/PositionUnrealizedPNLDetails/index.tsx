import { TokenTypography, Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionUI } from '../../../../../../../app/features/portfolio/types';

export type PositionUnrealizedPNLDetailsProps = {
  status: PositionUI['status'];
  textsTypographyToken: TypographyToken;
  numbersTypographyToken: TypographyToken;
  unrealizedPNLCompactFormat: PositionUI['unrealizedPNLCompactFormat'];
};
export const PositionUnrealizedPNLDetails: React.FunctionComponent<PositionUnrealizedPNLDetailsProps> =
  ({ numbersTypographyToken, textsTypographyToken, status, unrealizedPNLCompactFormat }) => {
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
          unrealizedPNLCompactFormat.compactNumber.indexOf('-') === -1
            ? 'skyBlueCrayola'
            : 'wildStrawberry'
        }
        prefixToken={unrealizedPNLCompactFormat.compactNumber.indexOf('-') === -1 ? '+$' : '-$'}
        token={unrealizedPNLCompactFormat.compactSuffix}
        typographyToken={numbersTypographyToken}
        value={unrealizedPNLCompactFormat.compactNumber.replace('-', '')}
      />
    );
  };
