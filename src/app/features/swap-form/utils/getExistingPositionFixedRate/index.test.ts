import { getEditPositionNotional } from '../getEditPositionNotional';
import { getEditPositionFixedRate } from './';

jest.mock('../getEditPositionNotional');

describe('getEditPositionFixedRate', () => {
  beforeEach(() => {
    // Reset the mock implementation and call history before each test
    jest.resetAllMocks();
  });

  it('should return null when cashflowInfo status is not success', () => {
    // Mock cashflowInfo status to not be 'success'
    const state = {
      cashflowInfo: {
        status: 'failure',
      },
    };

    expect(getEditPositionFixedRate(state as never, {} as never)).toBeNull();

    // Make sure getEditPositionNotional was not called
    expect(getEditPositionNotional).not.toHaveBeenCalled();
  });

  it('should return null when getEditPositionNotional returns 0', () => {
    // Mock cashflowInfo status to be 'success'
    const cashflowState = {
      cashflowInfo: {
        status: 'success',
      },
    };
    const swapFormState = {};

    // Mock getEditPositionNotional to return 0
    (getEditPositionNotional as jest.Mock).mockReturnValue(0);

    expect(getEditPositionFixedRate(cashflowState as never, swapFormState as never)).toBeNull();

    // Make sure getEditPositionNotional was called with the correct arguments
    expect(getEditPositionNotional).toHaveBeenCalledWith(swapFormState);
  });

  it('should return the averageFixedRate when getEditPositionNotional does not return 0', () => {
    // Mock cashflowInfo status to be 'success'
    const state = {
      cashflowInfo: {
        averageFixedRate: 0,
        status: 'success',
      },
    };
    const swapFormState = {};

    // Mock getEditPositionNotional to return a value other than 0
    (getEditPositionNotional as jest.Mock).mockReturnValue(100);

    // Mock averageFixedRate to be some value
    const mockAverageFixedRate = 1.5;
    state.cashflowInfo.averageFixedRate = mockAverageFixedRate;

    expect(getEditPositionFixedRate(state as never, swapFormState as never)).toBe(
      mockAverageFixedRate,
    );

    // Make sure getEditPositionNotional was called with the correct arguments
    expect(getEditPositionNotional).toHaveBeenCalledWith(swapFormState);
  });
});
