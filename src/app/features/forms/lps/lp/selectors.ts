import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';

import { formatNumber } from '../../../../../utilities/number';
import { RootState } from '../../../../store';
import { formatPoolMaturity, formatUnderlyingTokenName } from '../../../helpers';
import {
  formCompactFormat,
  formCompactFormatToParts,
  formFormatNumber,
  formLimitAndFormatNumber,
  getGasInfoFormatted,
  getVariableRate24hDelta,
  isLeverageHidden,
} from '../../common';
import {
  getAvailableMargin,
  getEditPositionNotional,
  getProspectiveLpMargin,
  getProspectiveLpNotional,
  getRealizedPnLFromSwaps,
  getSelectedPositionNotional,
  hasExistingPosition,
} from './utils';

export const selectSubmitButtonInfo = (state: RootState) => state.lpForm.submitButton;
export const selectLpFormAMM = (state: RootState) => state.lpForm.amm;
export const selectLpFormPositionsFetchingStatus = (state: RootState) =>
  state.lpForm.positions.status;
// TODO: FB duplicate logic same as swap-form, move to common
export const selectWalletBalance = (state: RootState) => {
  if (state.lpForm.walletBalance.status !== 'success') {
    return '--';
  }

  return formCompactFormat(state.lpForm.walletBalance.value);
};
export const selectPoolLpInfoStatus = (state: RootState) => state.lpForm.poolLpInfo.status;
export const selectLpFormMode = (state: RootState): 'new' | 'edit' => {
  return hasExistingPosition(state.lpForm) ? 'edit' : 'new';
};

export const selectLpFormSelectedPosition = (state: RootState) => {
  return state.lpForm.selectedPosition;
};

export const selectAMMTokenFormatted = (state: RootState) => {
  return formatUnderlyingTokenName(selectLpFormAMM(state));
};

export const selectAMMMaturityFormatted = (state: RootState) => {
  return formatPoolMaturity(selectLpFormAMM(state));
};

// TODO: FB duplicate as in swap form
export const selectMarginAccountName = (state: RootState) => {
  const aMM = selectLpFormAMM(state);
  if (!aMM) {
    return '';
  }
  return `${aMM.protocol} ${selectAMMMaturityFormatted(state)}`;
};

// User Input
export const selectUserInputNotionalInfo = (state: RootState) =>
  state.lpForm.userInput.notionalAmount;
export const selectUserInputMarginInfo = (state: RootState) => state.lpForm.userInput.marginAmount;

export const selectProspectiveLpNotionalFormatted = (state: RootState) => {
  return formCompactFormat(getProspectiveLpNotional(state.lpForm));
};
export const selectProspectiveLpMarginFormatted = (state: RootState) => {
  return formCompactFormat(getProspectiveLpMargin(state.lpForm));
};

export const selectLeverage = (state: RootState) => state.lpForm.userInput.leverage;
export const selectInfoPostLp = (state: RootState) => state.lpForm.prospectiveLp.infoPostLp;
// TODO: FB duplicate as in swap form
export const selectIsMarginRequiredError = (state: RootState) => {
  return (
    state.lpForm.userInput.marginAmount.error !== null &&
    state.lpForm.userInput.marginAmount.error !== 'WLT'
  );
};
// TODO: FB duplicate as in swap form
export const selectIsWalletMarginError = (state: RootState) => {
  return state.lpForm.userInput.marginAmount.error === 'WLT';
};
// TODO: FB duplicate as in swap form
export const selectBottomRightMarginNumber = (state: RootState) => {
  const lpFormState = state.lpForm;

  if (lpFormState.userInput.marginAmount.editMode === 'remove') {
    const margin = getAvailableMargin(lpFormState);
    if (margin === null) {
      return null;
    }
    return formLimitAndFormatNumber(margin, 'floor');
  }

  if (lpFormState.prospectiveLp.infoPostLp.status === 'success') {
    return formLimitAndFormatNumber(
      lpFormState.prospectiveLp.infoPostLp.value.marginRequirement,
      'ceil',
    );
  }

  return null;
};

// TODO: FB duplicate as in swap form
export const selectNewPositionCompactNotional = (state: RootState) => {
  if (state.lpForm.userInput.notionalAmount.error) return null;

  const compactParts = formCompactFormatToParts(getProspectiveLpNotional(state.lpForm));

  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

// TODO: FB duplicate as in swap form
export const selectExistingPositionCompactNotional = (state: RootState) => {
  if (state.lpForm.selectedPosition === null) {
    return null;
  }

  const compactParts = formCompactFormatToParts(state.lpForm.selectedPosition.notional);
  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

export const selectEditLpPositionRealizedPnLTotalFormatted = (state: RootState) => {
  let realizedPnLTotal = null;
  const realizedPnLFromSwaps = getRealizedPnLFromSwaps(state.lpForm);

  if (state.lpForm.selectedPosition !== null && realizedPnLFromSwaps !== null) {
    const realizedPnLFromFees = state.lpForm.selectedPosition.fees;
    realizedPnLTotal = realizedPnLFromFees + realizedPnLFromSwaps;
  }

  return realizedPnLTotal === null ? '--' : formFormatNumber(realizedPnLTotal);
};

export const selectEditLpPositionRealizedPnLFromFeesFormatted = (state: RootState) => {
  let realizedPnLFromFees = null;

  if (state.lpForm.selectedPosition !== null) {
    realizedPnLFromFees = state.lpForm.selectedPosition.fees;
  }

  return realizedPnLFromFees === null ? '--' : formFormatNumber(realizedPnLFromFees);
};

export const selectEditLpPositionRealizedPnLFromSwapsFormatted = (state: RootState) => {
  const realizedPnLFromSwaps = getRealizedPnLFromSwaps(state.lpForm);
  return realizedPnLFromSwaps === null ? '--' : formFormatNumber(realizedPnLFromSwaps);
};

export const selectExistingPositionFixedLower = (state: RootState) => {
  if (state.lpForm.selectedPosition === null) {
    return null;
  }

  return state.lpForm.selectedPosition.fixedRateLower.toNumber();
};

export const selectExistingPositionFixedUpper = (state: RootState) => {
  if (state.lpForm.selectedPosition === null) {
    return null;
  }
  return state.lpForm.selectedPosition.fixedRateUpper.toNumber();
};

export const selectSelectedPositionCompactNotional = (state: RootState) => {
  const notional = getSelectedPositionNotional(state.lpForm);

  const compactParts = formCompactFormatToParts(notional);
  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

export const selectEditPositionCompactNotional = (state: RootState) => {
  const notional = getEditPositionNotional(state.lpForm);

  const compactParts = formCompactFormatToParts(notional);
  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

export const selectLpConfirmationFlowStep = (state: RootState) =>
  state.lpForm.lpConfirmationFlow.step;
export const selectLpConfirmationFlowError = (state: RootState) =>
  state.lpForm.lpConfirmationFlow.error;
export const selectLpConfirmationFlowEtherscanLink = (state: RootState) => {
  return getViewOnEtherScanLink(
    state.network.chainId,
    state.lpForm.lpConfirmationFlow.txHash || '',
  );
};

export const selectMarginUpdateConfirmationFlowStep = (state: RootState) =>
  state.lpForm.marginUpdateConfirmationFlow.step;
export const selectMarginUpdateConfirmationFlowError = (state: RootState) =>
  state.lpForm.marginUpdateConfirmationFlow.error;
export const selectMarginUpdateConfirmationFlowEtherscanLink = (state: RootState) => {
  return getViewOnEtherScanLink(
    state.network.chainId,
    state.lpForm.marginUpdateConfirmationFlow.txHash || '',
  );
};

export const selectVariableRate24hDelta = (state: RootState) => {
  return getVariableRate24hDelta(state.lpForm.amm);
};

export const selectSubmitButtonText = (state: RootState) => {
  switch (state.lpForm.submitButton.state) {
    case 'lp':
      const addRemoveString =
        state.lpForm.userInput.notionalAmount.editMode === 'add' ? 'Add' : 'Remove';
      return `${addRemoveString} Liquidity`;
    case 'fixed-range-error':
      return 'Invalid Fixed Range';
    case 'paused':
      return 'Paused';
    case 'margin-update':
      return 'Update margin';
    case 'not-enough-balance':
      return 'Not enough balance';
    case 'approve':
      return `Approve ${
        state.lpForm.amm ? state.lpForm.amm.underlyingToken.name.toUpperCase() : ''
      }`;
    case 'approving':
      return `Approving...`;
    case 'connect-wallet':
      return 'Connect Your Wallet to Start Trading';
  }
};

export const selectIsLeverageDisabled = (state: RootState) => {
  const prospectiveNotional: number = getProspectiveLpNotional(state.lpForm);
  const isMarginAddMode: boolean = state.lpForm.userInput.marginAmount.editMode === 'add';

  if (prospectiveNotional > 0 && isMarginAddMode) {
    return false;
  }

  return true;
};

export const selectIsLeverageHidden = (state: RootState) => {
  return isLeverageHidden(state.lpForm.amm);
};

export const selectUserInputNotionalAmountEditMode = (state: RootState) => {
  return state.lpForm.userInput.notionalAmount.editMode;
};

export const selectUserInputMarginAmountEditMode = (state: RootState) => {
  return state.lpForm.userInput.marginAmount.editMode;
};

export const selectShowLeverageNotification = (state: RootState) =>
  state.lpForm.showLowLeverageNotification;

export const selectLeverageOptions = (state: RootState) => {
  const lpFormState = state.lpForm;

  return {
    maxLeverage: lpFormState.prospectiveLp.leverage.maxLeverage,
    leverageOptions: lpFormState.prospectiveLp.leverage.options.map(String),
  };
};

export const selectPositionMarginFormatted = (state: RootState) => {
  if (!state.lpForm.selectedPosition) {
    return '--';
  }
  return formCompactFormat(state.lpForm.selectedPosition.margin);
};
export const selectFixedRateInfo = (state: RootState) => state.lpForm.amm?.fixedApr;
export const selectVariableRateInfo = (state: RootState) => state.lpForm.amm?.variableApy;

export const selectFixedRateValueFormatted = (state: RootState) => {
  return !state.lpForm.amm ? '--' : formatNumber(state.lpForm.amm.fixedApr);
};

export const selectVariableRateValueFormatted = (state: RootState) => {
  return !state.lpForm.amm ? '--' : formatNumber(state.lpForm.amm.variableApy);
};

export const selectUserInputFixedLower = (state: RootState) => {
  const fixedLower = state.lpForm.userInput.fixedRange.lower;

  if (fixedLower === null) {
    return '';
  }

  return fixedLower.toString();
};

export const selectUserInputFixedUpper = (state: RootState) => {
  const fixedUpper = state.lpForm.userInput.fixedRange.upper;

  if (fixedUpper === null) {
    return '';
  }

  return fixedUpper.toString();
};

export const selectUserInputFixedError = (state: RootState) => {
  return state.lpForm.userInput.fixedRange.error;
};
export const selectUserInputFixedUpdateCount = (state: RootState) => {
  return state.lpForm.userInput.fixedRange.updateCount;
};

export const selectMarginRequirementFormatted = (state: RootState) => {
  return state.lpForm.prospectiveLp.infoPostLp.status === 'success'
    ? formatNumber(state.lpForm.prospectiveLp.infoPostLp.value.marginRequirement, 2, 4)
    : '--';
};

export const selectGasInfoFormatted = (state: RootState) => {
  const infoPostLp = state.lpForm.prospectiveLp.infoPostLp;
  return getGasInfoFormatted({
    status: infoPostLp.status,
    gasDetails: infoPostLp.value.gasFee,
  });
};

export const selectIsGetInfoPostLpLoading = (state: RootState) => {
  return state.lpForm.prospectiveLp.infoPostLp.status === 'pending';
};
