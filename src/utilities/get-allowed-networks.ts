import { isEnvVarProvided } from './isEnvVarProvided';

export const getAllowedNetworks = (): string[] => {
  if (
    !process.env.REACT_APP_NETWORK_SELECTOR_ALLOWED_NETWORKS ||
    !isEnvVarProvided(process.env.REACT_APP_NETWORK_SELECTOR_ALLOWED_NETWORKS)
  ) {
    return [];
  }
  return process.env.REACT_APP_NETWORK_SELECTOR_ALLOWED_NETWORKS.split(',').map((s) => s.trim());
};
