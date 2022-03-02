import { DeepPartial } from 'utility-types';

import { Wallet as WalletData } from '@graphql';

export type WalletStatus =
  | 'initializing'
  | 'unavailable'
  | 'notConnected'
  | 'connecting'
  | 'connected';

export type WalletName = 'metamask';

export type WalletConnectResult = Promise<string[] | null>;

export type EthereumRequestArguments = {
  method: string;
  params?: unknown[] | object;
};

export type WalletEthereum = {
  request: (args: EthereumRequestArguments) => Promise<unknown>;
};

export type Wallet = {
  status: WalletStatus;
  connect: (walletName: WalletName) => WalletConnectResult;
  account: string | null;
  name: WalletName | null;
  ethereum: WalletEthereum | null;
  balance: number | null;
  data: DeepPartial<WalletData> | null;
};
