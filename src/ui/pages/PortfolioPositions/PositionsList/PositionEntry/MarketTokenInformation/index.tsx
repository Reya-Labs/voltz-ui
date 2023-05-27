import { MarketToken, MarketTokenProps } from 'brokoli-ui';
import React from 'react';

import { MarketTokenBox } from './MarketTokenInformation.styled';

export type MarketTokenInformationProps = {
  market: MarketTokenProps['market'];
  token: MarketTokenProps['token'];
  isBorrowing: boolean;
  isAaveV3: boolean;
  type: 'LP' | 'Variable' | 'Fixed';
};

export const MarketTokenInformation: React.FunctionComponent<MarketTokenInformationProps> = ({
  market,
  token,
  isBorrowing,
  isAaveV3,
  type,
}) => {
  return (
    <MarketTokenBox data-testid="MarketTokenInformation-MarketTokenBox">
      <MarketToken
        colorToken="lavenderWeb"
        data-testid="MarketTokenInformation-MarketToken"
        iconSize={24}
        infoFormatter={({ market, token }) => (
          <React.Fragment>
            <b>{type}</b> - {market}
            {isAaveV3 ? ' v3' : ''}
            {token ? ` - ${token.toUpperCase()}` : ''}
            {isBorrowing ? ' Borrow' : ''}
          </React.Fragment>
        )}
        market={market}
        token={token}
        typographyToken="primaryBodyMediumRegular"
      />
    </MarketTokenBox>
  );
};
