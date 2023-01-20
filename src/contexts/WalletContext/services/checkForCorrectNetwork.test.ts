import { checkForCorrectNetwork } from './checkForCorrectNetwork';

describe('checkForCorrectNetwork', () => {
  afterEach(() => {
    // reset the process.env variable
    process.env.REACT_APP_REQUIRED_ETHEREUM_NETWORK = undefined;
  });
  it('throws an error if the connected network does not match the required network', async () => {
    // Create a mock provider that returns 'ropsten'
    const mockProvider = {
      getNetwork: jest.fn(() => Promise.resolve({ name: 'ropsten' })),
    };

    // Set the required network to 'mainnet'
    process.env.REACT_APP_REQUIRED_ETHEREUM_NETWORK = 'mainnet';

    // Assert that an error is thrown
    await expect(checkForCorrectNetwork(mockProvider as never)).rejects.toThrowError(
      'Wrong network',
    );
  });

  it('does not throw an error if the connected network matches the required network', async () => {
    // Create a mock provider that returns 'mainnet'
    const mockProvider = {
      getNetwork: jest.fn(() => Promise.resolve({ name: 'mainnet' })),
    };

    // Set the required network to 'mainnet'
    process.env.REACT_APP_REQUIRED_ETHEREUM_NETWORK = 'mainnet';

    // Assert that the function does not throw an error
    await expect(checkForCorrectNetwork(mockProvider as never)).resolves.not.toThrow();
  });

  it('throws an error if getNetwork throws an error', async () => {
    // Create a mock provider that throws an error
    const mockProvider = {
      getNetwork: jest.fn(() => {
        throw new Error();
      }),
    };

    // Set the required network to 'mainnet'
    process.env.REACT_APP_REQUIRED_ETHEREUM_NETWORK = 'mainnet';

    // Assert that an error is thrown
    await expect(checkForCorrectNetwork(mockProvider as never)).rejects.toThrowError(
      'Wrong network',
    );
  });
});
