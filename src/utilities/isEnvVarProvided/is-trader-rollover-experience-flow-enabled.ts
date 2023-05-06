import { isEnvVarProvided } from './index';

export const isTraderRolloverExperienceFlowEnabled = () =>
  isEnvVarProvided(process.env.REACT_APP_TRADER_ROLLOVER_EXPERIENCE_FLOW_ENABLED);
