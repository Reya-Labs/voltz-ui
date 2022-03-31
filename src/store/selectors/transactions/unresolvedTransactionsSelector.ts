import { createSelector } from 'reselect';

import transactionsSelector from './transactionsSelector';

const unresolvedTransactionsSelector = createSelector(transactionsSelector, (transactions) =>
  transactions.filter(({ resolvedAt, failedAt }) => !resolvedAt && !failedAt),
);

export default unresolvedTransactionsSelector;
