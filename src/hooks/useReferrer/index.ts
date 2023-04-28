import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  deleteReferrer,
  isRefererStored,
  isValidReferrerStored,
  isValidReferrerValue,
  setReferrer,
} from '../../utilities/referrer-store';
import { REFERRER_QUERY_PARAM_KEY } from '../../utilities/referrer-store/constants';

export const useReferrer = () => {
  const [searchParams] = useSearchParams();
  const searchParamsReferrer = searchParams.get(REFERRER_QUERY_PARAM_KEY);

  // referrer logic - run everytime params change for ${REFERRER_QUERY_PARAM_KEY}
  useEffect(() => {
    // Earlier, pre-release keys may have used more than 8 characters, but we overwrite these
    if (!isValidReferrerStored()) {
      deleteReferrer();
    }

    const isValidReferrer = isValidReferrerValue(searchParamsReferrer);
    if (!isValidReferrer) {
      return;
    }

    // Referrer is set in URL and has not already been saved in storage; save to storage now
    // We do deliberately do not overwrite any existing value because we want to credit the first referral link that was followed
    if (!isRefererStored()) {
      setReferrer(searchParamsReferrer!);
    }
  }, [searchParamsReferrer]);
};
