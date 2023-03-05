import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../reducer';

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
  if (state.userInput.notionalAmount.error || state.userInput.notionalAmount.value === null) {
    return 0;
  }

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

export const isMarginValidAndStrictlyPositive = (state: Draft<SliceState>): boolean => {
  return (
    !state.userInput.marginAmount.error &&
    state.userInput.marginAmount.value !== null &&
    state.userInput.marginAmount.value > 0
  );
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
