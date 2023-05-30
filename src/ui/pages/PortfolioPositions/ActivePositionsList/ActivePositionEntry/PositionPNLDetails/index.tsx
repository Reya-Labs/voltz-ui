import { TokenTypography, Tooltip, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { formFormatNumber } from '../../../../../../app/features/forms/common/utils';
import { PositionUI } from '../../../../../../app/features/portfolio/types';
import { PnLDetails } from '../../../../../components/PnLDetails';

export type PositionPNLDetailsProps = {
  typographyToken: TypographyToken;
  type: PositionUI['type'];
  realizedPNLTotal: PositionUI['realizedPNLTotal'];
  realizedPNLFees: PositionUI['realizedPNLFees'];
  realizedPNLCashflow: PositionUI['realizedPNLCashflow'];
  realizedPNLTotalCompactFormat: PositionUI['realizedPNLTotalCompactFormat'];
};
export const PositionPNLDetails: React.FunctionComponent<PositionPNLDetailsProps> = ({
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
        pnlFromFees={formFormatNumber(realizedPNLFees)}
        pnlFromSwaps={formFormatNumber(realizedPNLCashflow)}
        pnlTotal={formFormatNumber(realizedPNLTotal)}
        underlyingTokenName={''}
        variant={type === 'LP' ? 'lp' : 'trader'}
      />
    </Tooltip>
  );
};
