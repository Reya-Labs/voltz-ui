import { CloseTransactionAction, State } from '../../types';

const closeTransactionReducer = (state: State['transactions'], action: CloseTransactionAction) => {
  return state.filter(({ id }) => id !== action.payload.transactionId);
};

export default closeTransactionReducer;
