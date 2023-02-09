import { getVoltzPoolConfigV1 } from '@voltz-protocol/v1-sdk';

let cachedConfig: ReturnType<typeof getVoltzPoolConfigV1> | null = null;

export const getConfig = (): ReturnType<typeof getVoltzPoolConfigV1> => {
  if (cachedConfig) {
    return cachedConfig;
  }
  cachedConfig = getVoltzPoolConfigV1();
  return cachedConfig;
};
