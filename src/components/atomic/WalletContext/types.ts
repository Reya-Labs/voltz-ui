export type WalletStatus =
  | 'initializing'
  | 'unavailable'
  | 'notConnected'
  | 'connecting'
  | 'connected';

export type WalletName = 'metamask';

export type WalletConnect = Promise<string[] | null>;

export type Wallet = {
  status: WalletStatus;
  connect: (walletName: WalletName) => WalletConnect;
  account: string | null;
  name: WalletName | null;
};
