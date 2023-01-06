import { createContext } from 'react';

import { Wallet } from './types';

export const WalletContext = createContext<Wallet>({
  status: 'initializing',
  connect: () => Promise.resolve(),
  disconnect: () => {},
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
