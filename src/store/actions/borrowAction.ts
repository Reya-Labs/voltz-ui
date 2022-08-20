import { AugmentedAMM } from '@utilities';
import { BorrowAction, Transaction } from '../types';
import { serializeAmm, createId } from '../utilities';

const borrowAction = (amm: AugmentedAMM, transaction: Omit<Transaction, 'id'>): BorrowAction => ({
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
