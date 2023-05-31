import { TokenTypography, Tooltip, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { formFormatNumber } from '../../../../../../../app/features/forms/common/utils';
import { PositionUI } from '../../../../../../../app/features/portfolio/types';
import { PnLDetails } from '../../../../../../components/PnLDetails';

export type PositionPNLDetailsProps = {
  typographyToken: TypographyToken;
  type: PositionUI['type'];
  realizedPNLTotal: PositionUI['realizedPNLTotal'];
  realizedPNLFees: PositionUI['realizedPNLFees'];
  realizedPNLCashflow: PositionUI['realizedPNLCashflow'];
  realizedPNLTotalCompactFormat: PositionUI['realizedPNLTotalCompactFormat'];
};
export const PositionRealizedPNLDetails: React.FunctionComponent<PositionPNLDetailsProps> = ({
  typographyToken,
  type,
  realizedPNLFees,
  realizedPNLCashflow,
  realizedPNLTotalCompactFormat,
  realizedPNLTotal,
}) => {
  return (
    <Tooltip
      trigger={
        <TokenTypography
          colorToken={
            realizedPNLTotalCompactFormat.compactNumber.indexOf('-') === -1
              ? 'skyBlueCrayola'
              : 'wildStrawberry'
          }
          prefixToken={
            realizedPNLTotalCompactFormat.compactNumber.indexOf('-') === -1 ? '+$' : '-$'
          }
          token={realizedPNLTotalCompactFormat.compactSuffix}
          typographyToken={typographyToken}
          value={realizedPNLTotalCompactFormat.compactNumber.replace('-', '')}
        />
      }
    >
      <PnLDetails
        pnlFromFees={formFormatNumber(Math.abs(realizedPNLFees))}
        pnlFromFeesPrefixToken={realizedPNLFees >= 0 ? '+$' : '-$'}
        pnlFromSwaps={formFormatNumber(Math.abs(realizedPNLCashflow))}
        pnlFromSwapsPrefixToken={realizedPNLCashflow >= 0 ? '+$' : '-$'}
        pnlTotal={formFormatNumber(Math.abs(realizedPNLTotal))}
        pnlTotalPrefixToken={realizedPNLTotal >= 0 ? '+$' : '-$'}
        underlyingTokenName={''}
        variant={type === 'LP' ? 'lp' : 'trader'}
      />
    </Tooltip>
  );
};
