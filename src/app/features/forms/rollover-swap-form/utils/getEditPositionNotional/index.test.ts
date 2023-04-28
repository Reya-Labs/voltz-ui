import { getEditPositionTokenBalance } from '../getEditPositionTokenBalance';
import { getEditPositionNotional } from './index';

jest.mock('../getEditPositionTokenBalance', () => ({
  getEditPositionTokenBalance: jest.fn(),
}));

describe('getEditPositionNotional', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns the absolute value of the variableTokenBalance from getEditPositionTokenBalance', () => {
    (getEditPositionTokenBalance as jest.Mock).mockReturnValueOnce({
      variableTokenBalance: 100,
    });
    const result = getEditPositionNotional({} as never);
    expect(result).toBe(100);
  });

  it('returns 0 if the variableTokenBalance from getEditPositionTokenBalance is 0', () => {
    (getEditPositionTokenBalance as jest.Mock).mockReturnValueOnce({
      variableTokenBalance: 0,
    });
    const result = getEditPositionNotional({} as never);
    expect(result).toBe(0);
  });

  it('returns 0 if the variableTokenBalance from getEditPositionTokenBalance is negative', () => {
    (getEditPositionTokenBalance as jest.Mock).mockReturnValueOnce({
      variableTokenBalance: -100,
    });
    const result = getEditPositionNotional({} as never);
    expect(result).toBe(100);
  });
});
