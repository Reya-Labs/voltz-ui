import { AMM } from '@voltz-protocol/v1-sdk';

import { V2Pool } from '../../../aMMs';
import { PortfolioPositionPool } from '../../../position-details';

export const formatUnderlyingTokenName = (pool?: AMM | PortfolioPositionPool | V2Pool | null) => {
  if (!pool) {
    return '';
  }
  return ` ${pool.underlyingToken.name.toUpperCase()}`;
};
