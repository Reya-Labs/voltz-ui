import { DateTime } from 'luxon';
type SEASON_IDS = 'og' | 's1' | 's2' | 's3' | 's4' | 's5';

export type Season = {
  id: SEASON_IDS;
  label: string;
  startDate: DateTime;
  endDate: DateTime;
};
