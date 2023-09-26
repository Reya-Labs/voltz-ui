import { formatNumber, stringToBigFloat } from '../../../../../../utilities/number';
import { V2Pool } from '../../../../aMMs';

export const getPoolVariableRate24hDelta = (pool: V2Pool | null) => {
  if (!pool) {
    return undefined;
  }
  return stringToBigFloat(formatNumber(pool.variableRateChange, 0, 3));
};
