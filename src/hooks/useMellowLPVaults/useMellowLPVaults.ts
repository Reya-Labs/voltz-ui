import { MellowLpVault } from '@voltz-protocol/v1-sdk';
import { useMemo } from 'react';
import { getConfig } from './config';

const useMellowLPVaults = (): MellowLpVault[] => {
  const config = getConfig();

  const lpVaults = useMemo(() => config.MELLOW_VAULTS.map(
    (item) =>
      new MellowLpVault({
        ethWrapperAddress: config.MELLOW_ETH_WRAPPER,
        voltzVaultAddress: item.voltzVault,
        erc20RootVaultAddress: item.erc20RootVault,
        erc20RootVaultGovernanceAddress: item.erc20RootVaultGovernance,
        provider: config.PROVIDER,
      }),
  ), []);

  return lpVaults;
};

export default useMellowLPVaults;
