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
  setBalance: (_balance: number) => undefined,
  wallet: null,
  loading: false,
  error: false,
  required: false,
  setRequired: (_required: boolean) => undefined,
  walletError: null
});

export default WalletContext;
