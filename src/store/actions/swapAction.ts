import { SwapAction, SerializedAMM, Transaction } from '../types';

const swapAction = (amm: SerializedAMM, transaction: Transaction): SwapAction => ({
  type: 'swap',
  payload: {
    amm,
    transaction,
  },
});

export default swapAction;
