import { isEnvVarProvided } from './isEnvVarProvided';

export const isMarginAccountsLive = () =>
  isEnvVarProvided(process.env.REACT_APP_IS_MARGIN_ACCOUNTS_LIVE);
