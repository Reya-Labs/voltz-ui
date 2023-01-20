import fetch from 'isomorphic-fetch';

import { REFERRAL_AND_SIGNATURES_URL } from './constants';

/**
 * Saves a signature via the signatures API for the given wallet address
 * @param {string} walletAddress - The user's wallet address.
 * @param {string} signature - The signature of the terms of service.
 * @param {string} termsOfService - The terms of service that the user is agreeing to.
 * @param {string} referralCode - The referral code of the user who referred the user.
 * @returns A promise.
 */
export const saveSignatureWithTOS = async (
  walletAddress: string,
  signature: string,
  termsOfService: string,
  referralCode?: string | null,
) => {
  // Build formData object.
  const formData = new FormData();
  formData.append('signature', signature);
  formData.append('walletAddress', walletAddress);
  formData.append('message', termsOfService);
  referralCode && formData.append('referralCode', referralCode);

  return await fetch(`${REFERRAL_AND_SIGNATURES_URL}/add-signature`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: formData,
  });
};
