import { AMM } from '@voltz-protocol/v1-sdk';

import { MintAction, Transaction } from '../../../types';
import { createId, serializeAmm } from '../utilities';

export const mintAction = (amm: AMM, transaction: Omit<Transaction, 'id'>): MintAction => ({
  type: 'mint',
  payload: {
    amm: serializeAmm(amm),
    transaction: {
      ...transaction,
      id: createId(transaction),
    },
  },
});
