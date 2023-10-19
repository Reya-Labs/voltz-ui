import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';

import { compactFormat, compactFormatToParts, formatNumber } from '../../../../../utilities/number';
import { RootState } from '../../../../store';
import {
  mapAvailableAmountMarginAccountDepositToAvailableAmountsUI,
  mapMarginAccountForSwapLPToMarginAccountForSwapLPUI,
} from '../../../_common';
import { formatPoolMaturity, formatUnderlyingTokenName } from '../../../helpers';
import {
  formCompactFormat,
  formCompactFormatToParts,
  formFormatNumber,
  getGasInfoFormatted,
  getPoolVariableRate24hDelta,
} from '../../common';
import {
  getMaxAvailableNotional,
  getNewPositionFixedRate,
  getProspectiveSwapMode,
  getProspectiveSwapNotional,
  getVariableRate,
} from './utils';

export const selectSubmitButtonInfo = (state: RootState) => state.swapForm.submitButton;
export const selectSwapFormPool = (state: RootState) => state.swapForm.pool;
export const selectWalletBalance = (state: RootState) => {
  if (state.swapForm.maxNotionalAvailable.status !== 'success') {
    return '--';
  }

  return formCompactFormat(state.swapForm.maxNotionalAvailable.value);
};
export const selectFixedRateInfo = (state: RootState) => state.swapForm.pool?.currentFixedRate;
export const selectVariableRateInfo = (state: RootState) =>
  state.swapForm.pool?.currentVariableRate;
// TODO: FB evaluate before launch
export const selectPayFixedRateInfo = (state: RootState) => state.swapForm.pool?.payFixedRate;
export const selectReceiveFixedRateInfo = (state: RootState) =>
  state.swapForm.pool?.receiveFixedRate;
export const selectSwapFormMode = (state: RootState): 'new' => {
  return 'new';
};

export const selectPoolTokenFormatted = (state: RootState) => {
  return formatUnderlyingTokenName(selectSwapFormPool(state));
};

export const selectPoolToken = (state: RootState) => {
  const pool = selectSwapFormPool(state);
  if (!pool) {
    return undefined;
  }
  return pool.underlyingToken.name;
};

export const selectPoolMaturityFormatted = (state: RootState) => {
  return formatPoolMaturity(selectSwapFormPool(state));
};

export const selectSwapFormMarginAccount = (state: RootState) => {
  return state.swapForm.marginAccount;
};

export const selectSwapFormMarginAccountForSwapLPUI = (state: RootState) => {
  const marginAccount = selectSwapFormMarginAccount(state);
  const poolToken = selectPoolToken(state);
  if (!marginAccount || !poolToken) {
    return null;
  }
  return mapMarginAccountForSwapLPToMarginAccountForSwapLPUI(marginAccount, poolToken);
};

// User Input
export const selectUserInputMode = (state: RootState) => state.swapForm.userInput.mode;
export const selectUserInputNotionalInfo = (state: RootState) =>
  state.swapForm.userInput.notionalAmount;
export const selectUserInputNotionalCompactFormatted = (state: RootState) =>
  formCompactFormatToParts(state.swapForm.userInput.notionalAmount.value);
export const selectProspectiveSwapMode = (state: RootState) =>
  getProspectiveSwapMode(state.swapForm);
export const selectProspectiveSwapNotionalFormatted = (state: RootState) => {
  return formCompactFormat(getProspectiveSwapNotional(state.swapForm));
};
export const selectProspectiveSwapFeeFormatted = (state: RootState) => {
  if (state.swapForm.prospectiveSwap.swapSimulation.status === 'success') {
    return formFormatNumber(state.swapForm.prospectiveSwap.swapSimulation.value.fee);
  }

  return '--';
};

export const selectProspectiveSwapAccountInitialMarginPostTradeCompactFormatted = (
  state: RootState,
) => {
  if (state.swapForm.prospectiveSwap.swapSimulation.status === 'success') {
    return formCompactFormatToParts(
      state.swapForm.prospectiveSwap.swapSimulation.value.accountInitialMarginPostTrade,
    );
  }

  return {
    compactNumber: '--',
    compactSuffix: '',
  };
};

export const selectGasInfoFormatted = (state: RootState) => {
  const infoPostSwap = state.swapForm.prospectiveSwap.swapSimulation;
  return getGasInfoFormatted({
    status: infoPostSwap.status,
    gasDetails: infoPostSwap.value.gasFee,
  });
};

export const selectInfoPostSwap = (state: RootState) =>
  state.swapForm.prospectiveSwap.swapSimulation;

export const selectMaxAvailableNotionalFormatted = (state: RootState) => {
  if (state.swapForm.maxNotionalAvailable.status !== 'success') {
    return '--';
  }
  return formatNumber(getMaxAvailableNotional(state.swapForm));
};

export const selectMaxAvailableNotionalForMaxButton = (state: RootState) => {
  if (state.swapForm.maxNotionalAvailable.status !== 'success') {
    return undefined;
  }
  return getMaxAvailableNotional(state.swapForm);
};

export const selectNewPositionReceivingRate = (state: RootState) => {
  return getProspectiveSwapMode(state.swapForm) === 'fixed'
    ? getNewPositionFixedRate(state.swapForm)
    : getVariableRate(state.swapForm);
};
export const selectNewPositionPayingRate = (state: RootState) => {
  return getProspectiveSwapMode(state.swapForm) === 'fixed'
    ? getVariableRate(state.swapForm)
    : getNewPositionFixedRate(state.swapForm);
};
export const selectNewPositionCompactNotional = (state: RootState) => {
  if (state.swapForm.userInput.notionalAmount.error) return null;

  const compactParts = formCompactFormatToParts(getProspectiveSwapNotional(state.swapForm));

  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

export const selectReceivingRateFormatted = (state: RootState) => {
  const receiveFixedRateInfo = selectReceiveFixedRateInfo(state);
  const variableRateInfo = selectVariableRateInfo(state);
  const mode = selectUserInputMode(state);
  const receiveFixedRate = receiveFixedRateInfo ? formatNumber(receiveFixedRateInfo) : '--';
  const variableRate = variableRateInfo ? formatNumber(variableRateInfo) : '--';
  if (mode === 'fixed') {
    return receiveFixedRate;
  }
  return variableRate;
};

export const selectSlippageFormatted = (state: RootState) => {
  if (!state.swapForm.pool || state.swapForm.prospectiveSwap.swapSimulation.status !== 'success') {
    return '--';
  }

  if (state.swapForm.prospectiveSwap.swapSimulation.value.variableTokenDeltaBalance === 0) {
    return formFormatNumber(0);
  }

  const slippage = Math.abs(
    state.swapForm.prospectiveSwap.swapSimulation.value.averageFixedRate -
      state.swapForm.pool.currentFixedRate,
  );

  return formFormatNumber(slippage);
};

export const selectSwapConfirmationFlowStep = (state: RootState) =>
  state.swapForm.swapConfirmationFlow.step;
export const selectDepositAndSwapConfirmationFlowStep = (state: RootState) =>
  state.swapForm.depositAndSwapConfirmationFlow.step;
export const selectSwapConfirmationFlowError = (state: RootState) =>
  state.swapForm.swapConfirmationFlow.error;
export const selectDepositAndSwapConfirmationFlowError = (state: RootState) =>
  state.swapForm.depositAndSwapConfirmationFlow.error;

export const selectSwapConfirmationButtonState = (
  state: RootState,
): {
  text: string;
  disabled: boolean;
  message: {
    text: string;
    type: 'info' | 'warning' | 'error';
  };
} => {
  const step = selectSwapConfirmationFlowStep(state);
  const error = selectSwapConfirmationFlowError(state);
  if (step === 'swapConfirmation') {
    return {
      text: !error ? 'Confirm Swap' : 'Try to swap again',
      disabled: false,
      message: {
        text: error || '',
        type: error ? 'error' : 'info',
      },
    };
  }

  if (step === 'waitingForSwapConfirmation') {
    return {
      text: 'Swap in progress',
      disabled: true,
      message: {
        text: error || '',
        type: error ? 'error' : 'info',
      },
    };
  }

  if (step === 'swapCompleted') {
    return {
      text: 'Go to Portfolio',
      disabled: false,
      message: {
        text: error || '',
        type: error ? 'error' : 'info',
      },
    };
  }

  return {
    text: 'Ooops',
    disabled: true,
    message: {
      text: '',
      type: 'info',
    },
  };
};

export const selectDepositAndSwapConfirmationButtonState = (
  state: RootState,
): {
  text: string;
  disabled: boolean;
  message: {
    text: string;
    type: 'info' | 'warning' | 'error';
  };
} => {
  const step = selectDepositAndSwapConfirmationFlowStep(state);
  const error = selectDepositAndSwapConfirmationFlowError(state);
  if (step === 'depositAndSwapConfirmation') {
    return {
      text: !error ? 'Deposit and Swap' : 'Try to swap again',
      disabled: false,
      message: {
        text: error || '',
        type: error ? 'error' : 'info',
      },
    };
  }

  if (step === 'waitingForDepositAndSwapConfirmation') {
    return {
      text: 'Deposit and Swap in progress',
      disabled: true,
      message: {
        text: error || '',
        type: error ? 'error' : 'info',
      },
    };
  }

  if (step === 'depositAndSwapCompleted') {
    return {
      text: 'Go to Portfolio',
      disabled: false,
      message: {
        text: error || '',
        type: error ? 'error' : 'info',
      },
    };
  }

  return {
    text: 'Ooops',
    disabled: true,
    message: {
      text: '',
      type: 'info',
    },
  };
};

export const selectMarginAccountAvailableAmountsLoadedState = (state: RootState) => {
  return state.swapForm.depositAndSwapConfirmationFlow.availableAmountsLoadedState;
};

export const selectMarginAccountAvailableAmountsLoading = (state: RootState): boolean => {
  const loadedState = selectMarginAccountAvailableAmountsLoadedState(state);
  return loadedState === 'idle' || loadedState === 'pending';
};

export const selectMarginAccountAvailableAmounts = (state: RootState) => {
  const isLoading = selectMarginAccountAvailableAmountsLoading(state);
  return isLoading
    ? []
    : state.swapForm.depositAndSwapConfirmationFlow.availableAmounts.map(
        mapAvailableAmountMarginAccountDepositToAvailableAmountsUI,
      );
};

// TODO: FB evaluate before launch - refactor #2
export const selectMarginAccountUserInputFormatted = (state: RootState) => {
  const userInput = state.swapForm.depositAndSwapConfirmationFlow.userInput;

  return {
    amount: userInput.amount,
    amountFormatted: compactFormatToParts(userInput.amount),
    maxAmount: userInput.maxAmount,
    maxAmountFormatted: compactFormat(userInput.maxAmount),
    maxAmountUSDFormatted: compactFormat(userInput.maxAmountUSD),
    token: userInput.token,
  };
};

export const selectSwapConfirmationFlowEtherscanLink = (state: RootState) => {
  if (!state.swapForm.swapConfirmationFlow.txHash) {
    return undefined;
  }
  return getViewOnEtherScanLink(state.network.chainId, state.swapForm.swapConfirmationFlow.txHash);
};

export const selectDepositAndSwapConfirmationFlowEtherscanLink = (state: RootState) => {
  if (!state.swapForm.depositAndSwapConfirmationFlow.txHash) {
    return undefined;
  }
  return getViewOnEtherScanLink(
    state.network.chainId,
    state.swapForm.depositAndSwapConfirmationFlow.txHash,
  );
};

export const selectVariableRate24hDelta = (state: RootState) => {
  return getPoolVariableRate24hDelta(state.swapForm.pool);
};

export const selectSubmitButtonText = (state: RootState) => {
  switch (state.swapForm.submitButton.state) {
    case 'swap':
      return 'Swap';
    case 'paused':
      return 'Paused';
    case 'connect-wallet':
      return 'Connect Your Wallet to Start Trading';
  }
};

export const selectIsLeverageDisabled = (state: RootState) => {
  return getProspectiveSwapNotional(state.swapForm) === 0;
};

export const selectIsGetInfoPostSwapLoading = (state: RootState) => {
  return state.swapForm.prospectiveSwap.swapSimulation.status === 'pending';
};

export const selectFixedRateValueFormatted = (state: RootState) => {
  return !state.swapForm.pool ? '--' : formatNumber(state.swapForm.pool.currentFixedRate);
};

export const selectVariableRateValueFormatted = (state: RootState) => {
  return !state.swapForm.pool ? '--' : formatNumber(state.swapForm.pool.currentVariableRate);
};
