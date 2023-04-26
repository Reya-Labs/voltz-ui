import { rejectThunkWithError } from '../../../../helpers/reject-thunk-with-error';
import { getPoolSwapInfoThunkHandler } from '.';

// Mock dependencies
jest.mock('../../../../helpers/reject-thunk-with-error', () => ({
  rejectThunkWithError: jest.fn(),
}));

describe('getPoolSwapInfoThunkHandler', () => {
  const getState = () => ({
    swapForm: {
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
        swapForm: { amm },
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
        swapForm: { amm },
      }),
    };
    // Call function and assert
    const result = await getPoolSwapInfoThunkHandler(undefined, thunkApiMock as never);
    expect(rejectThunkWithError).toHaveBeenCalledWith(thunkApiMock, error);
    expect(result).toEqual(rejectThunkWithErrorResult);
  });
});
