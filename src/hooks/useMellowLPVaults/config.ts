import { providers } from 'ethers';
import { MellowProductMetadata } from 'src/routes/Ecosystem/types';

type NetworkConfiguration = {
  MELLOW_ETH_WRAPPER: string;
  MELLOW_VAULTS: {
    show: boolean;
    voltzVault: string;
    erc20RootVault: string;
    erc20RootVaultGovernance: string;
    metadata: MellowProductMetadata;
  }[];
  MELLOW_ROUTERS: {
    show: boolean;
    router: string;
    defaultWeights: number[];
    pivot: number;
    metadata: MellowProductMetadata;
  }[];
};

const networkConfigurations: { [key: string]: NetworkConfiguration } = {
  mainnet: {
    MELLOW_ETH_WRAPPER: '0x07D6D75CA125a252AEf4d5647198446e5EDc5BBa',
    MELLOW_VAULTS: [
      {
        show: true,
        voltzVault: '0xBBC446081cb7515a524D31e4afDB19dfc6BAa124',
        erc20RootVault: '0xC99c70492Bc15c056813d1ddA95C89Bb285Cdc86',
        erc20RootVaultGovernance: '0x973495e81180Cd6Ead654328A0bEbE01c8ad53EA',
        metadata: {
          title: 'MELLOW - ETH',
          token: 'ETH',
          maturity: '31 Dec 22',
          estimatedHistoricApy: '>30%',
          description:
            'Optimised for LPing across pools in 10x levered positions.',
          underlyingPools: ['LIDO - ETH'],
          deprecated: true,
        },
      },
    ],
    MELLOW_ROUTERS: [
    {
      show: true,
      router: '0xF875B4BD81b1be40775652d8fDC174512C36DB20',
      defaultWeights: [100, 0],
      pivot: 0,
      metadata: {
        title: 'MELLOW - USDC',
        token: 'USDC',
        maturity: '31 Dec 22',
        estimatedHistoricApy: '6.51%',
        description:
          'Optimised for LPing across pools in 50x levered positions.',
        underlyingPools: ['AAVE - USDC LEND'],
        deprecated: false,
      },
    },
    {
      show: true,
      router: '0x1963efb3B756e7D17D0e54645339e7E037705cc1',
      defaultWeights: [100],
      pivot: 0,
      metadata: {
        title: 'MELLOW - ETH',
        token: 'ETH',
        maturity: '31 Dec 22',
        estimatedHistoricApy: '10.96%',
        description:
          'Optimised for Lping across pools in 50x levered positions.',
        underlyingPools: ['AAVE - ETH BORROW', 'AAVE - ETH LEND', 'LIDO - ETH', 'ROCKET - ETH'],
        deprecated: false,
      },
    },
    {
      show: true,
      router: '0xD6e133B9C82F04734B48d5808800078038231a22',
      defaultWeights: [100],
      pivot: 0,
      metadata: {
        title: 'MELLOW - DAI',
        token: 'DAI',
        maturity: '31 Dec 22',
        estimatedHistoricApy: '10.3%',
        description:
          'Optimised for LPing across pools in 50x levered positions.',
        underlyingPools: ['AAVE - DAI LEND', 'COMPOUND - DAI LEND'],
        deprecated: false,
      },
    },
    {
      show: true,
      router: '0xF875B4BD81b1be40775652d8fDC174512C36DB20',
      defaultWeights: [0, 100],
      pivot: 1,
      metadata: {
        title: 'MELLOW - USDC',
        token: 'USDC',
        maturity: '31 Mar 23',
        estimatedHistoricApy: '17.66%',
        description:
          'Optimised for LPing across pools in 50x levered positions.',
        underlyingPools: ['AAVE - USDC BORROW'],
        deprecated: false,
      },
    },
    {
      show: true,
      router: '0x0000000000000000000000000000000000000000',
      defaultWeights: [],
      pivot: 0,
      metadata: {
        title: 'MELLOW - ETH',
        token: 'ETH',
        maturity: '31 Mar 23',
        estimatedHistoricApy: 's00n',
        description:
          'Optimised for LPing across pools in 50x levered positions.',
        underlyingPools: ['AAVE - ETH BORROW'],
        deprecated: true,
      },
    },
    {
      show: true,
      router: '0x0000000000000000000000000000000000000000',
      defaultWeights: [],
      pivot: 0,
      metadata: {
        title: 'MELLOW - USDT',
        token: 'USDT',
        maturity: '31 Mar 23',
        estimatedHistoricApy: 's00n',
        description:
          'Optimised for LPing across pools in 50x levered positions.',
        underlyingPools: ['COMPOUND - USDT BORROW'],
        deprecated: true,
      },
    },
  ],
  },
  goerli: {
    MELLOW_ETH_WRAPPER: '0xcF2f79d8DF97E09BF5c4DBF3F953aeEF4f4a204d',
    MELLOW_VAULTS: [
      {
        show: true,
        voltzVault: '0x1b876d1b5A8636EFe9835D8ed0231c1429cBfc40',
        erc20RootVault: '0x62E224d9ae2f4702CC88695e6Ea4aA16D0925BdB',
        erc20RootVaultGovernance: '0x4DCc9Ad7ff5964d13ee4A6932922f1a24f3f8e25',
        metadata: {
          title: 'MELLOW - cETH',
          token: 'ETH',
          maturity: '21 Nov 22',
          estimatedHistoricApy: '>30%',
          description:
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates optimised LP fees by providing liquidity on Voltz Protocol.',
          underlyingPools: ['cETH'],
          deprecated: true,
        },
      },
    ],
    MELLOW_ROUTERS: [
      {
        show: false,
        router: '0x631CAD693b6f0463B2C2729299FccA8731553bB4',
        defaultWeights: [100, 0],
        pivot: 0,
        metadata: {
          title: 'MELLOW - ETH',
          token: 'ETH',
          maturity: '31 Dec 22',
          estimatedHistoricApy: '>30%',
          description:
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates optimised LP fees by providing liquidity on Voltz Protocol.',
          underlyingPools: ['cETH'],
          deprecated: false,
        },
      },
      {
        show: false,
        router: '0x631CAD693b6f0463B2C2729299FccA8731553bB4',
        defaultWeights: [0, 100],
        pivot: 1,
        metadata: {
          title: 'MELLOW - ETH',
          token: 'ETH',
          maturity: '31 Mar 23',
          estimatedHistoricApy: '>30%',
          description:
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates optimised LP fees by providing liquidity on Voltz Protocol.',
          underlyingPools: ['cETH'],
          deprecated: false,
        },
      },
      {
        show: true,
        router: '0x704F6E9cB4f7e041CC89B6a49DF8EE2027a55164',
        defaultWeights: [100],
        pivot: 0,
        metadata: {
          title: 'MELLOW - ETH',
          token: 'ETH',
          maturity: '07 Dec 22',
          estimatedHistoricApy: '>30%',
          description:
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates optimised LP fees by providing liquidity on Voltz Protocol.',
          underlyingPools: ['cETH', 'cETH'],
          deprecated: false,
        },
      },
      {
        show: true,
        router: '0x9f397CD24103A0a0252DeC82a88e656480C53fB7',
        defaultWeights: [100, 0],
        pivot: 0,
        metadata: {
          title: 'MELLOW - USDC',
          token: 'USDC',
          maturity: '07 Dec 22',
          estimatedHistoricApy: '>30%',
          description:
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates optimised LP fees by providing liquidity on Voltz Protocol.',
          underlyingPools: ['cUSDC', 'cUSDC'],
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
