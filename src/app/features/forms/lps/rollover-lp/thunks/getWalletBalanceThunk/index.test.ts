import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
import { getWalletBalanceService } from '../../../../common';
import { getWalletBalanceThunkHandler } from './index';

// Mock dependencies
jest.mock('../../../../../helpers/reject-thunk-with-error', () => ({
  rejectThunkWithError: jest.fn(),
}));
jest.mock('../../../../../../../utilities/amm', () => ({
  isV2AMM: jest.fn().mockReturnValue(false),
}));

jest.mock('../../../../common', () => ({
  getWalletBalanceService: jest.fn(),
}));
describe('getWalletBalanceThunkHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getWalletBalanceService and return result', async () => {
    // Mock dependencies
    const underlyingTokensResult = [100, 200];
    const amm = {
      signer: {},
    };
    (getWalletBalanceService as jest.Mock).mockResolvedValue(underlyingTokensResult);
    const thunkApiMock = {
      getState: () => ({ rolloverLpForm: { amm } }),
    };

    // Call function and assert
    const result = await getWalletBalanceThunkHandler(undefined, thunkApiMock as never);
    expect(getWalletBalanceService).toHaveBeenCalled();
    expect(result).toBe(underlyingTokensResult);
  });

  it('should call rejectThunkWithError on error', async () => {
    // Mock dependencies
    const error = new Error('oops');
    const rejectThunkWithErrorResult = { error: true };
    (rejectThunkWithError as jest.Mock).mockReturnValue(rejectThunkWithErrorResult);
    const amm = {
      signer: {},
    };
    (getWalletBalanceService as jest.Mock).mockRejectedValue(error);

    const thunkApiMock = {
      getState: () => ({
        rolloverLpForm: { amm },
      }),
    };

    // Call function and assert
    const result = await getWalletBalanceThunkHandler(undefined, thunkApiMock as never);
    expect(rejectThunkWithError).toHaveBeenCalledWith(thunkApiMock, error);
    expect(result).toEqual(rejectThunkWithErrorResult);
  });
});
