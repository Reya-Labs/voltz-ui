import { approvePeriphery as approvePeripheryV2 } from '@voltz-protocol/sdk-v2';
import { Signer } from 'ethers';

export const approvePoolUnderlyingTokenService = async ({
  poolId,
  signer,
}: {
  poolId: string;
  signer: Signer;
}): Promise<number> => {
  if (!poolId || !signer) {
    return 0;
  }
  return await approvePeripheryV2({
    signer,
    ammId: poolId,
  });
};
