import { getAllowanceToPeriphery as getAllowanceToPeripheryV2 } from '@voltz-protocol/sdk-v2';
import { Signer } from 'ethers';

export const getPoolUnderlyingTokenAllowanceService = async ({
  poolId,
  signer,
}: {
  poolId: string;
  signer: Signer;
}): Promise<number> => {
  if (!poolId || !signer) {
    return 0;
  }
  return await getAllowanceToPeripheryV2({
    ammId: poolId,
    signer,
  });
};
