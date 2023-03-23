import { formatNumber } from '../../../../../utilities/number';
import { SwapFormNumberLimits } from '../../constants';
import { swapFormFormatNumber } from './index';

jest.mock('../../../../../utilities/number', () => {
  return {
    formatNumber: jest.fn(),
  };
});

describe('swapFormFormatNumber', () => {
  it('should call formatNumber with proper params when value < 1', () => {
    swapFormFormatNumber(0.1234);
    expect(formatNumber).toHaveBeenCalledWith(0.1234, 0, SwapFormNumberLimits.decimalLimit);
    swapFormFormatNumber(0.9);
    expect(formatNumber).toHaveBeenCalledWith(0.9, 0, SwapFormNumberLimits.decimalLimit);
  });

  it('should call formatNumber with proper params when value >= 1', () => {
    swapFormFormatNumber(1);
    expect(formatNumber).toHaveBeenCalledWith(1, 0, 2);
    swapFormFormatNumber(10);
    expect(formatNumber).toHaveBeenCalledWith(10, 0, 2);
  });
});
