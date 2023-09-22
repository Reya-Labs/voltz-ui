import fetch from 'isomorphic-fetch';

import { WELCOME } from '../../../app/features/redirects';
import { REFERRER_QUERY_PARAM_KEY } from '../../../utilities/referrer-store/constants';
import { getSentryTracker } from '../../../utilities/sentry';
import { REFERRAL_AND_SIGNATURES_URL } from '../../contexts/WalletContext/services/constants';

const cached: Record<string, string> = {};
export const getReferrerLink = async (account: string) => {
  const baseUrl = REFERRAL_AND_SIGNATURES_URL;
  if (!baseUrl || !account) {
    return undefined;
  }
  if (cached[account]) {
    return cached[account];
  }

  try {
    const response = await fetch(`${baseUrl}/get-refers-with/${account}`);

    if (!response.ok) {
      throw response;
    }
    const data = (await response.json()) as {
      status?: string;
      description?: string;
      refers_with_code?: string;
      wallet_address?: string;
    };
    if (!data?.refers_with_code) {
      return undefined;
    }
    const link = `${window.location.origin}/#/${WELCOME}?${REFERRER_QUERY_PARAM_KEY}=${data.refers_with_code}`;
    cached[account] = link;
    return link;
  } catch (error) {
    getSentryTracker().captureException(error);
    return undefined;
  }
};
