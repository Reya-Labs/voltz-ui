import * as Sentry from '@sentry/react';
import axios from 'axios';

import { routes } from '../../routes/paths';
import { REFERRER_QUERY_PARAM_KEY } from '../../utilities/referrer-store/referrer-store';

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
    const data = (
      await axios.get<{
        status?: string;
        description?: string;
        refers_with_code?: string;
        wallet_address?: string;
      }>(`${baseUrl}/get-refers-with/${account}`)
    )?.data;

    if (!data?.refers_with_code) {
      return undefined;
    }
    const link = `${window.location.origin}/#/${routes.WELCOME}?${REFERRER_QUERY_PARAM_KEY}=${data.refers_with_code}`;
    cached[account] = link;
    return link;
  } catch (error) {
    Sentry.captureException(error);
    return undefined;
  }
};
