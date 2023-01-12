import { AMM } from '@voltz-protocol/v1-sdk';

import { Transaction, UpdatePositionMarginAction } from '../../../types';
import { createId, serializeAmm } from '../utilities';

export const updatePositionMarginAction = (
  amm: AMM,
  transaction: Omit<Transaction, 'id'>,
): UpdatePositionMarginAction => ({
  type: 'updatePositionMargin',
  payload: {
    amm: serializeAmm(amm),
    transaction: {
      ...transaction,
      id: createId(transaction),
    },
  },
});
