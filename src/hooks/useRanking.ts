import { useMemo } from 'react';
import useAsyncFunction, { UseAsyncFunctionResult } from './useAsyncFunction';
import { DateTime } from 'luxon';
import { getActivity } from '@graphql';
import { Wallet } from '@contexts';
import { isUndefined } from 'lodash';
import useCurrentSeason from './useCurrentSeason';

export type useRankingReturnType = {
  rankings: UseAsyncFunctionResult<unknown, Map<string, number> | void>;
  claimStatic: UseAsyncFunctionResult<unknown, boolean | void>;
  claim: UseAsyncFunctionResult<unknown, boolean | void>;
  seasonEndDate: DateTime | undefined;
};

export const useRanking = (wallet: Wallet) => {
  const season = useCurrentSeason();
  const startOfSeasons = DateTime.fromISO('2022-08-01T16:03:44+00:00');
  const duration = 1; // months
  const seasonsDate = new Map<number, DateTime>();
  for (let i = 0; i <= 10; i++) {
    seasonsDate.set(i, startOfSeasons.plus({ months: duration * i }));
  }

  const claimStatic = useAsyncFunction(
    async () => {
      if (season && wallet.signer) {
        const result = { status: 'SUCCESS' };
        await new Promise((r) => setTimeout(r, 2000));
        //await redeemBadge("", wallet.signer, "S"+season.seasonNumber.toString(), true);
        return result.status === 'SUCCESS';
      }
      return false;
    },
    useMemo(() => undefined, []),
  );

  const claim = useAsyncFunction(
    async () => {
      if (season && wallet.signer) {
        const result = { status: 'SUCCESS' };
        await new Promise((r) => setTimeout(r, 2000));
        //await redeemBadge("", wallet.signer, "S"+season.seasonNumber.toString(), false);
        return result.status === 'SUCCESS';
      }
      return false;
    },
    useMemo(() => undefined, []),
  );

  const seasonEndDate = season ? seasonsDate.get(season.seasonNumber) : undefined;

  const rankings = useAsyncFunction(
    async () => {
      const number = season?.seasonNumber;
      const startTime = !isUndefined(number) ? seasonsDate.get(number) : undefined;
      if (startTime) {
        const result = await getActivity({ from: startTime.toSeconds() });
        return result.total;
      }
    },
    useMemo(() => undefined, []),
  );

  return useMemo(
    () =>
      ({
        rankings,
        claimStatic,
        claim,
        seasonEndDate,
      } as useRankingReturnType),
    [rankings, claimStatic, claim, seasonEndDate],
  );
};

export default useRanking;
