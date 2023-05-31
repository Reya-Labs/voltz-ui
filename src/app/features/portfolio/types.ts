import { SupportedChainId } from '@voltz-protocol/v1-sdk';

export type PositionUI = {
  id: string;
  routeAmmId: string;
  routePositionId: string;
  routePoolId: string;
  isAaveV3: boolean;
  isBorrowing: boolean;
  isV2: boolean;
  type: 'LP' | 'Variable' | 'Fixed';
  chainId: SupportedChainId;
  market: 'Aave' | 'Compound' | 'Lido' | 'Rocket' | 'GMX:GLP' | 'SOFR';
  token?: 'eth' | 'usdc' | 'usdt' | 'dai';
  name: string;
  notional: number;
  notionalCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };
  margin: number;
  marginCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };
  maturityFormatted: string;
  maturityEndTimestampInMS: number;
  maturityStartTimestampInMS: number;
  status: {
    health: 'healthy' | 'danger' | 'warning';
    variant: 'matured' | 'settled' | 'active';
    currentFixed: number;
    receiving: number;
    paying: number;
    fixLow: number;
    fixHigh: number;
  };
  unrealizedPNL: number;
  unrealizedPNLCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };
  realizedPNLTotal: number;
  realizedPNLTotalCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };
  realizedPNLFees: number;
  realizedPNLFeesCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };
  realizedPNLCashflow: number;
  realizedPNLCashflowCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };
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
