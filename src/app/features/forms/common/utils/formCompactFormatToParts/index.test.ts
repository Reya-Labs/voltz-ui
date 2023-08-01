import { compactFormatToParts } from '../../../../../../utilities/number';
import { FormNumberLimits } from '../../constants';
import { formCompactFormatToParts } from '.';

jest.mock('../../../../../../utilities/number', () => {
  return {
    compactFormatToParts: jest.fn(),
  };
});

describe('formCompactFormatToParts', () => {
  it('should call compactFormatToParts with proper params when value < 1', () => {
    formCompactFormatToParts(0.1234);
    expect(compactFormatToParts).toHaveBeenCalledWith(0.1234, 0, FormNumberLimits.decimalLimit);
    formCompactFormatToParts(0.9);
    expect(compactFormatToParts).toHaveBeenCalledWith(0.9, 0, FormNumberLimits.decimalLimit);
  });

  it('should call compactFormatToParts with proper params when value >= 1', () => {
    formCompactFormatToParts(1);
    expect(compactFormatToParts).toHaveBeenCalledWith(1, 0, 2);
    formCompactFormatToParts(10);
    expect(compactFormatToParts).toHaveBeenCalledWith(10, 0, 2);
  });
});
