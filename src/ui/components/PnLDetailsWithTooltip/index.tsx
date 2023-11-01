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
          ? 'white'
          : realizedPnLTotal.indexOf('-') !== -1
          ? 'error'
          : 'primary'
      }
      label="Realized PnL"
      labelColorToken="white400"
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
