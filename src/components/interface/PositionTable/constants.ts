import { PositionTableFields } from './types';

export const PositionTableLabels: Record<PositionTableFields, string> = {
  pool: 'Pool',
  notional: 'Liquidity',
  margin: 'Margin',
  fixedApr: 'Fixed APR',
  maturity: 'Maturity',
};

export const labels: [PositionTableFields, string][] = [
  ['pool', PositionTableLabels.pool],
  ['notional', PositionTableLabels.notional],
  ['margin', PositionTableLabels.margin],
  ['fixedApr', PositionTableLabels.fixedApr],
  ['maturity', PositionTableLabels.maturity],
];
