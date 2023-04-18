import { compactFormat } from '../../../../../utilities/number';
import { FormNumberLimits } from '../../constants';

export const formCompactFormat = (value: number) => {
  if (value < 1) {
    return compactFormat(value, 0, FormNumberLimits.decimalLimit);
  }

  return compactFormat(value, 0, 2);
};
