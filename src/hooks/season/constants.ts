import { DateTime } from 'luxon';
import { Season } from './types';

export const SEASONS: Season[] = [
  {
    id: 'og',
    label: 'Season OG',
    startDate: DateTime.fromSQL('2022-06-01 00:00:00'),
    endDate: DateTime.fromSQL('2022-09-30 23:59:59'),
  },
  {
    id: 's1',
    label: 'Season 01',
    startDate: DateTime.fromSQL('2022-10-01 00:00:00'),
    endDate: DateTime.fromSQL('2022-12-31 23:59:59'),
  },
  {
    id: 's2',
    label: 'Season 02',
    startDate: DateTime.fromSQL('2023-01-01 00:00:00'),
    endDate: DateTime.fromSQL('2023-03-31 23:59:59'),
  },
  {
    id: 's3',
    label: 'Season 03',
    startDate: DateTime.fromSQL('2023-04-01 00:00:00'),
    endDate: DateTime.fromSQL('2023-06-30 23:59:59'),
  },
  {
    id: 's4',
    label: 'Season 04',
    startDate: DateTime.fromSQL('2023-07-01 00:00:00'),
    endDate: DateTime.fromSQL('2023-09-30 23:59:59'),
  },
  {
    id: 's5',
    label: 'Season 05',
    startDate: DateTime.fromSQL('2023-10-01 00:00:00'),
    endDate: DateTime.fromSQL('2023-12-31 23:59:59'),
  },
];
