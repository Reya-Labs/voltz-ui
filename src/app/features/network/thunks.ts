import { createAsyncThunk } from '@reduxjs/toolkit';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { getChainInfo } from './get-chain-info';
import { getRpcUrl } from './get-rpc-urls';

const rejectThunkWithError = (
  thunkAPI: {
    rejectWithValue: (value: string | undefined) => unknown;
  },
  err: unknown,
) => {
  if (typeof err === 'string') {
    return thunkAPI.rejectWithValue(err);
  }
  return thunkAPI.rejectWithValue((err as Error)?.message);
};

export const setChainIdThunk = createAsyncThunk<
  Awaited<ReturnType<typeof rejectThunkWithError>>,
  {
    chainId: SupportedChainId;
    isSupportedNetwork: boolean;
  }
>('network/setChainId', async ({ chainId, isSupportedNetwork }, thunkAPI) => {
  if (isSupportedNetwork) {
    const provider = window.ethereum as {
      request: (param: { params?: { chainId: string }[]; method: string }) => Promise<string>;
    };
    if (!provider) {
      return rejectThunkWithError(thunkAPI, 'Metamask is not installed, please install!');
    }
    const providerChainId = await provider.request({ method: 'eth_chainId' });
    // switch to the correct network
    const networkChainId = `0x${chainId}`;
    if (providerChainId !== networkChainId) {
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: networkChainId }],
        });
      } catch (error) {
        // This error code indicates that the chain has not been added to MetaMask.
        if ((error as { code: number }).code === 4902) {
          try {
            const info = getChainInfo(chainId);
            if (!info) {
              return rejectThunkWithError(thunkAPI, 'Unsupported network');
            }
            const addChainParameter = {
              chainId: networkChainId,
              chainName: info.label,
              rpcUrls: [getRpcUrl(chainId)],
              nativeCurrency: info.nativeCurrency,
              blockExplorerUrls: [info.explorer],
            };

            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [addChainParameter],
            });
          } catch (addError) {
            return rejectThunkWithError(thunkAPI, 'Failed to add the network');
          }
        } else {
          return rejectThunkWithError(thunkAPI, 'Failed to switch to the network');
        }
      }
    }
  } else {
    return rejectThunkWithError(thunkAPI, 'Unsupported network');
  }
});
