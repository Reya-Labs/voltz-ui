import { useMemo } from 'react';

import { MellowLpVault } from '@voltz-protocol/v1-sdk';
import { config } from './config';

export type useMellowLPVaultsResult = {
  lpVaults?: MellowLpVault[];
  loading: boolean;
  error: boolean;
};

const useMellowLPVaults = (): useMellowLPVaultsResult => {
  const lpVaults = useMemo(() => {
    return config.MELLOW_VAULTS.map(
      (item) =>
        new MellowLpVault({
          ethWrapperAddress: config.MELLOW_ETH_WRAPPER,
          voltzVaultAddress: item.voltzVault,
          erc20RootVaultAddress: item.erc20RootVault,
          erc20RootVaultGovernanceAddress: item.erc20RootVaultGovernance,
          provider: config.PROVIDER,
        }),
    );
  }, []);

  return { lpVaults, loading: false, error: false };
};

export default useMellowLPVaults;
