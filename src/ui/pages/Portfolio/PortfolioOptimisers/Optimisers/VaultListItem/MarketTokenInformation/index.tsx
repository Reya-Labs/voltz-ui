import { MarketToken, MarketTokenProps } from 'brokoli-ui';
import React from 'react';

import { MarketTokenBox } from './MarketTokenInformation.styled';

export type MarketTokenInformationProps = {
  token: MarketTokenProps['token'];
};

export const MarketTokenInformation: React.FunctionComponent<MarketTokenInformationProps> = ({
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
            <b>LP Mellow {token.toUpperCase()}</b>
          </React.Fragment>
        )}
        token={token}
        typographyToken="primaryBodyMediumRegular"
      />
    </MarketTokenBox>
  );
};
