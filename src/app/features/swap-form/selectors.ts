import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';

import { formatTimestamp } from '../../../utilities/date';
import { formatNumber, stringToBigFloat } from '../../../utilities/number';
import { RootState } from '../../store';
import {
  getAvailableMargin,
  getAvailableNotional,
  getEditPositionFixedRate,
  getEditPositionMode,
  getEditPositionNotional,
  getEditPositionVariableRate,
  getExistingPositionFixedRate,
  getExistingPositionMode,
  getExistingPositionVariableRate,
  getNewPositionFixedRate,
  getProspectiveSwapMargin,
  getProspectiveSwapMode,
  getProspectiveSwapNotional,
  getRealizedPnLFromFees,
  getRealizedPnLFromSwaps,
  getUnrealizedPnLFromSwaps,
  getVariableRate,
  hasExistingPosition,
  swapFormCompactFormat,
  swapFormCompactFormatToParts,
  swapFormFormatNumber,
  swapFormLimitAndFormatNumber,
} from './utils';

// ------------ General Swap Form State Info ------------
export const selectSubmitButtonInfo = (state: RootState) => state.swapForm.submitButton;
export const selectSwapFormAMM = (state: RootState) => state.swapForm.amm;
export const selectSwapFormPosition = (state: RootState) => state.swapForm.position.value;
export const selectSwapFormPositionFetchingStatus = (state: RootState) =>
  state.swapForm.position.status;
export const selectWalletBalance = (state: RootState) => {
  if (state.swapForm.walletBalance.status !== 'success') {
    return '--';
  }

  return swapFormCompactFormat(state.swapForm.walletBalance.value);
};
export const selectFixedRateInfo = (state: RootState) => state.swapForm.fixedRate;
export const selectVariableRateInfo = (state: RootState) => state.swapForm.variableRate;
export const selectPoolSwapInfoStatus = (state: RootState) => state.swapForm.poolSwapInfo.status;
export const selectSwapFormMode = (state: RootState): 'new' | 'edit' => {
  return hasExistingPosition(state.swapForm) ? 'edit' : 'new';
};

export const selectAMMTokenFormatted = (state: RootState) => {
  const aMM = selectSwapFormAMM(state);
  if (!aMM) {
    return '';
  }
  return ` ${aMM.underlyingToken.name.toUpperCase()}`;
};

export const selectAMMMaturityFormatted = (state: RootState) => {
  const aMM = selectSwapFormAMM(state);
  if (!aMM) {
    return '';
  }
  return formatTimestamp(aMM.termEndTimestampInMS);
};

export const selectMarginAccountName = (state: RootState) => {
  const aMM = selectSwapFormAMM(state);
  if (!aMM) {
    return '';
  }
  return `${aMM.protocol} ${selectAMMMaturityFormatted(state)}`;
};

// User Input
export const selectUserInputMode = (state: RootState) => state.swapForm.userInput.mode;
export const selectUserInputNotionalInfo = (state: RootState) =>
  state.swapForm.userInput.notionalAmount;
export const selectUserInputMarginInfo = (state: RootState) =>
  state.swapForm.userInput.marginAmount;

// ------------ Prospective Swap ------------
export const selectProspectiveSwapMode = (state: RootState) =>
  getProspectiveSwapMode(state.swapForm);
export const selectProspectiveSwapNotionalFormatted = (state: RootState) => {
  return swapFormCompactFormat(getProspectiveSwapNotional(state.swapForm));
};
export const selectProspectiveSwapMarginFormatted = (state: RootState) => {
  if (state.swapForm.userInput.marginAmount.editMode === 'add') {
    return swapFormCompactFormat(
      getProspectiveSwapMargin(state.swapForm) -
        state.swapForm.prospectiveSwap.infoPostSwap.value.fee,
    );
  }
  return swapFormCompactFormat(getProspectiveSwapMargin(state.swapForm));
};
export const selectProspectiveSwapFeeFormatted = (state: RootState) => {
  if (state.swapForm.prospectiveSwap.infoPostSwap.status === 'success') {
    return swapFormFormatNumber(state.swapForm.prospectiveSwap.infoPostSwap.value.fee);
  }

  return '--';
};

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

  if (swapFormState.userInput.marginAmount.editMode === 'remove') {
    const margin = getAvailableMargin(swapFormState);
    if (margin === null) {
      return null;
    }
    return swapFormLimitAndFormatNumber(margin, 'floor');
  }

  if (swapFormState.prospectiveSwap.infoPostSwap.status === 'success') {
    return swapFormLimitAndFormatNumber(
      swapFormState.prospectiveSwap.infoPostSwap.value.marginRequirement,
      'ceil',
    );
  }

  return null;
};

export const selectAvailableNotional = (state: RootState) => {
  return getAvailableNotional(state.swapForm);
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

  const compactParts = swapFormCompactFormatToParts(getProspectiveSwapNotional(state.swapForm));

  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

export const selectExistingPositionMode = (state: RootState) => {
  return getExistingPositionMode(state.swapForm);
};
export const selectExistingPositionReceivingRateFormatted = (state: RootState) => {
  const receivingRate =
    getExistingPositionMode(state.swapForm) === 'fixed'
      ? getExistingPositionFixedRate(state.swapForm)
      : getExistingPositionVariableRate(state.swapForm);

  return receivingRate === null ? '--' : swapFormFormatNumber(receivingRate);
};
export const selectExistingPositionPayingRateFormatted = (state: RootState) => {
  const payingRate =
    getExistingPositionMode(state.swapForm) === 'fixed'
      ? getExistingPositionVariableRate(state.swapForm)
      : getExistingPositionFixedRate(state.swapForm);

  return payingRate === null ? '--' : swapFormFormatNumber(payingRate);
};
export const selectExistingPositionCompactNotional = (state: RootState) => {
  if (state.swapForm.position.status !== 'success' || !state.swapForm.position.value) {
    return null;
  }

  const compactParts = swapFormCompactFormatToParts(state.swapForm.position.value.notional);
  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

export const selectEditPositionMode = (state: RootState) => {
  return getEditPositionMode(state.swapForm);
};
export const selectEditPositionReceivingRateFormatted = (state: RootState) => {
  const receivingRate =
    getEditPositionMode(state.swapForm) === 'fixed'
      ? getEditPositionFixedRate(state.swapForm)
      : getEditPositionVariableRate(state.swapForm);

  return receivingRate === null ? '--' : swapFormFormatNumber(receivingRate);
};

export const selectEditPositionRealizedPnLTotalFormatted = (state: RootState) => {
  const realizedPnLFromFees = getRealizedPnLFromFees(state.swapForm);
  const realizedPnLFromSwaps = getRealizedPnLFromSwaps(state.swapForm);
  let realizedPnLTotal = null;

  if (realizedPnLFromFees && realizedPnLFromSwaps) {
    realizedPnLTotal = realizedPnLFromFees + realizedPnLFromSwaps;
  }

  return realizedPnLTotal === null ? '--' : swapFormFormatNumber(realizedPnLTotal);
};

export const selectEditPositionRealizedPnLFromFeesFormatted = (state: RootState) => {
  const realizedPnLFromFees = getRealizedPnLFromFees(state.swapForm);

  return realizedPnLFromFees === null ? '--' : swapFormFormatNumber(realizedPnLFromFees);
};

export const selectEditPositionRealizedPnLFromSwapsFormatted = (state: RootState) => {
  const realizedPnLFromSwaps = getRealizedPnLFromSwaps(state.swapForm);

  return realizedPnLFromSwaps === null ? '--' : swapFormFormatNumber(realizedPnLFromSwaps);
};

export const selectEditPositionUnrealizedPnLFromSwapsFormatted = (state: RootState) => {
  const unrealizedPnLFromSwaps = getUnrealizedPnLFromSwaps(state.swapForm);

  return unrealizedPnLFromSwaps === null ? '--' : swapFormFormatNumber(unrealizedPnLFromSwaps);
};

export const selectEditPositionPayingRateFormatted = (state: RootState) => {
  const payingRate =
    getEditPositionMode(state.swapForm) === 'fixed'
      ? getEditPositionVariableRate(state.swapForm)
      : getEditPositionFixedRate(state.swapForm);

  return payingRate === null ? '--' : swapFormFormatNumber(payingRate);
};

export const selectEditPositionCompactNotional = (state: RootState) => {
  const notional = getEditPositionNotional(state.swapForm);

  const compactParts = swapFormCompactFormatToParts(notional);
  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

// ------------ Cashflow Info Selectors ------------
export const selectEstimatedApy = (state: RootState) => state.swapForm.userInput.estimatedApy;
export const selectCashflowInfoStatus = (state: RootState) =>
  state.swapForm.prospectiveSwap.cashflowInfo.status;
export const selectAccruedCashflowExistingPositionFormatted = (state: RootState) => {
  if (state.swapForm.prospectiveSwap.cashflowInfo.status === 'pending') {
    return '--';
  }
  return swapFormFormatNumber(
    state.swapForm.prospectiveSwap.cashflowInfo.accruedCashflowExistingPosition,
  );
};
export const selectAccruedCashflowEditPositionFormatted = (state: RootState) => {
  if (state.swapForm.prospectiveSwap.cashflowInfo.status === 'pending') {
    return '--';
  }
  return swapFormFormatNumber(
    state.swapForm.prospectiveSwap.cashflowInfo.accruedCashflowEditPosition,
  );
};
export const selectAdditionalCashflow = (state: RootState) => {
  if (state.swapForm.prospectiveSwap.cashflowInfo.status !== 'success') {
    return null;
  }

  return state.swapForm.prospectiveSwap.cashflowInfo.estimatedAdditionalCashflow(
    state.swapForm.userInput.estimatedApy,
  );
};

export const selectTotalCashflow = (state: RootState) => {
  if (state.swapForm.prospectiveSwap.cashflowInfo.status !== 'success') {
    return null;
  }

  return state.swapForm.prospectiveSwap.cashflowInfo.estimatedTotalCashflow(
    state.swapForm.userInput.estimatedApy,
  );
};

export const selectSlippageFormatted = (state: RootState) => {
  if (
    state.swapForm.fixedRate.status !== 'success' ||
    state.swapForm.prospectiveSwap.infoPostSwap.status !== 'success'
  ) {
    return '--';
  }

  if (state.swapForm.prospectiveSwap.infoPostSwap.value.variableTokenDeltaBalance === 0) {
    return swapFormFormatNumber(0);
  }

  const slippage = Math.abs(
    state.swapForm.prospectiveSwap.infoPostSwap.value.averageFixedRate -
      state.swapForm.fixedRate.value,
  );

  return swapFormFormatNumber(slippage);
};

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
        formatNumber(
          state.swapForm.variableRate.value - state.swapForm.variableRate24hAgo.value,
          0,
          3,
        ),
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
  return getProspectiveSwapNotional(state.swapForm) === 0;
};

export const selectShowLeverageNotification = (state: RootState) =>
  state.swapForm.showLowLeverageNotification;

export const selectLeverageOptions = (state: RootState) => {
  const swapFormState = state.swapForm;

  return {
    maxLeverage: swapFormState.prospectiveSwap.leverage.maxLeverage,
    leverageOptions: swapFormState.prospectiveSwap.leverage.options.map(String),
  };
};

export const selectIsGetInfoPostSwapLoading = (state: RootState) => {
  return state.swapForm.prospectiveSwap.infoPostSwap.status === 'pending';
};

export const selectPositionMarginFormatted = (state: RootState) => {
  if (!state.swapForm.position.value) {
    return '--';
  }
  return swapFormCompactFormat(state.swapForm.position.value.margin);
};

export const selectFixedRateValueFormatted = (state: RootState) => {
  return state.swapForm.fixedRate.status !== 'success'
    ? '--'
    : formatNumber(state.swapForm.fixedRate.value);
};

export const selectVariableRateValueFormatted = (state: RootState) => {
  return state.swapForm.variableRate.status !== 'success'
    ? '--'
    : formatNumber(state.swapForm.variableRate.value);
};

export const selectMarginRequirementFormatted = (state: RootState) => {
  return state.swapForm.prospectiveSwap.infoPostSwap.status === 'success'
    ? formatNumber(state.swapForm.prospectiveSwap.infoPostSwap.value.marginRequirement, 2, 4)
    : '--';
};
