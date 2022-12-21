import { BorrowAMM } from '@voltz-protocol/v1-sdk';
import { DateTime } from 'luxon';
import { useMemo } from 'react';

import { isBorrowing } from '../utilities/isBorrowing';
import { useAMMs } from './useAMMs';

export type UseBorrowAMMsResult = {
  borrowAmms?: BorrowAMM[];
  loading: boolean;
  error: boolean;
};

export const useBorrowAMMs = (): UseBorrowAMMsResult => {
  const { amms, loading, error } = useAMMs();

  const borrowAmms = useMemo(() => {
    if (amms && !loading && !error) {
      const borrowMarkets = amms.filter((amm) => isBorrowing(amm.rateOracle.protocolId));
      const liveBorrowMarkets = borrowMarkets.filter((amm) => DateTime.now() < amm.endDateTime);
      return liveBorrowMarkets.map((amm) => new BorrowAMM({ id: amm.id, amm: amm }));
    }
  }, [loading, error, amms]);

  return { borrowAmms, loading, error };
};
