import { AugmentedAMM } from '@utilities';
import { UpdatePositionMarginAction, Transaction } from '../types';
import { serializeAmm, createId } from '../utilities';


const updatePositionMarginAction = (amm: AugmentedAMM, transaction: Omit<Transaction, 'id'>): UpdatePositionMarginAction => ({
  type: 'updatePositionMargin',
  payload: {
    amm: serializeAmm(amm),
    transaction: {
      ...transaction,
      id: createId(transaction),
    },
  },
});

export default updatePositionMarginAction;
