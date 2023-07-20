import { AMM } from '@voltz-protocol/v1-sdk';

import { PoolFilters } from '../../types';

export const filterByTag = (amm: AMM, appliedFilters: PoolFilters) => {
  if (amm.market.tags.isV2) {
    if (!appliedFilters['v2']) {
      return false;
    }
    if (appliedFilters['borrow'] && amm.market.tags.isBorrowing) {
      return true;
    }
    if (appliedFilters['yield'] && amm.market.tags.isYield) {
      return true;
    }
    return true;
  } else {
    if (appliedFilters['borrow'] && amm.market.tags.isBorrowing) {
      return true;
    }
    if (appliedFilters['yield'] && amm.market.tags.isYield) {
      return true;
    }
  }

  return false;
};
