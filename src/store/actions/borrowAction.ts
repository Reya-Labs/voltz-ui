import { BorrowAction, Transaction } from '../types';
import { serializeAmm, createId } from '../utilities';

import { AMM } from '@voltz-protocol/v1-sdk';

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
