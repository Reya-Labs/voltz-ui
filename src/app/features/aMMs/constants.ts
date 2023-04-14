import { PoolFilterId, PoolFilters, PoolsInformation, PoolSortId, PoolSorting } from './types';

export const initialFilters: PoolFilters = {
  borrow: true,
  v2: true,
  yield: true,
};

export const resetSortingDirection: PoolSorting = {
  pools: 'noSort',
  fixedAPR: 'noSort',
  variableAPY: 'noSort',
  maturity: 'noSort',
};

export const initialSortingDirection: PoolSorting = {
  ...resetSortingDirection,
  pools: 'ascending',
};

export const FILTER_LABELS: Record<PoolFilterId, string> = {
  borrow: 'Borrow',
  v2: 'v2',
  yield: 'Yield',
};

export const SORT_LABELS: Record<
  PoolSortId,
  {
    text: string;
    subtext?: string;
  }
> = {
  pools: {
    text: 'Pools',
  },
  fixedAPR: {
    text: 'Fixed APR',
  },
  variableAPY: {
    text: 'Variable APY',
  },
  maturity: {
    text: 'Maturity',
  },
};

export const initialPoolsInformation: PoolsInformation = {
  volume30DayInDollars: 0,
  totalLiquidityInDollars: 0,
};
