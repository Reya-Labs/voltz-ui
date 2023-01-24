import { Position } from '@voltz-protocol/v1-sdk';

export enum TraderTransactionType {
  SWAP = 'SWAP',
  MARGIN_UPDATE = 'MARGIN_UPDATE',
  SETTLEMENT = 'SETTLEMENT',
  LIQUIDATION = 'LIQUIDATION',
}

export type SwapTransaction = Position['swaps'][number] & {
  type: TraderTransactionType.SWAP;
};
export type MarginUpdateTransaction = Position['marginUpdates'][number] & {
  type: TraderTransactionType.MARGIN_UPDATE;
};
export type SettlementTransaction = Position['settlements'][number] & {
  type: TraderTransactionType.SETTLEMENT;
};
export type LiquidationTransaction = Position['liquidations'][number] & {
  type: TraderTransactionType.LIQUIDATION;
};

export type TraderPositionTransaction =
  | SwapTransaction
  | MarginUpdateTransaction
  | SettlementTransaction
  | LiquidationTransaction;
