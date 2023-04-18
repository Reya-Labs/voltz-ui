import { limitAndFormatNumber } from '../../../../../utilities/number';
import { FormNumberLimits } from '../../constants';

export const formLimitAndFormatNumber = (value: number, mode: 'floor' | 'ceil') => {
  return limitAndFormatNumber(
    value,
    FormNumberLimits.digitLimit,
    FormNumberLimits.decimalLimit,
    mode,
  );
};
