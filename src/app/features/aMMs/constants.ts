import { isV2Live } from '../../../utilities/is-v2-live';
import { PoolFilterId, PoolFilters, PoolsInformation, PoolSortId, PoolSorting } from './types';

export const initialFilters: PoolFilters = {
  borrow: true,
  v2: true,
  yield: true,
  ethereum: true,
  arbitrum: true,
  avalanche: true,
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
    sortOrder: number;
  }
> = {
  borrow: {
    label: 'Borrow',
    hidden: false,
    sortOrder: 1,
  },
  yield: {
    label: 'Yield',
    hidden: false,
    sortOrder: 2,
  },
  v2: {
    label: 'v2',
    hidden: !isV2Live(),
    sortOrder: 3,
  },
  ethereum: {
    label: 'Ethereum',
    hidden: false,
    sortOrder: 4,
  },
  arbitrum: {
    label: 'Arbitrum',
    hidden: false,
    sortOrder: 5,
  },
  avalanche: {
    label: 'Avalanche',
    hidden: false,
    sortOrder: 6,
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
