import { getChainInfo, SupportedChainId } from '@voltz-protocol/v1-sdk';

import { rejectThunkWithError } from '../../../helpers';
import { setChainIdThunkHandler, WindowEthereumType } from '.';

jest.mock('../../../helpers', () => ({
  rejectThunkWithError: jest.fn(),
}));

jest.mock('@voltz-protocol/v1-sdk', () => ({
  ...jest.requireActual('@voltz-protocol/v1-sdk'),
  getChainInfo: jest.fn(),
}));

describe('setChainIdThunkHandler', () => {
  const triggerApprovalFlow = true;
  const chainId = SupportedChainId.mainnet;
  const isSupportedChain = true;
  const reloadPage = true;
  const thunkAPI = {
    dispatch: jest.fn(),
    getState: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should do nothing if triggerApprovalFlow is false', async () => {
    const result = await setChainIdThunkHandler(
      { reloadPage, triggerApprovalFlow: false, chainId, isSupportedChain },
      thunkAPI as never,
    );
    expect(result).toBeUndefined();
  });

  it('should switch to the correct network if providerChainId is not equal to networkChainId', async () => {
    const provider = {
      request: jest.fn().mockResolvedValueOnce('0x1'),
    };
    (window.ethereum as WindowEthereumType) = provider;

    const info = {
      label: 'Mainnet',
      defaultRpcUrl: 'https://mainnet.infura.io/v3/123',
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      explorer: 'https://etherscan.io/',
    };
    (getChainInfo as jest.MockedFunction<typeof getChainInfo>).mockReturnValueOnce(info);

    await setChainIdThunkHandler(
      { reloadPage, triggerApprovalFlow, chainId: SupportedChainId.goerli, isSupportedChain },
      thunkAPI as never,
    );
    expect(provider.request).toHaveBeenCalledTimes(2);
    expect(provider.request).toHaveBeenNthCalledWith(1, { method: 'eth_chainId' });
    expect(provider.request).toHaveBeenNthCalledWith(2, {
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x5' }],
    });
    expect(getChainInfo).toHaveBeenCalledTimes(0);
    expect(thunkAPI.dispatch).toHaveBeenCalledTimes(0);
    expect(
      rejectThunkWithError as jest.MockedFunction<typeof rejectThunkWithError>,
    ).toHaveBeenCalledTimes(0);
  });

  it('should add the network if wallet_switchEthereumChain throws 4902 error', async () => {
    const provider = {
      request: jest.fn().mockResolvedValueOnce('0x2a'),
    };
    (window.ethereum as WindowEthereumType) = provider;

    (provider.request as jest.MockedFunction<typeof provider.request>).mockRejectedValueOnce({
      code: 4902,
    });

    const info = {
      label: 'Kovan',
      defaultRpcUrl: 'https://kovan.infura.io/v3/123',
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      explorer: 'https://etherscan.io/',
    };
    (getChainInfo as jest.MockedFunction<typeof getChainInfo>).mockReturnValueOnce(info);

    const addChainParameter = {
      chainId: '0x1',
      chainName: info.label,
      rpcUrls: [info.defaultRpcUrl],
      nativeCurrency: info.nativeCurrency,
      blockExplorerUrls: [info.explorer],
    };

    await setChainIdThunkHandler(
      { reloadPage, triggerApprovalFlow, chainId, isSupportedChain },
      thunkAPI as never,
    );
    expect(provider.request).toHaveBeenCalledTimes(3);
    expect(provider.request).toHaveBeenNthCalledWith(1, { method: 'eth_chainId' });
    expect(provider.request).toHaveBeenNthCalledWith(2, {
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1' }],
    });
    expect(getChainInfo).toHaveBeenCalledWith(chainId);
    expect(provider.request).toHaveBeenNthCalledWith(3, {
      method: 'wallet_addEthereumChain',
      params: [addChainParameter],
    });
    expect(thunkAPI.dispatch).toHaveBeenCalledTimes(0);
    expect(
      rejectThunkWithError as jest.MockedFunction<typeof rejectThunkWithError>,
    ).toHaveBeenCalledTimes(0);
  });

  it('should reject with an error if wallet_switchEthereumChain throws an error other than 4902', async () => {
    const provider = {
      request: jest.fn().mockResolvedValueOnce('0x2a'),
    };
    (window.ethereum as WindowEthereumType) = provider;
    (provider.request as jest.MockedFunction<typeof provider.request>).mockRejectedValueOnce({
      code: 1234,
    });

    await setChainIdThunkHandler(
      { reloadPage, triggerApprovalFlow, chainId, isSupportedChain },
      thunkAPI as never,
    );
    expect(provider.request).toHaveBeenCalledTimes(2);
    expect(provider.request).toHaveBeenNthCalledWith(1, { method: 'eth_chainId' });
    expect(provider.request).toHaveBeenNthCalledWith(2, {
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1' }],
    });
    expect(getChainInfo).toHaveBeenCalledTimes(0);
    expect(provider.request).toHaveBeenCalledTimes(2);
    expect(
      rejectThunkWithError as jest.MockedFunction<typeof rejectThunkWithError>,
    ).toHaveBeenCalledWith(thunkAPI, 'Failed to switch to the network');
  });

  it('should reject with an error if wallet_addEthereumChain throws an error', async () => {
    const provider = {
      request: jest.fn().mockResolvedValueOnce('0x2a').mockRejectedValueOnce({
        code: 4902,
      }),
    };
    (window.ethereum as WindowEthereumType) = provider;
    (provider.request as jest.MockedFunction<typeof provider.request>).mockRejectedValueOnce(
      new Error('add error'),
    );
    const info = {
      label: 'Mainnet',
      defaultRpcUrl: 'https://mainnet.infura.io/v3/123',
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      explorer: 'https://etherscan.io/',
    };
    const addChainParameter = {
      chainId: '0x1',
      chainName: info.label,
      rpcUrls: [info.defaultRpcUrl],
      nativeCurrency: info.nativeCurrency,
      blockExplorerUrls: [info.explorer],
    };
    (getChainInfo as jest.MockedFunction<typeof getChainInfo>).mockReturnValueOnce(info);

    await setChainIdThunkHandler(
      { reloadPage, triggerApprovalFlow, chainId, isSupportedChain },
      thunkAPI as never,
    );

    expect(provider.request).toHaveBeenCalledTimes(3);
    expect(provider.request).toHaveBeenNthCalledWith(1, { method: 'eth_chainId' });
    expect(provider.request).toHaveBeenNthCalledWith(2, {
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1' }],
    });
    expect(provider.request).toHaveBeenNthCalledWith(3, {
      method: 'wallet_addEthereumChain',
      params: [addChainParameter],
    });
    expect(getChainInfo).toHaveBeenCalledTimes(1);
    expect(
      rejectThunkWithError as jest.MockedFunction<typeof rejectThunkWithError>,
    ).toHaveBeenCalledWith(thunkAPI, 'Failed to add the network');
  });

  it('should reject with an error if getChainInfo returns undefined', async () => {
    const provider = {
      request: jest
        .fn()
        .mockResolvedValueOnce('0x2a')
        .mockRejectedValueOnce({
          code: 4902,
        })
        .mockRejectedValueOnce({
          code: 4902,
        }),
    };
    (window.ethereum as WindowEthereumType) = provider;

    (getChainInfo as jest.MockedFunction<typeof getChainInfo>).mockReturnValueOnce(undefined);

    await setChainIdThunkHandler(
      { reloadPage, triggerApprovalFlow, chainId, isSupportedChain },
      thunkAPI as never,
    );

    expect(provider.request).toHaveBeenCalledTimes(2);
    expect(provider.request).toHaveBeenNthCalledWith(1, { method: 'eth_chainId' });
    expect(getChainInfo).toHaveBeenCalledWith(chainId);
    expect(
      rejectThunkWithError as jest.MockedFunction<typeof rejectThunkWithError>,
    ).toHaveBeenCalledWith(thunkAPI, 'Unsupported network');
  });
});
