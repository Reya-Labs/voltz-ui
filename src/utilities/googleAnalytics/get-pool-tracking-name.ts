import { PortfolioPositionAMM } from '@voltz-protocol/v1-sdk';

// TODO: FB extend with v2 in name once V2 is available
export const getPoolTrackingName = (amm: PortfolioPositionAMM) => {
  const market = amm.market.replaceAll(' ', '');
  return `${market[0].toLowerCase()}${market.substring(1)}_${amm.underlyingToken.name}${
    amm.isBorrowing ? '_borrow' : ''
  }`;
};
