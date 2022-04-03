import { createSelector } from 'reselect';

import transactionsSelector from './transactionsSelector';

const unresolvedTransactionsSelector = createSelector(transactionsSelector, (transactions) =>
  transactions.filter(
    ({ resolvedAt, failedAt, succeededAt }) => !!succeededAt && !resolvedAt && !failedAt,
  ),
);

export default unresolvedTransactionsSelector;
