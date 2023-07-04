import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { Season } from './types';

function getUTCTimestampFromString(str: string): number {
  const [datePart, timePart] = str.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute, second] = timePart.split(':').map(Number);

  return new Date(Date.UTC(year, month - 1, day, hour, minute, second)).valueOf();
}

const ethSeasons: Season[] = [
  {
    id: 0,
    label: 'Season OG',
    shortName: 'OG',
    startDate: getUTCTimestampFromString('2022-06-01 00:00:00'),
    endDate: getUTCTimestampFromString('2022-09-30 23:59:59'),
    claimingEnabled: true,
  },
  {
    id: 1,
    label: 'Season 01',
    shortName: '01',
    startDate: getUTCTimestampFromString('2022-10-01 00:00:00'),
    endDate: getUTCTimestampFromString('2022-12-31 11:59:59'),
    claimingEnabled: true,
  },
  {
    id: 2,
    label: 'Season 02',
    shortName: '02',
    startDate: getUTCTimestampFromString('2022-12-31 12:00:00'),
    endDate: getUTCTimestampFromString('2023-03-30 23:59:59'),
    claimingEnabled: true,
  },
  {
    id: 3,
    label: 'Season 03',
    shortName: '03',
    startDate: getUTCTimestampFromString('2023-03-31 00:00:00'),
    endDate: getUTCTimestampFromString('2023-06-30 11:29:59'),
    claimingEnabled: false,
  },
  {
    id: 4,
    label: 'Season 04',
    shortName: '04',
    startDate: getUTCTimestampFromString('2023-06-30 11:30:00'),
    endDate: getUTCTimestampFromString('2023-09-30 12:00:00'),
    claimingEnabled: false,
  },
  {
    id: 5,
    label: 'Season 05',
    shortName: '05',
    startDate: getUTCTimestampFromString('2023-09-30 12:00:01'),
    endDate: getUTCTimestampFromString('2023-12-31 23:59:59'),
    claimingEnabled: false,
  },
];

const arbitrumSeasons: Season[] = [
  {
    id: 3,
    label: 'Season 03',
    shortName: '03',
    startDate: getUTCTimestampFromString('2023-03-31 00:00:00'),
    endDate: getUTCTimestampFromString('2023-06-30 11:29:59'),
    claimingEnabled: false,
  },
  {
    id: 4,
    label: 'Season 04',
    shortName: '04',
    startDate: getUTCTimestampFromString('2023-06-30 11:30:00'),
    endDate: getUTCTimestampFromString('2023-09-30 12:00:00'),
    claimingEnabled: false,
  },
  {
    id: 5,
    label: 'Season 05',
    shortName: '05',
    startDate: getUTCTimestampFromString('2023-09-30 12:00:01'),
    endDate: getUTCTimestampFromString('2023-12-31 23:59:59'),
    claimingEnabled: false,
  },
];
const avalancheSeasons: Season[] = [];
const spruceSeasons: Season[] = [];
export const SEASONS: Record<SupportedChainId, Season[]> = {
  [SupportedChainId.arbitrum]: arbitrumSeasons,
  [SupportedChainId.arbitrumGoerli]: arbitrumSeasons,
  [SupportedChainId.goerli]: ethSeasons,
  [SupportedChainId.mainnet]: ethSeasons,
  [SupportedChainId.avalanche]: avalancheSeasons,
  [SupportedChainId.avalancheFuji]: avalancheSeasons,
  [SupportedChainId.spruce]: spruceSeasons,
};
