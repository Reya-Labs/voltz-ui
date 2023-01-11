import { State, TransactionAction } from '../../../types';

export const addTransactionReducer = (state: State['transactions'], action: TransactionAction) => {
  return [...state, action.payload.transaction];
};
