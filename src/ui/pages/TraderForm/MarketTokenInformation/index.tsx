import { MarketToken, MarketTokenProps, Pill } from 'brokoli-ui';
import React from 'react';

import { MarketTokenBox } from './MarketTokenInformation.styled';

export type MarketTokenInformationProps = {
  market: MarketTokenProps['market'];
  token: MarketTokenProps['token'];
  isBorrowing: boolean;
  isAaveV3: boolean;
};

export const MarketTokenInformation: React.FunctionComponent<MarketTokenInformationProps> = ({
  market,
  token,
  isBorrowing,
  isAaveV3,
}) => {
  return (
    <MarketTokenBox>
      <MarketToken market={market} token={token} />
      {isBorrowing ? (
        <Pill colorToken="wildStrawberry" typographyToken="primaryBodySmallRegular">
          Borrow
        </Pill>
      ) : null}
      {isAaveV3 ? (
        <Pill colorToken="wildStrawberry" typographyToken="primaryBodySmallRegular">
          v3
        </Pill>
      ) : null}
    </MarketTokenBox>
  );
};
