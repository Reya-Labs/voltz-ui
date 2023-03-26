import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';

import { formatTimestamp } from '../../../utilities/date';
import { formatNumber, stringToBigFloat } from '../../../utilities/number';
import { RootState } from '../../store';
import {
  getAvailableMargin,
  getEditPositionNotional,
  getProspectiveLpMargin,
  getProspectiveLpNotional,
  hasExistingPosition,
  lpFormCompactFormat,
  lpFormCompactFormatToParts,
  lpFormLimitAndFormatNumber,
} from './utils';

// ------------ General Lp Form State Info ------------
export const selectSubmitButtonInfo = (state: RootState) => state.lpForm.submitButton;
export const selectLpFormAMM = (state: RootState) => state.lpForm.amm;
export const selectLpFormPositions = (state: RootState) => state.lpForm.positions.value;
export const selectLpFormPositionsFetchingStatus = (state: RootState) =>
  state.lpForm.positions.status;
export const selectWalletBalance = (state: RootState) => {
  if (state.lpForm.walletBalance.status !== 'success') {
    return '--';
  }

  return lpFormCompactFormat(state.lpForm.walletBalance.value);
};
export const selectPoolLpInfoStatus = (state: RootState) => state.lpForm.poolLpInfo.status;
export const selectLpFormMode = (state: RootState): 'new' | 'edit' => {
  return hasExistingPosition(state.lpForm) ? 'edit' : 'new';
};

export const selectLpFormSelectedPosition = (state: RootState) => {
  return state.lpForm.selectedPosition;
};

export const selectAMMTokenFormatted = (state: RootState) => {
  const aMM = selectLpFormAMM(state);
  if (!aMM) {
    return '';
  }
  return ` ${aMM.underlyingToken.name.toUpperCase()}`;
};

export const selectAMMMaturityFormatted = (state: RootState) => {
  const aMM = selectLpFormAMM(state);
  if (!aMM) {
    return '';
  }
  return formatTimestamp(aMM.termEndTimestampInMS);
};

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

// ------------ Prospective Lp ------------
export const selectProspectiveLpNotionalFormatted = (state: RootState) => {
  return lpFormCompactFormat(getProspectiveLpNotional(state.lpForm));
};
export const selectProspectiveLpMarginFormatted = (state: RootState) => {
  if (state.lpForm.userInput.marginAmount.editMode === 'add') {
    return lpFormCompactFormat(getProspectiveLpMargin(state.lpForm));
  }
  return lpFormCompactFormat(getProspectiveLpMargin(state.lpForm));
};

export const selectLeverage = (state: RootState) => state.lpForm.userInput.leverage;
export const selectInfoPostLp = (state: RootState) => state.lpForm.prospectiveLp.infoPostLp;
export const selectIsMarginRequiredError = (state: RootState) => {
  return (
    state.lpForm.userInput.marginAmount.error !== null &&
    state.lpForm.userInput.marginAmount.error !== 'WLT'
  );
};
export const selectIsWalletMarginError = (state: RootState) => {
  return state.lpForm.userInput.marginAmount.error === 'WLT';
};
export const selectBottomRightMarginNumber = (state: RootState) => {
  const lpFormState = state.lpForm;

  if (lpFormState.userInput.marginAmount.editMode === 'remove') {
    return getAvailableMargin(lpFormState) !== null
      ? lpFormLimitAndFormatNumber(getAvailableMargin(lpFormState) as number, 'floor')
      : null;
  }

  if (lpFormState.prospectiveLp.infoPostLp.status === 'success') {
    return lpFormLimitAndFormatNumber(
      lpFormState.prospectiveLp.infoPostLp.value.marginRequirement,
      'ceil',
    );
  }

  return null;
};

export const selectNewPositionCompactNotional = (state: RootState) => {
  if (state.lpForm.userInput.notionalAmount.error) return null;

  const compactParts = lpFormCompactFormatToParts(getProspectiveLpNotional(state.lpForm));

  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

export const selectExistingPositionCompactNotional = (state: RootState) => {
  if (state.lpForm.selectedPosition === null) {
    return null;
  }

  const compactParts = lpFormCompactFormatToParts(state.lpForm.selectedPosition.notional);
  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
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

export const selectEditPositionCompactNotional = (state: RootState) => {
  const notional = getEditPositionNotional(state.lpForm);

  const compactParts = lpFormCompactFormatToParts(notional);
  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

// ------------ Realized & Unrealized PnL Selectors ------------
// todo: populate based on realized and unrealized pnl spec

// ------------ Lp Confirmation Flow Selectors ------------
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

// ------------ Margin Update Confirmation Flow Selectors ------------
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

// ------------ Variable Rate Delta ------------
export const selectVariableRate24hDelta = (state: RootState) => {
  return state.lpForm.variableRate24hAgo.status === 'success' &&
    state.lpForm.variableRate.status === 'success'
    ? stringToBigFloat(
        formatNumber(state.lpForm.variableRate.value - state.lpForm.variableRate24hAgo.value, 0, 3),
      )
    : undefined;
};

// ------------ Submit button text ------------
export const selectSubmitButtonText = (state: RootState) => {
  switch (state.lpForm.submitButton.state) {
    case 'lp':
      const addRemoveString =
        state.lpForm.userInput.notionalAmount.editMode === 'add' ? 'Add' : 'Remove';
      return `${addRemoveString} Liquidity`;
    case 'fixed-range-error':
      return 'Invalid Fixed Range';
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

// ------------ Leverage ------------
export const selectIsLeverageDisabled = (state: RootState) => {
  // todo: simplify

  let isLeverageEnabled: boolean = false;
  const prospectiveNotional: number = getProspectiveLpNotional(state.lpForm);
  const isMarginAddMode: boolean = state.lpForm.userInput.marginAmount.editMode === 'add';

  if (prospectiveNotional > 0 && isMarginAddMode) {
    isLeverageEnabled = true;
  }

  return !isLeverageEnabled;
};

export const selectShowLeverageNotification = (state: RootState) =>
  state.lpForm.showLowLeverageNotification;

export const selectLeverageOptions = (state: RootState) => {
  const lpFormState = state.lpForm;

  return {
    maxLeverage: lpFormState.prospectiveLp.leverage.maxLeverage,
    leverageOptions: lpFormState.prospectiveLp.leverage.options,
  };
};

export const selectPositionMarginFormatted = (state: RootState) => {
  if (!state.lpForm.selectedPosition) {
    return '--';
  }
  return lpFormCompactFormat(state.lpForm.selectedPosition.margin);
};

export const selectFixedRateValueFormatted = (state: RootState) => {
  return state.lpForm.fixedRate.status !== 'success'
    ? '--'
    : formatNumber(state.lpForm.fixedRate.value);
};

export const selectVariableRateValueFormatted = (state: RootState) => {
  return state.lpForm.variableRate.status !== 'success'
    ? '--'
    : formatNumber(state.lpForm.variableRate.value);
};

export const selectUserInputFixedLowerRaw = (state: RootState) => {
  return state.lpForm.userInput.fixedLower;
};

export const selectUserInputFixedLower = (state: RootState) => {
  const fixedLower = state.lpForm.userInput.fixedLower;

  if (fixedLower === null) {
    return '';
  }

  return fixedLower.toString();
};

export const selectUserInputFixedUpperRaw = (state: RootState) => {
  return state.lpForm.userInput.fixedUpper;
};

export const selectUserInputFixedUpper = (state: RootState) => {
  const fixedUpper = state.lpForm.userInput.fixedUpper;

  if (fixedUpper === null) {
    return '';
  }

  return fixedUpper.toString();
};

export const selectUserInputFixedError = (state: RootState) => {
  return state.lpForm.userInput.fixedError;
};
