import { BurnAction, SerializedAMM, Transaction } from '../types';

const burnAction = (amm: SerializedAMM, transaction: Transaction): BurnAction => ({
  type: 'burn',
  payload: {
    amm,
    transaction,
  },
});

export default burnAction;
