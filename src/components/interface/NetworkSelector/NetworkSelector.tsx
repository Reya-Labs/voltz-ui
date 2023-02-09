import { SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { useWallet } from '../../../hooks/useWallet';
import { isNetworkSelectorFlowEnabled } from '../../../utilities/is-network-selector-flow-enabled';
import { getNetworkOptions } from './get-network-options';
import {
  ArrowIcon,
  NetworkSelect,
  NetworkTypography,
  SelectorBox,
  WarningIcon,
} from './NetworkSelector.styled';

export const NetworkSelector: React.FunctionComponent = () => {
  const { network, connectNetwork } = useWallet();

  if (!isNetworkSelectorFlowEnabled()) {
    return null;
  }
  const networkOptions = getNetworkOptions();
  if (Object.keys(networkOptions).length === 0) {
    return null;
  }
  const currentNetwork = networkOptions[network];

  return (
    <SelectorBox data-testid="NetworkSelector-SelectorBox">
      {currentNetwork ? (
        <React.Fragment>
          <currentNetwork.Icon />
          <NetworkTypography data-testid="NetworkSelector-NetworkTypography">
            {currentNetwork.name}
          </NetworkTypography>
          <ArrowIcon />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <WarningIcon />
          <NetworkTypography data-testid="NetworkSelector-UnsupportedTypography">
            Unsupported
          </NetworkTypography>
          <ArrowIcon />
        </React.Fragment>
      )}
      <NetworkSelect onChange={(event) => connectNetwork(parseInt(event.target.value, 10))}>
        {Object.keys(networkOptions).map((key) => (
          <option key={key} value={key}>
            {networkOptions[parseInt(key, 10) as SupportedNetworksEnum].name}
          </option>
        ))}
      </NetworkSelect>
    </SelectorBox>
  );
};
