import { V2Pool } from '../aMMs';

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

export type SliceState = {
  pool: V2Pool | null;
  estimatedVariableApy: number;
  cashflowInfo: {
    totalCashflow: number;
    status: ThunkStatus;
  };
};

export const initialState: SliceState = {
  pool: null,
  estimatedVariableApy: 0,
  cashflowInfo: {
    totalCashflow: 0,
    status: 'idle',
  },
};
