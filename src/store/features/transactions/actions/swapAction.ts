import { AMM } from '@voltz-protocol/v1-sdk';

import { SwapAction, Transaction } from '../../../types';
import { createId, serializeAmm } from '../utilities';

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
