export type WalletStatus =
  | 'initializing'
  | 'unavailable'
  | 'notConnected'
  | 'connecting'
  | 'connected';

export type WalletName = 'metamask';

export type WalletConnectResult = Promise<string[] | null>;

export type Wallet = {
  status: WalletStatus;
  connect: (walletName: WalletName) => WalletConnectResult;
  account: string | null;
  name: WalletName | null;
};
