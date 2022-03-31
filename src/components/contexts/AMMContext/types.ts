import {
  AMMGetInfoPostSwapArgs,
  AMMGetMinimumMarginRequirementPostMintArgs,
  InfoPostSwap,
} from '@voltz/v1-sdk';

import { UseAsyncFunctionResult } from '@hooks';

export type MintMinimumMarginRequirementPayload = Omit<
  AMMGetMinimumMarginRequirementPostMintArgs,
  'recipient' | 'margin'
>;

export type SwapInfoPayload = Omit<
  AMMGetInfoPostSwapArgs,
  'recipient' | 'isFT' | 'fixedLow' | 'fixedHigh'
>;

export type MinimumMarginAmountSwapPayload = {
  fixedLow: number;
  fixedHigh: number;
  notional: number;
  isFT: boolean;
};

export type AMMDispatch = {
  variableApy: UseAsyncFunctionResult<unknown, number | void>;
  mintMinimumMarginRequirement: UseAsyncFunctionResult<
    MintMinimumMarginRequirementPayload,
    number | void
  >;
  swapInfo: UseAsyncFunctionResult<SwapInfoPayload, InfoPostSwap | void>;
};
