import {
  AMMGetInfoPostSwapArgs,
  AMMGetInfoPostMintArgs,
  InfoPostSwap,
  PositionInfo
} from '@voltz-protocol/v1-sdk';

import { UseAsyncFunctionResult } from '@hooks';

export type MintMinimumMarginRequirementPayload = Omit<
  AMMGetInfoPostMintArgs,
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

export type PositionInfoPayload = {
  source: string;
  tickLower: number;
  tickUpper: number;
};

export type AMMDispatch = {
  variableApy: UseAsyncFunctionResult<unknown, number | void>;
  fixedApr: UseAsyncFunctionResult<unknown, number | void>;
  mintMinimumMarginRequirement: UseAsyncFunctionResult<
    MintMinimumMarginRequirementPayload,
    number | void
  >;
  swapInfo: UseAsyncFunctionResult<SwapInfoPayload, InfoPostSwap | void>;
  positionInfo: UseAsyncFunctionResult<PositionInfoPayload, PositionInfo | void>;
};
