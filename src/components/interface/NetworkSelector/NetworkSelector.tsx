import { SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';
import React from 'react';

import {
  selectIsSupportedNetwork,
  selectNetwork,
  setNetworkAction,
} from '../../../app/features/network';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getNetworkOptions } from './get-network-options';
import {
  ArrowIcon,
  NetworkSelect,
  NetworkTypography,
  SelectorBox,
  WarningIcon,
} from './NetworkSelector.styled';

export const NetworkSelector: React.FunctionComponent = () => {
  const network = useAppSelector(selectNetwork);
  const isSupportedNetwork = useAppSelector(selectIsSupportedNetwork);
  const dispatch = useAppDispatch();
  const networkOptions = getNetworkOptions();
  if (Object.keys(networkOptions).length === 0) {
    return null;
  }
  const currentNetwork = networkOptions[network];

  return (
    <SelectorBox data-testid="NetworkSelector-SelectorBox">
      {currentNetwork && isSupportedNetwork ? (
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
      <NetworkSelect
        value={isSupportedNetwork ? network.toString() : 'Unsupported'}
        onChange={(event) => {
          dispatch(
            setNetworkAction({
              network: parseInt(event.target.value, 10),
              isSupportedNetwork: true,
            }),
          );
        }}
      >
        {!isSupportedNetwork ? <option value="Unsupported">Unsupported</option> : null}
        {Object.keys(networkOptions).map((key) => (
          <option key={key} value={key}>
            {networkOptions[parseInt(key, 10) as SupportedNetworksEnum].name}
          </option>
        ))}
      </NetworkSelect>
    </SelectorBox>
  );
};
