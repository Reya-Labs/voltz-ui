import { createSelector } from 'reselect';

import { transactionsSelector } from './transactionsSelector';

export const unresolvedTransactionsSelector = createSelector(transactionsSelector, (transactions) =>
  transactions.filter(
    ({ resolvedAt, failedAt, succeededAt }) => !!succeededAt && !resolvedAt && !failedAt,
  ),
);
