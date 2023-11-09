import { getReferrerCode } from '@voltz-protocol/wallet-sdk';

import { WELCOME } from '../../../app/features/redirects';
import { isEnvVarProvided } from '../../../utilities/isEnvVarProvided';
import { REFERRER_QUERY_PARAM_KEY } from '../../../utilities/referrer-store/constants';
import { getSentryTracker } from '../../../utilities/sentry';

export const getReferrerLink = async (account: string) => {
  try {
    const referCode = await getReferrerCode(
      account,
      isEnvVarProvided(process.env.REACT_APP_IS_TEST_ENV),
    );
    if (!referCode) {
      return undefined;
    }
    return `${window.location.origin}/#/${WELCOME}?${REFERRER_QUERY_PARAM_KEY}=${referCode}`;
  } catch (error) {
    getSentryTracker().captureException(error);
    return undefined;
  }
};
