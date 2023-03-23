import { limitAndFormatNumber } from '../../../../../utilities/number';
import { SwapFormNumberLimits } from '../../constants';

export const swapFormLimitAndFormatNumber = (value: number, mode: 'floor' | 'ceil') => {
  return limitAndFormatNumber(
    value,
    SwapFormNumberLimits.digitLimit,
    SwapFormNumberLimits.decimalLimit,
    mode,
  );
};
