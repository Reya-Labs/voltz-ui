import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { useCurrentSeason } from './index';

describe('useCurrentSeason', () => {
  test.each([
    [new Date('2021-10-10').valueOf(), 0],
    [new Date('2022-10-10').valueOf(), 1],
    [new Date('2023-03-03').valueOf(), 2],
    [new Date('2023-05-05').valueOf(), 3],
    [new Date('2030-05-05').valueOf(), 4],
  ])('given now=%p - useCurrentSeason should return expected output', (now, expectedSeasonId) => {
    expect(useCurrentSeason(SupportedChainId.mainnet, now).id).toEqual(expectedSeasonId);
  });
});
