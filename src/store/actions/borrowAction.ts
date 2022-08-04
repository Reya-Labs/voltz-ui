import { AugmentedAMM } from '@utilities';
import { BorrowAction, TransactionUpdate } from '../types';
import { serializeAmm, createBorrowId } from '../utilities';

const borrowAction = (amm: AugmentedAMM, notional: number, transaction: Omit<TransactionUpdate, 'id'>): BorrowAction => ({
  type: 'borrow',
  payload: {
    amm: serializeAmm(amm),
    notional: notional,
    transaction: {
      ...transaction,
      id: createBorrowId(amm.id, notional),
    },
  },
});

export default borrowAction;
