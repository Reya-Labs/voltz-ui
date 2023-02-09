import { SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';
import { createContext } from 'react';

import { Wallet } from './types';

export const WalletContext = createContext<Wallet>({
  status: 'initializing',
  connect: () => Promise.resolve(),
  connectNetwork: () => undefined,
  disconnect: () => {},
  account: null,
  name: null,
  provider: null,
  signer: null,
  required: false,
  setRequired: (_required: boolean) => undefined,
  walletError: null,
  network: SupportedNetworksEnum.mainnet,
});
