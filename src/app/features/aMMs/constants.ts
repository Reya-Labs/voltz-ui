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

export const FILTER_CONFIG: Record<
  PoolFilterId,
  {
    label: string;
    hidden: boolean;
  }
> = {
  borrow: {
    label: 'Borrow',
    hidden: false,
  },
  v2: {
    label: 'v2',
    hidden: true,
  },
  yield: {
    label: 'Yield',
    hidden: false,
  },
};

export const SORT_CONFIG: Record<
  PoolSortId,
  {
    text: string;
    subtext?: string;
    disabled: boolean;
  }
> = {
  pools: {
    text: 'Pools',
    disabled: false,
  },
  fixedAPR: {
    text: 'Fixed APR',
    disabled: false,
  },
  variableAPY: {
    text: 'Variable APY',
    subtext: '24h Change',
    disabled: false,
  },
  maturity: {
    text: 'Maturity',
    disabled: true,
  },
};

export const initialPoolsInformation: PoolsInformation = {
  volume30DayInDollars: 0,
  totalLiquidityInDollars: 0,
};