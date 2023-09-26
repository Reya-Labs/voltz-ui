import { getMaxNotionalAvailable } from '@voltz-protocol/sdk-v2';

export const getMaxNotionalAvailableService = async ({
  poolId,
  marginAccountId,
  mode,
}: {
  poolId: string;
  marginAccountId: string;
  mode: 'fixed' | 'variable';
}): Promise<number> => {
  if (!poolId || !marginAccountId) {
    return 0;
  }
  return await getMaxNotionalAvailable({
    poolId,
    marginAccountId,
    mode,
  });
};
