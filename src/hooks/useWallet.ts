import { useContext } from 'react';

import { WalletContext, Wallet } from '@contexts';

const useWallet = (): Wallet => {
  return useContext(WalletContext);
};

export default useWallet;
