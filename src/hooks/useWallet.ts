import { useContext } from 'react';

import { WalletContext, Wallet } from '@components/atomic';

const useWallet = (): Wallet => {
  return useContext(WalletContext);
};

export default useWallet;
