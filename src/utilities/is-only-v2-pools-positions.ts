import { isEnvVarProvided } from './isEnvVarProvided';

export const isOnlyV2PoolsPositions = () =>
  isEnvVarProvided(process.env.REACT_APP_IS_ONLY_V2_POOLS_POSITIONS);
