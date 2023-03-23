import { compactFormatToParts } from '../../../../../utilities/number';
import { SwapFormNumberLimits } from '../../constants';

export const swapFormCompactFormatToParts = (value: number) => {
  if (value < 1) {
    return compactFormatToParts(value, 0, SwapFormNumberLimits.decimalLimit);
  }

  return compactFormatToParts(value, 0, 2);
};
