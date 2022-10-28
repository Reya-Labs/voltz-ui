import { createContext } from 'react';

import { Wallet, WalletName } from './types';

const defaultConnect = (name: WalletName) => Promise.resolve();
const defaultDisconnect = () => {};

const WalletContext = createContext<Wallet>({
  status: 'initializing',
  connect: defaultConnect,
  disconnect: defaultDisconnect,
  account: null,
  name: null,
  provider: null,
  signer: null,
  balance: {},
  wallet: null,
  loading: false,
  error: false,
  required: false,
  setRequired: (_required: boolean) => undefined,
  walletError: null,
  refetch: () => Promise.resolve(),
});

export default WalletContext;
