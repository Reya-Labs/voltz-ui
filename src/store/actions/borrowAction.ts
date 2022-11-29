import { AMM } from '@voltz-protocol/v1-sdk';

import { BorrowAction, Transaction } from '../types';
import { createId, serializeAmm } from '../utilities';

const borrowAction = (amm: AMM, transaction: Omit<Transaction, 'id'>): BorrowAction => ({
  type: 'borrow',
  payload: {
    amm: serializeAmm(amm),
    transaction: {
      ...transaction,
      id: createId(transaction),
    },
  },
});

export default borrowAction;
