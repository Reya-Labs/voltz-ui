import { DateTime } from 'luxon';

export type AMMTableFields = 'protocol' | 'maturity' | 'fixedApr' | 'variableApy';

export type AMMTableDatum = {
  id: string;
  protocol: string;
  startDate: DateTime;
  endDate: DateTime;
  isBorrowing: boolean;
};
