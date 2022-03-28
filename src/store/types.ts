import { Agents } from '@components/contexts';

export type WindowWithEthereum = typeof window & {
  ethereum: any;
};

export type TransactionUpdate = {
  id: string;
  txid?: string;
  failedAt?: string;
  failureMessage?: string;
  succeededAt?: string;
};

export type Transaction = TransactionUpdate & {
  agent: Agents;
  ammId: string;
  fixedLow?: number;
  fixedHigh?: number;
  notional: number;
  margin: number;
  partialCollateralization?: boolean;
};

export type State = {
  transactions: Transaction[];
};

export type SerializedAMM = {
  id: string;
  createdTimestamp: string;
  updatedTimestamp: string;
  fcmAddress: string;
  marginEngineAddress: string;
  termStartTimestamp: string;
  termEndTimestamp: string;
  tickSpacing: string;
  sqrtPriceX96: string;
  liquidity: string;
  tick: string;
  txCount: any;
  rateOracle: {
    id: string;
    protocolId: any;
    token: { id: string; name: string; decimals: any };
  };
};

export type ActionType =
  | 'mint'
  | 'burn'
  | 'swap'
  | 'add-transaction'
  | 'close-transaction'
  | 'update-transaction';

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

export type MintAction = TransactionAction & {
  type: 'mint';
};

export type BurnAction = TransactionAction & {
  type: 'burn';
};

export type SwapAction = TransactionAction & {
  type: 'swap';
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

export type Action =
  | MintAction
  | BurnAction
  | SwapAction
  | CloseTransactionAction
  | UpdateTransactionAction;
