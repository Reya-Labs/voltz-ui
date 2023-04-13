export type PoolUI = {
  market: 'Aave' | 'Compound' | 'Lido' | 'Rocket' | 'GMX:GLP';
  token?: 'eth' | 'usdc' | 'usdt' | 'dai';
  name: string;
  isBorrowing: boolean;
  isV2: boolean;
  isAaveV3: boolean;
  fixedAPRRateFormatted: string;
  fixedAPRRate: number;
  aMMMaturity: string;
  id: string;
  variableAPYRate24hDelta: number;
  variableAPYRateFormatted: string;
  variableAPYRate: number;
  routeAmmId: string;
  routePoolId: string;
  maturityTimestampInMS: number;
};

export type PoolFilterId = 'borrow' | 'v2' | 'yield' | 'aaveV3';
export type PoolSortId = 'pools' | 'fixedAPR' | 'variableAPY' | 'maturity';
export type PoolFilters = Record<PoolFilterId, boolean>;
export type PoolSortDirection = 'noSort' | 'ascending' | 'descending';
export type PoolSorting = Record<PoolSortId, PoolSortDirection>;

export type PoolsInformation = {
  volume30DayInDollars: number;
  totalLiquidityInDollars: number;
};
