import { MellowLpRouter, MellowLpVault } from '@voltz-protocol/v1-sdk';
import { useMemo } from 'react';
import { getConfig } from './config';

const useMellowLPVaults = (): (MellowLpVault | MellowLpRouter)[] => {
  const config = getConfig();

  const lpVaults = useMemo(
    () => {
      const vaults: (MellowLpVault | MellowLpRouter)[] = config.MELLOW_VAULTS.map(
        (item) =>
          new MellowLpVault({
            ethWrapperAddress: config.MELLOW_ETH_WRAPPER,
            voltzVaultAddress: item.voltzVault,
            erc20RootVaultAddress: item.erc20RootVault,
            erc20RootVaultGovernanceAddress: item.erc20RootVaultGovernance,
            provider: config.PROVIDER,
          }),
      );

      const routers: (MellowLpVault | MellowLpRouter)[] = config.MELLOW_ROUTERS.map(
        (item) =>
          new MellowLpRouter({
            mellowRouterAddress: item.router,
            defaultWeights: item.defaultWeights,
            provider: config.PROVIDER,
          })

      );

      return vaults.concat(routers);
    }
    ,
    [],
  );

  return lpVaults;
};

export default useMellowLPVaults;
