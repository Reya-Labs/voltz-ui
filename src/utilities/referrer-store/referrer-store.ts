const REFERRER_LOCAL_STORAGE_KEY = 'invitedBy';
const VALID_REFERRER_LENGTH = 8;
export const REFERRER_QUERY_PARAM_KEY = 'invitedBy';

/**
 * It takes a string as an argument and saves it to local storage
 * @param {string} value - The value to set the referrer to.
 */
export const setReferrer = (value: string) => {
  localStorage.setItem(REFERRER_LOCAL_STORAGE_KEY, value);
};

/**
 * It returns the value of the referrer key in local storage
 * @returns The value of the referrer key in local storage.
 */
export const getReferrer = () => {
  return localStorage.getItem(REFERRER_LOCAL_STORAGE_KEY);
};

/**
 * It deletes the referrer from local storage
 */
export const deleteReferrer = () => {
  localStorage.removeItem(REFERRER_LOCAL_STORAGE_KEY);
};

/**
 * If the referrer is valid, return it, otherwise return an empty string.
 * @returns A boolean value.
 */
export const isValidReferrerStored = () => {
  return isValidReferrerValue(getReferrer() || '');
};

/**
 * It returns true if the referrer is stored in localStorage, and false otherwise
 * @returns A boolean value.
 */
export const isRefererStored = () => {
  return Boolean(getReferrer());
};

/**
 * If the value is not null and has a length of VALID_REFERRER_LENGTH, return true, otherwise return false.
 * @param {string | null} [value] - string | null = ''
 */
export const isValidReferrerValue = (value: string | null = '') =>
  value?.length === VALID_REFERRER_LENGTH;
