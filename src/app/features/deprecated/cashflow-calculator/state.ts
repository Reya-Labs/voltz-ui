import { AMM } from '@voltz-protocol/v1-sdk';

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

export type SliceState = {
  aMM: AMM | null;
  estimatedApy: number;
  cashflowInfo: {
    averageFixedRate: number;
    accruedCashflowExistingPosition: number;
    accruedCashflowEditPosition: number;
    estimatedAdditionalCashflow: (estimatedApy: number) => number;
    estimatedTotalCashflow: (estimatedApy: number) => number;
    status: ThunkStatus;
  };
};

export const initialState: SliceState = {
  aMM: null,
  estimatedApy: 0,
  cashflowInfo: {
    averageFixedRate: 0,
    accruedCashflowExistingPosition: 0,
    accruedCashflowEditPosition: 0,
    estimatedAdditionalCashflow: () => 0,
    estimatedTotalCashflow: () => 0,
    status: 'idle',
  },
};
