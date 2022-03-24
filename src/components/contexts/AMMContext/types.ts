import { AMMGetInfoPostSwapArgs, AMMGetMinimumMarginRequirementPostMintArgs } from '@voltz/v1-sdk';

import { UseAsyncFunctionResult } from '@hooks';

export type MintMinimumMarginRequirementPayload = Omit<
  AMMGetMinimumMarginRequirementPostMintArgs,
  'recipient' | 'margin'
>;

export type SwapMinimumMarginRequirementPayload = Omit<
  AMMGetInfoPostSwapArgs,
  'recipient' | 'isFT'
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
  swapMinimumMarginRequirement: UseAsyncFunctionResult<
    SwapMinimumMarginRequirementPayload,
    number | void
  >;
};
