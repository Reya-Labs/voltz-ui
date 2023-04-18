import { limitAndFormatNumber } from '../../../../../utilities/number';
import { FormNumberLimits } from '../../../common-form';

export const swapFormLimitAndFormatNumber = (value: number, mode: 'floor' | 'ceil') => {
  return limitAndFormatNumber(
    value,
    FormNumberLimits.digitLimit,
    FormNumberLimits.decimalLimit,
    mode,
  );
};
