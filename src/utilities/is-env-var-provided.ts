export const isEnvVarProvided = (envVarValue?: string | null) =>
  envVarValue && envVarValue !== 'UNPROVIDED';
