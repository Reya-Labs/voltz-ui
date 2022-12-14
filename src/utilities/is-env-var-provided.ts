export const isEnvVarProvided = (envVarValue?: string | null) => {
  return envVarValue && envVarValue !== 'UNPROVIDED';
};
