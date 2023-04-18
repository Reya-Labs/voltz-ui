import { compactFormat } from '../../../../../utilities/number';
import { FormNumberLimits } from '../../../common-form';

export const lpFormCompactFormat = (value: number) => {
  if (value < 1) {
    return compactFormat(value, 0, FormNumberLimits.decimalLimit);
  }

  return compactFormat(value, 0, 2);
};
