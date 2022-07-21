import { AMMGetInfoPostMintArgs } from "@voltz-protocol/v1-sdk/dist/types/entities";

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
  expectedApr?: number;
  margin?: number;
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