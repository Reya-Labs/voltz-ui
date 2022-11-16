import { Position } from '@voltz-protocol/v1-sdk';

export enum TransactionType {
  SWAP = 'SWAP',
  MARGIN_UPDATE = 'MARGIN_UPDATE',
  SETTLEMENT = 'SETTLEMENT',
  LIQUIDATION = 'LIQUIDATION',
  MINT = 'MINT',
  BURN = 'BURN',
}

export type SwapTransaction = Position['swaps'][number] & {
  type: TransactionType.SWAP;
};
export type MarginUpdateTransaction = Position['marginUpdates'][number] & {
  type: TransactionType.MARGIN_UPDATE;
};
export type SettlementTransaction = Position['settlements'][number] & {
  type: TransactionType.SETTLEMENT;
};
export type LiquidationTransaction = Position['liquidations'][number] & {
  type: TransactionType.LIQUIDATION;
};
export type MintTransaction = Position['mints'][number] & {
  type: TransactionType.MINT;
};
export type BurnTransaction = Position['burns'][number] & {
  type: TransactionType.BURN;
};

export type TraderPositionTransaction =
  | SwapTransaction
  | MarginUpdateTransaction
  | SettlementTransaction
  | LiquidationTransaction;
export type LPPositionTransaction =
  | MintTransaction
  | BurnTransaction
  | MarginUpdateTransaction
  | SettlementTransaction
  | LiquidationTransaction;
