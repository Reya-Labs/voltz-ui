import { AMM } from '@voltz-protocol/v1-sdk';

import { SettlePositionAction, Transaction } from '../../../types';
import { createId, serializeAmm } from '../utilities';

export const settlePositionAction = (
  amm: AMM,
  transaction: Omit<Transaction, 'id'>,
): SettlePositionAction => ({
  type: 'settlePosition',
  payload: {
    amm: serializeAmm(amm),
    transaction: {
      ...transaction,
      id: createId(transaction),
    },
  },
});
