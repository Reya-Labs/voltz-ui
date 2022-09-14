import { useMemo } from "react";
import useAsyncFunction, { UseAsyncFunctionResult } from "./useAsyncFunction";
import { DateTime } from "luxon";
import { getActivity } from "@graphql";
import { Wallet } from "@contexts";
import { isUndefined } from "lodash";

export type useRankingReturnType = {
  rankings: UseAsyncFunctionResult<unknown, Map<string, number> | void>;
  seasonEndDate: DateTime | undefined;
  findCurrentSeason: (now: DateTime) => {seasonNumber: number, seasonEndDate: DateTime};
}

export const useRanking = (wallet: Wallet) => {

  const startOfSeasons = DateTime.fromISO("2022-08-01T16:03:44+00:00"); 
  const duration = 45; // months 
  const seasonsDate = new Map<number, DateTime>();
  for (let i = 0; i <= 10; i ++) {
    seasonsDate.set(i, startOfSeasons.plus({days: duration*i}));
  }

  const findCurrentSeason = () => {
    for (let i = 0; i < 10; i ++) {
        const seasonDate = seasonsDate.get(i);
        if (seasonDate &&  
          seasonDate.diffNow("days").days <= 0 &&
          seasonDate.diffNow("days").days > -45) {
                return {seasonNumber: i, seasonEndDate: seasonsDate.get(i+1)};
            }
    }
  }

  const curretSeason = findCurrentSeason();
  const seasonEndDate = curretSeason ? seasonsDate.get(curretSeason.seasonNumber) : undefined;

  const rankings = useAsyncFunction(
    async () => {
      const season = findCurrentSeason();
      const number = season?.seasonNumber;
      const startTime = !isUndefined(number) ? seasonsDate.get(number) : undefined;
      if (startTime) {
        const result = await getActivity({from: startTime.toSeconds()});
        return result.total;
      }
    },
    useMemo(() => undefined, [])
  );

  return useMemo(() => ({
    rankings,
    seasonEndDate,
    findCurrentSeason
  } as useRankingReturnType),
    [
      rankings,
      seasonEndDate,
      findCurrentSeason
    ]);
}

export default useRanking;