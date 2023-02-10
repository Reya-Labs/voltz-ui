import { detectNetworkWithChainId, SupportedChainId } from '@voltz-protocol/v1-sdk';

import { detectIfNetworkSupported } from './detect-if-network-supported';

jest.mock('@voltz-protocol/v1-sdk', () => ({
  ...jest.requireActual('@voltz-protocol/v1-sdk'),
  detectNetworkWithChainId: jest.fn(),
}));

describe('detectIfNetworkSupported', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return an object with isSupported set to true and network set to mainnet when given chainId 1', () => {
    (detectNetworkWithChainId as jest.Mock).mockReturnValue({
      isSupported: true,
      chainId: SupportedChainId.mainnet,
    });

    const result = detectIfNetworkSupported(1, 'mainnet/alchemy-key-1');
    expect(result).toEqual({
      isSupported: true,
      chainId: SupportedChainId.mainnet,
    });
    expect(detectNetworkWithChainId).toHaveBeenCalledWith(1);
  });

  it('should return an object with isSupported set to false and network set to null when given chainId 5', () => {
    (detectNetworkWithChainId as jest.Mock).mockReturnValue({
      isSupported: false,
      chainId: null,
    });

    const result = detectIfNetworkSupported(5, 'mainnet/alchemy-key-1');
    expect(result).toEqual({
      isSupported: false,
      chainId: null,
    });
    expect(detectNetworkWithChainId).toHaveBeenCalledWith(5);
  });
});
