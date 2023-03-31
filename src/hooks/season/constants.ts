import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { DateTime } from 'luxon';

import { Season } from './types';

const ethSeasons: Season[] = [
  {
    id: 0,
    label: 'Season OG',
    shortName: 'OG',
    startDate: DateTime.fromSQL('2022-06-01 00:00:00', { zone: 'utc' }),
    endDate: DateTime.fromSQL('2022-09-30 23:59:59', { zone: 'utc' }),
    claimingEnabled: true,
  },
  {
    id: 1,
    label: 'Season 01',
    shortName: '01',
    startDate: DateTime.fromSQL('2022-10-01 00:00:00', { zone: 'utc' }),
    endDate: DateTime.fromSQL('2022-12-31 11:59:59', { zone: 'utc' }),
    claimingEnabled: true,
  },
  {
    id: 2,
    label: 'Season 02',
    shortName: '02',
    startDate: DateTime.fromSQL('2022-12-31 12:00:00', { zone: 'utc' }),
    endDate: DateTime.fromSQL('2023-03-30 23:59:59', { zone: 'utc' }),
    claimingEnabled: false,
  },
  {
    id: 3,
    label: 'Season 03',
    shortName: '03',
    startDate: DateTime.fromSQL('2023-03-31 00:00:00', { zone: 'utc' }),
    endDate: DateTime.fromSQL('2023-06-30 23:59:59', { zone: 'utc' }),
    claimingEnabled: false,
  },
  {
    id: 4,
    label: 'Season 04',
    shortName: '04',
    startDate: DateTime.fromSQL('2023-07-01 00:00:00', { zone: 'utc' }),
    endDate: DateTime.fromSQL('2023-09-30 23:59:59', { zone: 'utc' }),
    claimingEnabled: false,
  },
  {
    id: 5,
    label: 'Season 05',
    shortName: '05',
    startDate: DateTime.fromSQL('2023-10-01 00:00:00', { zone: 'utc' }),
    endDate: DateTime.fromSQL('2023-12-31 23:59:59', { zone: 'utc' }),
    claimingEnabled: false,
  },
];

const arbitrumSeasons: Season[] = [
  {
    id: 3,
    label: 'Season 03',
    shortName: '03',
    startDate: DateTime.fromSQL('2023-03-31 12:00:00', { zone: 'utc' }),
    endDate: DateTime.fromSQL('2023-06-30 23:59:59', { zone: 'utc' }),
    claimingEnabled: false,
  },
  {
    id: 4,
    label: 'Season 04',
    shortName: '04',
    startDate: DateTime.fromSQL('2023-07-01 00:00:00', { zone: 'utc' }),
    endDate: DateTime.fromSQL('2023-09-30 23:59:59', { zone: 'utc' }),
    claimingEnabled: false,
  },
  {
    id: 5,
    label: 'Season 05',
    shortName: '05',
    startDate: DateTime.fromSQL('2023-10-01 00:00:00', { zone: 'utc' }),
    endDate: DateTime.fromSQL('2023-12-31 23:59:59', { zone: 'utc' }),
    claimingEnabled: false,
  },
];

export const SEASONS: Record<SupportedChainId, Season[]> = {
  [SupportedChainId.arbitrum]: arbitrumSeasons,
  [SupportedChainId.arbitrumGoerli]: arbitrumSeasons,
  [SupportedChainId.goerli]: ethSeasons,
  [SupportedChainId.mainnet]: ethSeasons,
};
