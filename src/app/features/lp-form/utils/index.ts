import { Draft } from '@reduxjs/toolkit';
import { Position } from '@voltz-protocol/v1-sdk';

import {
  compactFormat,
  compactFormatToParts,
  formatNumber,
  limitAndFormatNumber,
} from '../../../../utilities/number';
import { FormNumberLimits } from '../../common-form';
import { checkLowLeverageNotification } from '../../common-form/utils';
import { SliceState } from '../reducer';

export const getRealizedPnLFromSwaps = (state: Draft<SliceState>) => {
  if (hasExistingPosition(state)) {
    // feels redundunt
    if (state.selectedPosition) {
      return state.selectedPosition.realizedPnLFromSwaps;
    }
  }
  return null;
};

export const getUnrealizedPnLFromSwaps = (state: Draft<SliceState>) => {
  if (hasExistingPosition(state)) {
    if (state.selectedPosition) {
      return state.selectedPosition?.unrealizedPnLFromSwaps;
    }
  }

  return null;
};

export const lpFormFormatNumber = (value: number) => {
  if (value < 1) {
    return formatNumber(value, 0, FormNumberLimits.decimalLimit);
  }

  return formatNumber(value, 0, 2);
};

export const lpFormCompactFormat = (value: number) => {
  if (value < 1) {
    return compactFormat(value, 0, FormNumberLimits.decimalLimit);
  }

  return compactFormat(value, 0, 2);
};

export const lpFormCompactFormatToParts = (value: number) => {
  if (value < 1) {
    return compactFormatToParts(value, 0, FormNumberLimits.decimalLimit);
  }

  return compactFormatToParts(value, 0, 2);
};

export const lpFormLimitAndFormatNumber = (value: number, mode: 'floor' | 'ceil') => {
  return limitAndFormatNumber(
    value,
    FormNumberLimits.digitLimit,
    FormNumberLimits.decimalLimit,
    mode,
  );
};

export const isUserInputNotionalError = (state: Draft<SliceState>): boolean => {
  return state.userInput.notionalAmount.error !== null;
};

export const isUserInputFixedRangeError = (state: Draft<SliceState>): boolean => {
  return state.userInput.fixedRange.error !== null;
};

export const isUserInputMarginError = (state: Draft<SliceState>): boolean => {
  return state.userInput.marginAmount.error !== null;
};

const validateUserInputNotional = (state: Draft<SliceState>): void => {
  let error = null;

  if (
    hasExistingPosition(state) &&
    state.userInput.notionalAmount.editMode === 'remove' &&
    state.userInput.notionalAmount.value > (state.selectedPosition as Position).notional
  ) {
    error = 'Not enough notional. Available notional:';
  }

  state.userInput.notionalAmount.error = error;
};

export const getAvailableMargin = (state: Draft<SliceState>): number | null => {
  if (state.userInput.marginAmount.editMode === 'remove') {
    if (state.prospectiveLp.infoPostLp.status !== 'success') {
      return null;
    }

    let maxMarginWithdrawable = null;
    if (getProspectiveLpNotional(state) === 0 && hasExistingPosition(state)) {
      maxMarginWithdrawable = (state.selectedPosition as Position).maxMarginWithdrawable;
    }

    if (getProspectiveLpNotional(state) < 0 && hasExistingPosition(state)) {
      maxMarginWithdrawable = (state.selectedPosition as Position).maxMarginWithdrawable;
    }

    if (getProspectiveLpNotional(state) > 0) {
      maxMarginWithdrawable = state.prospectiveLp.infoPostLp.value.maxMarginWithdrawable;
    }

    return maxMarginWithdrawable;
  }

  if (state.walletBalance.status === 'success') {
    return state.walletBalance.value;
  }

  return null;
};

const validateUserInputMargin = (state: Draft<SliceState>): void => {
  const availableMargin = getAvailableMargin(state);
  let error = null;
  if (
    state.userInput.marginAmount.editMode === 'add' &&
    availableMargin !== null &&
    state.userInput.marginAmount.value > availableMargin
  ) {
    error = 'WLT';
  }

  if (
    state.userInput.marginAmount.editMode === 'add' &&
    state.prospectiveLp.infoPostLp.status === 'success' &&
    state.userInput.marginAmount.value < state.prospectiveLp.infoPostLp.value.marginRequirement
  ) {
    error = 'Margin too low. Additional margin required:';
  }

  if (
    hasExistingPosition(state) &&
    state.userInput.marginAmount.editMode === 'remove' &&
    availableMargin !== null &&
    state.userInput.marginAmount.value > availableMargin
  ) {
    error = 'Not enough margin. Available margin:';
  }

  if (
    hasExistingPosition(state) &&
    state.userInput.marginAmount.editMode === 'remove' &&
    state.prospectiveLp.infoPostLp.status === 'success' &&
    state.prospectiveLp.infoPostLp.value.marginRequirement > 0
  ) {
    error = 'You must add margin. Available margin:';
  }

  state.userInput.marginAmount.error = error;
};

const validateUserInputFixedRange = (state: Draft<SliceState>): void => {
  const fixedLower = state.userInput.fixedRange.lower;
  const fixedUpper = state.userInput.fixedRange.upper;
  if (fixedLower !== null && fixedUpper !== null && fixedLower >= fixedUpper) {
    state.userInput.fixedRange.error = 'Fixed lower cannot be equal or higher than fixed upper';
  }
};

export const validateUserInput = (state: Draft<SliceState>): void => {
  validateUserInputNotional(state);
  validateUserInputMargin(state);
  validateUserInputFixedRange(state);
};

export const resetNotionalAndMarginEditMode = (state: Draft<SliceState>): void => {
  state.userInput.notionalAmount.editMode = 'add';
  state.userInput.marginAmount.editMode = 'add';
};

export const updateSelectedPosition = (state: Draft<SliceState>): void => {
  if (
    state.positions.status !== 'success' ||
    state.positions.value === null ||
    state.positions.value.length === 0
  ) {
    return;
  }

  const fixedLower = state.userInput.fixedRange.lower;
  const fixedUpper = state.userInput.fixedRange.upper;
  state.selectedPosition = state.positions.value[0];

  const filteredPosition = state.positions.value.find(
    (i) => i.fixedRateLower.toNumber() === fixedLower && i.fixedRateUpper.toNumber() === fixedUpper,
  );

  if (filteredPosition === undefined) {
    state.selectedPosition = null;
  } else {
    state.selectedPosition = filteredPosition;
  }
};

export const updateLeverage = (state: Draft<SliceState>): void => {
  if (getProspectiveLpNotional(state) > 0 && state.userInput.marginAmount.value > 0) {
    state.userInput.leverage = getProspectiveLpNotional(state) / state.userInput.marginAmount.value;
  }

  state.showLowLeverageNotification = checkLowLeverageNotification(state);
};

export const hasExistingPosition = (state: Draft<SliceState>): boolean => {
  return state.selectedPosition !== null;
};

export const getDefaultLpFixedLow = (state: Draft<SliceState>): number => {
  // todo: layer in smarter dynamic default range logic in here
  return 1;
};

export const getDefaultLpFixedHigh = (state: Draft<SliceState>): number => {
  // todo: layer in smarter dynamic default range logic in here
  return 3;
};

export const getProspectiveLpFixedLow = (state: Draft<SliceState>): number | null => {
  if (isUserInputFixedRangeError(state)) {
    return null;
  }

  return state.userInput.fixedRange.lower;
};

export const getProspectiveLpFixedHigh = (state: Draft<SliceState>): number | null => {
  if (isUserInputFixedRangeError(state)) {
    return null;
  }

  return state.userInput.fixedRange.upper;
};

export const getProspectiveLpNotional = (state: Draft<SliceState>): number => {
  if (isUserInputNotionalError(state)) {
    return 0;
  }

  if (state.userInput.notionalAmount.editMode === 'add') {
    return state.userInput.notionalAmount.value;
  }

  return -state.userInput.notionalAmount.value;
};

export const getProspectiveLpMargin = (state: Draft<SliceState>): number => {
  if (isUserInputMarginError(state)) {
    return 0;
  }

  if (state.userInput.marginAmount.editMode === 'add') {
    return state.userInput.marginAmount.value;
  }

  return -state.userInput.marginAmount.value;
};

export const getExistingSelectedPositionNotional = (state: Draft<SliceState>) => {
  if (state.selectedPosition === null) {
    return null;
  }

  return state.selectedPosition.notional;
};

export const getSelectedPositionNotional = (state: Draft<SliceState>) => {
  let selectedPositionNotional = 0;

  if (state.selectedPosition !== null) {
    selectedPositionNotional += state.selectedPosition.notional;
  }

  return selectedPositionNotional;
};

export const getEditPositionNotional = (state: Draft<SliceState>) => {
  let editPositionNotional = 0;

  if (state.selectedPosition !== null) {
    editPositionNotional += state.selectedPosition.notional;
  }

  if (state.userInput.notionalAmount.value > 0) {
    if (state.userInput.notionalAmount.editMode === 'add') {
      editPositionNotional += state.userInput.notionalAmount.value;
    } else {
      editPositionNotional -= state.userInput.notionalAmount.value;
    }
  }

  if (editPositionNotional < 0) {
    return 0;
  }

  return editPositionNotional;
};

export const getVariableRate = (state: Draft<SliceState>) => {
  return state.variableRate.status === 'success' ? state.variableRate.value : null;
};
