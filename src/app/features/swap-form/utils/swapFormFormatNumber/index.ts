import { formatNumber } from '../../../../../utilities/number';
import { SwapFormNumberLimits } from '../../constants';

export const swapFormFormatNumber = (value: number) => {
  if (value < 1) {
    return formatNumber(value, 0, SwapFormNumberLimits.decimalLimit);
  }

  return formatNumber(value, 0, 2);
};
