import { swapFormReducer } from './reducer';
import { initialState, SliceState } from './state';
import { getUnderlyingTokenAllowanceThunk, getWalletBalanceThunk } from './thunks';
import { validateUserInputAndUpdateSubmitButton } from './utils';

jest.mock('./utils', () => ({
  validateUserInputAndUpdateSubmitButton: jest.fn(),
}));

// Define the mock state
let testsInitialState: SliceState = initialState;

describe('swapFormReducer', () => {
  beforeEach(() => {
    testsInitialState = initialState;
    jest.clearAllMocks();
  });

  describe('getWalletBalanceThunk', () => {
    it('should update status to "pending" when getWalletBalanceThunk is pending', () => {
      const nextState = swapFormReducer(testsInitialState, {
        type: getWalletBalanceThunk.pending.type,
      });
      expect(nextState.walletBalance.status).toEqual('pending');
    });

    it('should update status to "error" and set walletBalance to error state when getWalletBalanceThunk is rejected', () => {
      const nextState = swapFormReducer(testsInitialState, {
        type: getWalletBalanceThunk.rejected.type,
      });
      expect(nextState.walletBalance.status).toEqual('error');
      expect(nextState.walletBalance.value).toEqual(0);
    });

    it('should update walletBalance and status to "success" when getWalletBalanceThunk is fulfilled, also make sure validateUserInputAndUpdateSubmitButton is called', () => {
      const nextState = swapFormReducer(testsInitialState, {
        type: getWalletBalanceThunk.fulfilled.type,
        payload: 10,
      });

      expect(validateUserInputAndUpdateSubmitButton).toHaveBeenCalledTimes(1);
      expect(nextState.walletBalance.status).toEqual('success');
      expect(nextState.walletBalance.value).toEqual(10);
    });
  });

  describe('getUnderlyingTokenAllowanceThunk', () => {
    it('should update status to "pending" when getUnderlyingTokenAllowanceThunk is pending', () => {
      const nextState = swapFormReducer(testsInitialState, {
        type: getUnderlyingTokenAllowanceThunk.pending.type,
      });
      expect(nextState.walletTokenAllowance.status).toEqual('pending');
    });

    it('should update status to "error" and set walletTokenAllowance to error state when getUnderlyingTokenAllowanceThunk is rejected', () => {
      const nextState = swapFormReducer(testsInitialState, {
        type: getUnderlyingTokenAllowanceThunk.rejected.type,
      });
      expect(nextState.walletTokenAllowance.status).toEqual('error');
      expect(nextState.walletTokenAllowance.value).toEqual(0);
    });

    it('should update walletTokenAllowance and status to "success" when getUnderlyingTokenAllowanceThunk is fulfilled, also make sure validateUserInputAndUpdateSubmitButton is called', () => {
      const nextState = swapFormReducer(testsInitialState, {
        type: getUnderlyingTokenAllowanceThunk.fulfilled.type,
        payload: 10,
      });

      expect(validateUserInputAndUpdateSubmitButton).toHaveBeenCalledTimes(1);
      expect(nextState.walletTokenAllowance.status).toEqual('success');
      expect(nextState.walletTokenAllowance.value).toEqual(10);
    });
  });
});
