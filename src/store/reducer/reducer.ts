import { combineReducers } from 'redux';

import transactionsReducer from './transactions';

const reducer = combineReducers({
  transactions: transactionsReducer,
});

export default reducer;
