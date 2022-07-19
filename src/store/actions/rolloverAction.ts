import { AugmentedAMM } from '@utilities';
import { RolloverMintAction, RolloverMintTransaction } from '../types';
import { serializeAmm, createId } from '../utilities';

const rolloverAction = (amm: AugmentedAMM, transaction: Omit<RolloverMintTransaction, 'id'>): RolloverMintAction => ({
  type: 'rolloverMint',
  payload: {
    amm: serializeAmm(amm),
    transaction: {
      ...transaction,
      id: createId(transaction),
    },
  },
});

export default rolloverAction;
