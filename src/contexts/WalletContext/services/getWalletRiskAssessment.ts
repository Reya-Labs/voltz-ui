import fetch from 'isomorphic-fetch';

import { getSentryTracker } from '../../../utilities/sentry';
import { WalletRiskAssessment } from '../types';
import { UNAVAILABLE_TEXT } from './constants';

/**
 * Makes a request to TRM to get a risk assessment for the given wallet ID
 * @param walletId - ID of the wallet to check
 */
export async function getWalletRiskAssessment(walletId: string) {
  try {
    const result = await fetch('https://api.trmlabs.com/public/v2/screening/addresses', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Basic ${btoa(process.env.REACT_APP_TRM_API_KEY || '')}`,
      },
      body: JSON.stringify([
        {
          address: walletId,
          chain: 'ethereum',
        },
      ]),
    });

    if (result.ok) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: WalletRiskAssessment[] = await result.json();
      return data[0];
    } else {
      throw await result.text();
    }
  } catch (error) {
    // eslint-disable-next-line
    getSentryTracker().captureException(error);
    console.warn('Wallet screening failed', error);
    throw new Error(UNAVAILABLE_TEXT);
  }
}
