import { useContext } from 'react';

import { WalletContext, Wallet } from '@components/contexts';

const useWallet = (): Wallet => {
  return useContext(WalletContext);
};

export default useWallet;
