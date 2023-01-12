import { createSelectorCreator, defaultMemoize } from 'reselect';

import { State } from '../../../types';

const concatenateSummaries = (transactions: State['transactions']) => {
  const summaries = transactions.map(({ id, succeededAt, failedAt, resolvedAt }) => {
    const succeeded = succeededAt ? '1' : '0';
    const failed = failedAt ? '1' : '0';
    const resolved = resolvedAt ? '1' : '0';

    return `${id}${succeeded}${failed}${resolved}`;
  });

  return summaries.join('.');
};

const transactionsEqual = (previous: State, next: State) => {
  return concatenateSummaries(previous.transactions) === concatenateSummaries(next.transactions);
};

const transactionsSelectorCreator = createSelectorCreator(defaultMemoize, transactionsEqual);
const stateSelector = (state: State) => state;

export const transactionsSelector = transactionsSelectorCreator(
  stateSelector,
  (state) => state.transactions,
);
