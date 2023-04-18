import { formatNumber } from '../../../../../utilities/number';
import { FormNumberLimits } from '../../../common-form';

export const lpFormFormatNumber = (value: number) => {
  if (value < 1) {
    return formatNumber(value, 0, FormNumberLimits.decimalLimit);
  }

  return formatNumber(value, 0, 2);
};
