import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';

import { formatNumber } from '../../../../../../utilities/number';
import { RootState } from '../../../../../store';
import { formatPoolMaturity, formatUnderlyingTokenName } from '../../../../helpers';
import {
  formCompactFormat,
  formCompactFormatToParts,
  formFormatNumber,
  formLimitAndFormatNumber,
  getGasInfoFormatted,
  getVariableRate24hDelta,
  isLeverageHidden,
} from '../../../common';
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
} from './utils';

export const selectSubmitButtonInfo = (state: RootState) => state.deprecatedSwapForm.submitButton;
export const selectSwapFormAMM = (state: RootState) => state.deprecatedSwapForm.amm;
export const selectSwapFormPosition = (state: RootState) => state.deprecatedSwapForm.position.value;
export const selectSwapFormPositionFetchingStatus = (state: RootState) =>
  state.deprecatedSwapForm.position.status;
export const selectWalletBalance = (state: RootState) => {
  if (state.deprecatedSwapForm.walletBalance.status !== 'success') {
    return '--';
  }

  return formCompactFormat(state.deprecatedSwapForm.walletBalance.value);
};
export const selectFixedRateInfo = (state: RootState) => state.deprecatedSwapForm.amm?.fixedApr;
export const selectVariableRateInfo = (state: RootState) =>
  state.deprecatedSwapForm.amm?.variableApy;
export const selectPoolSwapInfoStatus = (state: RootState) =>
  state.deprecatedSwapForm.poolSwapInfo.status;
export const selectSwapFormMode = (state: RootState): 'new' | 'edit' => {
  return hasExistingPosition(state.deprecatedSwapForm) ? 'edit' : 'new';
};

export const selectAMMTokenFormatted = (state: RootState) => {
  return formatUnderlyingTokenName(selectSwapFormAMM(state));
};

export const selectAMMMaturityFormatted = (state: RootState) => {
  return formatPoolMaturity(selectSwapFormAMM(state));
};

export const selectMarginAccountName = (state: RootState) => {
  const aMM = selectSwapFormAMM(state);
  if (!aMM) {
    return '';
  }
  return `${aMM.protocol} ${selectAMMMaturityFormatted(state)}`;
};

// User Input
export const selectUserInputMode = (state: RootState) => state.deprecatedSwapForm.userInput.mode;
export const selectUserInputNotionalInfo = (state: RootState) =>
  state.deprecatedSwapForm.userInput.notionalAmount;
export const selectUserInputMarginInfo = (state: RootState) =>
  state.deprecatedSwapForm.userInput.marginAmount;

export const selectProspectiveSwapMode = (state: RootState) =>
  getProspectiveSwapMode(state.deprecatedSwapForm);
export const selectProspectiveSwapNotionalFormatted = (state: RootState) => {
  return formCompactFormat(getProspectiveSwapNotional(state.deprecatedSwapForm));
};
export const selectProspectiveSwapMarginFormatted = (state: RootState) => {
  if (state.deprecatedSwapForm.userInput.marginAmount.editMode === 'add') {
    return formCompactFormat(
      getProspectiveSwapMargin(state.deprecatedSwapForm) -
        state.deprecatedSwapForm.prospectiveSwap.infoPostSwap.value.fee,
    );
  }
  return formCompactFormat(getProspectiveSwapMargin(state.deprecatedSwapForm));
};
export const selectProspectiveSwapFeeFormatted = (state: RootState) => {
  if (state.deprecatedSwapForm.prospectiveSwap.infoPostSwap.status === 'success') {
    return formFormatNumber(state.deprecatedSwapForm.prospectiveSwap.infoPostSwap.value.fee);
  }

  return '--';
};

export const selectGasInfoFormatted = (state: RootState) => {
  const infoPostSwap = state.deprecatedSwapForm.prospectiveSwap.infoPostSwap;
  return getGasInfoFormatted({
    status: infoPostSwap.status,
    gasDetails: infoPostSwap.value.gasFee,
  });
};

export const selectLeverage = (state: RootState) => state.deprecatedSwapForm.userInput.leverage;
export const selectInfoPostSwap = (state: RootState) =>
  state.deprecatedSwapForm.prospectiveSwap.infoPostSwap;
export const selectInfoPostSwapAverageFixedRate = (state: RootState) =>
  state.deprecatedSwapForm.prospectiveSwap.infoPostSwap.status !== 'success'
    ? null
    : state.deprecatedSwapForm.prospectiveSwap.infoPostSwap.value.averageFixedRate;
export const selectInfoPostSwapVariableTokenDeltaBalance = (state: RootState) =>
  state.deprecatedSwapForm.prospectiveSwap.infoPostSwap.status !== 'success'
    ? null
    : state.deprecatedSwapForm.prospectiveSwap.infoPostSwap.value.variableTokenDeltaBalance;

export const selectIsMarginRequiredError = (state: RootState) => {
  return (
    state.deprecatedSwapForm.userInput.marginAmount.error !== null &&
    state.deprecatedSwapForm.userInput.marginAmount.error !== 'WLT'
  );
};
export const selectIsWalletMarginError = (state: RootState) => {
  return state.deprecatedSwapForm.userInput.marginAmount.error === 'WLT';
};
export const selectBottomRightMarginNumber = (state: RootState) => {
  const swapFormState = state.deprecatedSwapForm;

  if (swapFormState.userInput.marginAmount.editMode === 'remove') {
    const margin = getAvailableMargin(swapFormState);
    if (margin === null) {
      return null;
    }
    return formLimitAndFormatNumber(margin, 'floor');
  }

  if (swapFormState.prospectiveSwap.infoPostSwap.status === 'success') {
    return formLimitAndFormatNumber(
      swapFormState.prospectiveSwap.infoPostSwap.value.marginRequirement,
      'ceil',
    );
  }

  return null;
};

export const selectAvailableNotional = (state: RootState) => {
  return getAvailableNotional(state.deprecatedSwapForm);
};

export const selectNewPositionReceivingRate = (state: RootState) => {
  return getProspectiveSwapMode(state.deprecatedSwapForm) === 'fixed'
    ? getNewPositionFixedRate(state.deprecatedSwapForm)
    : getVariableRate(state.deprecatedSwapForm);
};
export const selectNewPositionPayingRate = (state: RootState) => {
  return getProspectiveSwapMode(state.deprecatedSwapForm) === 'fixed'
    ? getVariableRate(state.deprecatedSwapForm)
    : getNewPositionFixedRate(state.deprecatedSwapForm);
};
export const selectNewPositionCompactNotional = (state: RootState) => {
  if (state.deprecatedSwapForm.userInput.notionalAmount.error) return null;

  const compactParts = formCompactFormatToParts(
    getProspectiveSwapNotional(state.deprecatedSwapForm),
  );

  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

export const selectExistingPositionMode = (state: RootState) => {
  return getExistingPositionMode(state.deprecatedSwapForm);
};
export const selectExistingPositionReceivingRateFormatted = (state: RootState) => {
  const receivingRate =
    getExistingPositionMode(state.deprecatedSwapForm) === 'fixed'
      ? getExistingPositionFixedRate(state.deprecatedSwapForm)
      : getExistingPositionVariableRate(state.deprecatedSwapForm);

  return receivingRate === null ? '--' : formFormatNumber(receivingRate);
};
export const selectExistingPositionPayingRateFormatted = (state: RootState) => {
  const payingRate =
    getExistingPositionMode(state.deprecatedSwapForm) === 'fixed'
      ? getExistingPositionVariableRate(state.deprecatedSwapForm)
      : getExistingPositionFixedRate(state.deprecatedSwapForm);

  return payingRate === null ? '--' : formFormatNumber(payingRate);
};
export const selectExistingPositionCompactNotional = (state: RootState) => {
  if (
    state.deprecatedSwapForm.position.status !== 'success' ||
    !state.deprecatedSwapForm.position.value
  ) {
    return null;
  }

  const compactParts = formCompactFormatToParts(state.deprecatedSwapForm.position.value.notional);
  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

export const selectEditPositionMode = (state: RootState) => {
  return getEditPositionMode(state.deprecatedSwapForm);
};
export const selectEditPositionReceivingRateFormatted = (state: RootState) => {
  const receivingRate =
    getEditPositionMode(state.deprecatedSwapForm) === 'fixed'
      ? getEditPositionFixedRate(state.deprecatedCashflowCalculator, state.deprecatedSwapForm)
      : getEditPositionVariableRate(state.deprecatedSwapForm);

  return receivingRate === null ? '--' : formFormatNumber(receivingRate);
};

export const selectEditPositionRealizedPnLTotalFormatted = (state: RootState) => {
  const realizedPnLFromFees = getRealizedPnLFromFees(state.deprecatedSwapForm);
  const realizedPnLFromSwaps = getRealizedPnLFromSwaps(state.deprecatedSwapForm);
  let realizedPnLTotal = null;

  if (realizedPnLFromFees !== null && realizedPnLFromSwaps !== null) {
    realizedPnLTotal = realizedPnLFromFees + realizedPnLFromSwaps;
  }

  return realizedPnLTotal === null ? '--' : formFormatNumber(realizedPnLTotal);
};

export const selectEditPositionRealizedPnLFromFeesFormatted = (state: RootState) => {
  const realizedPnLFromFees = getRealizedPnLFromFees(state.deprecatedSwapForm);

  return realizedPnLFromFees === null ? '--' : formFormatNumber(realizedPnLFromFees);
};

export const selectEditPositionRealizedPnLFromSwapsFormatted = (state: RootState) => {
  const realizedPnLFromSwaps = getRealizedPnLFromSwaps(state.deprecatedSwapForm);

  return realizedPnLFromSwaps === null ? '--' : formFormatNumber(realizedPnLFromSwaps);
};

export const selectEditPositionUnrealizedPnLFromSwapsFormatted = (state: RootState) => {
  const unrealizedPnLFromSwaps = getUnrealizedPnLFromSwaps(state.deprecatedSwapForm);

  return unrealizedPnLFromSwaps === null ? '--' : formFormatNumber(unrealizedPnLFromSwaps);
};

export const selectEditPositionPayingRateFormatted = (state: RootState) => {
  const payingRate =
    getEditPositionMode(state.deprecatedSwapForm) === 'fixed'
      ? getEditPositionVariableRate(state.deprecatedSwapForm)
      : getEditPositionFixedRate(state.deprecatedCashflowCalculator, state.deprecatedSwapForm);

  return payingRate === null ? '--' : formFormatNumber(payingRate);
};

export const selectEditPositionCompactNotional = (state: RootState) => {
  const notional = getEditPositionNotional(state.deprecatedSwapForm);

  const compactParts = formCompactFormatToParts(notional);
  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

export const selectSlippageFormatted = (state: RootState) => {
  if (
    !state.deprecatedSwapForm.amm ||
    state.deprecatedSwapForm.prospectiveSwap.infoPostSwap.status !== 'success'
  ) {
    return '--';
  }

  if (state.deprecatedSwapForm.prospectiveSwap.infoPostSwap.value.variableTokenDeltaBalance === 0) {
    return formFormatNumber(0);
  }

  const slippage = Math.abs(
    state.deprecatedSwapForm.prospectiveSwap.infoPostSwap.value.averageFixedRate -
      state.deprecatedSwapForm.amm.fixedApr,
  );

  return formFormatNumber(slippage);
};

export const selectSwapConfirmationFlowStep = (state: RootState) =>
  state.deprecatedSwapForm.swapConfirmationFlow.step;
export const selectSwapConfirmationFlowError = (state: RootState) =>
  state.deprecatedSwapForm.swapConfirmationFlow.error;
export const selectSwapConfirmationFlowEtherscanLink = (state: RootState) => {
  return getViewOnEtherScanLink(
    state.network.chainId,
    state.deprecatedSwapForm.swapConfirmationFlow.txHash || '',
  );
};

export const selectMarginUpdateConfirmationFlowStep = (state: RootState) =>
  state.deprecatedSwapForm.marginUpdateConfirmationFlow.step;
export const selectMarginUpdateConfirmationFlowError = (state: RootState) =>
  state.deprecatedSwapForm.marginUpdateConfirmationFlow.error;
export const selectMarginUpdateConfirmationFlowEtherscanLink = (state: RootState) => {
  return getViewOnEtherScanLink(
    state.network.chainId,
    state.deprecatedSwapForm.marginUpdateConfirmationFlow.txHash || '',
  );
};

export const selectVariableRate24hDelta = (state: RootState) => {
  return getVariableRate24hDelta(state.deprecatedSwapForm.amm);
};

export const selectSubmitButtonText = (state: RootState) => {
  switch (state.deprecatedSwapForm.submitButton.state) {
    case 'swap':
      return 'Swap';
    case 'margin-update':
      return 'Update margin';
    case 'not-enough-balance':
      return 'Not enough balance';
    case 'paused':
      return 'Paused';
    case 'approve':
      return `Approve ${
        state.deprecatedSwapForm.amm
          ? state.deprecatedSwapForm.amm.underlyingToken.name.toUpperCase()
          : ''
      }`;
    case 'approving':
      return `Approving...`;
    case 'connect-wallet':
      return 'Connect Your Wallet to Start Trading';
  }
};

export const selectIsLeverageDisabled = (state: RootState) => {
  return getProspectiveSwapNotional(state.deprecatedSwapForm) === 0;
};

export const selectIsLeverageHidden = (state: RootState) => {
  return isLeverageHidden(state.deprecatedSwapForm.amm);
};

export const selectShowLeverageNotification = (state: RootState) =>
  state.deprecatedSwapForm.showLowLeverageNotification;

export const selectLeverageOptions = (state: RootState) => {
  const swapFormState = state.deprecatedSwapForm;

  return {
    maxLeverage: swapFormState.prospectiveSwap.leverage.maxLeverage,
    leverageOptions: swapFormState.prospectiveSwap.leverage.options.map(String),
  };
};

export const selectIsGetInfoPostSwapLoading = (state: RootState) => {
  return state.deprecatedSwapForm.prospectiveSwap.infoPostSwap.status === 'pending';
};

export const selectPositionMarginFormatted = (state: RootState) => {
  if (!state.deprecatedSwapForm.position.value) {
    return '--';
  }
  return formCompactFormat(state.deprecatedSwapForm.position.value.margin);
};

export const selectFixedRateValueFormatted = (state: RootState) => {
  return !state.deprecatedSwapForm.amm ? '--' : formatNumber(state.deprecatedSwapForm.amm.fixedApr);
};

export const selectVariableRateValueFormatted = (state: RootState) => {
  return !state.deprecatedSwapForm.amm
    ? '--'
    : formatNumber(state.deprecatedSwapForm.amm.variableApy);
};

export const selectMarginRequirementFormatted = (state: RootState) => {
  return state.deprecatedSwapForm.prospectiveSwap.infoPostSwap.status === 'success'
    ? formatNumber(
        state.deprecatedSwapForm.prospectiveSwap.infoPostSwap.value.marginRequirement,
        2,
        4,
      )
    : '--';
};
