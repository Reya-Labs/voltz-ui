import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';

import { transactionsSelector } from './transactionsSelector';

export const transactionSelector = createSelector(transactionsSelector, (transactions) =>
  memoize((transactionId: string | undefined) =>
    transactions.find(({ id }) => id === transactionId),
  ),
);
