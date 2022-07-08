import { DateTime } from 'luxon';

import { Agents } from '@contexts';

export type TableOrder = 'asc' | 'desc';

export type TableFields =
  | 'protocol'
  | 'maturity'
  | 'fixedApr'
  | 'variableApy'
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
  variableApy: number;
  positions: TEMPORARY_Position[];
};

export type TableData = {
  id: string;
  positionId?: string;
  protocol: string;
  startDate: DateTime;
  endDate: DateTime;
  fixedApr: number;
  variableApy?: number;
  margin?: number;
  notional?: number;
};
