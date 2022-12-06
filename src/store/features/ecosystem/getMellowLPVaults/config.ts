import { MellowLpRouter, MellowLpVault } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

export type MellowProduct = {
  id: string;
  vault: MellowLpVault | MellowLpRouter;
  metadata: MellowProductMetadata & {
    vaults: NetworkConfiguration['MELLOW_ROUTERS'][0]['vaults'];
    underlyingPools: string[];
    estimatedHistoricApy: string;
  };
};

export type MellowProductMetadata = {
  show: boolean;
  soon: boolean;
  deprecated: boolean;
  title: string;
  token: string;
  description: string;
};

export type NetworkConfiguration = {
  MELLOW_ETH_WRAPPER: string;
  MELLOW_VAULTS: {
    voltzVault: string;
    erc20RootVault: string;
    erc20RootVaultGovernance: string;
    metadata: MellowProductMetadata;
  }[];
  MELLOW_ROUTERS: {
    router: string;
    vaults: {
      weight: number;
      // always have to be in milliseconds
      maturityTimestampMS: number;
      pools: string[];
      estimatedHistoricApy: string;
    }[];
    metadata: MellowProductMetadata;
  }[];
};

const networkConfigurations: { [key: string]: NetworkConfiguration } = {
  mainnet: {
    MELLOW_ETH_WRAPPER: '0x07D6D75CA125a252AEf4d5647198446e5EDc5BBa',
    MELLOW_VAULTS: [
      // {
      //   voltzVault: '0xBBC446081cb7515a524D31e4afDB19dfc6BAa124',
      //   erc20RootVault: '0xC99c70492Bc15c056813d1ddA95C89Bb285Cdc86',
      //   erc20RootVaultGovernance: '0x973495e81180Cd6Ead654328A0bEbE01c8ad53EA',
      //   metadata: {
      //     title: 'MELLOW - ETH',
      //     token: 'ETH',
      //     maturity: '31 Dec 22',
      //     estimatedHistoricApy: '>30%',
      //     description:
      //       'This vault is no longer accepting deposits. Funds will become available for withdrawal at pool maturity.',
      //     underlyingPools: ['LIDO - ETH'],
      //     show: true,
      //     soon: false,
      //     deprecated: true,
      //   },
      // },
    ],
    MELLOW_ROUTERS: [
      // {
      //   router: '0xF875B4BD81b1be40775652d8fDC174512C36DB20',
      //   defaultWeights: [100, 0],
      //   pivot: 0,
      //   metadata: {
      //     title: 'MELLOW - USDC',
      //     token: 'USDC',
      //     maturity: '31 Dec 22',
      //     estimatedHistoricApy: '6.51%',
      //     description: 'Optimised for LPing across pools in 50x levered positions.',
      //     underlyingPools: ['AAVE - USDC LEND'],
      //     show: true,
      //     soon: false,
      //     deprecated: false,
      //   },
      // },
      // {
      //   router: '0x1963efb3B756e7D17D0e54645339e7E037705cc1',
      //   defaultWeights: [100],
      //   metadata: {
      //     title: 'MELLOW - ETH',
      //     token: 'ETH',
      //     maturity: '31 Dec 22',
      //     estimatedHistoricApy: '10.96%',
      //     description: 'Optimised for Lping across pools in 50x levered positions.',
      //     underlyingPools: ['AAVE - ETH BORROW', 'AAVE - ETH LEND', 'LIDO - ETH', 'ROCKET - ETH'],
      //     show: true,
      //     soon: false,
      //     deprecated: false,
      //   },
      // },
      // {
      //   router: '0xD6e133B9C82F04734B48d5808800078038231a22',
      //   defaultWeights: [100],
      //   metadata: {
      //     title: 'MELLOW - DAI',
      //     token: 'DAI',
      //     maturity: '31 Dec 22',
      //     estimatedHistoricApy: '10.3%',
      //     description: 'Optimised for LPing across pools in 50x levered positions.',
      //     underlyingPools: ['AAVE - DAI LEND', 'COMPOUND - DAI LEND'],
      //     show: true,
      //     soon: false,
      //     deprecated: false,
      //   },
      // },
      // {
      //   router: '0xF875B4BD81b1be40775652d8fDC174512C36DB20',
      //   defaultWeights: [0, 100],
      //   metadata: {
      //     title: 'MELLOW - USDC',
      //     token: 'USDC',
      //     maturity: '31 Mar 23',
      //     estimatedHistoricApy: '17.66%',
      //     description: 'Optimised for LPing across pools in 50x levered positions.',
      //     underlyingPools: ['AAVE - USDC BORROW'],
      //     show: true,
      //     soon: false,
      //     deprecated: false,
      //   },
      // },
      // {
      //   router: '0x9c1100A321ab778cE5d3B42c7b99f44afc3A4c41',
      //   defaultWeights: [100],
      //   metadata: {
      //     title: 'MELLOW - USDT',
      //     token: 'USDT',
      //     maturity: '31 Mar 23',
      //     estimatedHistoricApy: '>30%',
      //     description: 'Optimised for LPing across pools in 50x levered positions.',
      //     underlyingPools: ['COMPOUND - USDT BORROW'],
      //     show: true,
      //     soon: false,
      //     deprecated: false,
      //   },
      // },
      // {
      //   router: '0x0000000000000000000000000000000000000000',
      //   defaultWeights: [],
      //   metadata: {
      //     title: 'MELLOW - ETH',
      //     token: 'ETH',
      //     maturity: '31 Mar 23',
      //     estimatedHistoricApy: 's00n',
      //     description: 'Optimised for LPing across pools in 50x levered positions.',
      //     underlyingPools: ['AAVE - ETH BORROW'],
      //     show: true,
      //     soon: true,
      //     deprecated: false,
      //   },
      // },
    ],
  },
  goerli: {
    MELLOW_ETH_WRAPPER: '0xcF2f79d8DF97E09BF5c4DBF3F953aeEF4f4a204d',
    MELLOW_VAULTS: [
      {
        voltzVault: '0x1b876d1b5A8636EFe9835D8ed0231c1429cBfc40',
        erc20RootVault: '0x62E224d9ae2f4702CC88695e6Ea4aA16D0925BdB',
        erc20RootVaultGovernance: '0x4DCc9Ad7ff5964d13ee4A6932922f1a24f3f8e25',
        metadata: {
          title: 'MELLOW - ETH',
          token: 'ETH',
          description:
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates optimised LP fees by providing liquidity on Voltz Protocol.',
          show: true,
          soon: false,
          deprecated: true,
        },
      },
    ],
    MELLOW_ROUTERS: [
      {
        router: '0x631CAD693b6f0463B2C2729299FccA8731553bB4',
        vaults: [
          {
            weight: 50,
            pools: ['cETH'],
            maturityTimestampMS: 1672444800000,
            estimatedHistoricApy: '20%',
          },
          {
            weight: 50,
            pools: ['cETH'],
            maturityTimestampMS: 1680220800000,
            estimatedHistoricApy: '20%',
          },
        ],
        metadata: {
          title: 'MELLOW - ETH',
          token: 'ETH',
          description:
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates optimised LP fees by providing liquidity on Voltz Protocol.',
          show: false,
          soon: false,
          deprecated: false,
        },
      },
      {
        router: '0x9f397CD24103A0a0252DeC82a88e656480C53fB7',
        vaults: [
          {
            weight: 50,
            pools: ['cUSDC'],
            maturityTimestampMS: 1670371200000,
            estimatedHistoricApy: '10%',
          },
          {
            weight: 50,
            pools: ['cUSDC'],
            maturityTimestampMS: 1670371200000,
            estimatedHistoricApy: '10%',
          },
        ],
        metadata: {
          title: 'MELLOW - USDC',
          token: 'USDC',
          description:
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates optimised LP fees by providing liquidity on Voltz Protocol.',
          show: true,
          soon: false,
          deprecated: false,
        },
      },
    ],
  },
  default: {
    MELLOW_ETH_WRAPPER: '0x0000000000000000000000000000000000000000',
    MELLOW_VAULTS: [],
    MELLOW_ROUTERS: [],
  },
};

export const getConfig = (): NetworkConfiguration & {
  PROVIDER: providers.BaseProvider;
} => {
  const network = process.env.REACT_APP_NETWORK;

  if (!network) {
    throw new Error(`Network not specified as an environment variable.`);
  }

  const allNetworks = Object.keys(networkConfigurations);
  if (!allNetworks.includes(network)) {
    throw new Error(
      `Network ${network} not found in configuration networks ${allNetworks.toString()}.`,
    );
  }

  const provider = providers.getDefaultProvider(process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK);

  return {
    ...networkConfigurations[network as keyof typeof networkConfigurations],
    PROVIDER: provider,
  };
};
