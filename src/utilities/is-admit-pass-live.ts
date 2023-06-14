import { isEnvVarProvided } from './isEnvVarProvided';

export const isAdmitPassLive = () => isEnvVarProvided(process.env.REACT_APP_IS_ADMIT_PASS_LIVE);
