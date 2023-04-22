import { compactFormat } from '../../../../../utilities/number';
import { FormNumberLimits } from '../../constants';
import { formCompactFormat } from './index';

jest.mock('../../../../../utilities/number', () => {
  return {
    compactFormat: jest.fn(),
  };
});

describe('formCompactFormat', () => {
  it('should call compactFormat with proper params when value < 1', () => {
    formCompactFormat(0.1234);
    expect(compactFormat).toHaveBeenCalledWith(0.1234, 0, FormNumberLimits.decimalLimit);
    formCompactFormat(0.9);
    expect(compactFormat).toHaveBeenCalledWith(0.9, 0, FormNumberLimits.decimalLimit);
  });

  it('should call compactFormat with proper params when value >= 1', () => {
    formCompactFormat(1);
    expect(compactFormat).toHaveBeenCalledWith(1, 0, 2);
    formCompactFormat(10);
    expect(compactFormat).toHaveBeenCalledWith(10, 0, 2);
  });
});
