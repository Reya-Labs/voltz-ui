import { Draft } from '@reduxjs/toolkit';
import { Position } from '@voltz-protocol/v1-sdk';

import { SliceState } from '../reducer';

export const isUserInputNotionalError = (state: Draft<SliceState>): boolean => {
  return state.userInput.notionalAmount.error !== null;
};

export const isUserInputMarginError = (state: Draft<SliceState>): boolean => {
  return state.userInput.marginAmount.error !== null;
};

export const getAvailableNotional = (state: Draft<SliceState>): number => {
  if (hasExistingPosition(state) && state.userInput.notionalAmount.editMode === 'remove') {
    return Math.min(
      (state.position.value as Position).notional,
      state.poolSwapInfo.availableNotional[state.prospectiveSwap.mode],
    );
  }

  return state.poolSwapInfo.availableNotional[state.prospectiveSwap.mode];
};

const validateUserInputNotional = (state: Draft<SliceState>): void => {
  let error = null;
  if (
    state.userInput.notionalAmount.editMode === 'add' &&
    state.prospectiveSwap.notionalAmount > getAvailableNotional(state)
  ) {
    error = 'Not enough liquidity. Available:';
  }

  if (
    hasExistingPosition(state) &&
    state.userInput.notionalAmount.editMode === 'remove' &&
    state.userInput.notionalAmount.value > getAvailableNotional(state)
  ) {
    error = 'Not enough notional. Available:';
  }

  state.userInput.notionalAmount.error = error;
};

export const getAvailableMargin = (state: Draft<SliceState>): number => {
  if (
    hasExistingPosition(state) &&
    state.userInput.marginAmount.editMode === 'remove' &&
    state.prospectiveSwap.infoPostSwap.status === 'success'
  ) {
    return (state.position.value as Position).maxMarginWithdrawable;
  }

  if (state.userInput.marginAmount.editMode === 'add' && state.walletBalance.status === 'success') {
    return state.walletBalance.value;
  }

  return Number.MAX_SAFE_INTEGER;
};

const validateUserInputMargin = (state: Draft<SliceState>): void => {
  let error = null;
  if (
    state.userInput.marginAmount.editMode === 'add' &&
    state.userInput.marginAmount.value > getAvailableMargin(state)
  ) {
    error = 'WLT';
  }

  if (
    state.userInput.marginAmount.editMode === 'add' &&
    state.prospectiveSwap.infoPostSwap.status === 'success' &&
    state.userInput.marginAmount.value < state.prospectiveSwap.infoPostSwap.value.marginRequirement
  ) {
    error = 'Margin too low. Additional margin required:';
  }

  if (
    hasExistingPosition(state) &&
    state.userInput.notionalAmount.editMode === 'remove' &&
    state.prospectiveSwap.infoPostSwap.status === 'success' &&
    state.userInput.marginAmount.value > getAvailableMargin(state)
  ) {
    error = 'Not enough margin. Available margin:';
  }

  state.userInput.marginAmount.error = error;
};

export const validateUserInput = (state: Draft<SliceState>): void => {
  validateUserInputNotional(state);
  validateUserInputMargin(state);
};

export const updateLeverage = (state: Draft<SliceState>): void => {
  if (state.prospectiveSwap.notionalAmount > 0 && state.userInput.marginAmount.value > 0) {
    state.userInput.leverage =
      state.prospectiveSwap.notionalAmount / state.userInput.marginAmount.value;
  }
};

export const hasExistingPosition = (state: Draft<SliceState>): boolean => {
  return state.position.status === 'success' && state.position.value !== null;
};

export const getProspectiveSwapMode = (state: Draft<SliceState>): 'fixed' | 'variable' => {
  if (state.position.value === null) {
    return state.userInput.mode;
  }

  const existingPositionMode = getExistingPositionMode(state);

  if (
    existingPositionMode === 'fixed' &&
    state.userInput.mode === 'fixed' &&
    state.userInput.notionalAmount.editMode === 'add'
  ) {
    return 'fixed';
  }

  if (
    existingPositionMode === 'variable' &&
    state.userInput.mode === 'variable' &&
    state.userInput.notionalAmount.editMode === 'add'
  ) {
    return 'variable';
  }

  return existingPositionMode === 'fixed' ? 'variable' : 'fixed';
};

export const getProspectiveSwapNotional = (state: Draft<SliceState>): number => {
  let value = state.userInput.notionalAmount.value;

  const existingPositionNotional = getExistingPositionNotional(state);
  if (
    state.position.value !== null &&
    existingPositionNotional !== null &&
    state.userInput.mode !== getExistingPositionMode(state)
  ) {
    value =
      state.userInput.notionalAmount.editMode === 'add'
        ? 2 * existingPositionNotional + value
        : 2 * existingPositionNotional - value;
  }

  return value;
};

export const getProspectiveSwapMargin = (state: Draft<SliceState>): number => {
  if (state.userInput.marginAmount.editMode === 'add') {
    return state.userInput.marginAmount.value;
  }

  return -state.userInput.marginAmount.value;
};

export const getExistingPositionFixedRate = (state: Draft<SliceState>) => {
  if (state.position.status !== 'success' || !state.position.value) {
    return null;
  }

  return Math.abs(
    state.position.value.fixedTokenBalance / state.position.value.variableTokenBalance,
  );
};

export const getExistingPositionMode = (state: Draft<SliceState>) => {
  if (state.position.status !== 'success' || !state.position.value) {
    return null;
  }

  return state.position.value.variableTokenBalance < 0 ? 'fixed' : 'variable';
};

export const getExistingPositionNotional = (state: Draft<SliceState>) => {
  if (state.position.status !== 'success' || !state.position.value) {
    return null;
  }

  return state.position.value.notional;
};

export const getEditPositionTokenBalance = (state: Draft<SliceState>) => {
  let fixedTokenBalance = 0;
  let variableTokenBalance = 0;

  if (state.position.status === 'success' && state.position.value) {
    fixedTokenBalance += state.position.value.fixedTokenBalance;
    variableTokenBalance += state.position.value.variableTokenBalance;
  }

  if (state.prospectiveSwap.infoPostSwap.status === 'success') {
    fixedTokenBalance += state.prospectiveSwap.infoPostSwap.value.fixedTokenDeltaBalance;
    variableTokenBalance += state.prospectiveSwap.infoPostSwap.value.variableTokenDeltaBalance;
  }

  return {
    fixedTokenBalance,
    variableTokenBalance,
  };
};

export const getEditPositionMode = (state: Draft<SliceState>) => {
  return getEditPositionTokenBalance(state).variableTokenBalance < 0 ? 'fixed' : 'variable';
};

export const getEditPositionFixedRate = (state: Draft<SliceState>) => {
  const { fixedTokenBalance, variableTokenBalance } = getEditPositionTokenBalance(state);
  return variableTokenBalance !== 0 ? Math.abs(fixedTokenBalance / variableTokenBalance) : 0;
};

export const getEditPositionNotional = (state: Draft<SliceState>) => {
  const { variableTokenBalance: notional } = getEditPositionTokenBalance(state);
  return Math.abs(notional);
};

export const getNewPositionFixedRate = (state: Draft<SliceState>) => {
  if (state.prospectiveSwap.infoPostSwap.status === 'success') {
    return state.prospectiveSwap.infoPostSwap.value.averageFixedRate;
  }

  if (state.fixedRate.status === 'success') {
    return state.fixedRate.value;
  }

  return null;
};

export const getVariableRate = (state: Draft<SliceState>) => {
  return state.variableRate.status === 'success' ? state.variableRate.value : null;
};
