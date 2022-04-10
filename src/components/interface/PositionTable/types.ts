import { DateTime } from 'luxon';

export type PositionTableFields = 'pool' | 'notional' | 'margin' | 'maturity' | 'fixedApr' | 'fixedTokenBalance';

export type PositionTableDatum = {
  id: string;
  protocol: string;
  notional: number;
  fixedTokenBalance: number;
  margin: number;
  startDate: DateTime;
  endDate: DateTime;
  fixedApr: number;
};
