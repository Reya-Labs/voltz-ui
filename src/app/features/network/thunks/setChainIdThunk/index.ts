import { createAsyncThunk } from '@reduxjs/toolkit';
import { getChainInfo, SupportedChainId } from '@voltz-protocol/v1-sdk';

import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';

export const setChainIdThunk = createAsyncThunk<
  Awaited<ReturnType<typeof rejectThunkWithError>>,
  {
    chainId: SupportedChainId;
    isSupportedChain: boolean;
    triggerApprovalFlow: boolean;
  }
>('network/setChainId', async ({ triggerApprovalFlow, chainId, isSupportedChain }, thunkAPI) => {
  if (!triggerApprovalFlow) {
    return;
  }
  if (isSupportedChain) {
    const provider = window.ethereum as {
      request: (param: { params?: { chainId: string }[]; method: string }) => Promise<string>;
    };
    if (!provider) {
      return;
    }
    const providerChainId = await provider.request({ method: 'eth_chainId' });
    // switch to the correct network
    const networkChainId = `0x${chainId.toString(16)}`;
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
              rpcUrls: [info.defaultRpcUrl],
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
  }
});
