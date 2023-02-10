import { SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';

interface BaseChainInfo {
  readonly label: string;
  readonly nativeCurrency: {
    name: string; // e.g. 'Goerli ETH',
    symbol: string; // e.g. 'gorETH',
    decimals: number; // e.g. 18,
  };
  readonly explorer: string;
}

const CHAIN_INFO: Record<SupportedNetworksEnum, BaseChainInfo> = {
  [SupportedNetworksEnum.mainnet]: {
    explorer: 'https://etherscan.io/',
    label: 'Ethereum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedNetworksEnum.goerli]: {
    explorer: 'https://goerli.etherscan.io/',
    label: 'Görli',
    nativeCurrency: { name: 'Görli Ether', symbol: 'görETH', decimals: 18 },
  },
  [SupportedNetworksEnum.arbitrum]: {
    explorer: 'https://arbiscan.io/',
    label: 'Arbitrum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedNetworksEnum.arbitrumGoerli]: {
    explorer: 'https://goerli.arbiscan.io/',
    label: 'Görli Arbitrum',
    nativeCurrency: { name: 'Görli Ether', symbol: 'görETH', decimals: 18 },
  },
};

export function getChainInfo(chainId: SupportedNetworksEnum): BaseChainInfo | undefined {
  if (chainId) {
    return CHAIN_INFO[chainId] ?? undefined;
  }
  return undefined;
}
