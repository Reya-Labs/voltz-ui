import { compactFormatToParts } from '../../../../../utilities/number';
import { FormNumberLimits } from '../../../common-form';
import { swapFormCompactFormatToParts } from './index';

jest.mock('../../../../../utilities/number', () => {
  return {
    compactFormatToParts: jest.fn(),
  };
});

describe('swapFormCompactFormatToParts', () => {
  it('should call compactFormatToParts with proper params when value < 1', () => {
    swapFormCompactFormatToParts(0.1234);
    expect(compactFormatToParts).toHaveBeenCalledWith(0.1234, 0, FormNumberLimits.decimalLimit);
    swapFormCompactFormatToParts(0.9);
    expect(compactFormatToParts).toHaveBeenCalledWith(0.9, 0, FormNumberLimits.decimalLimit);
  });

  it('should call compactFormatToParts with proper params when value >= 1', () => {
    swapFormCompactFormatToParts(1);
    expect(compactFormatToParts).toHaveBeenCalledWith(1, 0, 2);
    swapFormCompactFormatToParts(10);
    expect(compactFormatToParts).toHaveBeenCalledWith(10, 0, 2);
  });
});
