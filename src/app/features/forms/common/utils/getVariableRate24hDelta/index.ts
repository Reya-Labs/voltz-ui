import { AMM } from '@voltz-protocol/v1-sdk';

import { formatNumber, stringToBigFloat } from '../../../../../../utilities/number';

export const getVariableRate24hDelta = (amm: AMM | null) => {
  if (!amm) {
    return undefined;
  }
  return stringToBigFloat(formatNumber(amm.variableApy - amm.variableApy24Ago, 0, 3));
};
