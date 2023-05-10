import { isEnvVarProvided } from './index';

export const isSettleFlowEnabled = () =>
  isEnvVarProvided(process.env.REACT_APP_SETTLE_FLOW_ENABLED);
