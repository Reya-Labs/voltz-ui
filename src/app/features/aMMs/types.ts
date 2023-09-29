import { V1V2Pool } from '@voltz-protocol/api-sdk-v2';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';

export type PoolUI = {
  market: 'Aave' | 'Aave V2' | 'Aave V3' | 'Compound' | 'Lido' | 'Rocket' | 'GMX:GLP' | 'SOFR';
  token?: V1V2Pool['underlyingToken']['name'];
  name: string;
  isBorrowing: boolean;
  isV2: boolean;
  isAaveV3: boolean;
  fixedAPRRateFormatted: string;
  fixedAPRRate: number;
  aMMMaturity: string;
  chainId: SupportedChainId;
  id: string;
  variableAPYRate24hDelta: number;
  variableAPYRateFormatted: string;
  variableAPYRate: number;
  routeAmmId: string;
  routePoolId: string;
  maturityTimestampInMS: number;
};

export type PoolFilterId = 'borrow' | 'v2' | 'yield' | 'ethereum' | 'arbitrum' | 'avalanche';
export type PoolSortId = 'pools' | 'fixedAPR' | 'variableAPY' | 'maturity';
export type PoolFilters = Record<PoolFilterId, boolean>;
export type PoolSortDirection = 'noSort' | 'ascending' | 'descending';
export type PoolSorting = Record<PoolSortId, PoolSortDirection>;

export type PoolsInformation = {
  volume30DayInDollars: number;
  totalLiquidityInDollars: number;
};
