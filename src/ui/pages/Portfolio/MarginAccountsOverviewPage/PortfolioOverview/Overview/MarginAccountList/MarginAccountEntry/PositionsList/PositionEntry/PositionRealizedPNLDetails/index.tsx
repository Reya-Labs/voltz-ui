import { TokenTypography, Tooltip, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { formFormatNumber } from '../../../../../../../../../../../app/features/forms/common';
import { PositionUI } from '../../../../../../../../../../../app/features/portfolio/types';
import { RealizedPNLDetails } from '../../../../../../../../../../components/RealizedPNLDetails';

export type PositionPNLDetailsProps = {
  typographyToken: TypographyToken;
  type: PositionUI['type'];
  realizedPNLTotalUSD: PositionUI['realizedPNLTotalUSD'];
  realizedPNLFeesUSD: PositionUI['realizedPNLFeesUSD'];
  realizedPNLCashflowUSD: PositionUI['realizedPNLCashflowUSD'];
  realizedPNLTotalUSDCompactFormat: PositionUI['realizedPNLTotalUSDCompactFormat'];
};
export const PositionRealizedPNLDetails: React.FunctionComponent<PositionPNLDetailsProps> = ({
  typographyToken,
  type,
  realizedPNLFeesUSD,
  realizedPNLCashflowUSD,
  realizedPNLTotalUSDCompactFormat,
  realizedPNLTotalUSD,
}) => {
  return (
    <Tooltip
      trigger={
        <TokenTypography
          colorToken={
            realizedPNLTotalUSDCompactFormat.compactNumber.indexOf('-') === -1 ? 'primary' : 'error'
          }
          prefixToken={
            realizedPNLTotalUSDCompactFormat.compactNumber.indexOf('-') === -1 ? '+$' : '-$'
          }
          token={realizedPNLTotalUSDCompactFormat.compactSuffix}
          typographyToken={typographyToken}
          value={realizedPNLTotalUSDCompactFormat.compactNumber.replace('-', '')}
        />
      }
    >
      <RealizedPNLDetails
        pnlFromFees={formFormatNumber(Math.abs(realizedPNLFeesUSD))}
        pnlFromFeesPrefixToken={realizedPNLFeesUSD >= 0 ? '+$' : '-$'}
        pnlFromSwaps={formFormatNumber(Math.abs(realizedPNLCashflowUSD))}
        pnlFromSwapsPrefixToken={realizedPNLCashflowUSD >= 0 ? '+$' : '-$'}
        pnlTotal={formFormatNumber(Math.abs(realizedPNLTotalUSD))}
        pnlTotalPrefixToken={realizedPNLTotalUSD >= 0 ? '+$' : '-$'}
        underlyingTokenName={''}
        variant={type === 'LP' ? 'lp' : 'trader'}
      />
    </Tooltip>
  );
};
