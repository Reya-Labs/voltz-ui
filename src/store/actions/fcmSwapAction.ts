import { AugmentedAMM } from '@utilities';
import { FCMSwapAction, Transaction } from '../types';
import { serializeAmm, createId } from '../utilities';

const fcmSwapAction = (amm: AugmentedAMM, transaction: Omit<Transaction, 'id'>): FCMSwapAction => ({
  type: 'fcmSwap',
  payload: {
    amm: serializeAmm(amm),
    transaction: {
      ...transaction,
      id: createId(transaction),
    },
  },
});

export default fcmSwapAction;
