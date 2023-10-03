import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';

import { compactFormat, compactFormatToParts } from '../../../utilities/number';
import { RootState } from '../../store';
import {
  mapAvailableAmountMarginAccountDepositToAvailableAmountsUI,
  mapMarginAccountToMarginAccountUI,
} from './helpers';

export const selectMarginAccountDepositFlowDisableMarginAccountSelection = (state: RootState) => {
  return state.depositFlow.disableMarginAccountSelection;
};

export const selectMarginAccountDepositFlowStep = (state: RootState) => {
  return state.depositFlow.step;
};

export const selectMarginAccountDepositFlowError = (state: RootState) => {
  return state.depositFlow.error;
};

export const selectMarginAccountDepositFlowShouldApproveToken = (state: RootState) => {
  const {
    userInput: { token, amount },
  } = state.depositFlow;
  const simulationValue = state.depositFlow.simulation.value;
  if (!token || amount <= 0 || simulationValue === null) {
    return false;
  }
  const value = selectMarginAccountDepositFlowWalletTokenAllowanceValue(state);
  const fee = simulationValue.gasFee;
  return amount + fee > value;
};

export const selectMarginAccountDepositFlowWalletTokenAllowanceHasError = (state: RootState) => {
  const {
    walletTokenAllowance: { status },
  } = state.depositFlow;
  return status === 'failed';
};

export const selectMarginAccountDepositFlowHasSimulationError = (state: RootState) => {
  return state.depositFlow.simulation.status === 'failed';
};

export const selectMarginAccountDepositFlowValidationError = (state: RootState) => {
  const {
    userInput: { amount, maxAmount },
  } = state.depositFlow;
  if (amount <= 0) {
    return {
      validationError: '',
      disableCTAButton: true,
    };
  }
  if (selectMarginAccountDepositFlowHasSimulationError(state)) {
    return {
      validationError: 'Gas fee calculation failed',
      disableCTAButton: false,
    };
  }
  if (selectMarginAccountDepositFlowWalletTokenAllowanceHasError(state)) {
    return {
      validationError: 'Something went wrong, retry to fetch approve information.',
      disableCTAButton: false,
    };
  }
  if (amount > maxAmount) {
    return {
      validationError: 'You cannot deposit more than allowed maximum amount.',
      disableCTAButton: true,
    };
  }
  if (selectMarginAccountDepositFlowShouldApproveToken(state)) {
    return {
      validationError: 'You cannot deposit the inputted amount. Approve first!',
      disableCTAButton: false,
    };
  }
  return {
    validationError: '',
    disableCTAButton: false,
  };
};

export const selectMarginAccountDepositFlowCTAText = (state: RootState) => {
  const { token, amount } = state.depositFlow.userInput;
  const step = selectMarginAccountDepositFlowStep(state);
  if (step === 'depositing') {
    return 'Waiting for deposit';
  }
  if (step === 'approvingToken') {
    return 'Approval pending...';
  }
  if (amount <= 0) {
    return 'Deposit Margin';
  }
  if (selectMarginAccountDepositFlowHasSimulationError(state)) {
    return 'Refresh Gas Calculation';
  }
  if (selectMarginAccountDepositFlowWalletTokenAllowanceHasError(state)) {
    return 'Retry';
  }
  if (step === 'approveTokenError') {
    return 'Try to approve again!';
  }
  if (selectMarginAccountDepositFlowShouldApproveToken(state)) {
    return token ? `Approve ${(token as string).toUpperCase()} and deposit` : 'Approve and deposit';
  }
  return 'Deposit Margin';
};

export const selectMarginAccountDepositFlowWalletTokenAllowanceLoading = (state: RootState) => {
  const { status } = state.depositFlow.walletTokenAllowance;
  return status === 'idle' || status === 'pending';
};

export const selectMarginAccountDepositFlowWalletTokenAllowanceValue = (state: RootState) => {
  if (state.depositFlow.walletTokenAllowance.status === 'succeeded') {
    return state.depositFlow.walletTokenAllowance.value;
  }
  return 0;
};

export const selectMarginAccountDepositFlowCTADisabled = (state: RootState) => {
  const walletTokenAllowanceLoading =
    selectMarginAccountDepositFlowWalletTokenAllowanceLoading(state);
  const { disableCTAButton } = selectMarginAccountDepositFlowValidationError(state);
  const step = selectMarginAccountDepositFlowStep(state);
  const loading = walletTokenAllowanceLoading || step === 'depositing' || step === 'approvingToken';
  const selectedMarginAccountId =
    selectMarginAccountDepositFlowSelectedMarginAccountFormatted(state).id;
  return disableCTAButton || Boolean(loading) || !Boolean(selectedMarginAccountId);
};

export const selectMarginAccountDepositFlowSimulationStatus = (state: RootState) => {
  return state.depositFlow.simulation.status;
};

export const selectMarginAccountDepositFlowSimulationIsLoading = (state: RootState) => {
  const status = selectMarginAccountDepositFlowSimulationStatus(state);
  return status === 'pending' || status === 'idle';
};

export const selectMarginAccountDepositFlowSimulationValueFormatted = (state: RootState) => {
  const simulationValue = state.depositFlow.simulation.value;
  if (selectMarginAccountDepositFlowSimulationIsLoading(state) || simulationValue === null) {
    return {
      gasFeeUSDFormatted: {
        compactNumber: '--',
        compactSuffix: '',
      },
      marginRatioPercentage: '--',
      marginRatioHealth: '--',
    };
  }

  return {
    gasFeeUSDFormatted: compactFormatToParts(simulationValue.gasFeeUSD),
    marginRatioPercentage: simulationValue.marginRatioPercentage,
    marginRatioHealth: simulationValue.marginRatioHealth,
  };
};

export const selectMarginAccountDepositFlowQueuedSelectedMarginAccountId = (state: RootState) => {
  return state.depositFlow.queuedSelectedMarginAccountId;
};

export const selectMarginAccountDepositFlowSelectedMarginAccountFormatted = (state: RootState) => {
  const selectedMarginAccount = state.depositFlow.selectedMarginAccount;
  if (selectedMarginAccount === null) {
    return {
      id: '',
      name: '',
      marginRatioPercentage: '--',
      marginRatioHealth: '--',
      balanceCompactFormat: {
        compactNumber: '--',
        compactSuffix: '',
      },
    };
  }

  return {
    id: selectedMarginAccount.id,
    name: selectedMarginAccount.name,
    marginRatioPercentage: selectedMarginAccount.marginRatioPercentage,
    marginRatioHealth: selectedMarginAccount.marginRatioHealth,
    balanceCompactFormat: compactFormatToParts(selectedMarginAccount.balance),
  };
};

export const selectMarginAccountDepositFlowUserInputFormatted = (state: RootState) => {
  const userInput = state.depositFlow.userInput;

  return {
    amount: userInput.amount,
    amountFormatted: compactFormatToParts(userInput.amount),
    maxAmount: userInput.maxAmount,
    maxAmountFormatted: compactFormat(userInput.maxAmount),
    maxAmountUSDFormatted: compactFormat(userInput.maxAmountUSD),
    token: userInput.token,
  };
};

export const selectMarginAccountDepositFlowMarginAccountsLoadedState = (state: RootState) => {
  return state.depositFlow.marginAccountsLoadedState;
};

export const selectMarginAccountDepositFlowMarginAccountsLoading = (state: RootState): boolean => {
  const loadedState = selectMarginAccountDepositFlowMarginAccountsLoadedState(state);
  return loadedState === 'idle' || loadedState === 'pending';
};

export const selectMarginAccountDepositFlowMarginAccounts = (state: RootState) => {
  const isLoading = selectMarginAccountDepositFlowMarginAccountsLoading(state);
  return isLoading ? [] : state.depositFlow.marginAccounts.map(mapMarginAccountToMarginAccountUI);
};

export const selectMarginAccountDepositFlowAvailableAmountsLoadedState = (state: RootState) => {
  return state.depositFlow.availableAmountsLoadedState;
};

export const selectMarginAccountDepositFlowAvailableAmountsLoading = (
  state: RootState,
): boolean => {
  const loadedState = selectMarginAccountDepositFlowAvailableAmountsLoadedState(state);
  return loadedState === 'idle' || loadedState === 'pending';
};

export const selectMarginAccountDepositFlowAvailableAmounts = (state: RootState) => {
  const isLoading = selectMarginAccountDepositFlowAvailableAmountsLoading(state);
  return isLoading
    ? []
    : state.depositFlow.availableAmounts.map(
        mapAvailableAmountMarginAccountDepositToAvailableAmountsUI,
      );
};

export const selectMarginAccountDepositFlowEtherscanLink = (state: RootState) => {
  return getViewOnEtherScanLink(state.network.chainId, state.depositFlow.txHash || '');
};
