import { useContext } from 'react';

import { Wallet } from '../contexts/WalletContext/types';
import { WalletContext } from '../contexts/WalletContext/WalletContext';

export const useWallet = (): Wallet => {
  return useContext(WalletContext);
};
