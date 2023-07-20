import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { getChainsFromProcessEnv } from '../get-chains-from-process-env';
import { getAllowedChainIds } from '.';

jest.mock('../get-chains-from-process-env');

describe('getAllowedChainIds', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty array if networkConfigurationString is not provided', () => {
    const result = getAllowedChainIds();
    expect(result).toEqual([]);
  });

  it('should return the supported chain IDs based on the allowed networks', () => {
    const allowedNetworks = [
      { network: 'arbitrum' },
      { network: 'arbitrumGoerli' },
      { network: 'avalanche' },
      { network: 'avalancheFuji' }, // Not in networkConfigurationString
    ];
    const expectedChainIds = [
      SupportedChainId.arbitrum,
      SupportedChainId.arbitrumGoerli,
      SupportedChainId.avalanche,
      SupportedChainId.avalancheFuji,
    ];

    (getChainsFromProcessEnv as jest.Mock).mockReturnValue(allowedNetworks);

    const result = getAllowedChainIds();
    expect(result).toEqual(expectedChainIds);
  });

  it('should return an empty array if none of the allowed networks are supported chain IDs', () => {
    const allowedNetworks = [{ network: 'not-supported1' }, { network: 'not-supported2' }];

    (getChainsFromProcessEnv as jest.Mock).mockReturnValue(allowedNetworks);

    const result = getAllowedChainIds();
    expect(result).toEqual([]);
  });
});
