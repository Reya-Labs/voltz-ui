import { useState, useMemo, useCallback } from 'react';
import { useMetaMask } from 'metamask-react';

export type WalletStatus =
  | 'initializing'
  | 'unavailable'
  | 'notConnected'
  | 'connecting'
  | 'connected';

export type Wallet = 'metamask';

export type WalletConnect = (wallet: Wallet) => Promise<string[] | null>;

export type UseWalletResult = {
  status: WalletStatus;
  connect: WalletConnect;
  account: string | null;
  name: Wallet | null;
};

const useWallet = () => {
  const [walletName, setWalletName] = useState<Wallet | null>(null);
  const {
    status: metamaskStatus,
    connect: metamaskConnect,
    account: metamaskAccount,
  } = useMetaMask();

  const status = useMemo((): WalletStatus => {
    return metamaskStatus;
  }, [metamaskStatus]);

  const connect = useCallback(
    (connectedWalletName: Wallet): WalletConnect => {
      setWalletName(connectedWalletName);

      return metamaskConnect;
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
