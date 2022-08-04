import { Agents } from '@contexts';
import { ethers } from 'ethers';

export type WindowWithWallet = typeof window & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wallet?: {
    provider: ethers.providers.Web3Provider,
    signer: ethers.providers.JsonRpcSigner
  }
};


// things that can occur after the transaction has been mined or fails
export type TransactionUpdate = {
  id: string;
  txid?: string;
  failedAt?: string;
  failureMessage?: string;
  succeededAt?: string;
  // refers to when the transaction has been loaded from the subgraoh, it will mark it as resolved, means there is a corresponding position that matches that (not strictly speaking true)
  // if value != reject
  resolvedAt?: string;
};


// defines a mint or a swap
export type Transaction = TransactionUpdate & {
  agent: Agents;
  ammId: string;
  fixedLow?: number;
  fixedHigh?: number;
  oldFixedLow?: number;
  oldFixedHigh?: number;
  source?: string;
  notional: number;
  margin: number;
  partialCollateralization?: boolean;
};

export type RolloverMintTransaction = Transaction & {
  marginEth?: number;
  newMarginEngine: string;
  oldFixedLow: number;
  oldFixedHigh: number;
};

export type RolloverSwapTransaction = Transaction & {
  fixedRateLimit?: number;
  isFT: boolean;
  marginEth?: number;
  newMarginEngine: string;
};

export type State = {
  transactions: Transaction[];
};

export type SerializedAMM = {
  id: string;
  updatedTimestamp: string;
  factoryAddress: string;
  fcmAddress: string;
  marginEngineAddress: string;
  termStartTimestamp: string;
  termEndTimestamp: string;
  tickSpacing: string;
  tick: string;
  txCount: string;
  rateOracle: {
    id: string;
    protocolId: string;
    token: { id: string; name: string; decimals: string };
  };
  totalLiquidity: string;
  totalNotionalTraded: string;
};

export type ActionType =
  | 'mint'
  | 'burn'
  | 'swap'
  | 'fcmSwap'
  | 'fcmUnwind'
  | 'updatePositionMargin'
  | 'settlePosition'  
  | 'add-transaction'
  | 'close-transaction'
  | 'update-transaction'
  | 'rolloverMint'
  | 'rolloverSwap'
  | 'borrow';

export type BaseAction = {
  type: ActionType;
  payload: Record<string, unknown>;
};

export type TransactionAction = BaseAction & {
  payload: {
    transaction: Transaction;
    amm: SerializedAMM;
  };
};

export type RolloverMintTransactionAction = BaseAction & {
  payload: {
    transaction: RolloverMintTransaction;
    amm: SerializedAMM;
  };
};

export type RolloverSwapTransactionAction = BaseAction & {
  payload: {
    transaction: RolloverSwapTransaction;
    amm: SerializedAMM;
  };
};

export type MintAction = TransactionAction & {
  type: 'mint';
};

export type BurnAction = TransactionAction & {
  type: 'burn';
};

export type SwapAction = TransactionAction & {
  type: 'swap';
};

export type FCMSwapAction = TransactionAction & {
  type: 'fcmSwap';
};

export type FCMUnwindAction = TransactionAction & {
  type: 'fcmUnwind';
};

export type UpdatePositionMarginAction = TransactionAction & {
  type: 'updatePositionMargin';
};

export type SettlePositionAction = TransactionAction & {
  type: 'settlePosition';
};

export type CloseTransactionAction = BaseAction & {
  type: 'close-transaction';
  payload: {
    transactionId: string;
  };
};

export type UpdateTransactionAction = BaseAction & {
  type: 'update-transaction';
  payload: {
    update: TransactionUpdate;
  };
};

export type RolloverMintAction = RolloverMintTransactionAction & {
  type: 'rolloverMint';
};

export type RolloverSwapAction = RolloverSwapTransactionAction & {
  type: 'rolloverSwap';
};

export type BorrowAction = {
  type: 'borrow';
  payload: {
    transaction: TransactionUpdate;
    amm: SerializedAMM;
    borrowToFix: number;
  };
}

export type Action =
  | MintAction
  | BurnAction
  | SwapAction
  | FCMSwapAction
  | FCMUnwindAction
  | UpdatePositionMarginAction
  | SettlePositionAction
  | CloseTransactionAction
  | UpdateTransactionAction
  | RolloverMintAction
  | RolloverSwapAction
  | BorrowAction;

