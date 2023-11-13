import { RootState } from '../../store';
import { mapMarginAccountForSwapLPToMarginAccountForSwapLPUI } from '../_common';

export const selectMarginAccountsForSwapLPLoadedState = (state: RootState) => {
  return state.marginAccountsForSwapLp.marginAccountsForSelectionLoadedState;
};

export const selectMarginAccountsForSwapLPLoading = (state: RootState): boolean => {
  const loadedState = selectMarginAccountsForSwapLPLoadedState(state);
  return loadedState === 'idle' || loadedState === 'pending';
};

export const selectMarginAccountsForSwapLPError = (state: RootState): boolean => {
  const loadedState = selectMarginAccountsForSwapLPLoadedState(state);
  return loadedState === 'failed';
};

export const selectMarginAccountsForSwapLPMarginAccounts = (state: RootState) => {
  const isLoading = selectMarginAccountsForSwapLPLoading(state);
  return isLoading ? [] : state.marginAccountsForSwapLp.marginAccountsForSelection;
};

export const selectMarginAccountsForSwapLPMarginAccountsUI = (state: RootState) => {
  const isLoading = selectMarginAccountsForSwapLPLoading(state);
  return isLoading
    ? []
    : state.marginAccountsForSwapLp.marginAccountsForSelection.map((item) =>
        mapMarginAccountForSwapLPToMarginAccountForSwapLPUI(
          item,
          state.marginAccountsForSwapLp.poolToken,
        ),
      );
};
