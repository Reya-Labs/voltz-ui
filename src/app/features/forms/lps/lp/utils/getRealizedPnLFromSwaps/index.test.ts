import { hasExistingPosition } from '../hasExistingPosition';
import { getRealizedPnLFromSwaps } from './index';

jest.mock('../hasExistingPosition');

describe('getRealizedPnLFromSwaps', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return null when hasExistingPosition returns false', () => {
    (hasExistingPosition as jest.Mock).mockReturnValueOnce(false);

    const state = { selectedPosition: null };

    const result = getRealizedPnLFromSwaps(state as never);

    expect(result).toEqual(null);
    expect(hasExistingPosition).toHaveBeenCalledWith(state);
  });

  it('should return the realizedPnLFromSwaps property when hasExistingPosition returns true', () => {
    const realizedPnLFromSwaps = 500;
    const position = { realizedPnLFromSwaps };
    (hasExistingPosition as jest.Mock).mockReturnValueOnce(true);

    const state = { selectedPosition: position };

    const result = getRealizedPnLFromSwaps(state as never);

    expect(result).toEqual(realizedPnLFromSwaps);
    expect(hasExistingPosition).toHaveBeenCalledWith(state);
  });
});
