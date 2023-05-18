import { isEnvVarProvided } from '../isEnvVarProvided';

/**
 * It returns the corresponding alchemyKey from the process.env.REACT_APP_INFURA_KEY variable
 * @returns The infura key
 */
export const getInfuraKey = (key = process.env.REACT_APP_INFURA_KEY): string => {
  if (isEnvVarProvided(key)) {
    return key as string;
  }
  return '';
};
