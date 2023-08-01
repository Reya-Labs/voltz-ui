import { rejectThunkWithError } from '../../../../../helpers';
import { getPoolSwapInfoThunkHandler } from '.';

// Mock dependencies
jest.mock('../../../../../helpers', () => ({
  rejectThunkWithError: jest.fn(),
}));

jest.mock('../../../../../../../utilities/amm', () => ({
  isV2AMM: jest.fn().mockReturnValue(false),
}));

describe('getPoolSwapInfoThunkHandler', () => {
  const getState = () => ({
    rolloverSwapForm: {
      amm: {},
    },
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return early if amm is falsy', async () => {
    // Call function and assert
    const result = await getPoolSwapInfoThunkHandler(undefined, { getState } as never);
    expect(result).toBeUndefined();
  });

  it('should call amm.getPoolSwapInfo and return result', async () => {
    // Mock dependencies
    const getPoolSwapInfoResult = 100;
    const amm = {
      getPoolSwapInfo: jest.fn().mockResolvedValue(getPoolSwapInfoResult),
    };

    // Call function and assert
    const result = await getPoolSwapInfoThunkHandler(undefined, {
      getState: () => ({
        rolloverSwapForm: { amm },
      }),
    } as never);
    expect(amm.getPoolSwapInfo).toHaveBeenCalled();
    expect(result).toBe(getPoolSwapInfoResult);
  });

  it('should call rejectThunkWithError on error', async () => {
    // Mock dependencies
    const error = new Error('oops');
    const rejectThunkWithErrorResult = { error: true };
    (rejectThunkWithError as jest.Mock).mockReturnValue(rejectThunkWithErrorResult);
    const amm = {
      getPoolSwapInfo: jest.fn().mockRejectedValue(error),
    };
    const thunkApiMock = {
      getState: () => ({
        rolloverSwapForm: { amm },
      }),
    };
    // Call function and assert
    const result = await getPoolSwapInfoThunkHandler(undefined, thunkApiMock as never);
    expect(rejectThunkWithError).toHaveBeenCalledWith(thunkApiMock, error);
    expect(result).toEqual(rejectThunkWithErrorResult);
  });
});
