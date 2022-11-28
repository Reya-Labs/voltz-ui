import { Action, State } from '../../types';
import addTransactionReducer from './addTransactionReducer';
import closeTransactionReducer from './closeTransactionReducer';
import updateTransactionReducer from './updateTransactionReducer';

const transactionsReducer = (state: State['transactions'], action: Action) => {
  if (!state) {
    return [];
  }

  switch (action.type) {
    case 'mint':
    case 'burn':
    case 'swap':
    case 'updatePositionMargin':
    case 'settlePosition':
    case 'rolloverMint':
    case 'rolloverSwap':
      return addTransactionReducer(state, action);

    case 'close-transaction':
      return closeTransactionReducer(state, action);

    case 'update-transaction':
      return updateTransactionReducer(state, action);

    default:
      return state;
  }
};

export default transactionsReducer;
