import { createContext } from 'react';

import { Wallet, WalletName } from './types';

const defaultConnect = (_walletName: WalletName) => Promise.resolve(null);

const WalletContext = createContext<Wallet>({
  status: 'initializing',
  connect: defaultConnect,
  account: null,
  name: null,
  ethereum: null,
  signer: null,
  balance: null,
  wallet: null,
  loading: false,
  error: false,
});

export default WalletContext;
