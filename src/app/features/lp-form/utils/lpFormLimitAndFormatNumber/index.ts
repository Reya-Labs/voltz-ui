import { limitAndFormatNumber } from '../../../../../utilities/number';
import { FormNumberLimits } from '../../../common-form';

export const lpFormLimitAndFormatNumber = (value: number, mode: 'floor' | 'ceil') => {
  return limitAndFormatNumber(
    value,
    FormNumberLimits.digitLimit,
    FormNumberLimits.decimalLimit,
    mode,
  );
};
