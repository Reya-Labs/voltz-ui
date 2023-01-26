import { isEnvVarProvided } from './isEnvVarProvided';

export const isStatelessSDKEnabled = (): boolean =>
  isEnvVarProvided(process.env.REACT_APP_STATELESS_SDK);
