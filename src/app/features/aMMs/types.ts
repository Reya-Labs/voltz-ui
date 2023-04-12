export type PoolUI = {
  market: 'Aave' | 'Compound' | 'Lido' | 'Rocket' | 'GMX:GLP';
  token?: 'eth' | 'usdc' | 'usdt' | 'dai';
  name: string;
  isBorrowing: boolean;
  isAaveV3: boolean;
  fixedRateFormatted: string;
  fixedRate: number;
  aMMMaturity: string;
  id: string;
  variableRate24hDelta: number;
  variableRateFormatted: string;
  variableRate: number;
  routeAmmId: string;
  routePoolId: string;
  maturityTimestampInMS: number;
};
