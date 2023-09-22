import { createContext } from 'react';

import { Wallet } from './types';

export const WalletContext = createContext<Wallet>({
  status: 'initializing',
  connect: () => Promise.resolve(),
  disconnect: () => {},
  reconnect: () => Promise.resolve(),
  account: null,
  accountENS: null,
  name: null,
  provider: null,
  signer: null,
  required: false,
  setRequired: (_required: boolean) => undefined,
  walletError: null,
});
