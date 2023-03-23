import { compactFormat } from '../../../../../utilities/number';
import { SwapFormNumberLimits } from '../../constants';

export const swapFormCompactFormat = (value: number) => {
  if (value < 1) {
    return compactFormat(value, 0, SwapFormNumberLimits.decimalLimit);
  }

  return compactFormat(value, 0, 2);
};
