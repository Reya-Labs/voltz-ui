import { DateTime } from 'luxon';

const seasons = new Map<number, DateTime>();
const SEASON_START_DATE = DateTime.fromISO('2022-08-01T16:03:44+00:00');
const SEASON_DURATION = 1; // months
const MAX_SEASONS = 10; // months

for (let i = 0; i <= MAX_SEASONS; i++) {
  seasons.set(i, SEASON_START_DATE.plus({ months: SEASON_DURATION * i }));
}

const useCurrentSeason = () => {
  for (let i = 0; i < 10; i++) {
    const seasonDate = seasons.get(i);
    if (
      seasonDate &&
      seasonDate.diffNow('days').days <= 0 &&
      seasonDate.diffNow('days').days > -30
    ) {
      return { seasonNumber: i + 1, seasonEndDate: seasons.get(i + 1) as DateTime };
    }
  }

  return undefined;
};

export default useCurrentSeason;
