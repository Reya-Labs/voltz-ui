import { MellowLpRouter, MellowLpVault } from '@voltz-protocol/v1-sdk';

export type MellowProductMetadata = {
  title: string;
  deprecated: boolean;
  token: string;
  maturity: string;
  estimatedHistoricApy: string;
  description: string;
  underlyingPools: string[];
};

export type MellowProduct = {
  vault: MellowLpVault | MellowLpRouter;
  metadata: MellowProductMetadata;
};
