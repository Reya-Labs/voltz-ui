import { SupportedChainId } from '@voltz-protocol/v1-sdk';

export type PositionUI = {
  market: 'Aave' | 'Compound' | 'Lido' | 'Rocket' | 'GMX:GLP' | 'SOFR';
  token?: 'eth' | 'usdc' | 'usdt' | 'dai';
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

export type PositionSortId =
  | 'name'
  | 'notional'
  | 'margin'
  | 'maturity'
  | 'status'
  | 'unrealizedPNL'
  | 'realizedPNL';
export type PositionSortDirection = 'noSort' | 'ascending' | 'descending';
export type PositionSorting = Record<PositionSortId, PositionSortDirection>;
