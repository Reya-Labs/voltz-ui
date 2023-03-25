import { Draft } from '@reduxjs/toolkit';
import { Position } from '@voltz-protocol/v1-sdk';

import {
  compactFormat,
  compactFormatToParts,
  formatNumber,
  limitAndFormatNumber,
} from '../../../../utilities/number';
import { LpFormNumberLimits } from '../constants';
import { SliceState } from '../reducer';

export const lpFormFormatNumber = (value: number) => {
  if (value < 1) {
    return formatNumber(value, 0, LpFormNumberLimits.decimalLimit);
  }

  return formatNumber(value, 0, 2);
};

export const lpFormCompactFormat = (value: number) => {
  if (value < 1) {
    return compactFormat(value, 0, LpFormNumberLimits.decimalLimit);
  }

  return compactFormat(value, 0, 2);
};

export const lpFormCompactFormatToParts = (value: number) => {
  if (value < 1) {
    return compactFormatToParts(value, 0, LpFormNumberLimits.decimalLimit);
  }

  return compactFormatToParts(value, 0, 2);
};

export const lpFormLimitAndFormatNumber = (value: number, mode: 'floor' | 'ceil') => {
  return limitAndFormatNumber(
    value,
    LpFormNumberLimits.digitLimit,
    LpFormNumberLimits.decimalLimit,
    mode,
  );
};

export const isUserInputNotionalError = (state: Draft<SliceState>): boolean => {
  return state.userInput.notionalAmount.error !== null;
};

export const isUserInputFixedRangeError = (state: Draft<SliceState>): boolean => {
  return state.userInput.fixedError !== null;
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
    error = 'Not enough notional. Available:';
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
  const fixedLower = state.userInput.fixedLower;
  const fixedUpper = state.userInput.fixedUpper;
  state.userInput.fixedError = '';
  if (fixedLower !== null && fixedUpper !== null && fixedLower >= fixedUpper) {
    state.userInput.fixedError = 'Fixed lower cannot be equal or higher than fixed upper';
  }
};

export const validateUserInput = (state: Draft<SliceState>): void => {
  validateUserInputNotional(state);
  validateUserInputMargin(state);
  validateUserInputFixedRange(state);
};

export const updateSelectedPosition = (state: Draft<SliceState>): void => {
  // todo: consider creating a separate function for this -> has existing positions
  if (state.positions.status !== 'success' || state.positions.value === null) {
    return;
  }

  const fixedLower = state.userInput.fixedLower;
  const fixedUpper = state.userInput.fixedUpper;
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

export const getProspectiveLpFixedLow = (state: Draft<SliceState>): number => {
  // todo: do we also want to have specific errros for fixedLow and fixedHigh

  if (isUserInputFixedRangeError(state)) {
    return 1;
  }

  if (state.userInput.fixedLower === null) {
    // todo: is this a sensible return for null case?
    return 1;
  }

  const value = state.userInput.fixedLower;

  return value;
};

export const getProspectiveLpFixedHigh = (state: Draft<SliceState>): number => {
  if (isUserInputFixedRangeError(state)) {
    // todo: is this a sensible return for null case?
    return 3;
  }

  if (state.userInput.fixedUpper === null) {
    // todo: is this a sensible return for null case?
    return 3;
  }

  const value = state.userInput.fixedUpper;

  return value;
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

export const getEditPositionNotional = (state: Draft<SliceState>) => {
  
  let editPositionNotional = 0;

  if (state.selectedPosition !== null) {
    editPositionNotional += state.selectedPosition.notional;
  }

  if (state.userInput.notionalAmount.value > 0) {
    if (state.userInput.notionalAmount.editMode == "add") {
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

export const checkLowLeverageNotification = (state: Draft<SliceState>) => {
  return !!(
    state.amm &&
    state.userInput.leverage !== null &&
    state.userInput.leverage < state.amm.minLeverageAllowed &&
    !state.showLowLeverageNotification
  );
};
