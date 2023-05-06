import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
import { getUnderlyingTokenAllowanceThunkHandler } from './index';

// Mock dependencies
jest.mock('../../../../../helpers/reject-thunk-with-error', () => ({
  rejectThunkWithError: jest.fn(),
}));

describe('getUnderlyingTokenAllowanceThunkHandler', () => {
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
    const result = await getUnderlyingTokenAllowanceThunkHandler(
      { chainId: 1, alchemyApiKey: '' },
      { getState } as never,
    );
    expect(result).toBeUndefined();
  });

  it('should call amm.getUnderlyingTokenAllowance and return result', async () => {
    // Mock dependencies
    const getUnderlyingTokenAllowanceResult = 100;
    const amm = {
      signer: {},
      getUnderlyingTokenAllowance: jest.fn().mockResolvedValue(getUnderlyingTokenAllowanceResult),
    };

    // Call function and assert
    const result = await getUnderlyingTokenAllowanceThunkHandler(
      { chainId: 1, alchemyApiKey: 'alchemyApiKey' },
      {
        getState: () => ({
          rolloverSwapForm: { amm },
        }),
      } as never,
    );
    expect(amm.getUnderlyingTokenAllowance).toHaveBeenCalledWith({
      forceErc20Check: false,
      chainId: 1,
      alchemyApiKey: 'alchemyApiKey',
    });
    expect(result).toBe(getUnderlyingTokenAllowanceResult);
  });

  it('should call rejectThunkWithError on error', async () => {
    // Mock dependencies
    const error = new Error('oops');
    const rejectThunkWithErrorResult = { error: true };
    (rejectThunkWithError as jest.Mock).mockReturnValue(rejectThunkWithErrorResult);
    const thunkApiMock = {
      getState: () => ({
        rolloverSwapForm: {
          amm: {
            signer: {},
            getUnderlyingTokenAllowance: jest.fn().mockRejectedValue(error),
          },
        },
      }),
    };

    // Call function and assert
    const result = await getUnderlyingTokenAllowanceThunkHandler(
      { chainId: 1, alchemyApiKey: '' },
      thunkApiMock as never,
    );
    expect(rejectThunkWithError).toHaveBeenCalledWith(thunkApiMock, error);
    expect(result).toEqual(rejectThunkWithErrorResult);
  });
});
