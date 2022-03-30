import { createSelectorCreator, defaultMemoize } from 'reselect';

import { State } from '../../types';
import stateSelector from '../stateSelector';

const concatenateIds = (transactions: State['transactions']) => {
  return transactions.map(({ id }) => id).join('.');
};

const idsEqual = (previous: State, next: State) => {
  return concatenateIds(previous.transactions) === concatenateIds(next.transactions);
};

const transactionsSelectorCreator = createSelectorCreator(defaultMemoize, idsEqual);

const transactionsSelector = transactionsSelectorCreator(
  stateSelector,
  (state) => state.transactions,
);

export default transactionsSelector;
