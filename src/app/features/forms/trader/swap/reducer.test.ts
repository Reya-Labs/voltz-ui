import {
  closeSwapConfirmationFlowAction,
  openSwapConfirmationFlowAction,
  resetStateAction,
  setNotionalAmountAction,
  setSwapFormPoolAction,
  setUserInputModeAction,
  swapFormReducer,
} from './reducer';
import { initialState, SliceState } from './state';
import {
  getMaxNotionalAvailableThunk,
  getPoolUnderlyingTokenAllowanceThunk,
  simulateSwapThunk,
  swapThunk,
} from './thunks';
import { validateUserInputAndUpdateSubmitButton } from './utils';

jest.mock('../../../../../utilities/number', () => ({
  stringToBigFloat: jest.fn(),
}));
jest.mock('../../../../../utilities/amm', () => ({
  getAmmProtocol: jest.fn(),
}));

jest.mock('./analytics', () => ({
  pushLeverageChangeEvent: jest.fn(),
}));

jest.mock('../../common/utils', () => ({
  checkLowLeverageNotification: jest.fn(),
  formLimitAndFormatNumber: jest.fn(),
}));

jest.mock('./utils', () => ({
  validateUserInputAndUpdateSubmitButton: jest.fn(),
  updateLeverageOptionsAfterGetPoolSwapInfo: jest.fn(),
  updateLeverageOptionsAfterGetInfoPostSwap: jest.fn(),
  updateLeverage: jest.fn(),
  getExistingPositionMode: jest.fn(),
  getProspectiveSwapNotional: jest.fn(),
  getProspectiveSwapMode: jest.fn(),
}));

// Define the mock state
let testsInitialState: SliceState = initialState;

describe('swapFormReducer', () => {
  beforeEach(() => {
    testsInitialState = initialState;
    jest.clearAllMocks();
  });

  describe('actions', () => {
    describe('resetStateAction', () => {
      it('should set reset state', () => {
        const nextState = swapFormReducer({} as never, resetStateAction());

        expect(nextState).toEqual(initialState);
      });
    });

    describe('openSwapConfirmationFlowAction', () => {
      it('should set swapConfirmationFlow.step', () => {
        const nextState = swapFormReducer(testsInitialState, openSwapConfirmationFlowAction());

        expect(nextState.swapConfirmationFlow.step).toEqual('swapConfirmation');
      });
    });

    describe('closeSwapConfirmationFlowAction', () => {
      it('should set reset swapConfirmationFlow', () => {
        const nextState = swapFormReducer(testsInitialState, closeSwapConfirmationFlowAction());

        expect(nextState.swapConfirmationFlow).toEqual({
          step: null,
          error: null,
          txHash: null,
        });
      });
    });

    describe('setUserInputModeAction', () => {
      it('should set userInput.mode properly and reset infoPostSwap', () => {
        const nextState = swapFormReducer(
          testsInitialState,
          setUserInputModeAction({
            value: 'variable',
          }),
        );

        expect(nextState.userInput.mode).toEqual('variable');
        expect(nextState.prospectiveSwap.swapSimulation).toEqual({
          value: {
            marginRequirement: 0,
            maxMarginWithdrawable: 0,
            averageFixedRate: 0,
            variableTokenDeltaBalance: 0,
            fee: 0,
            gasFee: {
              value: 0,
              token: 'ETH',
            },
          },
          status: 'idle',
        });
        expect(validateUserInputAndUpdateSubmitButton).toHaveBeenCalledTimes(1);
      });
    });

    describe('setNotionalAmountAction', () => {
      test.each([
        [
          { value: 1, editMode: 'add' },
          { value: undefined, editMode: 'remove' },
          { value: 1, editMode: undefined },
          { value: undefined, editMode: undefined },
        ],
      ])(
        'provided %p as payload, it should set notionalAmount.value and notionalAmount.editMode properly',
        (payload) => {
          const nextState = swapFormReducer(
            testsInitialState,
            setNotionalAmountAction(payload as never),
          );

          expect(nextState.userInput.notionalAmount.value).toEqual(payload.value);
          expect(nextState.userInput.notionalAmount.editMode).toEqual(payload.editMode);
          expect(validateUserInputAndUpdateSubmitButton).toHaveBeenCalledTimes(1);
        },
      );
    });

    describe('setSwapFormPoolAction', () => {
      it('should set pool to state', () => {
        const mockedPool = jest.fn();
        const nextState = swapFormReducer(
          testsInitialState,
          setSwapFormPoolAction({
            pool: mockedPool,
          } as never),
        );

        expect(nextState.pool).toEqual(mockedPool);
      });
    });
  });

  describe('thunks', () => {
    describe('getWalletBalanceThunk', () => {
      it('should update status to "pending" when getWalletBalanceThunk is pending', () => {
        const nextState = swapFormReducer(testsInitialState, {
          type: getMaxNotionalAvailableThunk.pending.type,
        });
        expect(nextState.maxNotionalAvailable.status).toEqual('pending');
      });

      it('should update status to "error" and set walletBalance to error state when getWalletBalanceThunk is rejected', () => {
        const nextState = swapFormReducer(testsInitialState, {
          type: getMaxNotionalAvailableThunk.rejected.type,
        });
        expect(nextState.maxNotionalAvailable.status).toEqual('error');
        expect(nextState.maxNotionalAvailable.value).toEqual(0);
      });

      it('should update walletBalance and status to "success" when getWalletBalanceThunk is fulfilled, also make sure validateUserInputAndUpdateSubmitButton is called', () => {
        const nextState = swapFormReducer(testsInitialState, {
          type: getMaxNotionalAvailableThunk.fulfilled.type,
          payload: 10,
        });

        expect(validateUserInputAndUpdateSubmitButton).toHaveBeenCalledTimes(1);
        expect(nextState.maxNotionalAvailable.status).toEqual('success');
        expect(nextState.maxNotionalAvailable.value).toEqual(10);
      });
    });

    describe('getUnderlyingTokenAllowanceThunk', () => {
      it('should update status to "pending" when getUnderlyingTokenAllowanceThunk is pending', () => {
        const nextState = swapFormReducer(testsInitialState, {
          type: getPoolUnderlyingTokenAllowanceThunk.pending.type,
        });
        expect(nextState.walletTokenAllowance.status).toEqual('pending');
      });

      it('should update status to "error" and set walletTokenAllowance to error state when getUnderlyingTokenAllowanceThunk is rejected', () => {
        const nextState = swapFormReducer(testsInitialState, {
          type: getPoolUnderlyingTokenAllowanceThunk.rejected.type,
        });
        expect(nextState.walletTokenAllowance.status).toEqual('error');
        expect(nextState.walletTokenAllowance.value).toEqual(0);
      });

      it('should update walletTokenAllowance and status to "success" when getUnderlyingTokenAllowanceThunk is fulfilled, also make sure validateUserInputAndUpdateSubmitButton is called', () => {
        const nextState = swapFormReducer(testsInitialState, {
          type: getPoolUnderlyingTokenAllowanceThunk.fulfilled.type,
          payload: 10,
        });

        expect(validateUserInputAndUpdateSubmitButton).toHaveBeenCalledTimes(1);
        expect(nextState.walletTokenAllowance.status).toEqual('success');
        expect(nextState.walletTokenAllowance.value).toEqual(10);
      });
    });

    describe('simulateSwapThunk', () => {
      it('should update poolSwapInfo to "approving" when getInfoPostSwapThunk is pending', () => {
        const nextState = swapFormReducer(testsInitialState, {
          type: simulateSwapThunk.pending.type,
        });
        expect(nextState.prospectiveSwap.swapSimulation).toEqual({
          value: {
            marginRequirement: 0,
            maxMarginWithdrawable: 0,
            averageFixedRate: 0,
            variableTokenDeltaBalance: 0,
            fee: 0,
            gasFee: {
              value: 0,
              token: 'ETH',
            },
          },
          status: 'pending',
        });
      });

      it('should update poolSwapInfo to error state when getInfoPostSwapThunk is rejected', () => {
        const nextState = swapFormReducer(testsInitialState, {
          type: simulateSwapThunk.rejected.type,
        });
        expect(nextState.prospectiveSwap.swapSimulation).toEqual({
          value: {
            marginRequirement: 0,
            maxMarginWithdrawable: 0,
            averageFixedRate: 0,
            variableTokenDeltaBalance: 0,
            fee: 0,
            gasFee: {
              value: 0,
              token: 'ETH',
            },
          },
          status: 'error',
        });
      });

      it('should update prospectiveSwap.infoPostSwap status to "success" when getInfoPostSwapThunk is fulfilled & early return is true, also make sure validateUserInputAndUpdateSubmitButton and updateLeverageOptionsAfterGetInfoPostSwap are not called', () => {
        const nextState = swapFormReducer(testsInitialState, {
          type: simulateSwapThunk.fulfilled.type,
          payload: {
            earlyReturn: true,
          },
        });

        expect(validateUserInputAndUpdateSubmitButton).toHaveBeenCalledTimes(0);
        expect(nextState.prospectiveSwap.swapSimulation).toEqual({
          value: {
            marginRequirement: 0,
            maxMarginWithdrawable: 0,
            averageFixedRate: 0,
            variableTokenDeltaBalance: 0,
            fee: 0,
            gasFee: {
              value: 0,
              token: 'ETH',
            },
          },
          status: 'idle',
        });
      });
    });

    describe('confirmSwapThunk', () => {
      it('should update swapConfirmationFlow to "waitingForSwapConfirmation" when confirmSwapThunk is pending', () => {
        const nextState = swapFormReducer(testsInitialState, {
          type: swapThunk.pending.type,
        });
        expect(nextState.swapConfirmationFlow).toEqual({
          step: 'waitingForSwapConfirmation',
          error: null,
          txHash: null,
        });
      });

      it('should update swapConfirmationFlow to error state when confirmSwapThunk is rejected', () => {
        const nextState = swapFormReducer(testsInitialState, {
          type: swapThunk.rejected.type,
          payload: 'Error happened',
        });
        expect(nextState.swapConfirmationFlow).toEqual({
          step: 'swapConfirmation',
          error: 'Error happened',
          txHash: null,
        });
      });

      it('should update swapConfirmationFlow and status to "swapCompleted" when confirmSwapThunk is fulfilled', () => {
        const nextState = swapFormReducer(testsInitialState, {
          type: swapThunk.fulfilled.type,
          payload: { transactionHash: 'transactionHash' },
        });

        expect(nextState.swapConfirmationFlow).toEqual({
          step: 'swapCompleted',
          error: null,
          txHash: 'transactionHash',
        });
      });
    });
  });
});
