import { DateTime } from 'luxon';
import { Agents } from '@components/contexts';

export type PositionTableFields = 'pool' | 'notional' | 'margin' | 'maturity' | 'fixedApr' | 'fixedUpper' | 'fixedLower' | 'accruedRates';

export type PositionTableDatum = {
  source: string;
  id: string;
  fixedUpper: number;
  fixedLower: number;
  protocol: string;
  notional: number;
  fixedTokenBalance: number;
  startDate: DateTime;
  endDate: DateTime;
  fixedApr: number;
  agent: Agents;
  settled: boolean;
  averageFixedRate: string;
};
