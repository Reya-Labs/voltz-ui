import { getEditPositionNotional } from '../getEditPositionNotional';
import { getVariableRate } from '../getVariableRate';
import { getEditPositionVariableRate } from './';

jest.mock('../getEditPositionNotional');
jest.mock('../getVariableRate');

describe('getEditPositionVariableRate', () => {
  beforeEach(() => {
    // Reset the mock implementation and call history before each test
    jest.resetAllMocks();
  });

  it('should return null when getEditPositionNotional returns 0', () => {
    const state = {} as never;
    // Mock getEditPositionNotional to return 0
    (getEditPositionNotional as jest.Mock).mockReturnValue(0);

    expect(getEditPositionVariableRate(state)).toBeNull();

    // Make sure getEditPositionNotional was called with the correct arguments
    expect(getEditPositionNotional).toHaveBeenCalledWith(state);

    // Make sure getVariableRate was not called
    expect(getVariableRate).not.toHaveBeenCalled();
  });

  it('should return the result of getVariableRate when getEditPositionNotional does not return 0', () => {
    const state = {} as never;
    // Mock getEditPositionNotional to return a value other than 0
    (getEditPositionNotional as jest.Mock).mockReturnValue(100);

    // Mock getVariableRate to return some value
    const mockVariableRate = {
      /* some mock variable rate */
    };
    (getVariableRate as jest.Mock).mockReturnValue(mockVariableRate);

    expect(getEditPositionVariableRate(state)).toBe(mockVariableRate);

    // Make sure getEditPositionNotional was called with the correct arguments
    expect(getEditPositionNotional).toHaveBeenCalledWith(state);

    // Make sure getVariableRate was called with the correct arguments
    expect(getVariableRate).toHaveBeenCalledWith(state);
  });
});
