import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';

import { formatNumber } from '../../../../../utilities/number';
import { RootState } from '../../../../store';
import { mapMarginAccountToMarginAccountUI } from '../../../_common';
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

export const selectPoolMaturityFormatted = (state: RootState) => {
  return formatPoolMaturity(selectSwapFormPool(state));
};

export const selectSwapFormMarginAccount = (state: RootState) => {
  return state.swapForm.marginAccount;
};

export const selectSwapFormMarginAccountUI = (state: RootState) => {
  const marginAccount = selectSwapFormMarginAccount(state);
  if (!marginAccount) {
    return null;
  }
  return mapMarginAccountToMarginAccountUI(marginAccount);
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

export const selectMaxAvailableNotionalFormatted = (state: RootState) => {
  if (state.swapForm.maxNotionalAvailable.status !== 'success') {
    return '--';
  }
  return formatNumber(getMaxAvailableNotional(state.swapForm));
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

export const selectMarginRequirementFormatted = (state: RootState) => {
  return state.swapForm.prospectiveSwap.swapSimulation.status === 'success'
    ? formatNumber(state.swapForm.prospectiveSwap.swapSimulation.value.marginRequirement, 2, 4)
    : '--';
};
