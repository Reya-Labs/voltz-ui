import { CloseTransactionAction, State } from '../../../types';

export const closeTransactionReducer = (
  state: State['transactions'],
  action: CloseTransactionAction,
) => {
  return state.filter(({ id }) => id !== action.payload.transactionId);
};
