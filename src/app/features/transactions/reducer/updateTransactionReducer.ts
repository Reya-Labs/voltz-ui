import { State, UpdateTransactionAction } from '../../../types';

export const updateTransactionReducer = (
  state: State['transactions'],
  action: UpdateTransactionAction,
) => {
  const { id: transactionId, ...rest } = action.payload.update;
  const transactionToUpdate = state.find(({ id }) => id === transactionId);
  if (!transactionToUpdate) {
    return state;
  }
  const restOfTransactions = state.filter(({ id }) => id !== transactionId);
  const updatedTransaction = {
    ...transactionToUpdate,
    ...rest,
  };
  return [...restOfTransactions, updatedTransaction];
};
