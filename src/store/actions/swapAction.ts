import { SwapAction, Transaction } from '../types';
import { serializeAmm, createId } from '../utilities';

import { AMM } from '@voltz-protocol/v1-sdk';

const swapAction = (amm: AMM, transaction: Omit<Transaction, 'id'>): SwapAction => ({
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
