import { rejectThunkWithError } from '../../../../helpers/reject-thunk-with-error';
import { isUserInputNotionalError } from '../../../common/utils';
import { getProspectiveSwapMode, getProspectiveSwapNotional } from '../../utils';
import { getInfoPostSwapThunkHandler } from '.';

// Mock dependencies
jest.mock('../../../common/utils', () => ({
  isUserInputNotionalError: jest.fn(),
}));
jest.mock('../../utils', () => ({
  getProspectiveSwapMode: jest.fn(),
  getProspectiveSwapNotional: jest.fn(),
}));
jest.mock('../../../../helpers/reject-thunk-with-error', () => ({
  rejectThunkWithError: jest.fn(),
}));

describe('getInfoPostSwapThunkHandler', () => {
  const getState = () => ({
    swapForm: {
      amm: {},
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return early if amm or notional input is invalid', async () => {
    const resultNoAmm = await getInfoPostSwapThunkHandler(undefined, {
      getState: () => ({
        swapForm: {
          amm: null,
        },
      }),
    } as never);
    expect(resultNoAmm).toEqual({
      notionalAmount: NaN,
      swapMode: undefined,
      infoPostSwap: {},
      earlyReturn: true,
    });

    (isUserInputNotionalError as jest.Mock).mockReturnValueOnce(true);

    // Call function and assert
    const resultIsUserInputNotionalError = await getInfoPostSwapThunkHandler(undefined, {
      getState,
    } as never);
    expect(resultIsUserInputNotionalError).toEqual({
      notionalAmount: NaN,
      swapMode: undefined,
      infoPostSwap: {},
      earlyReturn: true,
    });
  });

  it('should return early if notional input is 0', async () => {
    // Mock dependencies
    (getProspectiveSwapNotional as jest.Mock).mockReturnValue(0);
    (isUserInputNotionalError as jest.Mock).mockReturnValueOnce(false);

    // Call function and assert
    const result = await getInfoPostSwapThunkHandler(undefined, { getState } as never);
    expect(result).toEqual({
      notionalAmount: 0,
      swapMode: undefined,
      infoPostSwap: {
        marginRequirement: 0,
        maxMarginWithdrawable: 0,
        averageFixedRate: 0,
        fixedTokenDeltaBalance: 0,
        variableTokenDeltaBalance: 0,
        fixedTokenDeltaUnbalanced: 0,
        fee: 0,
        slippage: 0,
        gasFeeETH: 0,
      },
      earlyReturn: false,
    });
  });

  it('should call amm.getInfoPostSwapV1 and return expected result', async () => {
    // Mock dependencies
    (getProspectiveSwapMode as jest.Mock).mockReturnValue('fixed');
    (getProspectiveSwapNotional as jest.Mock).mockReturnValue(100);
    (isUserInputNotionalError as jest.Mock).mockReturnValueOnce(false);
    const getInfoPostSwapV1Result = {
      marginRequirement: 0.05,
      maxMarginWithdrawable: 1,
      averageFixedRate: 0.1,
      fixedTokenDeltaBalance: 1,
      variableTokenDeltaBalance: 2,
      fixedTokenDeltaUnbalanced: 3,
      fee: 0.01,
      slippage: 0.02,
      gasFeeETH: 0.001,
    };
    const amm = {
      getInfoPostSwapV1: jest.fn().mockResolvedValue(getInfoPostSwapV1Result),
    };
    // Call function and assert
    const result = await getInfoPostSwapThunkHandler(undefined, {
      getState: () => ({
        swapForm: {
          amm,
        },
      }),
    } as never);
    expect(amm.getInfoPostSwapV1).toHaveBeenCalledWith({
      isFT: true,
      notional: 100,
      fixedLow: 1,
      fixedHigh: 999,
    });
    expect(result).toEqual({
      notionalAmount: 100,
      swapMode: 'fixed',
      infoPostSwap: {
        marginRequirement: 0.04,
        maxMarginWithdrawable: 1,
        averageFixedRate: 0.1,
        fixedTokenDeltaBalance: 1,
        variableTokenDeltaBalance: 2,
        fixedTokenDeltaUnbalanced: 3,
        fee: 0.01,
        slippage: 0.02,
        gasFeeETH: 0.001,
      },
      earlyReturn: false,
    });
  });

  it('should call rejectThunkWithError on error', async () => {
    // Mock dependencies
    const error = new Error('oops');
    const rejectThunkWithErrorResult = { error: true };
    (rejectThunkWithError as jest.Mock).mockReturnValue(rejectThunkWithErrorResult);
    (isUserInputNotionalError as jest.Mock).mockReturnValueOnce(false);
    const amm = {
      getInfoPostSwapV1: jest.fn().mockRejectedValue(error),
    };
    const thunkAPIMock = {
      getState: () => ({
        swapForm: {
          amm,
        },
      }),
    };
    // Call function and assert
    const result = await getInfoPostSwapThunkHandler(undefined, thunkAPIMock as never);
    expect(rejectThunkWithError).toHaveBeenCalledWith(thunkAPIMock, error);
    expect(result).toEqual(rejectThunkWithErrorResult);
  });
});
