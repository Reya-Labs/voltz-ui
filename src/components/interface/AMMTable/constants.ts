import { AMMTableFields } from './types';

export const AMMTableLabels: Record<AMMTableFields, string> = {
  protocol: 'Pool',
  fixedApr: 'Fixed APR',
  variableApy: 'Variable APY',
  maturity: 'Maturity',
};

export const labels: [AMMTableFields, string][] = [
  ['protocol', AMMTableLabels.protocol],
  ['fixedApr', AMMTableLabels.fixedApr],
  ['variableApy', AMMTableLabels.variableApy],
  ['maturity', AMMTableLabels.maturity],
];
