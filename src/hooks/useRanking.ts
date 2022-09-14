import { useMemo } from "react";
import useAsyncFunction, { UseAsyncFunctionResult } from "./useAsyncFunction";
import { DateTime } from "luxon";
import { getActivity } from "@graphql";
import { Wallet } from "@contexts";
import { isUndefined } from "lodash";
import { redeemBadge } from '@voltz-protocol/v1-sdk/src/entities/badges';

export type useRankingReturnType = {
  rankings: UseAsyncFunctionResult<unknown, Map<string, number> | void>;
  claimStatic: UseAsyncFunctionResult<unknown, boolean | void>;
  //claim: UseAsyncFunctionResult<unknown, Map<string, number> | void>;
  seasonEndDate: DateTime | undefined;
  findCurrentSeason: (now: DateTime) => {seasonNumber: number, seasonEndDate: DateTime};
}

export const useRanking = (wallet: Wallet) => {

  const startOfSeasons = DateTime.fromISO("2022-08-01T16:03:44+00:00"); 
  const duration = 1; // months 
  const seasonsDate = new Map<number, DateTime>();
  for (let i = 0; i <= 10; i ++) {
    seasonsDate.set(i, startOfSeasons.plus({months: duration*i}));
  }

  const findCurrentSeason = () => {
    for (let i = 0; i < 10; i ++) {
        const seasonDate = seasonsDate.get(i);
        if (seasonDate &&  
          seasonDate.diffNow("days").days <= 0 &&
          seasonDate.diffNow("days").days > -30) {
                return {seasonNumber: i, seasonEndDate: seasonsDate.get(i+1)};
            }
    }
  }

  const claimStatic = useAsyncFunction(
    async () => {
      const season =  findCurrentSeason();
      if(season && wallet.signer){
        const result = await redeemBadge("", wallet.signer, "S"+season.toString(), true);
        return result.status === "SUCCESS";
      }
      return false;
    },
    useMemo(() => undefined, [])
  );


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
    claimStatic,
    seasonEndDate,
    findCurrentSeason
  } as useRankingReturnType),
    [
      rankings,
      claimStatic,
      seasonEndDate,
      findCurrentSeason
    ]);
}

export default useRanking;