import { AMMTableFields } from './types';

export const AMMTableLabels: Record<AMMTableFields, string> = {
  protocol: 'Pool',
  fixedApr: 'Fixed APR',
  variableApr: 'Variable APR',
  maturity: 'Maturity',
};

export const labels: [AMMTableFields, string][] = [
  ['protocol', AMMTableLabels.protocol],
  ['fixedApr', AMMTableLabels.fixedApr],
  ['variableApr', AMMTableLabels.variableApr],
  ['maturity', AMMTableLabels.maturity],
];
