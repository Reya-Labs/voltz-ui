import { AugmentedAMM } from '@utilities';
import { RolloverSwapAction, RolloverSwapTransaction } from '../types';
import { serializeAmm, createId } from '../utilities';

const rolloverSwapAction = (amm: AugmentedAMM, transaction: Omit<RolloverSwapTransaction, 'id'>): RolloverSwapAction => ({
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
