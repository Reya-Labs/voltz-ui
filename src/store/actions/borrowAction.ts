import { AugmentedAMM } from '@utilities';
import { BorrowAction, TransactionUpdate } from '../types';
import { serializeAmm, createBorrowId } from '../utilities';

const borrowAction = (amm: AugmentedAMM, borrowToFix: number, transaction: Omit<TransactionUpdate, 'id'>): BorrowAction => ({
  type: 'borrow',
  payload: {
    amm: serializeAmm(amm),
    borrowToFix: borrowToFix,
    transaction: {
      ...transaction,
      id: createBorrowId(amm.id, borrowToFix),
    },
  },
});

export default borrowAction;
