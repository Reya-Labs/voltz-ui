import { CHAIN_ID_LOCAL_STORAGE_KEY } from './constants';

/**
 * It takes a string as an argument and saves it to the browser's local storage
 * @param {string} value - The value of the chain ID.
 */
export const setChainId = (value: string) => {
  localStorage.setItem(CHAIN_ID_LOCAL_STORAGE_KEY, value);
};

/**
 * It returns the chain ID from local storage
 * @returns The chain id from local storage.
 */
export const getChainId = () => {
  return localStorage.getItem(CHAIN_ID_LOCAL_STORAGE_KEY);
};

/**
 * It removes the chainId from local storage
 */
export const deleteChainId = () => {
  localStorage.removeItem(CHAIN_ID_LOCAL_STORAGE_KEY);
};
