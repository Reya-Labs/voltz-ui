import { isEnvVarProvided } from '../../../../../utilities/isEnvVarProvided';
import { getChainsFromProcessEnv } from '.';

jest.mock('../../../../../utilities/isEnvVarProvided');

describe('getChainsFromProcessEnv', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty array if networkConfigurationString is not provided', () => {
    const result = getChainsFromProcessEnv();
    expect(result).toEqual([]);
  });

  it('should return an empty array if networkConfigurationString is provided but is not valid', () => {
    (isEnvVarProvided as jest.Mock).mockReturnValue(false);
    const result = getChainsFromProcessEnv('invalid-network-config');
    expect(result).toEqual([]);
  });

  it('should return the parsed network configurations if networkConfigurationString is valid', () => {
    (isEnvVarProvided as jest.Mock).mockReturnValue(true);
    const networkConfigurationString = 'network1-key1,network2-key2';
    const expectedNetworkConfigs = [{ network: 'network1-key1' }, { network: 'network2-key2' }];

    const result = getChainsFromProcessEnv(networkConfigurationString);
    expect(result).toEqual(expectedNetworkConfigs);
  });

  it('should return the cached network configurations if called with the same networkConfigurationString', () => {
    (isEnvVarProvided as jest.Mock).mockReturnValue(true);
    const networkConfigurationString = 'network1-key1,network2-key2';

    // Call getChainsFromProcessEnv twice with the same networkConfigurationString
    const result1 = getChainsFromProcessEnv(networkConfigurationString);
    const result2 = getChainsFromProcessEnv(networkConfigurationString);

    // Expect the results to be the same (using object reference equality)
    expect(result1).toBe(result2);
  });
});
