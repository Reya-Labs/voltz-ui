import { TokenTypography, Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionUI } from '../../../../../../../app/features/portfolio/types';

export type PositionUnrealizedPNLDetailsProps = {
  typographyToken: TypographyToken;
  status: PositionUI['status'];
  unrealizedPNLCompactFormat: PositionUI['unrealizedPNLCompactFormat'];
};
export const PositionUnrealizedPNLDetails: React.FunctionComponent<PositionUnrealizedPNLDetailsProps> =
  ({ typographyToken, status, unrealizedPNLCompactFormat }) => {
    if (status.variant === 'settled') {
      return (
        <Typography colorToken="lavenderWeb" typographyToken={typographyToken}>
          --
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
        typographyToken={typographyToken}
        value={unrealizedPNLCompactFormat.compactNumber.replace('-', '')}
      />
    );
  };
