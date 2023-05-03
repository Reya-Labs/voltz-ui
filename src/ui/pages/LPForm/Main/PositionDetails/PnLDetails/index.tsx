import { HorizontalLine, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { PnLDetailsBox, RowBox, RowsBox } from './PnLDetails.styled';

type PnLDetailsProps = {
  underlyingTokenName: string;
  pnlFromSwaps: string;
  pnlFromFees: string;
  pnlTotal: string;
};

export const PnLDetails: React.FunctionComponent<PnLDetailsProps> = ({
  underlyingTokenName,
  pnlFromSwaps,
  pnlFromFees,
  pnlTotal,
}) => {
  return (
    <PnLDetailsBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
        Realized PnL = Cashflow from Swaps + Fees
      </Typography>
      <RowsBox>
        <RowBox>
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Cashflow
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            token={` ${underlyingTokenName.toUpperCase()}`}
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
            token={` ${underlyingTokenName.toUpperCase()}`}
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
            token={` ${underlyingTokenName.toUpperCase()}`}
            typographyToken="primaryBodySmallRegular"
            value={pnlTotal}
          />
        </RowBox>
      </RowsBox>
    </PnLDetailsBox>
  );
};
