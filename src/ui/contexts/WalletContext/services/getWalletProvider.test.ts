import { getWalletProvider } from './getWalletProvider';
import { getWalletProviderMetamask } from './getWalletProviderMetamask';
import { getWalletProviderWalletConnect } from './getWalletProviderWalletConnect';

jest.mock('./getWalletProviderMetamask');
jest.mock('./getWalletProviderWalletConnect');

describe('getWalletProvider', () => {
  it('should call getWalletProviderMetamask when name is "metamask"', async () => {
    await getWalletProvider('metamask');
    expect(getWalletProviderMetamask).toHaveBeenCalled();
  });

  it('should call getWalletProviderWalletConnect when name is "walletConnect"', async () => {
    await getWalletProvider('walletConnect');
    expect(getWalletProviderWalletConnect).toHaveBeenCalled();
  });

  it('should return undefined when name is NOT "walletConnect" or "metamask"', async () => {
    const res = await getWalletProvider('someArbitaryWallet' as never);
    expect(res).toBeUndefined();
  });
});
