import { isEnvVarProvided } from './index';

export const isVoyageNextEnabled = () =>
  isEnvVarProvided(process.env.REACT_APP_VOYAGE_NEXT_ENABLED);
