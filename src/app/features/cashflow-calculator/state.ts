import { Tokens } from '@voltz-protocol/api-sdk-v2';

import { V2Pool } from '../aMMs';

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

export type SliceState = {
  pool: V2Pool | null;
  estimatedVariableApy: number;
  token: Tokens | '$';
  cashflowInfo: {
    totalCashflow: number;
    status: ThunkStatus;
  };
};

export const initialState: SliceState = {
  pool: null,
  token: '$',
  estimatedVariableApy: 0,
  cashflowInfo: {
    totalCashflow: 0,
    status: 'idle',
  },
};
