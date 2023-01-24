import { getVoltzPoolConfig } from '@voltz-protocol/v1-sdk';

let cachedConfig: ReturnType<typeof getVoltzPoolConfig> | null = null;

export const getConfig = (): ReturnType<typeof getVoltzPoolConfig> => {
  if (cachedConfig) {
    return cachedConfig;
  }
  cachedConfig = getVoltzPoolConfig({
    network: process.env.REACT_APP_NETWORK || '',
    providerURL: process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK || '',
  });
  return cachedConfig;
};
