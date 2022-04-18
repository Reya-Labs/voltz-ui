import { AugmentedAMM } from '@utilities';
import { SettlePositionAction, Transaction } from '../types';
import { serializeAmm, createId } from '../utilities';

const settlePositionAction = (amm: AugmentedAMM, transaction: Omit<Transaction, 'id'>): SettlePositionAction => ({
  type: 'settlePosition',
  payload: {
    amm: serializeAmm(amm),
    transaction: {
      ...transaction,
      id: createId(transaction),
    },
  },
});

export default settlePositionAction;
