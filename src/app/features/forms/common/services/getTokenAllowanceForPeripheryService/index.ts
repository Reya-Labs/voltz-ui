import { getTokenAllowanceForPeriphery } from '@voltz-protocol/sdk-v2';
import { Signer } from 'ethers';

import { V2Pool } from '../../../../aMMs';

export const getTokenAllowanceForPeripheryService = async ({
  tokenName,
  signer,
}: {
  tokenName: V2Pool['underlyingToken']['name'];
  signer: Signer;
}): Promise<number> => {
  if (!tokenName || !signer) {
    return 0;
  }
  return await getTokenAllowanceForPeriphery({
    signer,
    tokenName,
  });
};
