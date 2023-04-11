import { MarketToken, MarketTokenProps, Pill, PillProps } from 'brokoli-ui';
import React from 'react';

import { MarketTokenBox } from './MarketTokenInformation.styled';

export type MarketTokenInformationProps = {
  market: MarketTokenProps['market'];
  token: MarketTokenProps['token'];
  isBorrowing: boolean;
  isAaveV3: boolean;
  pillVariant: PillProps['variant'];
  colorToken: MarketTokenProps['colorToken'];
  iconSize: MarketTokenProps['iconSize'];
  typographyToken: MarketTokenProps['typographyToken'];
};

export const MarketTokenInformation: React.FunctionComponent<MarketTokenInformationProps> = ({
  market,
  token,
  isBorrowing,
  isAaveV3,
  typographyToken,
  colorToken,
  iconSize,
  pillVariant,
}) => {
  return (
    <MarketTokenBox data-testid="MarketTokenInformation-MarketTokenBox">
      <MarketToken
        colorToken={colorToken}
        data-testid="MarketTokenInformation-MarketToken"
        iconSize={iconSize}
        market={market}
        token={token}
        typographyToken={typographyToken}
      />
      {isBorrowing ? (
        <Pill
          colorToken="wildStrawberry"
          data-testid="MarketTokenInformation-PillBorrowing"
          typographyToken="primaryBodySmallRegular"
          variant={pillVariant}
        >
          Borrow
        </Pill>
      ) : null}
      {isAaveV3 ? (
        <Pill
          colorToken="wildStrawberry"
          data-testid="MarketTokenInformation-PillAaveV3"
          typographyToken="primaryBodySmallRegular"
          variant={pillVariant}
        >
          v3
        </Pill>
      ) : null}
    </MarketTokenBox>
  );
};
