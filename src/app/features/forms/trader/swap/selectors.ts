import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';

import { formatNumber } from '../../../../../utilities/number';
import { RootState } from '../../../../store';
import { formatPoolMaturity, formatUnderlyingTokenName } from '../../../helpers';
import {
  formCompactFormat,
  formCompactFormatToParts,
  formFormatNumber,
  getGasInfoFormatted,
  getPoolVariableRate24hDelta,
} from '../../common';
import {
  getAvailableNotional,
  getEditPositionFixedRate,
  getEditPositionMode,
  getEditPositionNotional,
  getEditPositionVariableRate,
  getExistingPositionFixedRate,
  getExistingPositionMode,
  getExistingPositionVariableRate,
  getNewPositionFixedRate,
  getProspectiveSwapMode,
  getProspectiveSwapNotional,
  getRealizedPnLFromFees,
  getRealizedPnLFromSwaps,
  getUnrealizedPnLFromSwaps,
  getVariableRate,
  hasExistingPosition,
} from './utils';

export const selectSubmitButtonInfo = (state: RootState) => state.swapForm.submitButton;
export const selectSwapFormPool = (state: RootState) => state.swapForm.pool;
export const selectSwapFormPosition = (state: RootState) => state.swapForm.position.value;
export const selectSwapFormPositionFetchingStatus = (state: RootState) =>
  state.swapForm.position.status;
export const selectWalletBalance = (state: RootState) => {
  if (state.swapForm.maxNotionalAvailable.status !== 'success') {
    return '--';
  }

  return formCompactFormat(state.swapForm.maxNotionalAvailable.value);
};
export const selectFixedRateInfo = (state: RootState) => state.swapForm.pool?.currentFixedRate;
export const selectVariableRateInfo = (state: RootState) =>
  state.swapForm.pool?.currentVariableRate;
export const selectSwapFormMode = (state: RootState): 'new' | 'edit' => {
  return hasExistingPosition(state.swapForm) ? 'edit' : 'new';
};

export const selectAMMTokenFormatted = (state: RootState) => {
  return formatUnderlyingTokenName(selectSwapFormPool(state));
};

export const selectPoolMaturityFormatted = (state: RootState) => {
  return formatPoolMaturity(selectSwapFormPool(state));
};

export const selectMarginAccountName = (state: RootState) => {
  const aMM = selectSwapFormPool(state);
  if (!aMM) {
    return '';
  }
  return `${selectPoolMaturityFormatted(state)}`;
};

// User Input
export const selectUserInputMode = (state: RootState) => state.swapForm.userInput.mode;
export const selectUserInputNotionalInfo = (state: RootState) =>
  state.swapForm.userInput.notionalAmount;

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

export const selectGasInfoFormatted = (state: RootState) => {
  const infoPostSwap = state.swapForm.prospectiveSwap.swapSimulation;
  return getGasInfoFormatted({
    status: infoPostSwap.status,
    gasDetails: infoPostSwap.value.gasFee,
  });
};

export const selectInfoPostSwap = (state: RootState) =>
  state.swapForm.prospectiveSwap.swapSimulation;
export const selectInfoPostSwapAverageFixedRate = (state: RootState) =>
  state.swapForm.prospectiveSwap.swapSimulation.status !== 'success'
    ? null
    : state.swapForm.prospectiveSwap.swapSimulation.value.averageFixedRate;
export const selectInfoPostSwapVariableTokenDeltaBalance = (state: RootState) =>
  state.swapForm.prospectiveSwap.swapSimulation.status !== 'success'
    ? null
    : state.swapForm.prospectiveSwap.swapSimulation.value.variableTokenDeltaBalance;

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

  const compactParts = formCompactFormatToParts(getProspectiveSwapNotional(state.swapForm));

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

  return receivingRate === null ? '--' : formFormatNumber(receivingRate);
};
export const selectExistingPositionPayingRateFormatted = (state: RootState) => {
  const payingRate =
    getExistingPositionMode(state.swapForm) === 'fixed'
      ? getExistingPositionVariableRate(state.swapForm)
      : getExistingPositionFixedRate(state.swapForm);

  return payingRate === null ? '--' : formFormatNumber(payingRate);
};
export const selectExistingPositionCompactNotional = (state: RootState) => {
  if (state.swapForm.position.status !== 'success' || !state.swapForm.position.value) {
    return null;
  }

  const compactParts = formCompactFormatToParts(state.swapForm.position.value.notional);
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
      ? getEditPositionFixedRate(state.cashflowCalculator, state.swapForm)
      : getEditPositionVariableRate(state.swapForm);

  return receivingRate === null ? '--' : formFormatNumber(receivingRate);
};

export const selectEditPositionRealizedPnLTotalFormatted = (state: RootState) => {
  const realizedPnLFromFees = getRealizedPnLFromFees(state.swapForm);
  const realizedPnLFromSwaps = getRealizedPnLFromSwaps(state.swapForm);
  let realizedPnLTotal = null;

  if (realizedPnLFromFees !== null && realizedPnLFromSwaps !== null) {
    realizedPnLTotal = realizedPnLFromFees + realizedPnLFromSwaps;
  }

  return realizedPnLTotal === null ? '--' : formFormatNumber(realizedPnLTotal);
};

export const selectEditPositionRealizedPnLFromFeesFormatted = (state: RootState) => {
  const realizedPnLFromFees = getRealizedPnLFromFees(state.swapForm);

  return realizedPnLFromFees === null ? '--' : formFormatNumber(realizedPnLFromFees);
};

export const selectEditPositionRealizedPnLFromSwapsFormatted = (state: RootState) => {
  const realizedPnLFromSwaps = getRealizedPnLFromSwaps(state.swapForm);

  return realizedPnLFromSwaps === null ? '--' : formFormatNumber(realizedPnLFromSwaps);
};

export const selectEditPositionUnrealizedPnLFromSwapsFormatted = (state: RootState) => {
  const unrealizedPnLFromSwaps = getUnrealizedPnLFromSwaps(state.swapForm);

  return unrealizedPnLFromSwaps === null ? '--' : formFormatNumber(unrealizedPnLFromSwaps);
};

export const selectEditPositionPayingRateFormatted = (state: RootState) => {
  const payingRate =
    getEditPositionMode(state.swapForm) === 'fixed'
      ? getEditPositionVariableRate(state.swapForm)
      : getEditPositionFixedRate(state.cashflowCalculator, state.swapForm);

  return payingRate === null ? '--' : formFormatNumber(payingRate);
};

export const selectEditPositionCompactNotional = (state: RootState) => {
  const notional = getEditPositionNotional(state.swapForm);

  const compactParts = formCompactFormatToParts(notional);
  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
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
export const selectSwapConfirmationFlowError = (state: RootState) =>
  state.swapForm.swapConfirmationFlow.error;
export const selectSwapConfirmationFlowEtherscanLink = (state: RootState) => {
  return getViewOnEtherScanLink(
    state.network.chainId,
    state.swapForm.swapConfirmationFlow.txHash || '',
  );
};

export const selectVariableRate24hDelta = (state: RootState) => {
  return getPoolVariableRate24hDelta(state.swapForm.pool);
};

export const selectSubmitButtonText = (state: RootState) => {
  switch (state.swapForm.submitButton.state) {
    case 'swap':
      return 'Swap';
    // TODO: FB - Should be part of the deposit flow
    // case 'not-enough-balance':
    //   return 'Not enough balance';
    case 'paused':
      return 'Paused';
    // TODO: FB - Should be part of the deposit flow
    // case 'approve':
    //   return `Approve ${
    //     state.swapForm.pool ? state.swapForm.pool.underlyingToken.name.toUpperCase() : ''
    //   }`;
    // case 'approving':
    //   return `Approving...`;
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

export const selectPositionMarginFormatted = (state: RootState) => {
  if (!state.swapForm.position.value) {
    return '--';
  }
  return formCompactFormat(state.swapForm.position.value.margin);
};

export const selectFixedRateValueFormatted = (state: RootState) => {
  return !state.swapForm.pool ? '--' : formatNumber(state.swapForm.pool.currentFixedRate);
};

export const selectVariableRateValueFormatted = (state: RootState) => {
  return !state.swapForm.pool ? '--' : formatNumber(state.swapForm.pool.currentVariableRate);
};

export const selectMarginRequirementFormatted = (state: RootState) => {
  return state.swapForm.prospectiveSwap.swapSimulation.status === 'success'
    ? formatNumber(state.swapForm.prospectiveSwap.swapSimulation.value.marginRequirement, 2, 4)
    : '--';
};
