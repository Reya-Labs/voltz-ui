import { isEnvVarProvided } from './index';

export const isVoyageEnabled = () => isEnvVarProvided(process.env.REACT_APP_VOYAGE_ENABLED);
