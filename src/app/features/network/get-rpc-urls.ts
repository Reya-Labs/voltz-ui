import { SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';

const INFURA_KEY = process.env.REACT_APP_WALLETCONNECT_INFURA_ID;
if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_WALLETCONNECT_INFURA_ID must be a defined environment variable`);
}

/**
 * Fallback JSON-RPC endpoints.
 * These are used if the integrator does not provide an endpoint, or if the endpoint does not work.
 *
 * MetaMask allows switching to any URL, but displays a warning if it is not on the "Safe" list:
 * https://github.com/MetaMask/metamask-mobile/blob/bdb7f37c90e4fc923881a07fca38d4e77c73a579/app/core/RPCMethods/wallet_addEthereumChain.js#L228-L235
 * https://chainid.network/chains.json
 *
 * These "Safe" URLs are listed first, followed by other fallback URLs, which are taken from chainlist.org.
 */
export const FALLBACK_URLS: Record<SupportedNetworksEnum, string[]> = {
  [SupportedNetworksEnum.mainnet]: [
    // "Safe" URLs
    'https://api.mycryptoapi.com/eth',
    'https://cloudflare-eth.com',
    // "Fallback" URLs
    'https://rpc.ankr.com/eth',
    'https://eth-mainnet.public.blastapi.io',
  ],
  [SupportedNetworksEnum.goerli]: [
    // "Safe" URLs
    'https://rpc.goerli.mudit.blog/',
    // "Fallback" URLs
    'https://rpc.ankr.com/eth_goerli',
  ],
  [SupportedNetworksEnum.arbitrum]: [
    // "Safe" URLs
    'https://arb1.arbitrum.io/rpc',
    // "Fallback" URLs
    'https://arbitrum.public-rpc.com',
  ],
  [SupportedNetworksEnum.arbitrumGoerli]: [
    // "Safe" URLs
    'https://goerli-rollup.arbitrum.io/rpc',
  ],
};

/**
 * Known JSON-RPC endpoints.
 * These are the URLs used by the interface when there is not another available source of chain data.
 */
export const RPC_URLS: Record<SupportedNetworksEnum, string[]> = {
  [SupportedNetworksEnum.mainnet]: [
    `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    ...FALLBACK_URLS[SupportedNetworksEnum.mainnet],
  ],
  [SupportedNetworksEnum.goerli]: [
    `https://goerli.infura.io/v3/${INFURA_KEY}`,
    ...FALLBACK_URLS[SupportedNetworksEnum.goerli],
  ],
  [SupportedNetworksEnum.arbitrum]: [
    `https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY}`,
    ...FALLBACK_URLS[SupportedNetworksEnum.arbitrum],
  ],
  [SupportedNetworksEnum.arbitrumGoerli]: FALLBACK_URLS[SupportedNetworksEnum.arbitrumGoerli],
};

export function getRpcUrl(chainId: SupportedNetworksEnum): string {
  switch (chainId) {
    case SupportedNetworksEnum.mainnet:
    case SupportedNetworksEnum.goerli:
      return RPC_URLS[chainId][0];
    // Attempting to add a chain using an infura URL will not work, as the URL will be unreachable from the MetaMask background page.
    // MetaMask allows switching to any publicly reachable URL, but for novel chains, it will display a warning if it is not on the "Safe" list.
    // See the definition of FALLBACK_URLS for more details.
    default:
      return FALLBACK_URLS[chainId][0];
  }
}
