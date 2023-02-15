import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import React, { useEffect } from 'react';

import {
  selectChainChangeState,
  selectChainId,
  selectIsSupportedChain,
} from '../../../app/features/network';
import { setChainIdThunk } from '../../../app/features/network/thunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Ellipsis } from '../../atomic/Ellipsis/Ellipsis';
import { getNetworkOptions } from './get-network-options';
import {
  ArrowIcon,
  NetworkSelect,
  NetworkTypography,
  SelectorBox,
  WarningIcon,
} from './NetworkSelector.styled';
import { setChainId } from '../../../utilities/network/chain-store';

export const NetworkSelector: React.FunctionComponent = () => {
  const chainId = useAppSelector(selectChainId);
  const isSupportedChain = useAppSelector(selectIsSupportedChain);
  const chainChangeState = useAppSelector(selectChainChangeState);
  const dispatch = useAppDispatch();
  const networkOptions = getNetworkOptions();
  useEffect(() => {
    if (!chainId) {
      return;
    }
    setChainId(chainId.toString());
  }, [chainId]);
  if (Object.keys(networkOptions).length === 0) {
    return null;
  }
  const currentNetwork = !chainId ? undefined : networkOptions[chainId];

  return (
    <SelectorBox data-testid="NetworkSelector-SelectorBox">
      {currentNetwork && isSupportedChain ? (
        <React.Fragment>
          <currentNetwork.Icon />
          <NetworkTypography data-testid="NetworkSelector-NetworkTypography">
            {chainChangeState !== 'pending' ? (
              currentNetwork.name
            ) : (
              <React.Fragment>
                Approve in wallet
                <Ellipsis />
              </React.Fragment>
            )}
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
        value={!chainId ? 'Loading' : isSupportedChain ? chainId.toString() : 'Unsupported'}
        onChange={(event) => {
          void dispatch(
            setChainIdThunk({
              chainId: parseInt(event.target.value, 10),
              isSupportedChain: true,
            }),
          );
        }}
      >
        {!isSupportedChain ? <option value="Unsupported">Unsupported</option> : null}
        {Object.keys(networkOptions).map((key) => (
          <option key={key} value={key}>
            {networkOptions[parseInt(key, 10) as SupportedChainId].name}
          </option>
        ))}
      </NetworkSelect>
    </SelectorBox>
  );
};
