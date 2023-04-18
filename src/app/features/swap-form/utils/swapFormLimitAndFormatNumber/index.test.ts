import { limitAndFormatNumber } from '../../../../../utilities/number';
import { FormNumberLimits } from '../../../common-form';
import { swapFormLimitAndFormatNumber } from './index';

jest.mock('../../../../../utilities/number', () => {
  return {
    limitAndFormatNumber: jest.fn(),
  };
});

describe('swapFormLimitAndFormatNumber', () => {
  it('should call limitsAndFormatNumber with proper params when mode is floor', () => {
    swapFormLimitAndFormatNumber(0.1234, 'floor');
    expect(limitAndFormatNumber).toHaveBeenCalledWith(
      0.1234,
      FormNumberLimits.digitLimit,
      FormNumberLimits.decimalLimit,
      'floor',
    );
  });

  it('should call limitsAndFormatNumber with proper params when mode is ceil', () => {
    swapFormLimitAndFormatNumber(1234, 'ceil');
    expect(limitAndFormatNumber).toHaveBeenCalledWith(
      1234,
      FormNumberLimits.digitLimit,
      FormNumberLimits.decimalLimit,
      'ceil',
    );
  });
});
