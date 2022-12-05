import { createContext } from 'react';

import { Wallet } from './types';

const defaultConnect = () => Promise.resolve();
const defaultDisconnect = () => {};

export const WalletContext = createContext<Wallet>({
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
