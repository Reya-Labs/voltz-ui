import { PositionTableFields } from './types';

export const PositionTableLabels: Record<PositionTableFields, string> = {
  pool: 'Pool',
  notional: 'Notional',
  fixedTokenBalance: 'Fixed Token Balance',
  margin: 'Margin',
  fixedApr: 'Fixed APR',
  maturity: 'Maturity',
};

export const labels: [PositionTableFields, string][] = [
  ['pool', PositionTableLabels.pool],
  ['notional', PositionTableLabels.notional],
  ['fixedTokenBalance', PositionTableLabels.fixedTokenBalance],
  ['margin', PositionTableLabels.margin],
  // ['fixedApr', PositionTableLabels.fixedApr],
  ['maturity', PositionTableLabels.maturity],
];
