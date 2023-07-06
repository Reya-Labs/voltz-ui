import { rejectThunkWithError } from '../../../../../helpers';
import { getUnderlyingTokenAllowanceService } from '../../../../common';
import { getUnderlyingTokenAllowanceThunkHandler } from './index';

// Mock dependencies
jest.mock('../../../../../helpers', () => ({
  rejectThunkWithError: jest.fn(),
}));

jest.mock('../../../../../../../utilities/amm', () => ({
  isV2AMM: jest.fn().mockReturnValue(false),
}));

jest.mock('../../../../common', () => ({
  getUnderlyingTokenAllowanceService: jest.fn(),
}));

describe('getUnderlyingTokenAllowanceThunkHandler', () => {
  const getState = () => ({
    rolloverLpForm: {
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
    const result = await getUnderlyingTokenAllowanceThunkHandler({ chainId: 1 }, {
      getState,
    } as never);
    expect(result).toBeUndefined();
  });

  it('should call amm.getUnderlyingTokenAllowance and return result', async () => {
    // Mock dependencies
    const getUnderlyingTokenAllowanceResult = 100;
    const amm = {
      signer: {},
    };
    (getUnderlyingTokenAllowanceService as jest.Mock).mockResolvedValue(
      getUnderlyingTokenAllowanceResult,
    );
    // Call function and assert
    const result = await getUnderlyingTokenAllowanceThunkHandler({ chainId: 1 }, {
      getState: () => ({
        rolloverLpForm: { amm },
      }),
    } as never);
    expect(getUnderlyingTokenAllowanceService).toHaveBeenCalledWith({
      amm,
      signer: amm.signer,
      chainId: 1,
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
        rolloverLpForm: {
          amm: {
            signer: {},
          },
        },
      }),
    };
    (getUnderlyingTokenAllowanceService as jest.Mock).mockRejectedValue(error);

    // Call function and assert
    const result = await getUnderlyingTokenAllowanceThunkHandler(
      { chainId: 1 },
      thunkApiMock as never,
    );
    expect(rejectThunkWithError).toHaveBeenCalledWith(thunkApiMock, error);
    expect(result).toEqual(rejectThunkWithErrorResult);
  });
});
