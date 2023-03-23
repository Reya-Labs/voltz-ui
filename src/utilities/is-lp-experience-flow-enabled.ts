import { isEnvVarProvided } from './isEnvVarProvided';

export const isLPExperienceFlowEnabled = (): boolean =>
  isEnvVarProvided(process.env.REACT_APP_LP_EXPERIENCE_FLOW_ENABLED);
