import { useMemo, useCallback } from 'react';
import { useMetaMask } from 'metamask-react';

export type WalletStatus =
  | 'initializing'
  | 'unavailable'
  | 'notConnected'
  | 'connecting'
  | 'connected';

export type WalletConnect = () => Promise<string[] | null>;

export type UseWalletResult = {
  status: WalletStatus;
  connect: WalletConnect;
  account: string | null;
};

const useWallet = () => {
  const {
    status: metamaskStatus,
    connect: metamaskConnect,
    account: metamaskAccount,
  } = useMetaMask();

  const status = useMemo((): WalletStatus => {
    return metamaskStatus;
  }, [metamaskStatus]);

  const connect = useCallback((): WalletConnect => {
    return metamaskConnect;
  }, [metamaskConnect]);

  return {
    status,
    connect,
    account: metamaskAccount,
  };
};

export default useWallet;
