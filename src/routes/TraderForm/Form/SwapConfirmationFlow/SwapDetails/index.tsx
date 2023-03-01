import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { SwapDetailBox, SwapDetailsBox } from './SwapDetails.styled';

type SwapDetailsProps = {};

export const SwapDetails: React.FunctionComponent<SwapDetailsProps> = () => {
  // todo: Alex handle fill in proper values

  return (
    <SwapDetailsBox>
      <SwapDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Fixed Rate Receiving
        </Typography>
        <TokenTypography
          colorToken="skyBlueCrayola"
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={5.49}
        />
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Variable Rate Paying
        </Typography>
        <TokenTypography
          colorToken="ultramarineBlue"
          token="%"
          typographyToken="secondaryBodySmallRegular"
          value={2.49}
        />
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Notional
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token=" USDC"
          typographyToken="secondaryBodySmallRegular"
          value="100k"
        />
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Margin
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token=" USDC"
          typographyToken="secondaryBodySmallRegular"
          value="1k"
        />
      </SwapDetailBox>
      <SwapDetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Maturity
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token=" USDC"
          typographyToken="secondaryBodySmallRegular"
          value="03 May 2023"
        />
      </SwapDetailBox>
    </SwapDetailsBox>
  );
};
