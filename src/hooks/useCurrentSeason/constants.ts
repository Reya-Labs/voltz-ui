import { DateTime } from 'luxon';

const SEASON_START_DATE = process.env.REACT_APP_COMMUNITY_SEASON_START_DATE
  ? DateTime.fromISO(process.env.REACT_APP_COMMUNITY_SEASON_START_DATE)
  : DateTime.now();

export type Season = {
  id: number;
  startDate: DateTime;
  endDate: DateTime;
};

export const SEASONS: Season[] = [
  {
    id: 1,
    startDate: SEASON_START_DATE,
    endDate: DateTime.fromSQL('2022-12-31'),
  },
  {
    id: 2,
    startDate: DateTime.fromSQL('2023-01-01'),
    endDate: DateTime.fromSQL('2023-03-31'),
  },
  {
    id: 3,
    startDate: DateTime.fromSQL('2023-04-01'),
    endDate: DateTime.fromSQL('2023-06-30'),
  },
  {
    id: 4,
    startDate: DateTime.fromSQL('2023-07-01'),
    endDate: DateTime.fromSQL('2023-09-30'),
  },
  {
    id: 5,
    startDate: DateTime.fromSQL('2023-10-01'),
    endDate: DateTime.fromSQL('2023-12-31'),
  },
];
