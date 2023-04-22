import { formatNumber } from '../../../../../utilities/number';
import { FormNumberLimits } from '../../constants';

export const formFormatNumber = (value: number) => {
  if (value < 1) {
    return formatNumber(value, 0, FormNumberLimits.decimalLimit);
  }

  return formatNumber(value, 0, 2);
};
