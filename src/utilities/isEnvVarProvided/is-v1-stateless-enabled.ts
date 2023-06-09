import { isEnvVarProvided } from './index';

export const isV1StatelessEnabled = () =>
  isEnvVarProvided(process.env.REACT_APP_IS_V1_STATELESS_ENABLED);
