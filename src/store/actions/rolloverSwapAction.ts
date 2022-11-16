import { RolloverSwapAction, RolloverSwapTransaction } from '../types';
import { serializeAmm, createId } from '../utilities';

import { AMM } from '@voltz-protocol/v1-sdk';

const rolloverSwapAction = (
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

export default rolloverSwapAction;
