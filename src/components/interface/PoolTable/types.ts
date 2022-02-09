import { DateTime } from 'luxon';

export type TableOrder = 'asc' | 'desc';

export type TableFields =
  | 'protocol'
  | 'maturity'
  | 'fixedApr'
  | 'variableApr'
  | 'margin'
  | 'notional';

export type Mode = 'pools' | 'portfolio';

export type TEMPORARY_Position = {
  margin: number;
  notional: number;
};

export type TEMPORARY_Pool = {
  protocol: string;
  startDate: DateTime;
  endDate: DateTime;
  fixedApr: number;
  variableApr: number;
  positions: TEMPORARY_Position[];
};

export type TableData = {
  protocol: string;
  startDate: DateTime;
  endDate: DateTime;
  fixedApr: number;
  variableApr?: number;
  margin?: number;
  notional?: number;
};
