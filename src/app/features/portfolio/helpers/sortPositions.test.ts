import { sortPositions } from './sortPositions';

describe('sortPositions function', () => {
  describe('single property sort', () => {
    const positions = [
      {
        notional: 1000,
        margin: 1000,
      },
      {
        notional: 3000,
        margin: 3000,
      },
      {
        notional: 2000,
        margin: 2000,
      },
    ] as never;

    it('should sort by margin in ascending order', () => {
      const sortedPools = sortPositions(positions, {
        marginSortingDirection: 'ascending',
        nameSortingDirection: 'noSort',
        statusSortingDirection: 'noSort',
        unrealizedPNLSortingDirection: 'noSort',
        maturitySortingDirection: 'noSort',
        realizedPNLSortingDirection: 'noSort',
        notionalSortingDirection: 'noSort',
      });

      expect(sortedPools[0]).toEqual(positions[0]);
      expect(sortedPools[1]).toEqual(positions[2]);
      expect(sortedPools[2]).toEqual(positions[1]);
    });

    it('should sort by margin in descending order', () => {
      const sortedPools = sortPositions(positions, {
        marginSortingDirection: 'descending',
        nameSortingDirection: 'noSort',
        statusSortingDirection: 'noSort',
        unrealizedPNLSortingDirection: 'noSort',
        maturitySortingDirection: 'noSort',
        realizedPNLSortingDirection: 'noSort',
        notionalSortingDirection: 'noSort',
      });

      expect(sortedPools[0]).toEqual(positions[1]);
      expect(sortedPools[1]).toEqual(positions[2]);
      expect(sortedPools[2]).toEqual(positions[0]);
    });

    it('should sort by notional in ascending order', () => {
      const sortedPools = sortPositions(positions, {
        notionalSortingDirection: 'ascending',
        marginSortingDirection: 'noSort',
        nameSortingDirection: 'noSort',
        statusSortingDirection: 'noSort',
        unrealizedPNLSortingDirection: 'noSort',
        maturitySortingDirection: 'noSort',
        realizedPNLSortingDirection: 'noSort',
      });

      expect(sortedPools[0]).toEqual(positions[0]);
      expect(sortedPools[1]).toEqual(positions[2]);
      expect(sortedPools[2]).toEqual(positions[1]);
    });

    it('should sort by notional in descending order', () => {
      const sortedPools = sortPositions(positions, {
        notionalSortingDirection: 'descending',
        marginSortingDirection: 'noSort',
        nameSortingDirection: 'noSort',
        statusSortingDirection: 'noSort',
        unrealizedPNLSortingDirection: 'noSort',
        maturitySortingDirection: 'noSort',
        realizedPNLSortingDirection: 'noSort',
      });

      expect(sortedPools[0]).toEqual(positions[1]);
      expect(sortedPools[1]).toEqual(positions[2]);
      expect(sortedPools[2]).toEqual(positions[0]);
    });
  });
});
