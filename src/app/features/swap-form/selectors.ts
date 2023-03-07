import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';

import {
  compactFormatToParts,
  formatNumber,
  limitAndFormatNumber,
  roundIntegerNumber,
  stringToBigFloat,
} from '../../../utilities/number';
import { RootState } from '../../store';
import { SwapFormNumberLimits } from './reducer';
import {
  getAvailableMargin,
  getAvailableNotional,
  getEditPositionFixedRate,
  getEditPositionMode,
  getEditPositionNotional,
  getExistingPositionFixedRate,
  getExistingPositionMode,
  getNewPositionFixedRate,
  getVariableRate,
  hasExistingPosition,
} from './utils';

// ------------ General Swap Form State Info ------------
export const selectSubmitButtonInfo = (state: RootState) => state.swapForm.submitButton;
export const selectSwapFormAMM = (state: RootState) => state.swapForm.amm;
export const selectSwapFormPosition = (state: RootState) => state.swapForm.position.value;
export const selectSwapFormPositionFetchingStatus = (state: RootState) =>
  state.swapForm.position.status;
export const selectWalletBalanceInfo = (state: RootState) => state.swapForm.walletBalance;
export const selectFixedRateInfo = (state: RootState) => state.swapForm.fixedRate;
export const selectVariableRateInfo = (state: RootState) => state.swapForm.variableRate;
export const selectPoolSwapInfo = (state: RootState) => state.swapForm.poolSwapInfo;
export const selectSwapFormMode = (state: RootState): 'new' | 'edit' => {
  return hasExistingPosition(state.swapForm) ? 'edit' : 'new';
};

// User Input
export const selectUserInputMode = (state: RootState) => state.swapForm.userInput.mode;
export const selectUserInputNotionalInfo = (state: RootState) =>
  state.swapForm.userInput.notionalAmount;
export const selectUserInputMarginInfo = (state: RootState) =>
  state.swapForm.userInput.marginAmount;

// ------------ Prospective Swap ------------
export const selectProspectiveSwapMode = (state: RootState) => state.swapForm.prospectiveSwap.mode;
export const selectProspectiveSwapNotional = (state: RootState) =>
  state.swapForm.prospectiveSwap.notionalAmount;
export const selectProspectiveSwapMargin = (state: RootState) =>
  state.swapForm.prospectiveSwap.marginAmount;

export const selectLeverage = (state: RootState) => state.swapForm.userInput.leverage;
export const selectInfoPostSwap = (state: RootState) => state.swapForm.prospectiveSwap.infoPostSwap;
export const selectIsMarginRequiredError = (state: RootState) => {
  return (
    state.swapForm.userInput.marginAmount.error !== null &&
    state.swapForm.userInput.marginAmount.error !== 'WLT'
  );
};
export const selectIsWalletMarginError = (state: RootState) => {
  return state.swapForm.userInput.marginAmount.error === 'WLT';
};
export const selectBottomRightMarginNumber = (state: RootState) => {
  const swapFormState = state.swapForm;
  if (
    hasExistingPosition(swapFormState) &&
    swapFormState.userInput.marginAmount.editMode === 'remove' &&
    swapFormState.prospectiveSwap.infoPostSwap.status === 'success'
  ) {
    return limitAndFormatNumber(
      getAvailableMargin(swapFormState),
      SwapFormNumberLimits.digitLimit,
      SwapFormNumberLimits.decimalLimit,
      'floor',
    );
  }

  if (swapFormState.prospectiveSwap.infoPostSwap.status === 'success') {
    return limitAndFormatNumber(
      swapFormState.prospectiveSwap.infoPostSwap.value.marginRequirement,
      SwapFormNumberLimits.digitLimit,
      SwapFormNumberLimits.decimalLimit,
      'ceil',
    );
  }

  return null;
};

export const selectAvailableNotional = (state: RootState) => {
  return getAvailableNotional(state.swapForm);
};

export const selectNewPositionReceivingRate = (state: RootState) => {
  return state.swapForm.prospectiveSwap.mode === 'fixed'
    ? getNewPositionFixedRate(state.swapForm)
    : getVariableRate(state.swapForm);
};
export const selectNewPositionPayingRate = (state: RootState) => {
  return state.swapForm.prospectiveSwap.mode === 'fixed'
    ? getVariableRate(state.swapForm)
    : getNewPositionFixedRate(state.swapForm);
};
export const selectNewPositionCompactNotional = (state: RootState) => {
  if (state.swapForm.userInput.notionalAmount.error) return null;

  const compactParts = compactFormatToParts(state.swapForm.prospectiveSwap.notionalAmount);
  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

export const selectExistingPositionMode = (state: RootState) => {
  return getExistingPositionMode(state.swapForm);
};
export const selectExistingPositionReceivingRate = (state: RootState) => {
  return getExistingPositionMode(state.swapForm) === 'fixed'
    ? getExistingPositionFixedRate(state.swapForm)
    : getVariableRate(state.swapForm);
};
export const selectExistingPositionPayingRate = (state: RootState) => {
  return getExistingPositionMode(state.swapForm) === 'fixed'
    ? getVariableRate(state.swapForm)
    : getExistingPositionFixedRate(state.swapForm);
};
export const selectExistingPositionCompactNotional = (state: RootState) => {
  if (state.swapForm.position.status !== 'success' || !state.swapForm.position.value) {
    return null;
  }

  const compactParts = compactFormatToParts(state.swapForm.position.value.notional);
  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

export const selectEditPositionMode = (state: RootState) => {
  return getEditPositionMode(state.swapForm);
};
export const selectEditPositionReceivingRate = (state: RootState) => {
  return getEditPositionMode(state.swapForm) === 'fixed'
    ? getEditPositionFixedRate(state.swapForm)
    : getVariableRate(state.swapForm);
};
export const selectEditPositionPayingRate = (state: RootState) => {
  return getEditPositionMode(state.swapForm) === 'fixed'
    ? getVariableRate(state.swapForm)
    : getEditPositionFixedRate(state.swapForm);
};
export const selectEditPositionCompactNotional = (state: RootState) => {
  const notional = getEditPositionNotional(state.swapForm);

  const compactParts = compactFormatToParts(notional);
  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

// ------------ Cashflow Calculator Selectors ------------
export const selectCashflowCalculatorStatus = (state: RootState) =>
  state.swapForm.cashflowCalculator.variableFactorStartNow.status;
export const selectPredictedApy = (state: RootState) =>
  state.swapForm.cashflowCalculator.predictedApy;
export const selectAdditionalCashflow = (state: RootState) =>
  state.swapForm.cashflowCalculator.additionalCashflow;
export const selectTotalCashflow = (state: RootState) =>
  state.swapForm.cashflowCalculator.totalCashflow;

// ------------ Swap Confirmation Flow Selectors ------------
export const selectSwapConfirmationFlowStep = (state: RootState) =>
  state.swapForm.swapConfirmationFlow.step;
export const selectSwapConfirmationFlowError = (state: RootState) =>
  state.swapForm.swapConfirmationFlow.error;
export const selectSwapConfirmationFlowEtherscanLink = (state: RootState) => {
  return getViewOnEtherScanLink(
    state.network.chainId,
    state.swapForm.swapConfirmationFlow.txHash || '',
  );
};

// ------------ Margin Update Confirmation Flow Selectors ------------
export const selectMarginUpdateConfirmationFlowStep = (state: RootState) =>
  state.swapForm.marginUpdateConfirmationFlow.step;
export const selectMarginUpdateConfirmationFlowError = (state: RootState) =>
  state.swapForm.marginUpdateConfirmationFlow.error;
export const selectMarginUpdateConfirmationFlowEtherscanLink = (state: RootState) => {
  return getViewOnEtherScanLink(
    state.network.chainId,
    state.swapForm.marginUpdateConfirmationFlow.txHash || '',
  );
};

// ------------ Variable Rate Delta ------------
export const selectVariableRate24hDelta = (state: RootState) => {
  return state.swapForm.variableRate24hAgo.status === 'success' &&
    state.swapForm.variableRate.status === 'success'
    ? stringToBigFloat(
        formatNumber(state.swapForm.variableRate.value - state.swapForm.variableRate24hAgo.value),
      )
    : undefined;
};

// ------------ Submit button text ------------
export const selectSubmitButtonText = (state: RootState) => {
  switch (state.swapForm.submitButton.state) {
    case 'swap':
      return 'Swap';
    case 'margin-update':
      return 'Update margin';
    case 'not-enough-balance':
      return 'Not enough balance';
    case 'approve':
      return `Approve ${
        state.swapForm.amm ? state.swapForm.amm.underlyingToken.name.toUpperCase() : ''
      }`;
    case 'approving':
      return `Approving...`;
    case 'connect-wallet':
      return 'Connect Your Wallet to Start Trading';
  }
};

// ------------ Leverage ------------
export const selectIsLeverageDisabled = (state: RootState) => {
  return state.swapForm.prospectiveSwap.notionalAmount === 0;
};

export const selectShowLeverageNotification = (state: RootState) =>
  state.swapForm.showLowLeverageNotification;

export const selectLeverageOptions = (state: RootState) => {
  const swapFormState = state.swapForm;

  let maxLeverage = '--';
  if (swapFormState.prospectiveSwap.infoPostSwap.status === 'idle') {
    maxLeverage = formatNumber(
      Math.floor(swapFormState.poolSwapInfo.maxLeverage[swapFormState.prospectiveSwap.mode]),
      0,
      0,
    );
  }
  if (
    !swapFormState.userInput.notionalAmount.error &&
    swapFormState.prospectiveSwap.infoPostSwap.status === 'success'
  ) {
    if (swapFormState.prospectiveSwap.infoPostSwap.value.marginRequirement > 0) {
      maxLeverage = formatNumber(
        Math.floor(
          swapFormState.prospectiveSwap.notionalAmount /
            swapFormState.prospectiveSwap.infoPostSwap.value.marginRequirement,
        ),
        0,
        0,
      );
    } else {
      maxLeverage = formatNumber(
        Math.floor(swapFormState.poolSwapInfo.maxLeverage[swapFormState.prospectiveSwap.mode]),
        0,
        0,
      );
    }
  }

  let leverageOptions = [0, 0, 0];
  if (maxLeverage !== '--') {
    let maxLeverageOption = stringToBigFloat(maxLeverage);
    maxLeverageOption = roundIntegerNumber(
      maxLeverageOption,
      Math.max(
        0,
        Math.floor(maxLeverageOption.toString().length / 2) -
          1 +
          (maxLeverageOption.toString().length % 2),
      ),
    );
    leverageOptions = [
      Math.floor(maxLeverageOption / 4),
      Math.floor(maxLeverageOption / 2),
      Math.floor(maxLeverageOption),
    ];
  }

  return {
    maxLeverage,
    leverageOptions,
  };
};
