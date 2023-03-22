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

export const isUserInputMarginError = (state: Draft<SliceState>): boolean => {
  return state.userInput.marginAmount.error !== null;
};

const validateUserInputNotional = (state: Draft<SliceState>): void => {
  let error = null;

  if (
    hasExistingPosition(state) &&
    state.userInput.notionalAmount.editMode === 'remove' &&
    state.userInput.notionalAmount.value > (state.position.value as Position).notional
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
      maxMarginWithdrawable = (state.position.value as Position).maxMarginWithdrawable;
    }

    if (getProspectiveLpNotional(state) > 0) {
      maxMarginWithdrawable = state.prospectiveLp.infoPostLp.value.maxMarginWithdrawable;
    }

    // todo: not sure if we need the commented out logic below in context of lps
    // if (maxMarginWithdrawable !== null) {
    //   if (maxMarginWithdrawable > state.prospectiveLp.infoPostLp.value.fee) {
    //     maxMarginWithdrawable = stringToBigFloat(
    //       lpFormLimitAndFormatNumber(
    //         maxMarginWithdrawable - state.prospectiveLp.infoPostLp.value.fee,
    //         'floor',
    //       ),
    //     );
    //   } else {
    //     maxMarginWithdrawable = 0;
    //   }
    // }

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

export const validateUserInput = (state: Draft<SliceState>): void => {
  validateUserInputNotional(state);
  validateUserInputMargin(state);
};

export const updateLeverage = (state: Draft<SliceState>): void => {
  if (getProspectiveLpNotional(state) > 0 && state.userInput.marginAmount.value > 0) {
    state.userInput.leverage = getProspectiveLpNotional(state) / state.userInput.marginAmount.value;
  }

  state.showLowLeverageNotification = checkLowLeverageNotification(state);
};

export const hasExistingPosition = (state: Draft<SliceState>): boolean => {
  return state.position.status === 'success' && state.position.value !== null;
};

export const getProspectiveLpNotional = (state: Draft<SliceState>): number => {
  if (isUserInputNotionalError(state)) {
    return 0;
  }

  let value = state.userInput.notionalAmount.value;

  const existingPositionNotional = getExistingPositionNotional(state);
  if (state.position.value !== null && existingPositionNotional !== null) {
    value =
      state.userInput.notionalAmount.editMode === 'add'
        ? existingPositionNotional + value
        : existingPositionNotional - value;
  }

  return value;
};

export const getProspectiveLpMargin = (state: Draft<SliceState>): number => {
  if (state.userInput.marginAmount.editMode === 'add') {
    return state.userInput.marginAmount.value;
  }

  return -state.userInput.marginAmount.value;
};

export const getExistingPositionNotional = (state: Draft<SliceState>) => {
  if (state.position.status !== 'success' || !state.position.value) {
    return null;
  }

  return state.position.value.notional;
};

export const getEditPositionNotional = (state: Draft<SliceState>) => {
  // todo: implement
  return 0;
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
