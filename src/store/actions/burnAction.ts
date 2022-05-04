import { AugmentedAMM } from '@utilities';
import { BurnAction, Transaction } from '../types';
import { serializeAmm, createId } from '../utilities';

const burnAction = (amm: AugmentedAMM, transaction: Omit<Transaction, 'id'>): BurnAction => ({
  type: 'burn',
  payload: {
    amm: serializeAmm(amm),
    transaction: {
      ...transaction,
      id: createId(transaction),
    },
  },
});

export default burnAction;
