import { formatNumber } from '../../../../../../../utilities/number';
import { calculateLeverageOptions } from '../../../../common/utils';
import { updateLeverageOptionsAfterGetPoolLpInfo } from './index';

jest.mock('../../../../../../../utilities/number', () => ({
  formatNumber: jest.fn(),
}));

jest.mock('../../../../common/utils', () => ({
  calculateLeverageOptions: jest.fn(),
}));

describe('updateLeverageOptionsAfterGetPoolLpInfo', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('updates the leverage options correctly', () => {
    const mockState = {
      poolLpInfo: { maxLeverage: 123.456 },
      prospectiveLp: { leverage: { maxLeverage: '', options: [] } },
    };

    // Mock the calculateLeverageOptions and formatNumber functions to return the expected values
    (calculateLeverageOptions as jest.Mock).mockReturnValueOnce([30, 60, 123]);
    (formatNumber as jest.Mock).mockReturnValueOnce('123');

    // Call the function with the mocked state
    updateLeverageOptionsAfterGetPoolLpInfo(mockState as never);

    // Check that the state was updated correctly
    expect(mockState.prospectiveLp.leverage.maxLeverage).toBe('123');
    expect(mockState.prospectiveLp.leverage.options).toEqual([30, 60, 123]);

    // Check that calculateLeverageOptions and formatNumber were called with the expected arguments
    expect(calculateLeverageOptions).toHaveBeenCalledWith('123');
    expect(formatNumber).toHaveBeenCalledWith(123, 0, 0);
  });
});
