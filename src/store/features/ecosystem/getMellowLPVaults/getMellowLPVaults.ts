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
        metadata: item.metadata,
      };
    },
  );

  const routers: MellowProduct[] = config.MELLOW_ROUTERS.filter((item) => item.metadata.show).map(
    (item) => {
      const vault = new MellowLpRouter({
        mellowRouterAddress: item.router,
        defaultWeights: item.defaultWeights,
        provider: config.PROVIDER,
        pivot: item.pivot,
      });

      return {
        id: `${item.router}-${item.pivot}`,
        vault,
        metadata: item.metadata,
      };
    },
  );

  return routers.concat(vaults);
};
