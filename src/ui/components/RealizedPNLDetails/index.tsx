import { HorizontalLine, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { RealizedPnLDetailsBox, RowBox, RowsBox } from './RealizedPnLDetails.styled';

export type RealizedPNLDetailsProps = {
  underlyingTokenName: string;
  pnlFromSwaps: string;
  pnlFromFees: string;
  pnlTotal: string;
  variant: 'lp' | 'trader';
  pnlFromFeesPrefixToken?: string;
  pnlFromSwapsPrefixToken?: string;
  pnlTotalPrefixToken?: string;
};

export const RealizedPNLDetails: React.FunctionComponent<RealizedPNLDetailsProps> = ({
  underlyingTokenName,
  pnlFromSwaps,
  pnlFromFees,
  pnlTotal,
  variant,
  pnlFromFeesPrefixToken,
  pnlFromSwapsPrefixToken,
  pnlTotalPrefixToken,
}) => {
  return (
    <RealizedPnLDetailsBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallBold">
        Realized PnL = Cashflow from Swaps {variant === 'lp' ? '+' : '-'} Fees
      </Typography>
      <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
        Profit or loss already captured from fee income as well as the position while it is locked
        into an active swap.
      </Typography>
      <RowsBox>
        <RowBox>
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Cashflow
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            prefixToken={pnlFromSwapsPrefixToken}
            token={underlyingTokenName ? ` ${underlyingTokenName.toUpperCase()}` : ''}
            typographyToken="primaryBodySmallRegular"
            value={pnlFromSwaps}
          />
        </RowBox>
        <RowBox>
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Fees
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            prefixToken={pnlFromFeesPrefixToken}
            token={underlyingTokenName ? ` ${underlyingTokenName.toUpperCase()}` : ''}
            typographyToken="primaryBodySmallRegular"
            value={pnlFromFees}
          />
        </RowBox>
        <HorizontalLine />
        <RowBox>
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Realized PnL
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            prefixToken={pnlTotalPrefixToken}
            token={underlyingTokenName ? ` ${underlyingTokenName.toUpperCase()}` : ''}
            typographyToken="primaryBodySmallRegular"
            value={pnlTotal}
          />
        </RowBox>
      </RowsBox>
    </RealizedPnLDetailsBox>
  );
};
