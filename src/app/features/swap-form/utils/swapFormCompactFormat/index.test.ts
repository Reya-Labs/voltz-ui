import { compactFormat } from '../../../../../utilities/number';
import { SwapFormNumberLimits } from '../../../swap-form';
import { swapFormCompactFormat } from './index';

jest.mock('../../../../../utilities/number', () => {
  return {
    compactFormat: jest.fn(),
  };
});

describe('swapFormCompactFormat', () => {
  it('should call compactFormat with proper params when value < 1', () => {
    swapFormCompactFormat(0.1234);
    expect(compactFormat).toHaveBeenCalledWith(0.1234, 0, SwapFormNumberLimits.decimalLimit);
    swapFormCompactFormat(0.9);
    expect(compactFormat).toHaveBeenCalledWith(0.9, 0, SwapFormNumberLimits.decimalLimit);
  });

  it('should call compactFormat with proper params when value >= 1', () => {
    swapFormCompactFormat(1);
    expect(compactFormat).toHaveBeenCalledWith(1, 0, 2);
    swapFormCompactFormat(10);
    expect(compactFormat).toHaveBeenCalledWith(10, 0, 2);
  });
});
