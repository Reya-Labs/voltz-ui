import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { usePastSeasons } from './index';

describe('usePastSeasons', () => {
  test.each([
    [new Date('2021-10-10').valueOf(), []],
    [new Date('2022-10-10').valueOf(), [0]],
    [new Date('2023-03-03').valueOf(), [0, 1]],
    [new Date('2023-05-05').valueOf(), [0, 1, 2]],
    [new Date('2024-05-05').valueOf(), [0, 1, 2, 3, 4, 5]],
  ])('given now=%p - usePastSeasons should return expected output', (now, expectedSeasonIds) => {
    const retValue = usePastSeasons(SupportedChainId.mainnet, now).map((s) => s.id);
    expect(retValue).toEqual(expectedSeasonIds);
  });
});
