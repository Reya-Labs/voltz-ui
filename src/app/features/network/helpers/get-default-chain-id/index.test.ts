import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { getChainId } from '../chain-store';
import { getChainsFromProcessEnv } from '../get-chains-from-process-env';
import { getDefaultChainId } from '.';

// Mock external dependencies
jest.mock('../chain-store');
jest.mock('../get-chains-from-process-env');

describe('getDefaultChainId', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return default chain ID when storedChainId is available and matches allowed networks', () => {
    const allowedNetworks = [{ network: 'avalanche' }, { network: 'avalancheFuji' }];
    const storedChainId = SupportedChainId.avalancheFuji; // Set the stored chain ID

    // Mock external function calls
    (getChainsFromProcessEnv as jest.Mock).mockReturnValue(allowedNetworks);
    (getChainId as jest.Mock).mockReturnValue(storedChainId);

    const result = getDefaultChainId();
    expect(result).toEqual(storedChainId);
  });

  it('should return default chain ID when storedChainId is available but does not match allowed networks', () => {
    const allowedNetworks = [{ network: 'avalanche' }, { network: 'arbitrum' }];
    const storedChainId = SupportedChainId.mainnet; // Set a stored chain ID that does not match allowed networks

    // Mock external function calls
    (getChainsFromProcessEnv as jest.Mock).mockReturnValue(allowedNetworks);
    (getChainId as jest.Mock).mockReturnValue(storedChainId);

    const result = getDefaultChainId();
    expect(result).toEqual(SupportedChainId.avalanche); // Expect the first allowed network as the default chain ID
  });

  it('should return default chain ID when storedChainId is not available and allowed networks contain valid options', () => {
    const allowedNetworks = [{ network: 'avalanche' }, { network: 'arbitrum' }];

    // Mock external function calls
    (getChainsFromProcessEnv as jest.Mock).mockReturnValue(allowedNetworks);
    (getChainId as jest.Mock).mockReturnValue(null);

    const result = getDefaultChainId();
    expect(result).toEqual(SupportedChainId.avalanche); // Expect the first allowed network as the default chain ID
  });

  it('should return default chain ID when storedChainId is not available and allowed networks are empty', () => {
    const allowedNetworks: { network: string }[] = [];

    // Mock external function calls
    (getChainsFromProcessEnv as jest.Mock).mockReturnValue(allowedNetworks);
    (getChainId as jest.Mock).mockReturnValue(null);

    const result = getDefaultChainId();
    expect(result).toEqual(SupportedChainId.mainnet); // Expect the mainnet as the default chain ID
  });

  it('should return default chain ID when storedChainId is not available and allowed networks contain invalid options', () => {
    const allowedNetworks = [{ network: 'not-supported' }, { network: 'not-supported2' }];

    // Mock external function calls
    (getChainsFromProcessEnv as jest.Mock).mockReturnValue(allowedNetworks);
    (getChainId as jest.Mock).mockReturnValue(null);

    const result = getDefaultChainId();
    expect(result).toEqual(SupportedChainId.mainnet); // Expect the mainnet as the default chain ID
  });
});
