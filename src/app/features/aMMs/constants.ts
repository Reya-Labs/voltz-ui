export type PoolFilterId = 'borrow' | 'eth' | 'staking' | 'lending';
export type PoolFilters = Record<PoolFilterId, boolean>;
export const initialFilters: PoolFilters = {
  borrow: true,
  eth: true,
  lending: true,
  staking: true,
};
export const FILTER_LABELS: Record<PoolFilterId, string> = {
  borrow: 'Borrow',
  eth: 'ETH',
  lending: 'Lending',
  staking: 'Staking',
};
