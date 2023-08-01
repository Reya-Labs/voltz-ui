import { limitAndFormatNumber } from '../../../../../../utilities/number';
import { FormNumberLimits } from '../../constants';
import { formLimitAndFormatNumber } from '.';

jest.mock('../../../../../../utilities/number', () => {
  return {
    limitAndFormatNumber: jest.fn(),
  };
});

describe('formLimitAndFormatNumber', () => {
  it('should call limitsAndFormatNumber with proper params when mode is floor', () => {
    formLimitAndFormatNumber(0.1234, 'floor');
    expect(limitAndFormatNumber).toHaveBeenCalledWith(
      0.1234,
      FormNumberLimits.digitLimit,
      FormNumberLimits.decimalLimit,
      'floor',
    );
  });

  it('should call limitsAndFormatNumber with proper params when mode is ceil', () => {
    formLimitAndFormatNumber(1234, 'ceil');
    expect(limitAndFormatNumber).toHaveBeenCalledWith(
      1234,
      FormNumberLimits.digitLimit,
      FormNumberLimits.decimalLimit,
      'ceil',
    );
  });
});
