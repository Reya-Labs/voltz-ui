import { AMM } from '@voltz-protocol/v1-sdk';

import { RolloverMintAction, RolloverMintTransaction } from '../../../types';
import { createId, serializeAmm } from '../utilities';

const rolloverMintAction = (
  amm: AMM,
  transaction: Omit<RolloverMintTransaction, 'id'>,
): RolloverMintAction => ({
  type: 'rolloverMint',
  payload: {
    amm: serializeAmm(amm),
    transaction: {
      ...transaction,
      id: createId(transaction),
    },
  },
});

export default rolloverMintAction;
