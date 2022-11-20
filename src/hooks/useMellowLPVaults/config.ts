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
          title: 'MELLOW VAULT - stETH',
          token: 'ETH',
          maturity: '31 Dec 22',
          estimatedHistoricApy: '>30%',
          description:
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates optimised LP fees by providing liquidity on Voltz Protocol.',
          explanations: [
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and provides liquidity into Voltz Protocol pools. The liquidity provided is optimised to try and maximise yield for depositors.',
            'In a typical Voltz Protocol pool, LPs need to specify margin, leverage and chosen fixed-rate tick ranges. The Mellow LP Optimiser abstracts away these complexities and automatically chooses an optimal amount of leverage and tick ranges for liquidity supplied.',
            'For this pool, users simply deposit ETH in order to get access to optimised LP yields on the Voltz Protocol stETH pool.',
            'Remember, returns are not guaranteed and you may get back less than you put in.',
          ],
          depositDescription:
            'The Mellow LP Optimiser is available for the Voltz Protocol stETH pool.',
          underlyingPools: ['stETH'],
          deprecated: true,
        },
      },
    ],
    MELLOW_ROUTERS: [],
  },
  goerli: {
    MELLOW_ETH_WRAPPER: '0xcF2f79d8DF97E09BF5c4DBF3F953aeEF4f4a204d',
    MELLOW_VAULTS: [
      {
        show: false,
        voltzVault: '0x1b876d1b5A8636EFe9835D8ed0231c1429cBfc40',
        erc20RootVault: '0x62E224d9ae2f4702CC88695e6Ea4aA16D0925BdB',
        erc20RootVaultGovernance: '0x4DCc9Ad7ff5964d13ee4A6932922f1a24f3f8e25',
        metadata: {
          title: 'MELLOW VAULT - cETH',
          token: 'ETH',
          maturity: '21 Nov 22',
          estimatedHistoricApy: '>30%',
          description:
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates optimised LP fees by providing liquidity on Voltz Protocol.',
          explanations: [
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and provides liquidity into Voltz Protocol pools. The liquidity provided is optimised to try and maximise yield for depositors.',
            'In a typical Voltz Protocol pool, LPs need to specify margin, leverage and chosen fixed-rate tick ranges. The Mellow LP Optimiser abstracts away these complexities and automatically chooses an optimal amount of leverage and tick ranges for liquidity supplied.',
            'For this pool, users simply deposit ETH in order to get access to optimised LP yields on the Voltz Protocol cETH pool.',
            'Remember, returns are not guaranteed and you may get back less than you put in.',
          ],
          depositDescription:
            'The Mellow LP Optimiser is available for the Voltz Protocol cETH pool.',
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
          title: 'MELLOW VAULT - ETH',
          token: 'ETH',
          maturity: '31 Dec 22',
          estimatedHistoricApy: '>30%',
          description:
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates optimised LP fees by providing liquidity on Voltz Protocol.',
          explanations: [
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and provides liquidity into Voltz Protocol pools. The liquidity provided is optimised to try and maximise yield for depositors.',
            'In a typical Voltz Protocol pool, LPs need to specify margin, leverage and chosen fixed-rate tick ranges. The Mellow LP Optimiser abstracts away these complexities and automatically chooses an optimal amount of leverage and tick ranges for liquidity supplied.',
            'For this pool, users simply deposit ETH in order to get access to optimised LP yields on the Voltz Protocol cETH pool.',
            'Remember, returns are not guaranteed and you may get back less than you put in.',
          ],
          depositDescription:
            'The Mellow LP Optimiser is available for the Voltz Protocol cETH pool.',
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
          title: 'MELLOW VAULT - ETH',
          token: 'ETH',
          maturity: '31 Mar 23',
          estimatedHistoricApy: '>30%',
          description:
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates optimised LP fees by providing liquidity on Voltz Protocol.',
          explanations: [
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and provides liquidity into Voltz Protocol pools. The liquidity provided is optimised to try and maximise yield for depositors.',
            'In a typical Voltz Protocol pool, LPs need to specify margin, leverage and chosen fixed-rate tick ranges. The Mellow LP Optimiser abstracts away these complexities and automatically chooses an optimal amount of leverage and tick ranges for liquidity supplied.',
            'For this pool, users simply deposit ETH in order to get access to optimised LP yields on the Voltz Protocol cETH pool.',
            'Remember, returns are not guaranteed and you may get back less than you put in.',
          ],
          depositDescription:
            'The Mellow LP Optimiser is available for the Voltz Protocol cETH pool.',
          underlyingPools: ['cETH'],
          deprecated: false,
        },
      },
      {
        show: false,
        router: '0xE6cc2CcAd204D96821241a8cfBC7e31041bA7340',
        defaultWeights: [100],
        pivot: 0,
        metadata: {
          title: 'MELLOW VAULT - ETH',
          token: 'ETH',
          maturity: '07 Dec 22',
          estimatedHistoricApy: '>30%',
          description:
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates optimised LP fees by providing liquidity on Voltz Protocol.',
          explanations: [
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and provides liquidity into Voltz Protocol pools. The liquidity provided is optimised to try and maximise yield for depositors.',
            'In a typical Voltz Protocol pool, LPs need to specify margin, leverage and chosen fixed-rate tick ranges. The Mellow LP Optimiser abstracts away these complexities and automatically chooses an optimal amount of leverage and tick ranges for liquidity supplied.',
            'For this pool, users simply deposit ETH in order to get access to optimised LP yields on the Voltz Protocol cETH pools.',
            'Remember, returns are not guaranteed and you may get back less than you put in.',
          ],
          depositDescription:
            'The Mellow LP Optimiser is available for the Voltz Protocol cETH pools.',
          underlyingPools: ['cETH', 'cETH'],
          deprecated: false,
        },
      },
      {
        show: true,
        router: '0x69a2564dd743049de7fac0b6b6a7626feb596745',
        defaultWeights: [100],
        pivot: 0,
        metadata: {
          title: 'MELLOW VAULT - USDC',
          token: 'USDC',
          maturity: '07 Dec 22',
          estimatedHistoricApy: '>30%',
          description:
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates optimised LP fees by providing liquidity on Voltz Protocol.',
          explanations: [
            'The Mellow LP Optimiser runs a permissionless strategy that takes deposits and provides liquidity into Voltz Protocol pools. The liquidity provided is optimised to try and maximise yield for depositors.',
            'In a typical Voltz Protocol pool, LPs need to specify margin, leverage and chosen fixed-rate tick ranges. The Mellow LP Optimiser abstracts away these complexities and automatically chooses an optimal amount of leverage and tick ranges for liquidity supplied.',
            'For this pool, users simply deposit ETH in order to get access to optimised LP yields on the Voltz Protocol cUSDC pools.',
            'Remember, returns are not guaranteed and you may get back less than you put in.',
          ],
          depositDescription:
            'The Mellow LP Optimiser is available for the Voltz Protocol cUSDC pools.',
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
