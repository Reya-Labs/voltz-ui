import { MarketToken, MarketTokenProps, Pill } from 'brokoli-ui';
import React from 'react';

import { MarketTokenBox } from './MarketTokenInformation.styled';

export type MarketTokenInformationProps = {
  market: MarketTokenProps['market'];
  token: MarketTokenProps['token'];
  isBorrowing: boolean;
  isAaveV3: boolean;
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
          variant="regular"
        >
          Borrow
        </Pill>
      ) : null}
      {isAaveV3 ? (
        <Pill
          colorToken="wildStrawberry"
          data-testid="MarketTokenInformation-PillAaveV3"
          typographyToken="primaryBodySmallRegular"
          variant="regular"
        >
          v3
        </Pill>
      ) : null}
    </MarketTokenBox>
  );
};
