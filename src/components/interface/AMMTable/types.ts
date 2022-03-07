import { DateTime } from 'luxon';

export type AMMTableFields = 'protocol' | 'maturity' | 'fixedApr' | 'variableApr';

export type AMMTableDatum = {
  id: string;
  protocol: string;
  startDate: DateTime;
  endDate: DateTime;
  fixedApr: number;
  variableApr: number;
};
