import { State, UpdateTransactionAction } from '../../types';

const updateTransactionReducer = (
  state: State['transactions'],
  action: UpdateTransactionAction,
) => {
  const { id: transactionId, ...rest } = action.payload.update;
  const transactionToUpdate = state.find(({ id }) => id === transactionId);
  const restOfTransactions = state.filter(({ id }) => id !== transactionId);

  return [...restOfTransactions, { ...transactionToUpdate, ...rest }];
};

export default updateTransactionReducer;
