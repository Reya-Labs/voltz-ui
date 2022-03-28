import { AugmentedAMM } from '@utilities';
import { SwapAction, Transaction } from '../types';
import { serializeAmm, createId } from '../utilities';

const swapAction = (amm: AugmentedAMM, transaction: Omit<Transaction, 'id'>): SwapAction => ({
  type: 'swap',
  payload: {
    amm: serializeAmm(amm),
    transaction: {
      ...transaction,
      id: createId(transaction),
    },
  },
});

export default swapAction;
