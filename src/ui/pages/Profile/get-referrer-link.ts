import fetch from 'isomorphic-fetch';

import { routes } from '../../../routes/paths';
import { REFERRER_QUERY_PARAM_KEY } from '../../../utilities/referrer-store/constants';
import { getSentryTracker } from '../../../utilities/sentry';

const cached: Record<string, string> = {};
export const getReferrerLink = async (account: string) => {
  const baseUrl = process.env.REACT_APP_REFERRAL_AND_SIGNATURE_SERVICE_URL;
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
    const link = `${window.location.origin}/#/${routes.WELCOME}?${REFERRER_QUERY_PARAM_KEY}=${data.refers_with_code}`;
    cached[account] = link;
    return link;
  } catch (error) {
    getSentryTracker().captureException(error);
    return undefined;
  }
};
