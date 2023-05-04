import { getAmmProtocol } from '../../../../utilities/amm';
import { stringToBigFloat } from '../../../../utilities/number';
import { checkLowLeverageNotification, formLimitAndFormatNumber } from '../common/utils';
import { pushLeverageChangeEvent } from './analytics';
import {
  closeRolloverConfirmationFlowAction,
  openRolloverConfirmationFlowAction,
  resetStateAction,
  rolloverSwapFormReducer,
  setLeverageAction,
  setMarginAmountAction,
  setNotionalAmountAction,
  setUserInputModeAction,
} from './reducer';
import { initialState, SliceState } from './state';
import {
  approveUnderlyingTokenThunk,
  confirmRolloverThunk,
  getInfoPostSwapThunk,
  getPoolSwapInfoThunk,
  getUnderlyingTokenAllowanceThunk,
  getWalletBalanceThunk,
} from './thunks';
import {
  getProspectiveSwapMode,
  getProspectiveSwapNotional,
  updateLeverage,
  updateLeverageOptionsAfterGetInfoPostSwap,
  updateLeverageOptionsAfterGetPoolSwapInfo,
  validateUserInputAndUpdateSubmitButton,
} from './utils';

jest.mock('../../../../utilities/number', () => ({
  stringToBigFloat: jest.fn(),
}));
jest.mock('../../../../utilities/amm', () => ({
  getAmmProtocol: jest.fn(),
}));

jest.mock('./analytics', () => ({
  pushLeverageChangeEvent: jest.fn(),
}));

jest.mock('../common/utils', () => ({
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

describe('rolloverSwapFormReducer', () => {
  beforeEach(() => {
    testsInitialState = initialState;
    jest.clearAllMocks();
  });

  describe('actions', () => {
    describe('resetStateAction', () => {
      it('should set reset state', () => {
        const nextState = rolloverSwapFormReducer({} as never, resetStateAction());

        expect(nextState).toEqual(initialState);
      });
    });

    describe('openRolloverConfirmationFlowAction', () => {
      it('should set swapConfirmationFlow.step', () => {
        const nextState = rolloverSwapFormReducer(
          testsInitialState,
          openRolloverConfirmationFlowAction(),
        );

        expect(nextState.swapConfirmationFlow.step).toEqual('rolloverConfirmation');
      });
    });

    describe('closeRolloverConfirmationFlowAction', () => {
      it('should set reset swapConfirmationFlow', () => {
        const nextState = rolloverSwapFormReducer(
          testsInitialState,
          closeRolloverConfirmationFlowAction(),
        );

        expect(nextState.swapConfirmationFlow).toEqual({
          step: null,
          error: null,
          txHash: null,
        });
      });
    });

    describe('setUserInputModeAction', () => {
      it('should set userInput.mode properly and reset infoPostSwap', () => {
        const nextState = rolloverSwapFormReducer(
          testsInitialState,
          setUserInputModeAction({
            value: 'variable',
          }),
        );

        expect(nextState.userInput.mode).toEqual('variable');
        expect(nextState.prospectiveSwap.infoPostSwap).toEqual({
          value: {
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
          status: 'idle',
        });
        expect(validateUserInputAndUpdateSubmitButton).toHaveBeenCalledTimes(1);
      });
    });

    describe('setNotionalAmountAction', () => {
      test.each([[{ value: 1 }, { value: undefined }]])(
        'provided %p as payload, it should set notionalAmount.value properly',
        (payload) => {
          const nextState = rolloverSwapFormReducer(
            testsInitialState,
            setNotionalAmountAction(payload as never),
          );

          expect(nextState.userInput.notionalAmount.value).toEqual(payload.value);
          expect(updateLeverage).toHaveBeenCalledTimes(1);
          expect(validateUserInputAndUpdateSubmitButton).toHaveBeenCalledTimes(1);
        },
      );
    });

    describe('setMarginAmountAction', () => {
      test.each([[{ value: 1 }, { value: undefined }]])(
        'provided %p as payload, it should set marginAmount.value properly',
        (payload) => {
          const nextState = rolloverSwapFormReducer(
            testsInitialState,
            setMarginAmountAction(payload as never),
          );

          expect(nextState.userInput.marginAmount.value).toEqual(payload.value);
          expect(updateLeverage).toHaveBeenCalledTimes(1);
          expect(validateUserInputAndUpdateSubmitButton).toHaveBeenCalledTimes(1);
        },
      );
    });

    describe('setLeverageAction', () => {
      test.each([
        [
          {
            value: 123,
            account: '0x123',
            changeType: 'input',
          },
          0,
        ],
        [
          {
            value: 0,
            account: '0x123',
            changeType: 'input',
          },
          10,
        ],
        [
          {
            value: NaN,
            account: '0x123',
            changeType: 'input',
          },
          10,
        ],
      ])(
        'given %p as payload, mocking getProspectiveSwapNotional with %p, should set leverage to null, marginAmount to null and call validateUserInputAndUpdateSubmitButton if invalid input provided or prospectiveSwapNotional is 0',
        (setLeverageActionPayload, mockGetProspectiveSwapNotionalValue) => {
          (getProspectiveSwapNotional as jest.Mock).mockReturnValueOnce(
            mockGetProspectiveSwapNotionalValue,
          );
          const nextState = rolloverSwapFormReducer(
            {
              ...testsInitialState,
              userInput: {
                ...testsInitialState.userInput,
                leverage: 10,
                marginAmount: {
                  ...testsInitialState.userInput.marginAmount,
                  value: 10,
                },
              },
            },
            setLeverageAction(setLeverageActionPayload as never),
          );
          expect(nextState.userInput.leverage).toEqual(null);
          expect(nextState.userInput.marginAmount.value).toEqual(0);
          expect(validateUserInputAndUpdateSubmitButton).toHaveBeenCalledTimes(1);
        },
      );

      it('should set leverage to correct value, track event and call checkLowLeverageNotification', () => {
        (getProspectiveSwapNotional as jest.Mock).mockReturnValueOnce(10);
        (stringToBigFloat as jest.Mock).mockReturnValueOnce(10.0);
        const mockedCheckLowLeverageNotificationValue = false;
        (checkLowLeverageNotification as jest.Mock).mockReturnValueOnce(
          mockedCheckLowLeverageNotificationValue,
        );
        const nextState = rolloverSwapFormReducer(
          testsInitialState,
          setLeverageAction({
            value: 456,
            account: '0x123',
            changeType: 'input',
          }),
        );
        expect(nextState.userInput.leverage).toEqual(456);
        expect(nextState.userInput.marginAmount.value).toEqual(10.0);
        expect(nextState.showLowLeverageNotification).toEqual(
          mockedCheckLowLeverageNotificationValue,
        );
        expect(stringToBigFloat).toHaveBeenCalledTimes(1);
        expect(formLimitAndFormatNumber).toHaveBeenCalledTimes(1);
        expect(getAmmProtocol).toHaveBeenCalledTimes(1);
        expect(getProspectiveSwapMode).toHaveBeenCalledTimes(1);
        expect(pushLeverageChangeEvent).toHaveBeenCalledTimes(1);
        expect(validateUserInputAndUpdateSubmitButton).toHaveBeenCalledTimes(1);
        expect(checkLowLeverageNotification).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('thunks', () => {
    describe('getWalletBalanceThunk', () => {
      it('should update status to "pending" when getWalletBalanceThunk is pending', () => {
        const nextState = rolloverSwapFormReducer(testsInitialState, {
          type: getWalletBalanceThunk.pending.type,
        });
        expect(nextState.walletBalance.status).toEqual('pending');
      });

      it('should update status to "error" and set walletBalance to error state when getWalletBalanceThunk is rejected', () => {
        const nextState = rolloverSwapFormReducer(testsInitialState, {
          type: getWalletBalanceThunk.rejected.type,
        });
        expect(nextState.walletBalance.status).toEqual('error');
        expect(nextState.walletBalance.value).toEqual(0);
      });

      it('should update walletBalance and status to "success" when getWalletBalanceThunk is fulfilled, also make sure validateUserInputAndUpdateSubmitButton is called', () => {
        const nextState = rolloverSwapFormReducer(testsInitialState, {
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
        const nextState = rolloverSwapFormReducer(testsInitialState, {
          type: getUnderlyingTokenAllowanceThunk.pending.type,
        });
        expect(nextState.walletTokenAllowance.status).toEqual('pending');
      });

      it('should update status to "error" and set walletTokenAllowance to error state when getUnderlyingTokenAllowanceThunk is rejected', () => {
        const nextState = rolloverSwapFormReducer(testsInitialState, {
          type: getUnderlyingTokenAllowanceThunk.rejected.type,
        });
        expect(nextState.walletTokenAllowance.status).toEqual('error');
        expect(nextState.walletTokenAllowance.value).toEqual(0);
      });

      it('should update walletTokenAllowance and status to "success" when getUnderlyingTokenAllowanceThunk is fulfilled, also make sure validateUserInputAndUpdateSubmitButton is called', () => {
        const nextState = rolloverSwapFormReducer(testsInitialState, {
          type: getUnderlyingTokenAllowanceThunk.fulfilled.type,
          payload: 10,
        });

        expect(validateUserInputAndUpdateSubmitButton).toHaveBeenCalledTimes(1);
        expect(nextState.walletTokenAllowance.status).toEqual('success');
        expect(nextState.walletTokenAllowance.value).toEqual(10);
      });
    });

    describe('approveUnderlyingTokenThunk', () => {
      it('should update submitButton to "approving" when approveUnderlyingTokenThunk is pending', () => {
        const nextState = rolloverSwapFormReducer(testsInitialState, {
          type: approveUnderlyingTokenThunk.pending.type,
        });
        expect(nextState.submitButton).toEqual({
          state: 'approving',
          disabled: true,
          message: {
            text: 'Waiting for confirmation...',
            isError: false,
          },
        });
      });

      it('should update submitButton to error state when approveUnderlyingTokenThunk is rejected', () => {
        const nextState = rolloverSwapFormReducer(testsInitialState, {
          type: approveUnderlyingTokenThunk.rejected.type,
          payload: 'Error happened',
        });
        expect(nextState.submitButton).toEqual({
          state: 'approve',
          disabled: false,
          message: {
            text: 'Error happened',
            isError: true,
          },
        });
      });

      it('should update walletTokenAllowance and status to "success" when approveUnderlyingTokenThunk is fulfilled, also make sure validateUserInputAndUpdateSubmitButton is called', () => {
        const nextState = rolloverSwapFormReducer(testsInitialState, {
          type: approveUnderlyingTokenThunk.fulfilled.type,
          payload: 10,
        });

        expect(validateUserInputAndUpdateSubmitButton).toHaveBeenCalledTimes(1);
        expect(nextState.walletTokenAllowance.status).toEqual('success');
        expect(nextState.walletTokenAllowance.value).toEqual(10);
      });
    });

    describe('getPoolSwapInfoThunk', () => {
      it('should update poolSwapInfo to "approving" when getPoolSwapInfoThunk is pending', () => {
        const nextState = rolloverSwapFormReducer(testsInitialState, {
          type: getPoolSwapInfoThunk.pending.type,
        });
        expect(nextState.poolSwapInfo).toEqual({
          availableNotional: {
            fixed: 0,
            variable: 0,
          },
          maxLeverage: {
            fixed: 0,
            variable: 0,
          },
          status: 'pending',
        });
      });

      it('should update poolSwapInfo to error state when getPoolSwapInfoThunk is rejected', () => {
        const nextState = rolloverSwapFormReducer(testsInitialState, {
          type: getPoolSwapInfoThunk.rejected.type,
        });
        expect(nextState.poolSwapInfo).toEqual({
          availableNotional: {
            fixed: 0,
            variable: 0,
          },
          maxLeverage: {
            fixed: 0,
            variable: 0,
          },
          status: 'error',
        });
      });

      it('should update poolSwapInfo and status to "success" when getPoolSwapInfoThunk is fulfilled, also make sure validateUserInputAndUpdateSubmitButton and updateLeverageOptionsAfterGetPoolSwapInfo is called', () => {
        const nextState = rolloverSwapFormReducer(testsInitialState, {
          type: getPoolSwapInfoThunk.fulfilled.type,
          payload: {
            availableNotionalFT: 1,
            availableNotionalVT: 2,
            maxLeverageFT: 3,
            maxLeverageVT: 4,
          },
        });

        expect(validateUserInputAndUpdateSubmitButton).toHaveBeenCalledTimes(1);
        expect(updateLeverageOptionsAfterGetPoolSwapInfo).toHaveBeenCalledTimes(1);
        expect(nextState.poolSwapInfo).toEqual({
          availableNotional: {
            fixed: 1,
            variable: 2,
          },
          maxLeverage: {
            fixed: 3,
            variable: 4,
          },
          status: 'success',
        });
      });
    });

    describe('getInfoPostSwapThunk', () => {
      it('should update poolSwapInfo to "approving" when getInfoPostSwapThunk is pending', () => {
        const nextState = rolloverSwapFormReducer(testsInitialState, {
          type: getInfoPostSwapThunk.pending.type,
        });
        expect(nextState.prospectiveSwap.infoPostSwap).toEqual({
          value: {
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
          status: 'pending',
        });
      });

      it('should update poolSwapInfo to error state when getInfoPostSwapThunk is rejected', () => {
        const nextState = rolloverSwapFormReducer(testsInitialState, {
          type: getInfoPostSwapThunk.rejected.type,
        });
        expect(nextState.prospectiveSwap.infoPostSwap).toEqual({
          value: {
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
          status: 'error',
        });
      });

      it('should update prospectiveSwap.infoPostSwap and poolSwapInfo.availableNotional and status to "success" when getInfoPostSwapThunk is fulfilled & early return is false, also make sure validateUserInputAndUpdateSubmitButton and updateLeverageOptionsAfterGetInfoPostSwap is called', () => {
        const mockedInfoPostSwap = {
          marginRequirement: 1,
          maxMarginWithdrawable: 2,
          availableNotional: 3,
          fee: 4,
          slippage: 5,
          averageFixedRate: 6,
          fixedTokenDeltaBalance: 7,
          variableTokenDeltaBalance: 8,
          fixedTokenDeltaUnbalanced: 9,
          gasFeeETH: 10,
        };

        const nextState = rolloverSwapFormReducer(testsInitialState, {
          type: getInfoPostSwapThunk.fulfilled.type,
          payload: {
            notionalAmount: 11,
            swapMode: 'fixed',
            infoPostSwap: mockedInfoPostSwap,
            earlyReturn: false,
          },
        });

        expect(validateUserInputAndUpdateSubmitButton).toHaveBeenCalledTimes(1);
        expect(updateLeverageOptionsAfterGetInfoPostSwap).toHaveBeenCalledTimes(1);
        expect(nextState.prospectiveSwap.infoPostSwap).toEqual({
          value: {
            marginRequirement: mockedInfoPostSwap.marginRequirement,
            maxMarginWithdrawable: mockedInfoPostSwap.maxMarginWithdrawable,
            averageFixedRate: mockedInfoPostSwap.averageFixedRate,
            fixedTokenDeltaBalance: mockedInfoPostSwap.fixedTokenDeltaBalance,
            variableTokenDeltaBalance: mockedInfoPostSwap.variableTokenDeltaBalance,
            fixedTokenDeltaUnbalanced: mockedInfoPostSwap.fixedTokenDeltaUnbalanced,
            fee: mockedInfoPostSwap.fee,
            slippage: mockedInfoPostSwap.slippage,
            gasFeeETH: mockedInfoPostSwap.gasFeeETH,
          },
          status: 'success',
        });
        expect(nextState.poolSwapInfo.availableNotional['fixed']).toEqual(3);
      });

      it('should update prospectiveSwap.infoPostSwap status to "success" when getInfoPostSwapThunk is fulfilled & early return is true, also make sure validateUserInputAndUpdateSubmitButton and updateLeverageOptionsAfterGetInfoPostSwap are not called', () => {
        const nextState = rolloverSwapFormReducer(testsInitialState, {
          type: getInfoPostSwapThunk.fulfilled.type,
          payload: {
            earlyReturn: true,
          },
        });

        expect(validateUserInputAndUpdateSubmitButton).toHaveBeenCalledTimes(0);
        expect(updateLeverageOptionsAfterGetInfoPostSwap).toHaveBeenCalledTimes(0);
        expect(nextState.prospectiveSwap.infoPostSwap).toEqual({
          value: {
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
          status: 'idle',
        });
      });
    });

    describe('confirmSwapThunk', () => {
      it('should update swapConfirmationFlow to "waitingForSwapConfirmation" when confirmSwapThunk is pending', () => {
        const nextState = rolloverSwapFormReducer(testsInitialState, {
          type: confirmRolloverThunk.pending.type,
        });
        expect(nextState.swapConfirmationFlow).toEqual({
          step: 'waitingForRolloverConfirmation',
          error: null,
          txHash: null,
        });
      });

      it('should update swapConfirmationFlow to error state when confirmSwapThunk is rejected', () => {
        const nextState = rolloverSwapFormReducer(testsInitialState, {
          type: confirmRolloverThunk.rejected.type,
          payload: 'Error happened',
        });
        expect(nextState.swapConfirmationFlow).toEqual({
          step: 'rolloverConfirmation',
          error: 'Error happened',
          txHash: null,
        });
      });

      it('should update swapConfirmationFlow and status to "swapCompleted" when confirmSwapThunk is fulfilled', () => {
        const nextState = rolloverSwapFormReducer(testsInitialState, {
          type: confirmRolloverThunk.fulfilled.type,
          payload: { transactionHash: 'transactionHash' },
        });

        expect(nextState.swapConfirmationFlow).toEqual({
          step: 'rolloverCompleted',
          error: null,
          txHash: 'transactionHash',
        });
      });
    });
  });
});
