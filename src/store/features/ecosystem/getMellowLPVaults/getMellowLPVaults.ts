import { MellowLpRouter, MellowLpVault } from '@voltz-protocol/v1-sdk';

import { getConfig, MellowProduct } from './config';

export const getMellowLPVaults = (): MellowProduct[] => {
  const config = getConfig();

  const vaults: MellowProduct[] = config.MELLOW_VAULTS.filter((item) => item.metadata.show).map(
    (item) => {
      const vault = new MellowLpVault({
        ethWrapperAddress: config.MELLOW_ETH_WRAPPER,
        voltzVaultAddress: item.voltzVault,
        erc20RootVaultAddress: item.erc20RootVault,
        erc20RootVaultGovernanceAddress: item.erc20RootVaultGovernance,
        provider: config.PROVIDER,
      });

      return {
        id: item.voltzVault,
        vault,
        metadata: {
          ...item.metadata,
          estimatedHistoricApy: 'TODO: COSTIN DA MAN',
          underlyingPools: ['LIDO-ETH'],
          vaults: [
            {
              maturityTimestampMS: 1672444800000,
              pools: ['LIDO-ETH'],
              estimatedHistoricApy: '>30%',
              weight: 100,
            },
          ],
        },
      };
    },
  );

  const routers: MellowProduct[] = config.MELLOW_ROUTERS.filter((item) => item.metadata.show).map(
    (item) => {
      const vault = new MellowLpRouter({
        mellowRouterAddress: item.router,
        defaultWeights: item.vaults.map((v) =>
          Date.now().valueOf() > v.maturityTimestampMS ? 0 : v.weight,
        ),
        provider: config.PROVIDER,
      });

      return {
        id: `mellow-${item.metadata.token.toLowerCase()}`,
        vault,
        metadata: {
          ...item.metadata,
          vaults: item.vaults,
          estimatedHistoricApy: 'TODO: COSTIN DA MAN',
          underlyingPools: item.vaults.reduce((pV, cI) => [...pV, ...cI.pools], [] as string[]),
        },
      };
    },
  );

  return routers.concat(vaults);
};
