import { TokenTypography, Tooltip, Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionUI } from '../../../../../../../app/features/portfolio/types';
import { UnrealizedPNLDetails } from '../../../../../../components/UnrealizedPNLDetails';

export type PositionUnrealizedPNLDetailsProps = {
  numbersTypographyToken: TypographyToken;
  unrealizedPNLUSDCompactFormat: PositionUI['unrealizedPNLUSDCompactFormat'];
  type: PositionUI['type'];
};
export const PositionUnrealizedPNLDetails: React.FunctionComponent<PositionUnrealizedPNLDetailsProps> =
  ({ type, numbersTypographyToken, unrealizedPNLUSDCompactFormat }) => {
    if (type === 'LP') {
      return (
        <Typography colorToken="lavenderWeb" typographyToken={numbersTypographyToken}>
          --
        </Typography>
      );
    }

    return (
      <Tooltip
        trigger={
          <TokenTypography
            colorToken={
              unrealizedPNLUSDCompactFormat.compactNumber.indexOf('-') === -1
                ? 'skyBlueCrayola'
                : 'wildStrawberry'
            }
            prefixToken={
              unrealizedPNLUSDCompactFormat.compactNumber.indexOf('-') === -1 ? '+$' : '-$'
            }
            token={unrealizedPNLUSDCompactFormat.compactSuffix}
            typographyToken={numbersTypographyToken}
            value={unrealizedPNLUSDCompactFormat.compactNumber.replace('-', '')}
          />
        }
      >
        <UnrealizedPNLDetails />
      </Tooltip>
    );
  };
