import { compactFormatToParts } from '../../../../../utilities/number';
import { FormNumberLimits } from '../../../common-form';

export const swapFormCompactFormatToParts = (value: number) => {
  if (value < 1) {
    return compactFormatToParts(value, 0, FormNumberLimits.decimalLimit);
  }

  return compactFormatToParts(value, 0, 2);
};
