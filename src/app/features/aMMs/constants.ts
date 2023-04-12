export type PoolFilterId = 'borrow' | 'eth' | 'staking' | 'lending';
export type PoolSortId = 'pools' | 'fixedAPR' | 'variableAPY' | 'maturity';
export type PoolFilters = Record<PoolFilterId, boolean>;
export type PoolSortDirection = 'noSort' | 'ascending' | 'descending';
export type PoolSorting = Record<PoolSortId, PoolSortDirection>;

export const initialFilters: PoolFilters = {
  borrow: true,
  eth: true,
  lending: true,
  staking: true,
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
  eth: 'ETH',
  lending: 'Lending',
  staking: 'Staking',
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
