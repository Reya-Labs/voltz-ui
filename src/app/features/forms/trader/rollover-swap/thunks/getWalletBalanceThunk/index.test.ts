import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
import { getWalletBalanceThunkHandler } from './index';

// Mock dependencies
jest.mock('../../../../../helpers/reject-thunk-with-error', () => ({
  rejectThunkWithError: jest.fn(),
}));

jest.mock('../../../../../../../utilities/amm', () => ({
  isV2AMM: jest.fn().mockReturnValue(false),
}));

describe('getWalletBalanceThunkHandler', () => {
  const getState = () => ({
    rolloverSwapForm: {
      amm: {
        signer: {},
      },
    },
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return early if amm or signer is falsy', async () => {
    // Call function and assert
    const result = await getWalletBalanceThunkHandler(undefined, { getState } as never);
    expect(result).toBeUndefined();
  });

  it('should call amm.underlyingTokens and return result', async () => {
    // Mock dependencies
    const underlyingTokensResult = [100, 200];
    const amm = {
      signer: {},
      underlyingTokens: jest.fn().mockResolvedValue(underlyingTokensResult),
    };
    const thunkApiMock = {
      getState: () => ({ rolloverSwapForm: { amm } }),
    };

    // Call function and assert
    const result = await getWalletBalanceThunkHandler(undefined, thunkApiMock as never);
    expect(amm.underlyingTokens).toHaveBeenCalled();
    expect(result).toBe(underlyingTokensResult);
  });

  it('should call rejectThunkWithError on error', async () => {
    // Mock dependencies
    const error = new Error('oops');
    const rejectThunkWithErrorResult = { error: true };
    (rejectThunkWithError as jest.Mock).mockReturnValue(rejectThunkWithErrorResult);
    const amm = {
      signer: {},
      underlyingTokens: jest.fn().mockRejectedValue(error),
    };

    const thunkApiMock = {
      getState: () => ({
        rolloverSwapForm: { amm },
      }),
    };

    // Call function and assert
    const result = await getWalletBalanceThunkHandler(undefined, thunkApiMock as never);
    expect(rejectThunkWithError).toHaveBeenCalledWith(thunkApiMock, error);
    expect(result).toEqual(rejectThunkWithErrorResult);
  });
});
