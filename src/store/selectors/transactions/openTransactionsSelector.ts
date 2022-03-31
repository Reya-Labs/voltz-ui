import { createSelector } from 'reselect';

import transactionsSelector from './transactionsSelector';

const openTransactionsSelector = createSelector(transactionsSelector, (transactions) =>
  transactions.filter(({ succeededAt, failedAt }) => !succeededAt && !failedAt),
);

export default openTransactionsSelector;
