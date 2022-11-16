import { BurnAction, Transaction } from '../types';
import { serializeAmm, createId } from '../utilities';

import { AMM } from '@voltz-protocol/v1-sdk';

const burnAction = (amm: AMM, transaction: Omit<Transaction, 'id'>): BurnAction => ({
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
