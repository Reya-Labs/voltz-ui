import React from 'react';

import { SupportedNetworks } from '../../../contexts/WalletContext/types';
import { useWallet } from '../../../hooks/useWallet';
import {
  ArbitrumIcon,
  ArrowIcon,
  EthereumIcon,
  NetworkSelect,
  NetworkTypography,
  SelectorBox,
} from './NetworkSelector.styled';

const networkOptions: Record<
  SupportedNetworks,
  {
    name: string;
    Icon: React.FunctionComponent;
  }
> = {
  ethereum: {
    name: 'Ethereum',
    Icon: EthereumIcon,
  },
  arbitrum: {
    name: 'Arbitrum',
    Icon: ArbitrumIcon,
  },
};

export const NetworkSelector: React.FunctionComponent = () => {
  const { network, connectNetwork } = useWallet();
  const currentNetwork = networkOptions[network || 'ethereum'];
  return (
    <SelectorBox data-testid="NetworkSelector-SelectorBox">
      {currentNetwork ? (
        <React.Fragment>
          <currentNetwork.Icon />
          <NetworkTypography data-testid="NetworkSelector-NetworkTypography">
            {currentNetwork.name.toUpperCase()}
          </NetworkTypography>
          <ArrowIcon />
        </React.Fragment>
      ) : null}
      <NetworkSelect onChange={(event) => connectNetwork(event.target.value as SupportedNetworks)}>
        {Object.keys(networkOptions).map((key) => (
          <option key={key} value={key}>
            {networkOptions[key as SupportedNetworks].name}
          </option>
        ))}
      </NetworkSelect>
    </SelectorBox>
  );
};
