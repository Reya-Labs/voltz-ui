import { MarketToken, MarketTokenProps } from 'brokoli-ui';
import React from 'react';

import { MarketTokenInformationCompactBox } from './MarketTokenInformationCompact.styled';

export type MarketTokenInformationCompactProps = {
  market: MarketTokenProps['market'];
  token: MarketTokenProps['token'];
};

export const MarketTokenInformationCompact: React.FunctionComponent<
  MarketTokenInformationCompactProps
> = ({ market, token }) => {
  return (
    <MarketTokenInformationCompactBox data-testid="MarketTokenInformationCompact-MarketTokenBox">
      <MarketToken
        colorToken="lavenderWeb"
        data-testid="MarketTokenInformationCompact-MarketToken"
        iconSize={0}
        market={market}
        token={token}
        typographyToken="primaryBodyMediumBold"
      />
    </MarketTokenInformationCompactBox>
  );
};
