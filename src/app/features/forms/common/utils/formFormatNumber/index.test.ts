import { formatNumber } from '../../../../../../utilities/number';
import { FormNumberLimits } from '../../constants';
import { formFormatNumber } from '.';

jest.mock('../../../../../../utilities/number', () => {
  return {
    formatNumber: jest.fn(),
  };
});

describe('formFormatNumber', () => {
  it('should call formatNumber with proper params when value < 1', () => {
    formFormatNumber(0.1234);
    expect(formatNumber).toHaveBeenCalledWith(0.1234, 0, FormNumberLimits.decimalLimit);
    formFormatNumber(0.9);
    expect(formatNumber).toHaveBeenCalledWith(0.9, 0, FormNumberLimits.decimalLimit);
  });

  it('should call formatNumber with proper params when value >= 1', () => {
    formFormatNumber(1);
    expect(formatNumber).toHaveBeenCalledWith(1, 0, 2);
    formFormatNumber(10);
    expect(formatNumber).toHaveBeenCalledWith(10, 0, 2);
  });
});
