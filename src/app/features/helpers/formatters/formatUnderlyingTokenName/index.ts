import { AMM } from '@voltz-protocol/v1-sdk';

import { PortfolioPositionPool } from '../../../position-details';

export const formatUnderlyingTokenName = (pool?: AMM | PortfolioPositionPool | null) => {
  if (!pool) {
    return '';
  }
  return ` ${pool.underlyingToken.name.toUpperCase()}`;
};
