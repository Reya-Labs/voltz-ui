import { useMemo } from 'react';
import useAsyncFunction, { UseAsyncFunctionResult } from './useAsyncFunction';
import { getActivity } from '@graphql';
import { useCurrentSeason } from '@hooks';

export type useRankingReturnType = {
  rankings: UseAsyncFunctionResult<unknown, Map<string, number> | void>;
};

export const useRanking = () => {
  const season = useCurrentSeason();

  const rankings = useAsyncFunction(
    async () => {
      if (season.startDate) {
        const result = await getActivity({ from: season.startDate.toSeconds() });
        return result.total;
      }
    },
    useMemo(() => undefined, []),
  );

  return useMemo(
    () =>
      ({
        rankings,
      } as useRankingReturnType),
    [rankings],
  );
};

export default useRanking;
