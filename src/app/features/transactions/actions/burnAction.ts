import { AMM } from '@voltz-protocol/v1-sdk';

import { BurnAction, Transaction } from '../../../types';
import { createId, serializeAmm } from '../utilities';

export const burnAction = (amm: AMM, transaction: Omit<Transaction, 'id'>): BurnAction => ({
  type: 'burn',
  payload: {
    amm: serializeAmm(amm),
    transaction: {
      ...transaction,
      id: createId(transaction),
    },
  },
});
