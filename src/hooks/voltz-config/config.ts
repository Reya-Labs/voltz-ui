import { providers } from 'ethers';

import { NetworkConfiguration } from './types';

export const networkConfigurations: { [key: string]: NetworkConfiguration } = {
  mainnet: {
    factoryAddress: '0x6a7a5c3824508D03F0d2d24E0482Bea39E08CcAF',
    wethAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    apply: true,
    pools: [
      // aUSDC pools
      {
        name: 'aUSDC_v1',
        id: '0xae16bb8fe13001b61ddb44e2ceae472d6af08755', // vamm address
        show: {
          general: true,
          trader: true,
        },
        traderWithdrawable: true,
      },
      {
        name: 'aUSDC_v2',
        id: '0x538e4ffee8aed76efe35565c322a7b0d8cdb4cff', // vamm address
        show: {
          general: true,
          trader: true,
        },
        traderWithdrawable: true,
      },
      {
        name: 'aUSDC_v3',
        id: '0x953e581dd817b0faa69eacafb2c5709483f39aba', // vamm address
        show: {
          general: true,
          trader: true,
        },
        traderWithdrawable: false,
      },
      {
        name: 'aUSDC_v4',
        id: '0x6db5e4e8732dd6cb1b6e5fbe39fd102d8e76c512', // vamm address
        show: {
          general: false,
          trader: false,
        },
        traderWithdrawable: false,
      },
      {
        name: 'aUSDC_v5',
        id: '0x368811e781c4300561d1cc204f7333a778d87ad5', // vamm address
        show: {
          general: false,
          trader: false,
        },
        traderWithdrawable: false,
      },

      // borrow aUSDC pools
      {
        name: 'borrow_aUSDC_v1',
        id: '0x0f91a255b5ba8e59f3b97b1ede91dec88bcc17eb', // vamm address
        show: {
          general: true,
          trader: true,
        },
        traderWithdrawable: false,
      },

      // aDAI pools
      {
        name: 'aDAI_v1',
        id: '0xa1a75f6689949ff413aa115d300f5e30f35ba061', // vamm address
        show: {
          general: true,
          trader: true,
        },
        traderWithdrawable: true,
      },
      {
        name: 'aDAI_v2',
        id: '0xc75e6d901817b476a9f3b6b79831d2b61673f9f5', // vamm address
        show: {
          general: true,
          trader: true,
        },
        traderWithdrawable: true,
      },
      {
        name: 'aDAI_v3',
        id: '0xad6bbd2eb576a82fc4ff0399a4ef2f123be7cfd2', // vamm address
        show: {
          general: true,
          trader: true,
        },
        traderWithdrawable: false,
      },
      {
        name: 'aDAI_v4',
        id: '0x7df7aa512f1eb4dd5c1b69486f45fe895ba41ece', // vamm address
        show: {
          general: false,
          trader: false,
        },
        traderWithdrawable: false,
      },

      // cDAI pools
      {
        name: 'cDAI_v1',
        id: '0xe4668bc57b1a73aaa832fb083b121d5b4602f475', // vamm address
        show: {
          general: true,
          trader: true,
        },
        traderWithdrawable: true,
      },
      {
        name: 'cDAI_v2',
        id: '0xd09723a7f4c26f4723aa63bf4a4a4a5dad970a49', // vamm address
        show: {
          general: true,
          trader: true,
        },
        traderWithdrawable: true,
      },
      {
        name: 'cDAI_v3',
        id: '0x1f0cb00ac15694c810a3326abf27921ef42d6d6d', // vamm address
        show: {
          general: true,
          trader: true,
        },
        traderWithdrawable: false,
      },
      {
        name: 'cDAI_v4',
        id: '0xef05af8b766b33e8c0fe768278dee326946a4858', // vamm address
        show: {
          general: false,
          trader: false,
        },
        traderWithdrawable: false,
      },

      // stETH pools
      {
        name: 'stETH_v1',
        id: '0x3806b99d0a0483e0d07501b31884c10e8e8b1215', // vamm address
        show: {
          general: true,
          trader: true,
        },
        traderWithdrawable: false,
      },
      {
        name: 'stETH_v2',
        id: '0x05cae5fe1faab605f795b018be6ba979c2c89cdb', // vamm address
        show: {
          general: false,
          trader: false,
        },
        traderWithdrawable: false,
      },

      // rETH pools
      {
        name: 'rETH_v1',
        id: '0x5842254e74510e000d25b5e601bcbc43b52946b4', // vamm address
        show: {
          general: true,
          trader: true,
        },
        traderWithdrawable: false,
      },
      {
        name: 'rETH_v2',
        id: '0xe07324a394acfff8fe24a09c3f2e2bd62e929efb', // vamm address
        show: {
          general: false,
          trader: false,
        },
        traderWithdrawable: false,
      },

      // aETH pools
      {
        name: 'aETH_v1',
        id: '0x5d82b85430d3737d8068248363b4d47395145387', // vamm address
        show: {
          general: true,
          trader: true,
        },
        traderWithdrawable: false,
        rollover: '0x27ed5d356937213f97c9f9cb7593d876e5d30f42',
      },

      // borrow aETH pools
      {
        name: 'borrow_aETH_v1',
        id: '0x682f3e5685ff51c232cf842840ba27e717c1ae2e', // vamm address
        show: {
          general: true,
          trader: true,
        },
        traderWithdrawable: false,
      },
      {
        name: 'borrow_aETH_v2',
        id: '0x27ed5d356937213f97c9f9cb7593d876e5d30f42', // vamm address
        show: {
          general: true,
          trader: true,
        },
        traderWithdrawable: false,
      },

      // borrow cUSDT pools
      {
        name: 'borrow_cUSDT_v1',
        id: '0xcd47347a8c4f40e6877425080d22f4c3115b60a5', // vamm address
        show: {
          general: true,
          trader: true,
        },
        traderWithdrawable: false,
      },

      // borrow aUSDT pools
      {
        name: 'borrow_aUSDT_v1',
        id: '0x9a37bcc8ff3055d7223b169bc9c9fe2157a1b60e', // vamm address
        show: {
          general: false,
          trader: false,
        },
        traderWithdrawable: false,
      },
    ],
  },

  goerli: {
    factoryAddress: '0x9f30Ec6903F1728ca250f48f664e48c3f15038eD',
    wethAddress: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
    apply: false,
    pools: [],
  },
};

export const getConfig = (): NetworkConfiguration & {
  PROVIDER: providers.BaseProvider;
} => {
  const network = process.env.REACT_APP_NETWORK || '';
  const providerURL = process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK || '';

  if (!network) {
    throw new Error(`Network not specified as an environment variable.`);
  }

  const allNetworks = Object.keys(networkConfigurations);
  if (!allNetworks.includes(network)) {
    throw new Error(
      `Network ${network} not found in configuration networks ${allNetworks.toString()}.`,
    );
  }

  const config = networkConfigurations[network as keyof typeof networkConfigurations];
  const provider = providers.getDefaultProvider(providerURL);

  return {
    ...config,
    PROVIDER: provider,
  };
};
