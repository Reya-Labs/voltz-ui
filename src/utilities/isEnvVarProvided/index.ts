/**
 * If the environment variable is provided, return true, otherwise return false.
 * @param {string | null} [envVarValue] - The value of the environment variable.
 */
export const isEnvVarProvided = (envVarValue?: string | null) =>
  envVarValue ? envVarValue !== 'UNPROVIDED' : false;
