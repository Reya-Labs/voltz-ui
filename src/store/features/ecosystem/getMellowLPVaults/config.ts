import { MellowLpRouter, MellowLpVault } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

export type MellowProduct = {
  id: string;
  vault: MellowLpVault | MellowLpRouter;
  metadata: MellowProductMetadata & {
    underlyingPools: string[];
  };
};

const ONE_HOUR_IN_MS = 60 * 60 * 1000;

export type MellowProductMetadata = {
  show: boolean;
  soon: boolean;
  deprecated: boolean;
  title: string;
  token: string;
  description: string;
  vaults: {
    weight: number;
    maturityTimestampMS: number; // in milliseconds
    pools: string[];
    estimatedHistoricApy: number;
  }[];
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
    metadata: MellowProductMetadata;
  }[];
};

const networkConfigurations: { [key: string]: NetworkConfiguration } = {
  mainnet: {
    MELLOW_ETH_WRAPPER: '0x07D6D75CA125a252AEf4d5647198446e5EDc5BBa',
    MELLOW_VAULTS: [
      {
        voltzVault: '0xBBC446081cb7515a524D31e4afDB19dfc6BAa124',
        erc20RootVault: '0xC99c70492Bc15c056813d1ddA95C89Bb285Cdc86',
        erc20RootVaultGovernance: '0x973495e81180Cd6Ead654328A0bEbE01c8ad53EA',
        metadata: {
          title: 'MELLOW - ETH',
          token: 'ETH',
          description:
            'This vault is no longer accepting deposits. Funds will become available for withdrawal at pool maturity.',
          show: true,
          soon: false,
          deprecated: true,
          vaults: [
            {
              weight: 100,
              pools: ['Lido - ETH'],
              maturityTimestampMS: 1672491600000,
              estimatedHistoricApy: 31.03,
            },
          ],
        },
      },
    ],
    MELLOW_ROUTERS: [
      {
        router: '0xF875B4BD81b1be40775652d8fDC174512C36DB20',
        metadata: {
          title: 'MELLOW - USDC',
          token: 'USDC',
          description: 'Optimised for LPing across pools in 50x levered positions.',
          show: true,
          soon: false,
          deprecated: false,
          vaults: [
            {
              weight: 50,
              pools: ['AAVE - USDC LEND'],
              maturityTimestampMS: 1672488000000,
              estimatedHistoricApy: 6.51,
            },
            {
              weight: 50,
              pools: ['AAVE - USDC BORROW'],
              maturityTimestampMS: 1680264000000,
              estimatedHistoricApy: 17.66,
            },
          ],
        },
      },

      {
        router: '0x1963efb3B756e7D17D0e54645339e7E037705cc1',
        metadata: {
          title: 'MELLOW - ETH',
          token: 'ETH',
          description: 'Optimised for Lping across pools in 50x levered positions.',
          show: true,
          soon: false,
          deprecated: false,
          vaults: [
            {
              weight: 100,
              maturityTimestampMS: 1672491600000,
              pools: ['AAVE - ETH BORROW', 'AAVE - ETH LEND', 'LIDO - ETH', 'ROCKET - ETH'],
              estimatedHistoricApy: 10.96,
            },
          ],
        },
      },

      {
        router: '0xD6e133B9C82F04734B48d5808800078038231a22',
        metadata: {
          title: 'MELLOW - DAI',
          token: 'DAI',
          description: 'Optimised for LPing across pools in 50x levered positions.',
          show: true,
          soon: false,
          deprecated: false,
          vaults: [
            {
              weight: 100,
              maturityTimestampMS: 1672488000000,
              pools: ['AAVE - DAI LEND', 'COMPOUND - DAI LEND'],
              estimatedHistoricApy: 10.3,
            },
          ],
        },
      },

      {
        router: '0x9c1100A321ab778cE5d3B42c7b99f44afc3A4c41',
        metadata: {
          title: 'MELLOW - USDT',
          token: 'USDT',
          description: 'Optimised for LPing across pools in 50x levered positions.',
          show: true,
          soon: false,
          deprecated: false,
          vaults: [
            {
              weight: 100,
              maturityTimestampMS: 1680264000000,
              pools: ['COMPOUND - USDT BORROW'],
              estimatedHistoricApy: 36.96,
            },
          ],
        },
      },
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
          vaults: [
            {
              weight: 100,
              pools: ['Compound - ETH'],
              maturityTimestampMS: 1670427875000,
              estimatedHistoricApy: 31.03,
            },
          ],
        },
      },
    ],
    MELLOW_ROUTERS: [
      {
        router: '0x704F6E9cB4f7e041CC89B6a49DF8EE2027a55164',
        metadata: {
          title: 'MELLOW - ETH',
          token: 'ETH',
          description:
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates optimised LP fees by providing liquidity on Voltz Protocol.',
          show: true,
          soon: false,
          deprecated: false,
          vaults: [
            {
              weight: 100,
              pools: ['Compound - ETH', 'Compound - ETH'],
              maturityTimestampMS: 1670427875000,
              estimatedHistoricApy: 10,
            },
          ],
        },
      },
      {
        router: '0x9f397CD24103A0a0252DeC82a88e656480C53fB7',
        metadata: {
          title: 'MELLOW - USDC',
          token: 'USDC',
          description:
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates optimised LP fees by providing liquidity on Voltz Protocol.',
          show: true,
          soon: false,
          deprecated: false,
          vaults: [
            {
              weight: 50,
              pools: ['Compound - USDC', 'Compound - USDC'],
              maturityTimestampMS: 1670427875000,
              estimatedHistoricApy: 10,
            },
            {
              weight: 50,
              pools: ['Compound - USDC', 'Compound - USDC'],
              maturityTimestampMS: 1670427875000,
              estimatedHistoricApy: 30,
            },
          ],
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

const disableMaturedWeights = (config: NetworkConfiguration): NetworkConfiguration => {
  return {
    ...config,
    MELLOW_ROUTERS: config.MELLOW_ROUTERS.map((router) => {
      return {
        ...router,
        metadata: {
          ...router.metadata,
          vaults: router.metadata.vaults.map((vault) => {
            return {
              ...vault,
              weight:
                Date.now().valueOf() > vault.maturityTimestampMS - 48 * ONE_HOUR_IN_MS
                  ? 0
                  : vault.weight,
            };
          }),
        },
      };
    }),
  };
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

  let config = networkConfigurations[network as keyof typeof networkConfigurations];
  config = disableMaturedWeights(config);

  const provider = providers.getDefaultProvider(process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK);

  return {
    ...config,
    PROVIDER: provider,
  };
};
