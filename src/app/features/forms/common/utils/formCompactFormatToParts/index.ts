import { compactFormatToParts } from '../../../../../../utilities/number';
import { FormNumberLimits } from '../../constants';

export const formCompactFormatToParts = (value: number) => {
  if (value < 1) {
    return compactFormatToParts(value, 0, FormNumberLimits.decimalLimit);
  }

  return compactFormatToParts(value, 0, 2);
};
