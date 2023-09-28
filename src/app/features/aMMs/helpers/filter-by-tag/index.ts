import { PoolFilters } from '../../types';

export const filterByTag = (
  {
    isV2,
    isYield,
    isBorrowing,
  }: {
    isV2: boolean;
    isBorrowing: boolean;
    isYield: boolean;
  },
  appliedFilters: PoolFilters,
) => {
  if (isV2) {
    if (!appliedFilters['v2']) {
      return false;
    }
    if (appliedFilters['borrow'] && isBorrowing) {
      return true;
    }
    if (appliedFilters['yield'] && isYield) {
      return true;
    }
    return true;
  } else {
    if (appliedFilters['borrow'] && isBorrowing) {
      return true;
    }
    if (appliedFilters['yield'] && isYield) {
      return true;
    }
  }

  return false;
};
