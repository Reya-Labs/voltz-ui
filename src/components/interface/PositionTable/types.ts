import { DateTime } from 'luxon';

export type PositionTableFields = 'pool' | 'notional' | 'margin' | 'maturity' | 'fixedApr' | 'fixedTokenBalance' | 'fixedUpper' | 'fixedLower';

export type PositionTableDatum = {
  id: string;
  fixedUpper: number;
  fixedLower: number;
  protocol: string;
  notional: number;
  fixedTokenBalance: number;
  margin: number;
  startDate: DateTime;
  endDate: DateTime;
  fixedApr: number;
};
