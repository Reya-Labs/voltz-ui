import { DateTime } from 'luxon';

import { Agents } from '@components/contexts';

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
  id: string;
  margin: number;
  notional: number;
  agent: Agents;
};

export type TEMPORARY_Pool = {
  id: string;
  protocol: string;
  startDate: DateTime;
  endDate: DateTime;
  fixedApr: number;
  variableApr: number;
  positions: TEMPORARY_Position[];
};

export type TableData = {
  id: string;
  positionId?: string;
  protocol: string;
  startDate: DateTime;
  endDate: DateTime;
  fixedApr: number;
  variableApr?: number;
  margin?: number;
  notional?: number;
};
