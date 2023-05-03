import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';

import { formatTimestamp } from '../../../../utilities/date';
import { formatNumber, stringToBigFloat } from '../../../../utilities/number';
import { RootState } from '../../../store';
import {
  formCompactFormat,
  formCompactFormatToParts,
  formFormatNumber,
  formLimitAndFormatNumber,
} from '../common/utils';
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

export const selectSubmitButtonInfo = (state: RootState) => state.rolloverSwapForm.submitButton;
export const selectSwapFormAMM = (state: RootState) => state.rolloverSwapForm.amm;
export const selectSwapFormPosition = (state: RootState) => state.rolloverSwapForm.position.value;
export const selectSwapFormPositionFetchingStatus = (state: RootState) =>
  state.rolloverSwapForm.position.status;
export const selectWalletBalance = (state: RootState) => {
  if (state.rolloverSwapForm.walletBalance.status !== 'success') {
    return '--';
  }

  return formCompactFormat(state.rolloverSwapForm.walletBalance.value);
};
export const selectFixedRateInfo = (state: RootState) => state.rolloverSwapForm.amm?.fixedApr;
export const selectVariableRateInfo = (state: RootState) => state.rolloverSwapForm.amm?.variableApy;
export const selectPoolSwapInfoStatus = (state: RootState) =>
  state.rolloverSwapForm.poolSwapInfo.status;
export const selectSwapFormMode = (state: RootState): 'new' | 'edit' => {
  return hasExistingPosition(state.rolloverSwapForm) ? 'edit' : 'new';
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
export const selectUserInputMode = (state: RootState) => state.rolloverSwapForm.userInput.mode;
export const selectUserInputNotionalInfo = (state: RootState) =>
  state.rolloverSwapForm.userInput.notionalAmount;
export const selectUserInputMarginInfo = (state: RootState) =>
  state.rolloverSwapForm.userInput.marginAmount;

export const selectProspectiveSwapMode = (state: RootState) =>
  getProspectiveSwapMode(state.rolloverSwapForm);
export const selectProspectiveSwapNotionalFormatted = (state: RootState) => {
  return formCompactFormat(getProspectiveSwapNotional(state.rolloverSwapForm));
};
export const selectProspectiveSwapMarginFormatted = (state: RootState) => {
  if (state.rolloverSwapForm.userInput.marginAmount.editMode === 'add') {
    return formCompactFormat(
      getProspectiveSwapMargin(state.rolloverSwapForm) -
        state.rolloverSwapForm.prospectiveSwap.infoPostSwap.value.fee,
    );
  }
  return formCompactFormat(getProspectiveSwapMargin(state.rolloverSwapForm));
};
export const selectProspectiveSwapFeeFormatted = (state: RootState) => {
  if (state.rolloverSwapForm.prospectiveSwap.infoPostSwap.status === 'success') {
    return formFormatNumber(state.rolloverSwapForm.prospectiveSwap.infoPostSwap.value.fee);
  }

  return '--';
};

export const selectLeverage = (state: RootState) => state.rolloverSwapForm.userInput.leverage;
export const selectInfoPostSwap = (state: RootState) =>
  state.rolloverSwapForm.prospectiveSwap.infoPostSwap;
export const selectInfoPostSwapAverageFixedRate = (state: RootState) =>
  state.rolloverSwapForm.prospectiveSwap.infoPostSwap.status !== 'success'
    ? null
    : state.rolloverSwapForm.prospectiveSwap.infoPostSwap.value.averageFixedRate;
export const selectInfoPostSwapVariableTokenDeltaBalance = (state: RootState) =>
  state.rolloverSwapForm.prospectiveSwap.infoPostSwap.status !== 'success'
    ? null
    : state.rolloverSwapForm.prospectiveSwap.infoPostSwap.value.variableTokenDeltaBalance;

export const selectIsMarginRequiredError = (state: RootState) => {
  return (
    state.rolloverSwapForm.userInput.marginAmount.error !== null &&
    state.rolloverSwapForm.userInput.marginAmount.error !== 'WLT'
  );
};
export const selectIsWalletMarginError = (state: RootState) => {
  return state.rolloverSwapForm.userInput.marginAmount.error === 'WLT';
};
export const selectBottomRightMarginNumber = (state: RootState) => {
  const rolloverSwapForm = state.rolloverSwapForm;

  if (rolloverSwapForm.userInput.marginAmount.editMode === 'remove') {
    const margin = getAvailableMargin(rolloverSwapForm);
    if (margin === null) {
      return null;
    }
    return formLimitAndFormatNumber(margin, 'floor');
  }

  if (rolloverSwapForm.prospectiveSwap.infoPostSwap.status === 'success') {
    return formLimitAndFormatNumber(
      rolloverSwapForm.prospectiveSwap.infoPostSwap.value.marginRequirement,
      'ceil',
    );
  }

  return null;
};

export const selectAvailableNotional = (state: RootState) => {
  return getAvailableNotional(state.rolloverSwapForm);
};

export const selectNewPositionReceivingRate = (state: RootState) => {
  return getProspectiveSwapMode(state.rolloverSwapForm) === 'fixed'
    ? getNewPositionFixedRate(state.rolloverSwapForm)
    : getVariableRate(state.rolloverSwapForm);
};
export const selectNewPositionPayingRate = (state: RootState) => {
  return getProspectiveSwapMode(state.rolloverSwapForm) === 'fixed'
    ? getVariableRate(state.rolloverSwapForm)
    : getNewPositionFixedRate(state.rolloverSwapForm);
};
export const selectNewPositionCompactNotional = (state: RootState) => {
  if (state.rolloverSwapForm.userInput.notionalAmount.error) return null;

  const compactParts = formCompactFormatToParts(getProspectiveSwapNotional(state.rolloverSwapForm));

  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

export const selectExistingPositionMode = (state: RootState) => {
  return getExistingPositionMode(state.rolloverSwapForm);
};
export const selectExistingPositionReceivingRateFormatted = (state: RootState) => {
  const receivingRate =
    getExistingPositionMode(state.rolloverSwapForm) === 'fixed'
      ? getExistingPositionFixedRate(state.rolloverSwapForm)
      : getExistingPositionVariableRate(state.rolloverSwapForm);

  return receivingRate === null ? '--' : formFormatNumber(receivingRate);
};
export const selectExistingPositionPayingRateFormatted = (state: RootState) => {
  const payingRate =
    getExistingPositionMode(state.rolloverSwapForm) === 'fixed'
      ? getExistingPositionVariableRate(state.rolloverSwapForm)
      : getExistingPositionFixedRate(state.rolloverSwapForm);

  return payingRate === null ? '--' : formFormatNumber(payingRate);
};
export const selectExistingPositionCompactNotional = (state: RootState) => {
  if (
    state.rolloverSwapForm.position.status !== 'success' ||
    !state.rolloverSwapForm.position.value
  ) {
    return null;
  }

  const compactParts = formCompactFormatToParts(state.rolloverSwapForm.position.value.notional);
  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

export const selectEditPositionMode = (state: RootState) => {
  return getEditPositionMode(state.rolloverSwapForm);
};
export const selectEditPositionReceivingRateFormatted = (state: RootState) => {
  const receivingRate =
    getEditPositionMode(state.rolloverSwapForm) === 'fixed'
      ? getEditPositionFixedRate(state.cashflowCalculator, state.rolloverSwapForm)
      : getEditPositionVariableRate(state.rolloverSwapForm);

  return receivingRate === null ? '--' : formFormatNumber(receivingRate);
};

export const selectEditPositionRealizedPnLTotalFormatted = (state: RootState) => {
  const realizedPnLFromFees = getRealizedPnLFromFees(state.rolloverSwapForm);
  const realizedPnLFromSwaps = getRealizedPnLFromSwaps(state.rolloverSwapForm);
  let realizedPnLTotal = null;

  if (realizedPnLFromFees && realizedPnLFromSwaps) {
    realizedPnLTotal = realizedPnLFromFees + realizedPnLFromSwaps;
  }

  return realizedPnLTotal === null ? '--' : formFormatNumber(realizedPnLTotal);
};

export const selectEditPositionRealizedPnLFromFeesFormatted = (state: RootState) => {
  const realizedPnLFromFees = getRealizedPnLFromFees(state.rolloverSwapForm);

  return realizedPnLFromFees === null ? '--' : formFormatNumber(realizedPnLFromFees);
};

export const selectEditPositionRealizedPnLFromSwapsFormatted = (state: RootState) => {
  const realizedPnLFromSwaps = getRealizedPnLFromSwaps(state.rolloverSwapForm);

  return realizedPnLFromSwaps === null ? '--' : formFormatNumber(realizedPnLFromSwaps);
};

export const selectEditPositionUnrealizedPnLFromSwapsFormatted = (state: RootState) => {
  const unrealizedPnLFromSwaps = getUnrealizedPnLFromSwaps(state.rolloverSwapForm);

  return unrealizedPnLFromSwaps === null ? '--' : formFormatNumber(unrealizedPnLFromSwaps);
};

export const selectEditPositionPayingRateFormatted = (state: RootState) => {
  const payingRate =
    getEditPositionMode(state.rolloverSwapForm) === 'fixed'
      ? getEditPositionVariableRate(state.rolloverSwapForm)
      : getEditPositionFixedRate(state.cashflowCalculator, state.rolloverSwapForm);

  return payingRate === null ? '--' : formFormatNumber(payingRate);
};

export const selectEditPositionCompactNotional = (state: RootState) => {
  const notional = getEditPositionNotional(state.rolloverSwapForm);

  const compactParts = formCompactFormatToParts(notional);
  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

export const selectSlippageFormatted = (state: RootState) => {
  if (
    !state.rolloverSwapForm.amm ||
    state.rolloverSwapForm.prospectiveSwap.infoPostSwap.status !== 'success'
  ) {
    return '--';
  }

  if (state.rolloverSwapForm.prospectiveSwap.infoPostSwap.value.variableTokenDeltaBalance === 0) {
    return formFormatNumber(0);
  }

  const slippage = Math.abs(
    state.rolloverSwapForm.prospectiveSwap.infoPostSwap.value.averageFixedRate -
      state.rolloverSwapForm.amm.fixedApr,
  );

  return formFormatNumber(slippage);
};

export const selectSwapConfirmationFlowStep = (state: RootState) =>
  state.rolloverSwapForm.swapConfirmationFlow.step;
export const selectSwapConfirmationFlowError = (state: RootState) =>
  state.rolloverSwapForm.swapConfirmationFlow.error;
export const selectSwapConfirmationFlowEtherscanLink = (state: RootState) => {
  return getViewOnEtherScanLink(
    state.network.chainId,
    state.rolloverSwapForm.swapConfirmationFlow.txHash || '',
  );
};

export const selectVariableRate24hDelta = (state: RootState) => {
  if (!state.rolloverSwapForm.amm) {
    return undefined;
  }

  return stringToBigFloat(
    formatNumber(
      state.rolloverSwapForm.amm.variableApy - state.rolloverSwapForm.amm.variableApy24Ago,
      0,
      3,
    ),
  );
};

export const selectSubmitButtonText = (state: RootState) => {
  switch (state.rolloverSwapForm.submitButton.state) {
    case 'swap':
      return 'Swap';
    case 'not-enough-balance':
      return 'Not enough balance';
    case 'approve':
      return `Approve ${
        state.rolloverSwapForm.amm
          ? state.rolloverSwapForm.amm.underlyingToken.name.toUpperCase()
          : ''
      }`;
    case 'approving':
      return `Approving...`;
    case 'connect-wallet':
      return 'Connect Your Wallet to Start Trading';
  }
};

export const selectIsLeverageDisabled = (state: RootState) => {
  return getProspectiveSwapNotional(state.rolloverSwapForm) === 0;
};

export const selectShowLeverageNotification = (state: RootState) =>
  state.rolloverSwapForm.showLowLeverageNotification;

export const selectLeverageOptions = (state: RootState) => {
  const rolloverSwapForm = state.rolloverSwapForm;

  return {
    maxLeverage: rolloverSwapForm.prospectiveSwap.leverage.maxLeverage,
    leverageOptions: rolloverSwapForm.prospectiveSwap.leverage.options.map(String),
  };
};

export const selectIsGetInfoPostSwapLoading = (state: RootState) => {
  return state.rolloverSwapForm.prospectiveSwap.infoPostSwap.status === 'pending';
};

export const selectPositionMarginFormatted = (state: RootState) => {
  if (!state.rolloverSwapForm.position.value) {
    return '--';
  }
  return formCompactFormat(state.rolloverSwapForm.position.value.margin);
};

export const selectFixedRateValueFormatted = (state: RootState) => {
  return !state.rolloverSwapForm.amm ? '--' : formatNumber(state.rolloverSwapForm.amm.fixedApr);
};

export const selectVariableRateValueFormatted = (state: RootState) => {
  return !state.rolloverSwapForm.amm ? '--' : formatNumber(state.rolloverSwapForm.amm.variableApy);
};

export const selectMarginRequirementFormatted = (state: RootState) => {
  return state.rolloverSwapForm.prospectiveSwap.infoPostSwap.status === 'success'
    ? formatNumber(
        state.rolloverSwapForm.prospectiveSwap.infoPostSwap.value.marginRequirement,
        2,
        4,
      )
    : '--';
};
