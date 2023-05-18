import { SupportedChainId } from '@voltz-protocol/v1-sdk';

export const getVoyageId = ({ chainId, account }: { chainId: SupportedChainId; account: string }) =>
  `${chainId}-${account}`;
