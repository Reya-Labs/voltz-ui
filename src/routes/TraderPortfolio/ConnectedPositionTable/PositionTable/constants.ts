import { PositionTableFields } from './types';

const PositionTableLabels: Record<PositionTableFields, string> = {
  pool: 'Pool',
  rateRange: 'Lower x Upper',
  notional: 'Notional',
  margin: 'Margin',
  accruedRates: 'Receiving x Paying',
  fixedApr: 'Fixed APR',
  maturity: 'Maturity',
};

export const traderLabels: [PositionTableFields, string][] = [
  ['pool', PositionTableLabels.pool],
  ['notional', PositionTableLabels.notional],
  ['margin', PositionTableLabels.margin],
  ['accruedRates', PositionTableLabels.accruedRates],
  ['maturity', PositionTableLabels.maturity],
];
