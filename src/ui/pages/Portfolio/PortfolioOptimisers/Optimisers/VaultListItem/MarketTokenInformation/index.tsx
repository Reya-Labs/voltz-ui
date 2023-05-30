import { MarketToken, MarketTokenProps } from 'brokoli-ui';
import React from 'react';

import { MarketTokenBox } from './MarketTokenInformation.styled';

export type MarketTokenInformationProps = {
  market: MarketTokenProps['market'];
  token?: MarketTokenProps['token'];
};

export const MarketTokenInformation: React.FunctionComponent<MarketTokenInformationProps> = ({
  market,
  token,
}) => {
  return (
    <MarketTokenBox data-testid="MarketTokenInformation-MarketTokenBox">
      <MarketToken
        colorToken="lavenderWeb"
        data-testid="MarketTokenInformation-MarketToken"
        iconSize={24}
        infoFormatter={() => (
          <React.Fragment>
            <b>LP Mellow {market}</b>
          </React.Fragment>
        )}
        market={market}
        token={token}
        typographyToken="primaryBodyMediumRegular"
      />
    </MarketTokenBox>
  );
};
