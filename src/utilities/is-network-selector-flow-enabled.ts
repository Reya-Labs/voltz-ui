import { isEnvVarProvided } from './isEnvVarProvided';

export const isNetworkSelectorFlowEnabled = (): boolean =>
  isEnvVarProvided(process.env.REACT_APP_NETWORK_SELECTOR_FLOW);
