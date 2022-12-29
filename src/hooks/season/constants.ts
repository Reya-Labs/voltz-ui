import { DateTime } from 'luxon';

import { Season } from './types';

export const SEASONS: Season[] = [
  {
    id: 0,
    label: 'Season OG',
    shortName: 'OG',
    startDate: DateTime.fromSQL('2022-06-01 00:00:00'),
    endDate: DateTime.fromSQL('2022-09-30 23:59:59'),
  },
  {
    id: 1,
    label: 'Season 01',
    shortName: '01',
    startDate: DateTime.fromSQL('2022-10-01 00:00:00'),
    endDate: DateTime.fromSQL('2022-12-31 11:59:59'),
  },
  {
    id: 2,
    label: 'Season 02',
    shortName: '02',
    startDate: DateTime.fromSQL('2022-12-31 12:00:00'),
    endDate: DateTime.fromSQL('2023-03-31 23:59:59'),
  },
  {
    id: 3,
    label: 'Season 03',
    shortName: '03',
    startDate: DateTime.fromSQL('2023-04-01 00:00:00'),
    endDate: DateTime.fromSQL('2023-06-30 23:59:59'),
  },
  {
    id: 4,
    label: 'Season 04',
    shortName: '04',
    startDate: DateTime.fromSQL('2023-07-01 00:00:00'),
    endDate: DateTime.fromSQL('2023-09-30 23:59:59'),
  },
  {
    id: 5,
    label: 'Season 05',
    shortName: '05',
    startDate: DateTime.fromSQL('2023-10-01 00:00:00'),
    endDate: DateTime.fromSQL('2023-12-31 23:59:59'),
  },
];
