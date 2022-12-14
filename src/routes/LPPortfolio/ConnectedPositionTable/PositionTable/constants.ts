import { PositionTableFields } from './types';

export const PositionTableLabels: Record<PositionTableFields, string> = {
  pool: 'Pool',
  rateRange: 'Lower x Upper',
  notional: 'Notional',
  margin: 'Margin',
  accruedRates: 'Receiving x Paying',
  fixedApr: 'Fixed APR',
  maturity: 'Maturity',
};

export const lpLabels: [PositionTableFields, string][] = [
  ['pool', PositionTableLabels.pool],
  ['notional', PositionTableLabels.notional],
  ['margin', PositionTableLabels.margin],
  ['rateRange', PositionTableLabels.rateRange],
  ['maturity', PositionTableLabels.maturity],
];
