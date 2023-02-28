import { isEnvVarProvided } from './isEnvVarProvided';

export const isTraderExperienceFlowEnabled = (): boolean =>
  isEnvVarProvided(process.env.REACT_APP_TRADER_EXPERIENCE_FLOW_ENABLED);
