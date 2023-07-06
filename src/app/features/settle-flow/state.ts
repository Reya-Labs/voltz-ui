import { SliceState } from './types';

export const initialState: SliceState = {
  position: null,
  step: null,
  error: null,
  txHash: null,
  infoPostSettlePosition: {
    value: {
      gasFee: {
        value: 0,
        token: 'ETH',
      },
    },
    status: 'idle',
  },
};
