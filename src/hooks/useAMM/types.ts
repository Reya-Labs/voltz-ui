import { AMMGetInfoPostMintArgs, Position } from '@voltz-protocol/v1-sdk';

export type MintMinimumMarginRequirementPayload = Omit<
  AMMGetInfoPostMintArgs,
  'recipient' | 'margin'
>;

export enum GetInfoType {
  NORMAL_SWAP = 'NORMAL_SWAP',
}

export type SwapInfoPayload = {
  position?: Position;
  margin?: number;
  notional: number;
  type: GetInfoType;
  fixedLow?: number;
  fixedHigh?: number;
};

export type ExpectedInfoPayload = {
  margin: number;
  position?: Position;
  fixedTokenDeltaUnbalanced: number;
  availableNotional: number;
  predictedVariableApy: number;
};
