import { AugmentedAMM } from '@utilities';
import { MintAction, Transaction } from '../types';
import { serializeAmm, createId } from '../utilities';

const mintAction = (amm: AugmentedAMM, transaction: Omit<Transaction, 'id'>): MintAction => ({
  type: 'mint',
  payload: {
    amm: serializeAmm(amm),
    transaction: {
      ...transaction,
      id: createId(transaction),
    },
  },
});

export default mintAction;
