import memoize from 'lodash/memoize';
import { createSelector } from 'reselect';

import transactionsSelector from './transactionsSelector';

const transactionSelector = createSelector(transactionsSelector, (transactions) =>
  memoize((transactionId: string | undefined) =>
    transactions.find(({ id }) => id === transactionId),
  ),
);

export default transactionSelector;
