import { isEnvVarProvided } from './isEnvVarProvided';

export const isV2Live = () => isEnvVarProvided(process.env.REACT_APP_IS_V2_LIVE);
