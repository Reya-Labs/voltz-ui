import { PositionTableFields } from './types';

export const PositionTableLabels: Record<PositionTableFields, string> = {
  pool: 'Pool',
  fixedLower: 'Fixed Rate Lower',
  fixedUpper: 'Fixed Rate Upper',
  notional: 'Notional',
  margin: 'Margin',
  accruedRates: 'Receiving/Paying',
  fixedApr: 'Fixed APR',
  maturity: 'Maturity',
};

export const lpLabels: [PositionTableFields, string][] = [
  ['pool', PositionTableLabels.pool],
  ['fixedLower', PositionTableLabels.fixedLower],
  ['fixedUpper', PositionTableLabels.fixedUpper],
  ['notional', PositionTableLabels.notional],
  // ['fixedTokenBalance', PositionTableLabels.fixedTokenBalance],
  ['margin', PositionTableLabels.margin],
  // ['fixedApr', PositionTableLabels.fixedApr],
  ['maturity', PositionTableLabels.maturity],
];

export const traderLabels: [PositionTableFields, string][] = [
  ['pool', PositionTableLabels.pool],
  // ['fixedLower', PositionTableLabels.fixedLower],
  // ['fixedUpper', PositionTableLabels.fixedUpper],
  ['notional', PositionTableLabels.notional],
  ['margin', PositionTableLabels.margin],
  // ['accruedRates', PositionTableLabels.accruedRates],
  // ['fixedApr', PositionTableLabels.fixedApr],
  ['maturity', PositionTableLabels.maturity],
];
