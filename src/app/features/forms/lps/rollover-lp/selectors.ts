import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';

import { formatTimestamp } from '../../../../../utilities/date';
import { formatNumber, stringToBigFloat } from '../../../../../utilities/number';
import { RootState } from '../../../../store';
import {
  formCompactFormat,
  formCompactFormatToParts,
  formFormatNumber,
  formLimitAndFormatNumber,
} from '../../common/utils';
import {
  getPreviousPositionRealizedPnLFromFees,
  getPreviousPositionRealizedPnLFromSwaps,
  getProspectiveLpMargin,
  getProspectiveLpNotional,
} from './utils';

export const selectSubmitButtonInfo = (state: RootState) => state.rolloverLpForm.submitButton;
export const selectRolloverLpFormAMM = (state: RootState) => state.rolloverLpForm.amm;
export const selectRolloverLpFormPreviousAMM = (state: RootState) =>
  state.rolloverLpForm.previousAMM;
export const selectRolloverLpFormPreviousPosition = (state: RootState) =>
  state.rolloverLpForm.previousPosition;

// todo: FB duplicate logic same as rollover-swap-form, move to common
export const selectWalletBalance = (state: RootState) => {
  if (state.rolloverLpForm.walletBalance.status !== 'success') {
    return '--';
  }

  if (state.rolloverLpForm.previousPosition === null) {
    return '--';
  }

  return formCompactFormat(
    state.rolloverLpForm.walletBalance.value +
      state.rolloverLpForm.previousPosition.settlementCashflow +
      state.rolloverLpForm.previousPosition.margin +
      state.rolloverLpForm.previousPosition.fees,
  );
};
export const selectPoolLpInfoStatus = (state: RootState) => state.rolloverLpForm.poolLpInfo.status;

// todo: FB duplicate as in swap form
export const selectAMMTokenFormatted = (state: RootState) => {
  const aMM = selectRolloverLpFormAMM(state);
  if (!aMM) {
    return '';
  }
  return ` ${aMM.underlyingToken.name.toUpperCase()}`;
};

// todo: FB duplicate as in swap form
export const selectAMMMaturityFormatted = (state: RootState) => {
  const aMM = selectRolloverLpFormAMM(state);
  if (!aMM) {
    return '';
  }
  return formatTimestamp(aMM.termEndTimestampInMS);
};

// todo: FB duplicate as in swap form
export const selectMarginAccountName = (state: RootState) => {
  const aMM = selectRolloverLpFormAMM(state);
  if (!aMM) {
    return '';
  }
  return `${aMM.protocol} ${selectAMMMaturityFormatted(state)}`;
};

// User Input
export const selectUserInputNotionalInfo = (state: RootState) =>
  state.rolloverLpForm.userInput.notionalAmount;
export const selectUserInputMarginInfo = (state: RootState) =>
  state.rolloverLpForm.userInput.marginAmount;

export const selectProspectiveLpNotionalFormatted = (state: RootState) => {
  return formCompactFormat(getProspectiveLpNotional(state.rolloverLpForm));
};
export const selectProspectiveLpMarginFormatted = (state: RootState) => {
  return formCompactFormat(getProspectiveLpMargin(state.rolloverLpForm));
};

export const selectLeverage = (state: RootState) => state.rolloverLpForm.userInput.leverage;
export const selectInfoPostLp = (state: RootState) => state.rolloverLpForm.prospectiveLp.infoPostLp;
// todo: FB duplicate as in swap form
export const selectIsMarginRequiredError = (state: RootState) => {
  return (
    state.rolloverLpForm.userInput.marginAmount.error !== null &&
    state.rolloverLpForm.userInput.marginAmount.error !== 'WLT'
  );
};
// todo: FB duplicate as in swap form
export const selectIsWalletMarginError = (state: RootState) => {
  return state.rolloverLpForm.userInput.marginAmount.error === 'WLT';
};
// todo: FB duplicate as in swap form
export const selectBottomRightMarginNumber = (state: RootState) => {
  const lpFormState = state.rolloverLpForm;

  if (lpFormState.prospectiveLp.infoPostLp.status === 'success') {
    return formLimitAndFormatNumber(
      lpFormState.prospectiveLp.infoPostLp.value.marginRequirement,
      'ceil',
    );
  }

  return null;
};

// todo: FB duplicate as in swap form
export const selectNewPositionCompactNotional = (state: RootState) => {
  if (state.rolloverLpForm.userInput.notionalAmount.error) return null;

  const compactParts = formCompactFormatToParts(getProspectiveLpNotional(state.rolloverLpForm));

  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

export const selectRolloverConfirmationFlowStep = (state: RootState) =>
  state.rolloverLpForm.lpConfirmationFlow.step;
export const selectRolloverConfirmationFlowError = (state: RootState) =>
  state.rolloverLpForm.lpConfirmationFlow.error;
export const selectRolloverConfirmationFlowEtherscanLink = (state: RootState) => {
  return getViewOnEtherScanLink(
    state.network.chainId,
    state.rolloverLpForm.lpConfirmationFlow.txHash || '',
  );
};

// todo: FB duplicate as in swap form
export const selectVariableRate24hDelta = (state: RootState) => {
  if (!state.rolloverLpForm.amm) {
    return undefined;
  }
  return stringToBigFloat(
    formatNumber(
      state.rolloverLpForm.amm.variableApy - state.rolloverLpForm.amm.variableApy24Ago,
      0,
      3,
    ),
  );
};

export const selectSubmitButtonText = (state: RootState) => {
  switch (state.rolloverLpForm.submitButton.state) {
    case 'rollover':
      return 'Rollover';
    case 'fixed-range-error':
      return 'Invalid Fixed Range';
    case 'not-enough-balance':
      return 'Not enough balance';
    case 'approve':
      return `Approve ${
        state.rolloverLpForm.amm ? state.rolloverLpForm.amm.underlyingToken.name.toUpperCase() : ''
      }`;
    case 'approving':
      return `Approving...`;
    case 'connect-wallet':
      return 'Connect Your Wallet to Start Trading';
  }
};

export const selectIsLeverageDisabled = (state: RootState) => {
  const prospectiveNotional: number = getProspectiveLpNotional(state.rolloverLpForm);

  if (prospectiveNotional > 0) {
    return false;
  }

  return true;
};

export const selectShowLeverageNotification = (state: RootState) =>
  state.rolloverLpForm.showLowLeverageNotification;

export const selectLeverageOptions = (state: RootState) => {
  const lpFormState = state.rolloverLpForm;

  return {
    maxLeverage: lpFormState.prospectiveLp.leverage.maxLeverage,
    leverageOptions: lpFormState.prospectiveLp.leverage.options.map(String),
  };
};

export const selectPositionMarginFormatted = () => {
  return '--';
};
export const selectFixedRateInfo = (state: RootState) => state.rolloverLpForm.amm?.fixedApr;
export const selectVariableRateInfo = (state: RootState) => state.rolloverLpForm.amm?.variableApy;

export const selectFixedRateValueFormatted = (state: RootState) => {
  return !state.rolloverLpForm.amm ? '--' : formatNumber(state.rolloverLpForm.amm.fixedApr);
};

export const selectVariableRateValueFormatted = (state: RootState) => {
  return !state.rolloverLpForm.amm ? '--' : formatNumber(state.rolloverLpForm.amm.variableApy);
};

export const selectUserInputFixedLower = (state: RootState) => {
  const fixedLower = state.rolloverLpForm.userInput.fixedRange.lower;

  if (fixedLower === null) {
    return '';
  }

  return fixedLower.toString();
};

export const selectUserInputFixedUpper = (state: RootState) => {
  const fixedUpper = state.rolloverLpForm.userInput.fixedRange.upper;

  if (fixedUpper === null) {
    return '';
  }

  return fixedUpper.toString();
};

export const selectUserInputFixedError = (state: RootState) => {
  return state.rolloverLpForm.userInput.fixedRange.error;
};
export const selectUserInputFixedUpdateCount = (state: RootState) => {
  return state.rolloverLpForm.userInput.fixedRange.updateCount;
};

export const selectMarginRequirementFormatted = (state: RootState) => {
  return state.rolloverLpForm.prospectiveLp.infoPostLp.status === 'success'
    ? formatNumber(state.rolloverLpForm.prospectiveLp.infoPostLp.value.marginRequirement, 2, 4)
    : '--';
};

// todo: FB duplicate in rollover-swap
export const selectPreviousPositionCompactNotional = (state: RootState) => {
  if (!state.rolloverLpForm.previousPosition) {
    return null;
  }
  const compactParts = formCompactFormatToParts(state.rolloverLpForm.previousPosition.notional);

  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

// todo: FB duplicate in rollover-swap
export const selectPreviousPositionDepositedMargin = (state: RootState) => {
  if (!state.rolloverLpForm.previousPosition) {
    return null;
  }
  const depositedMargin =
    state.rolloverLpForm.previousPosition.margin -
    state.rolloverLpForm.previousPosition.realizedPnLFromFeesPaid;
  const compactParts = formCompactFormatToParts(depositedMargin);

  return {
    compactDepositedMarginSuffix: compactParts.compactSuffix,
    compactDepositedMarginNumber: compactParts.compactNumber,
  };
};

// todo: FB duplicate in rollover-swap
export const selectPreviousPositionSettlingBalance = (state: RootState) => {
  const position = state.rolloverLpForm.previousPosition;
  if (!position) {
    return null;
  }
  const settlingBalance = position.margin + position.realizedPnLFromSwaps + position.fees;
  const compactParts = formCompactFormatToParts(settlingBalance);

  return {
    compactSuffix: compactParts.compactSuffix,
    compactNumber: compactParts.compactNumber,
  };
};

// TODO: verify what we use in the portfolio
// todo: FB duplicate in rollover-swap
export const selectPreviousPositionRealizedPnLTotalFormatted = (state: RootState) => {
  const realizedPnLFromFees = getPreviousPositionRealizedPnLFromFees(state.rolloverLpForm);
  const realizedPnLFromSwaps = getPreviousPositionRealizedPnLFromSwaps(state.rolloverLpForm);
  let realizedPnLTotal = null;

  if (realizedPnLFromFees !== null && realizedPnLFromSwaps !== null) {
    realizedPnLTotal = realizedPnLFromFees + realizedPnLFromSwaps;
  }

  return realizedPnLTotal === null ? '--' : formFormatNumber(realizedPnLTotal);
};

// todo: FB duplicate in rollover-swap
export const selectPreviousPositionRealizedPnLFromFeesFormatted = (state: RootState) => {
  const realizedPnLFromFees = getPreviousPositionRealizedPnLFromFees(state.rolloverLpForm);

  return realizedPnLFromFees === null ? '--' : formFormatNumber(realizedPnLFromFees);
};

// todo: FB duplicate in rollover-swap
export const selectPreviousPositionRealizedPnLFromSwapsFormatted = (state: RootState) => {
  const realizedPnLFromSwaps = getPreviousPositionRealizedPnLFromSwaps(state.rolloverLpForm);

  return realizedPnLFromSwaps === null ? '--' : formFormatNumber(realizedPnLFromSwaps);
};

export const selectPreviousPositionFixedLower = (state: RootState) => {
  const position = state.rolloverLpForm.previousPosition;
  if (!position) {
    return '--';
  }
  return formFormatNumber(position.fixedRateLower.toNumber());
};

export const selectPreviousPositionFixedUpper = (state: RootState) => {
  const position = state.rolloverLpForm.previousPosition;
  if (!position) {
    return '--';
  }
  return formFormatNumber(position.fixedRateUpper.toNumber());
};

// todo: FB same in lp form
export const selectGasFeeToken = (state: RootState) => {
  const infoPostLp = state.rolloverLpForm.prospectiveLp.infoPostLp;
  if (infoPostLp.status === 'success') {
    return infoPostLp.value.gasFee.token;
  }

  return '--';
};

// todo: FB same in lp form
export const selectGasFeeFormatted = (state: RootState) => {
  const infoPostLp = state.rolloverLpForm.prospectiveLp.infoPostLp;
  if (infoPostLp.status === 'success') {
    return formatNumber(infoPostLp.value.gasFee.value, 2, 4);
  }

  return '--';
};

export const selectPreviousPositionId = (state: RootState) => {
  if (!state.rolloverLpForm.previousPosition) {
    return null;
  }
  return state.rolloverLpForm.previousPosition.id;
};
