import { LabelTokenTypography, LabelTokenTypographyProps } from 'brokoli-ui';
import React from 'react';

import { PnLDetails } from './PnLDetails';

type PnLDetailsWithTooltipProps = {
  realizedPnLTotal: string;
  labelTypographyToken: LabelTokenTypographyProps['labelTypographyToken'];
  underlyingTokenName: string;
  typographyToken: LabelTokenTypographyProps['typographyToken'];
  realizedPnLFromFees: string;
  realizedPnLFromSwaps: string;
};

export const PnLDetailsWithTooltip: React.FunctionComponent<PnLDetailsWithTooltipProps> = ({
  typographyToken,
  realizedPnLTotal,
  realizedPnLFromSwaps,
  realizedPnLFromFees,
  underlyingTokenName,
  labelTypographyToken,
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
          underlyingTokenName={underlyingTokenName}
        />
      }
      typographyToken={typographyToken}
      value={realizedPnLTotal}
    />
  );
};
