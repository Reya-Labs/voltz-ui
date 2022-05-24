import { createContext } from 'react';

import { Wallet, WalletName } from './types';

const defaultConnect = (name: WalletName) => Promise.resolve();
const defaultDisconnect = () => {};
const defaultGetTokenBalance = () => Promise.resolve(undefined);

const WalletContext = createContext<Wallet>({
  status: 'initializing',
  connect: defaultConnect,
  disconnect: defaultDisconnect,
  account: null,
  name: null,
  signer: null,
  balance: {},
  getTokenBalance: defaultGetTokenBalance,
  wallet: null,
  loading: false,
  error: false,
  required: false,
  setRequired: (_required: boolean) => undefined,
  walletError: null
});

export default WalletContext;
