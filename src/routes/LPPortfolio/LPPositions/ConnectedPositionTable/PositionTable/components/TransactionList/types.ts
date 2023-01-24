import { Position } from '@voltz-protocol/v1-sdk';

export enum LPTransactionType {
  MARGIN_UPDATE = 'MARGIN_UPDATE',
  SETTLEMENT = 'SETTLEMENT',
  LIQUIDATION = 'LIQUIDATION',
  MINT = 'MINT',
  BURN = 'BURN',
}

export type MarginUpdateTransaction = Position['marginUpdates'][number] & {
  type: LPTransactionType.MARGIN_UPDATE;
};
export type SettlementTransaction = Position['settlements'][number] & {
  type: LPTransactionType.SETTLEMENT;
};
export type LiquidationTransaction = Position['liquidations'][number] & {
  type: LPTransactionType.LIQUIDATION;
};
export type MintTransaction = Position['mints'][number] & {
  type: LPTransactionType.MINT;
};
export type BurnTransaction = Position['burns'][number] & {
  type: LPTransactionType.BURN;
};

export type LPPositionTransaction =
  | MintTransaction
  | BurnTransaction
  | MarginUpdateTransaction
  | SettlementTransaction
  | LiquidationTransaction;
