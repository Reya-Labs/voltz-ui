import { isEnvVarProvided } from './isEnvVarProvided';

export const isCostReductionFlowEnabled = (): boolean =>
  isEnvVarProvided(process.env.REACT_APP_COST_REDUCTION_FLOW);
