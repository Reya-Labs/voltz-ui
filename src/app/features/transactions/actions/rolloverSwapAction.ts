import { AMM } from '@voltz-protocol/v1-sdk';

import { RolloverSwapAction, RolloverSwapTransaction } from '../../../types';
import { createId, serializeAmm } from '../utilities';

export const rolloverSwapAction = (
  amm: AMM,
  transaction: Omit<RolloverSwapTransaction, 'id'>,
): RolloverSwapAction => ({
  type: 'rolloverSwap',
  payload: {
    amm: serializeAmm(amm),
    transaction: {
      ...transaction,
      id: createId(transaction),
    },
  },
});
