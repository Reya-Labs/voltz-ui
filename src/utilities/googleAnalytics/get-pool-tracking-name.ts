import { PortfolioPositionPool } from '../../app/features/position-details';

export const getPoolTrackingName = (amm: PortfolioPositionPool) => {
  const market = amm.market.replaceAll(' ', '');
  return `${market[0].toLowerCase()}${market.substring(1)}_${amm.isV2 ? '_v2' : ''}${
    amm.underlyingToken.name
  }${amm.isBorrowing ? '_borrow' : ''}`;
};
