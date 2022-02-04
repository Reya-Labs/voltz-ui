import { useState, useMemo, useCallback } from 'react';
import { useMetaMask } from 'metamask-react';

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

const useWallet = (): Wallet => {
  const [walletName, setWalletName] = useState<WalletName | null>(null);
  const {
    status: metamaskStatus,
    connect: metamaskConnect,
    account: metamaskAccount,
  } = useMetaMask();

  const status = useMemo((): WalletStatus => {
    return metamaskStatus;
  }, [metamaskStatus]);

  const connect = useCallback(
    (connectedWalletName: WalletName): WalletConnect => {
      setWalletName(connectedWalletName);

      return metamaskConnect();
    },
    [metamaskConnect],
  );

  return {
    status,
    connect,
    account: metamaskAccount,
    name: walletName,
  };
};

export default useWallet;
