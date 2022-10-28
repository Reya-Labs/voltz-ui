import { getMellowLPAddresses } from './utils';

describe('mellow lp vault addresses formatter', () => {
    test.each([
        [undefined, []],
        ['', []],
        ['[(0x810fB16dBC38fE2a7e5B47539a8D893d0d885131,0xbfC0eCC64A06f703F1dD20e28BaBcc6cf735e6F2,0xF980BE39d79Eb07de32856e8356Eac0Dcd4CF96c)]', [{
            voltzVaultAddress: "0x810fB16dBC38fE2a7e5B47539a8D893d0d885131",
            erc20RootVaultAddress: "0xbfC0eCC64A06f703F1dD20e28BaBcc6cf735e6F2",
            erc20RootVaultGovernanceAddress: "0xF980BE39d79Eb07de32856e8356Eac0Dcd4CF96c"
        }]],
        ['[0x810fB16dBC38fE2a7e5B47539a8D893d0d885131,0xbfC0eCC64A06f703F1dD20e28BaBcc6cf735e6F2,0xF980BE39d79Eb07de32856e8356Eac0Dcd4CF96c]', [{
            voltzVaultAddress: "0x810fB16dBC38fE2a7e5B47539a8D893d0d885131",
            erc20RootVaultAddress: "0xbfC0eCC64A06f703F1dD20e28BaBcc6cf735e6F2",
            erc20RootVaultGovernanceAddress: "0xF980BE39d79Eb07de32856e8356Eac0Dcd4CF96c"
        }]],
    ])('it formats the Mellow vault addresses %p', (input, result) => {
        expect(getMellowLPAddresses(input)).toEqual(result);
    });
});
