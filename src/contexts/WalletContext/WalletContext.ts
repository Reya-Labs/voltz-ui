import { createContext } from 'react';

import { getDefaultNetworkId } from '../../components/interface/NetworkSelector/get-default-network-id';
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
  network: getDefaultNetworkId(),
});
