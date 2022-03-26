import { State, TransactionAction } from '../../types';

const addTransactionReducer = (state: State['transactions'], action: TransactionAction) => {
  return [...state, action.payload.transaction];
};

export default addTransactionReducer;
