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
  // TODO: FB evaluate before launch
  if (poolId === '1_1_1698710400_v2' || poolId === '42161_2_1703980800_v2') {
    return await new Promise((resolve, reject) => {
      setTimeout(
        () => {
          resolve(Math.random() * 10000 + 1000);
        },
        Math.random() * 100 + 1000,
      );
    });
  }
  return await getAllowanceToPeripheryV2({
    ammId: poolId,
    signer,
  });
};
