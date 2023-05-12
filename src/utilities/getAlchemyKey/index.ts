import { isEnvVarProvided } from '../isEnvVarProvided';

/**
 * It returns the corresponding alchemyKey from the process.env.REACT_APP_ALCHEMY_KEY variable
 * @returns The alchemy key
 */
export const getAlchemyKey = (key = process.env.REACT_APP_ALCHEMY_KEY): string => {
  if (isEnvVarProvided(key)) {
    return key as string;
  }
  return '';
};
