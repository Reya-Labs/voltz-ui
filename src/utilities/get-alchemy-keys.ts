import { isEnvVarProvided } from './isEnvVarProvided';

/**
 * It takes a string of comma separated values, splits them into an array, trims the whitespace, and then reduces the array
 * into an object
 * @returns An object with the network as the key and the apiKey as the value.
 */
export const getAlchemyKeys = (): Record<string, string> => {
  // should be string of type network1-key1,network2-key2
  const keys = process.env.REACT_APP_NETWORK_ALCHEMY_KEYS;
  if (!keys || !isEnvVarProvided(keys)) {
    return {};
  }

  return keys
    .split(',')
    .map((k) => k.trim())
    .reduce((pV, cI) => {
      const [network, apiKey] = cI.split('/');
      return {
        ...pV,
        [network]: apiKey,
      };
    }, {});
};
