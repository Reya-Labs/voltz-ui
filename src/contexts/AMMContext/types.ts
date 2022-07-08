import {
  AMMGetInfoPostSwapArgs,
  AMMGetInfoPostMintArgs,
  InfoPostSwap,
  PositionInfo,
  Position
} from '@voltz-protocol/v1-sdk';

import { UseAsyncFunctionResult } from '@hooks';

export type MintMinimumMarginRequirementPayload = Omit<
  AMMGetInfoPostMintArgs,
  'recipient' | 'margin'
>;

export enum GetInfoType {
  NORMAL_SWAP = 'NORMAL_SWAP',
  FCM_SWAP = 'FCM_SWAP',
  FCM_UNWIND = 'FCM_UNWIND'
};

export type SwapInfoPayload = {
  notional: number;
  type: GetInfoType;
  fixedRateLimit?: number;
}

export type MinimumMarginAmountSwapPayload = {
  fixedLow: number;
  fixedHigh: number;
  notional: number;
  isFT: boolean;
};

export type PositionInfoPayload = {
  position: Position;
};

export type AMMDispatch = {
  variableApy: UseAsyncFunctionResult<unknown, number | void>;
  fixedApr: UseAsyncFunctionResult<unknown, number | void>;
  mintMinimumMarginRequirement: UseAsyncFunctionResult<
    MintMinimumMarginRequirementPayload,
    number | void
  >;
  swapInfo: UseAsyncFunctionResult<SwapInfoPayload, InfoPostSwap | void>;
  positionInfo: UseAsyncFunctionResult<Position, PositionInfo | void>;
  ammCaps: UseAsyncFunctionResult<unknown, number | void>;
};
