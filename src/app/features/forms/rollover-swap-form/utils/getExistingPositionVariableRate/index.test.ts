import { getExistingPositionNotional } from '../getExistingPositionNotional';
import { getVariableRate } from '../getVariableRate';
import { getExistingPositionVariableRate } from './index';

jest.mock('../getExistingPositionNotional');
jest.mock('../getVariableRate');

describe('getExistingPositionVariableRate', () => {
  beforeEach(() => {
    // Reset the mock implementation and call history before each test
    jest.resetAllMocks();
  });

  it('should return null when getExistingPositionNotional returns 0', () => {
    const state = {
      /* some state object */
    };

    // Mock getExistingPositionNotional to return 0
    (getExistingPositionNotional as jest.Mock).mockReturnValue(0);

    expect(getExistingPositionVariableRate(state as never)).toBeNull();

    // Make sure getExistingPositionNotional was called with the correct arguments
    expect(getExistingPositionNotional).toHaveBeenCalledWith(state);

    // Make sure getVariableRate was not called
    expect(getVariableRate).not.toHaveBeenCalled();
  });

  it('should return the variable rate when getExistingPositionNotional does not return 0', () => {
    const state = {
      /* some state object */
    };
    // Mock getExistingPositionNotional to return a value other than 0
    (getExistingPositionNotional as jest.Mock).mockReturnValue(100);

    // Mock getVariableRate to return a value
    const mockVariableRate = 1.5;
    (getVariableRate as jest.Mock).mockReturnValue(mockVariableRate);

    expect(getExistingPositionVariableRate(state as never)).toBe(mockVariableRate);

    // Make sure getExistingPositionNotional was called with the correct arguments
    expect(getExistingPositionNotional).toHaveBeenCalledWith(state);

    // Make sure getVariableRate was called with the correct arguments
    expect(getVariableRate).toHaveBeenCalledWith(state);
  });
});
