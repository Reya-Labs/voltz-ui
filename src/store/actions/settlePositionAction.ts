import { SettlePositionAction, Transaction } from '../types';
import { serializeAmm, createId } from '../utilities';

import { AMM } from '@voltz-protocol/v1-sdk';

const settlePositionAction = (
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

export default settlePositionAction;
