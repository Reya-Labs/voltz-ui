import { SliceState } from './types';

export const initialState: SliceState = {
  poolToken: 'eth',
  marginAccountsForSelection: [],
  marginAccountsForSelectionLoadedState: 'idle',
};
