import React from 'react';
import { MetaMaskProvider } from 'metamask-react';

const WalletProvider: React.FunctionComponent = ({ children }) => {
  return <MetaMaskProvider>{children}</MetaMaskProvider>;
};

export default WalletProvider;
