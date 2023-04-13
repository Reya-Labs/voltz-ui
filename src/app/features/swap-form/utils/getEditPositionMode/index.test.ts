import { getEditPositionTokenBalance } from '../getEditPositionTokenBalance';
import { getEditPositionMode } from './index';

jest.mock('../getEditPositionTokenBalance', () => ({
  getEditPositionTokenBalance: jest.fn(),
}));

describe('getEditPositionMode', () => {
  it('should return fixed if variableTokenBalance is less than 0', () => {
    const state = {} as never;

    (getEditPositionTokenBalance as jest.Mock).mockReturnValue({
      variableTokenBalance: -1,
    });
    const mode = getEditPositionMode(state);

    expect(mode).toBe('fixed');
    expect(getEditPositionTokenBalance).toHaveBeenCalledWith(state);
  });

  it('should return variable if variableTokenBalance is greater than or equal to 0', () => {
    const state = {
      // Add necessary state properties here
    } as never;

    (getEditPositionTokenBalance as jest.Mock).mockReturnValue({
      variableTokenBalance: 0,
    });
    const mode = getEditPositionMode(state);

    expect(mode).toBe('variable');
    expect(getEditPositionTokenBalance).toHaveBeenCalledWith(state);
  });
});
