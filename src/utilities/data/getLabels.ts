import { Agents } from '@components/contexts';
import { Mode, TableFields } from './types';

export type GetLabelsArgs = {
  agent?: Agents;
  mode: Mode;
};

const getLabels = ({ agent, mode }: GetLabelsArgs): [TableFields, string][] => {
  if (mode === 'portfolio') {
    return [
      ['protocol', 'PROTOCOL'],
      ['notional', 'NOTIONAL'],
      ['margin', 'MARGIN'],
      agent === Agents.VARIABLE_TRADER
        ? ['variableApy', 'VARIABLE APY']
        : ['fixedApr', 'FIXED APR'],
      ['maturity', 'MATURITY'],
    ];
  }

  return [
    ['protocol', 'POOL'],
    ['fixedApr', 'FIXED APR'],
    ['variableApy', 'VARIABLE APY'],
    ['maturity', 'MATURITY'],
  ];
};

export default getLabels;
