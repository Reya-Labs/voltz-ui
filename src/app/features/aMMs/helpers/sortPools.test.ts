import { sortPools } from './sortPools';

describe('sortPools function', () => {
  describe('single property sort', () => {
    const pools = [
      {
        name: 'Market A - Token A',
        fixedAPRRate: 0.1,
        variableAPYRate: 0.1,
        maturityTimestampInMS: 1000,
      },
      {
        name: 'Market C - Token C',
        fixedAPRRate: 0.3,
        variableAPYRate: 0.3,
        maturityTimestampInMS: 3000,
      },
      {
        name: 'Market B - Token B',
        fixedAPRRate: 0.2,
        variableAPYRate: 0.2,
        maturityTimestampInMS: 2000,
      },
    ] as never;

    it('should sort by name in ascending order', () => {
      const sortedPools = sortPools(pools, {
        nameSortingDirection: 'ascending',
        fixedAPRSortingDirection: 'noSort',
        variableAPYSortingDirection: 'noSort',
        maturitySortingDirection: 'noSort',
      });

      expect(sortedPools[0]).toEqual(pools[0]);
      expect(sortedPools[1]).toEqual(pools[2]);
      expect(sortedPools[2]).toEqual(pools[1]);
    });

    it('should sort by name in descending order', () => {
      const sortedPools = sortPools(pools, {
        nameSortingDirection: 'descending',
        fixedAPRSortingDirection: 'noSort',
        variableAPYSortingDirection: 'noSort',
        maturitySortingDirection: 'noSort',
      });

      expect(sortedPools[0]).toEqual(pools[1]);
      expect(sortedPools[1]).toEqual(pools[2]);
      expect(sortedPools[2]).toEqual(pools[0]);
    });

    it('should sort by fixed APR in ascending order', () => {
      const sortedPools = sortPools(pools, {
        nameSortingDirection: 'noSort',
        fixedAPRSortingDirection: 'ascending',
        variableAPYSortingDirection: 'noSort',
        maturitySortingDirection: 'noSort',
      });

      expect(sortedPools[0]).toEqual(pools[0]);
      expect(sortedPools[1]).toEqual(pools[2]);
      expect(sortedPools[2]).toEqual(pools[1]);
    });

    it('should sort by fixed APR in descending order', () => {
      const sortedPools = sortPools(pools, {
        nameSortingDirection: 'noSort',
        fixedAPRSortingDirection: 'descending',
        variableAPYSortingDirection: 'noSort',
        maturitySortingDirection: 'noSort',
      });

      expect(sortedPools[0]).toEqual(pools[1]);
      expect(sortedPools[1]).toEqual(pools[2]);
      expect(sortedPools[2]).toEqual(pools[0]);
    });

    it('should sort by variable APY in ascending order', () => {
      const sortedPools = sortPools(pools, {
        nameSortingDirection: 'noSort',
        fixedAPRSortingDirection: 'noSort',
        variableAPYSortingDirection: 'ascending',
        maturitySortingDirection: 'noSort',
      });

      expect(sortedPools[0]).toEqual(pools[0]);
      expect(sortedPools[1]).toEqual(pools[2]);
      expect(sortedPools[2]).toEqual(pools[1]);
    });

    it('should sort by variable APY in descending order', () => {
      const sortedPools = sortPools(pools, {
        nameSortingDirection: 'noSort',
        fixedAPRSortingDirection: 'noSort',
        variableAPYSortingDirection: 'descending',
        maturitySortingDirection: 'noSort',
      });

      expect(sortedPools[0]).toEqual(pools[1]);
      expect(sortedPools[1]).toEqual(pools[2]);
      expect(sortedPools[2]).toEqual(pools[0]);
    });

    it('should sort by maturity timestamp in ascending order', () => {
      const sortedPools = sortPools(pools, {
        nameSortingDirection: 'noSort',
        fixedAPRSortingDirection: 'noSort',
        variableAPYSortingDirection: 'noSort',
        maturitySortingDirection: 'ascending',
      });

      expect(sortedPools[0]).toEqual(pools[0]);
      expect(sortedPools[1]).toEqual(pools[2]);
      expect(sortedPools[2]).toEqual(pools[1]);
    });

    it('should sort by maturity timestamp in descending order', () => {
      const sortedPools = sortPools(pools, {
        nameSortingDirection: 'noSort',
        fixedAPRSortingDirection: 'noSort',
        variableAPYSortingDirection: 'noSort',
        maturitySortingDirection: 'descending',
      });

      expect(sortedPools[0]).toEqual(pools[1]);
      expect(sortedPools[1]).toEqual(pools[2]);
      expect(sortedPools[2]).toEqual(pools[0]);
    });
  });

  describe('multiple property sort', () => {
    const pools = [
      {
        id: 0,
        name: 'Market A - Token A',
        fixedAPRRate: 0.1,
        variableAPYRate: 0.1,
        maturityTimestampInMS: 1000,
      },
      {
        id: 1,
        name: 'Market A - Token A',
        fixedAPRRate: 0.3,
        variableAPYRate: 0.3,
        maturityTimestampInMS: 1000,
      },
      {
        id: 2,
        name: 'Market B - Token B',
        fixedAPRRate: 0.2,
        variableAPYRate: 0.2,
        maturityTimestampInMS: 2000,
      },
      {
        id: 3,
        name: 'Market E - Token E',
        fixedAPRRate: 0.4,
        variableAPYRate: 0.4,
        maturityTimestampInMS: 4000,
      },
      {
        id: 4,
        name: 'Market D - Token D',
        fixedAPRRate: 0.6,
        variableAPYRate: 0.6,
        maturityTimestampInMS: 6000,
      },
      {
        id: 5,
        name: 'Market U - Token U',
        fixedAPRRate: 0.1,
        variableAPYRate: 0.2,
        maturityTimestampInMS: 3000,
      },
    ] as never;

    it('should sort by name ascending, fixedAPR descending, variableAPY ascending, maturity ascending', () => {
      const sortedPools = sortPools(pools, {
        nameSortingDirection: 'ascending',
        fixedAPRSortingDirection: 'descending',
        variableAPYSortingDirection: 'ascending',
        maturitySortingDirection: 'ascending',
      });

      expect(sortedPools[0]).toEqual(pools[1]);
      expect(sortedPools[1]).toEqual(pools[0]);
      expect(sortedPools[2]).toEqual(pools[2]);
      expect(sortedPools[3]).toEqual(pools[4]);
      expect(sortedPools[4]).toEqual(pools[3]);
      expect(sortedPools[5]).toEqual(pools[5]);
    });

    it('should sort by name descending, fixedAPR noSort, variableAPY ascending, maturity descending', () => {
      const sortedPools = sortPools(pools, {
        nameSortingDirection: 'descending',
        fixedAPRSortingDirection: 'noSort',
        variableAPYSortingDirection: 'ascending',
        maturitySortingDirection: 'descending',
      });

      expect(sortedPools[0]).toEqual(pools[5]);
      expect(sortedPools[1]).toEqual(pools[3]);
      expect(sortedPools[2]).toEqual(pools[4]);
      expect(sortedPools[3]).toEqual(pools[2]);
      expect(sortedPools[4]).toEqual(pools[0]);
      expect(sortedPools[5]).toEqual(pools[1]);
    });
  });
});
