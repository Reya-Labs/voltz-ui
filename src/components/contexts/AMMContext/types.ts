import { UseAsyncFunctionResult } from '@hooks';

export type MinimumMarginAmountMintBurnPayload = {
  fixedLow: number;
  fixedHigh: number;
  notional: number;
};

export type MinimumMarginAmountSwapPayload = {
  fixedLow: number;
  fixedHigh: number;
  notional: number;
  isFT: boolean;
};

export type AMMDispatch = {
  variableApy: UseAsyncFunctionResult<unknown, number | void>;

  loadMinimumMarginAmountMintBurn: (payload: MinimumMarginAmountMintBurnPayload) => void;
  minimumMarginAmountMintBurn: number | null;
  minimumMarginAmountMintBurnLoading: boolean;
  minimumMarginAmountMintBurnError: boolean;

  loadMinimumMarginAmountSwap: (payload: MinimumMarginAmountSwapPayload) => void;
  minimumMarginAmountSwap: number | null;
  minimumMarginAmountSwapLoading: boolean;
  minimumMarginAmountSwapError: boolean;
};
