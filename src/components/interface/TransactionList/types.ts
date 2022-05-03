import { Position } from "@voltz-protocol/v1-sdk";

export enum TransactionType {
  SWAP,
  MARGIN_UPDATE,
  SETTLEMENT,
  LIQUIDATION,
  FCM_SWAP,
  FCM_UNWIND,
  FCM_SETTLEMENT,
};

export type SwapTransaction = Position['swaps'][number] & {
  type: TransactionType.SWAP
};
export type MarginUpdateTransaction = Position['marginUpdates'][number] & {
  type: TransactionType.MARGIN_UPDATE
};
export type SettlementTransaction = Position['settlements'][number] & {
  type: TransactionType.SETTLEMENT
};
export type LiquidationTransaction = Position['liquidations'][number] & {
  type: TransactionType.LIQUIDATION
};
export type FCMSwapTransaction = Position['fcmSwaps'][number] & {
  type: TransactionType.FCM_SWAP
};
export type FCMUnwindTransaction = Position['fcmUnwinds'][number] & {
  type: TransactionType.FCM_UNWIND
};
export type FCMSettlementTransaction = Position['fcmSettlements'][number] & {
  type: TransactionType.FCM_SETTLEMENT
};

export type MEPositionTransaction = (
  SwapTransaction | 
  MarginUpdateTransaction | 
  SettlementTransaction | 
  LiquidationTransaction
);
export type FCMPositionTransaction = (
  FCMSwapTransaction | 
  FCMUnwindTransaction | 
  FCMSettlementTransaction
);