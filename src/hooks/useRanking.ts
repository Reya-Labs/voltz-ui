import { useMemo } from "react";
import useAsyncFunction, { UseAsyncFunctionResult } from "./useAsyncFunction";
import { DateTime } from "luxon";
import { getActivity } from "@graphql";
import { Wallet } from "@contexts";
import { isUndefined } from "lodash";

export type useRankingReturnType = {
  rankings: UseAsyncFunctionResult<unknown, Map<string, number> | void>;
  seasonEndDate: DateTime | undefined;
}

export const useRanking = (wallet: Wallet) => {

  const startOfSeasons = DateTime.fromISO("2022-07-13T16:03:44+00:00"); 
  const duration = 1; // months 
  const seasonsDate = new Map<number, DateTime>();
  for (let i = 0; i < 10; i ++) {
    seasonsDate.set(i, startOfSeasons.plus({months: duration*i}));
  }

  const findCurrentSeason = (now: DateTime) => {
    for (let i = 0; i < 10; i ++) {
        const seasonDate = seasonsDate.get(i);
        if (seasonDate &&  
            now.diff(seasonDate).days >= 0 &&
            now.diff(seasonDate).days < 30) {
                return i;
            }
    }
  }

  const curretSeason = findCurrentSeason(DateTime.local());
  const seasonEndDate = curretSeason ? seasonsDate.get(curretSeason) : undefined;

  const rankings = useAsyncFunction(
    async () => {
      const seasonNumber = findCurrentSeason(DateTime.local());
      const startTime = !isUndefined(seasonNumber) ? seasonsDate.get(seasonNumber) : undefined;
      if (startTime) {
        const result = await getActivity({from: startTime.toSeconds()});
        return result.total;
      }
    },
    useMemo(() => undefined, [])
  );

  return useMemo(() => ({
    rankings,
    seasonEndDate
  } as useRankingReturnType),
    [
      rankings,
      seasonEndDate
    ]);
}

export default useRanking;