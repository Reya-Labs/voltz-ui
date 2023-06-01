import { LabelTokenTypography, LabelTokenTypographyProps } from 'brokoli-ui';
import React from 'react';

import { RealizedPNLDetails, RealizedPNLDetailsProps } from '../RealizedPNLDetails';

type PnLDetailsWithTooltipProps = {
  realizedPnLTotal: RealizedPNLDetailsProps['pnlTotal'];
  labelTypographyToken: LabelTokenTypographyProps['labelTypographyToken'];
  underlyingTokenName: RealizedPNLDetailsProps['underlyingTokenName'];
  variant: RealizedPNLDetailsProps['variant'];
  typographyToken: LabelTokenTypographyProps['typographyToken'];
  realizedPnLFromFees: RealizedPNLDetailsProps['pnlFromFees'];
  realizedPnLFromSwaps: RealizedPNLDetailsProps['pnlFromSwaps'];
};

export const PnLDetailsWithTooltip: React.FunctionComponent<PnLDetailsWithTooltipProps> = ({
  typographyToken,
  realizedPnLTotal,
  realizedPnLFromSwaps,
  realizedPnLFromFees,
  underlyingTokenName,
  labelTypographyToken,
  variant,
}) => {
  return (
    <LabelTokenTypography
      colorToken={
        realizedPnLTotal === '--'
          ? 'lavenderWeb'
          : realizedPnLTotal.indexOf('-') !== -1
          ? 'wildStrawberry'
          : 'skyBlueCrayola'
      }
      label="Realized PnL"
      labelColorToken="lavenderWeb3"
      labelTypographyToken={labelTypographyToken}
      token={` ${underlyingTokenName.toUpperCase()}`}
      tooltip={
        <RealizedPNLDetails
          pnlFromFees={realizedPnLFromFees}
          pnlFromSwaps={realizedPnLFromSwaps}
          pnlTotal={realizedPnLTotal}
          underlyingTokenName={underlyingTokenName}
          variant={variant}
        />
      }
      typographyToken={typographyToken}
      value={realizedPnLTotal}
    />
  );
};
