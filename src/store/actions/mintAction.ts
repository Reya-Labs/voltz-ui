import { MintAction, Transaction } from '../types';
import { serializeAmm, createId } from '../utilities';

import { AMM } from '@voltz-protocol/v1-sdk';

const mintAction = (amm: AMM, transaction: Omit<Transaction, 'id'>): MintAction => ({
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
