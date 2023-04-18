import { formatNumber } from '../../../../../utilities/number';
import { FormNumberLimits } from '../../../common-form';
import { swapFormFormatNumber } from './index';

jest.mock('../../../../../utilities/number', () => {
  return {
    formatNumber: jest.fn(),
  };
});

describe('swapFormFormatNumber', () => {
  it('should call formatNumber with proper params when value < 1', () => {
    swapFormFormatNumber(0.1234);
    expect(formatNumber).toHaveBeenCalledWith(0.1234, 0, FormNumberLimits.decimalLimit);
    swapFormFormatNumber(0.9);
    expect(formatNumber).toHaveBeenCalledWith(0.9, 0, FormNumberLimits.decimalLimit);
  });

  it('should call formatNumber with proper params when value >= 1', () => {
    swapFormFormatNumber(1);
    expect(formatNumber).toHaveBeenCalledWith(1, 0, 2);
    swapFormFormatNumber(10);
    expect(formatNumber).toHaveBeenCalledWith(10, 0, 2);
  });
});
