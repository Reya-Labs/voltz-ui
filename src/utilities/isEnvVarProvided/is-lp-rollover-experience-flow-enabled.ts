import { isEnvVarProvided } from './index';

export const isLPRolloverExperienceFlowEnabled = () =>
  isEnvVarProvided(process.env.REACT_APP_LP_ROLLOVER_EXPERIENCE_FLOW_ENABLED);
