import { LabelTokenTypography, LabelTokenTypographyProps } from 'brokoli-ui';
import React from 'react';

import { PnLDetails, PnLDetailsProps } from '../PnLDetails';

type PnLDetailsWithTooltipProps = {
  realizedPnLTotal: PnLDetailsProps['pnlTotal'];
  labelTypographyToken: LabelTokenTypographyProps['labelTypographyToken'];
  underlyingTokenName: PnLDetailsProps['underlyingTokenName'];
  variant: PnLDetailsProps['variant'];
  typographyToken: LabelTokenTypographyProps['typographyToken'];
  realizedPnLFromFees: PnLDetailsProps['pnlFromFees'];
  realizedPnLFromSwaps: PnLDetailsProps['pnlFromSwaps'];
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
        <PnLDetails
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
