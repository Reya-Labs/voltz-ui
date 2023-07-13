import { PoolFilters } from '../../types';
import { filterByTag } from '.'; // Replace 'your-module' with the actual module name/path

describe('filterByTag', () => {
  let amm: { market: { tags: { isV2: boolean; isBorrowing: boolean; isYield: boolean } } };
  let appliedFilters: Partial<PoolFilters>;

  beforeEach(() => {
    amm = {
      market: {
        tags: {
          isV2: false,
          isBorrowing: false,
          isYield: false,
        },
      },
    };
    appliedFilters = {};
  });

  test('should return true when appliedFilters["v2"] is true and amm.market.tags.isV2 is true', () => {
    appliedFilters['v2'] = true;
    amm.market.tags.isV2 = true;
    expect(filterByTag(amm as never, appliedFilters as never)).toBe(true);
  });

  test('should return false when appliedFilters["v2"] is false and amm.market.tags.isV2 is true', () => {
    appliedFilters['v2'] = false;
    amm.market.tags.isV2 = true;
    expect(filterByTag(amm as never, appliedFilters as never)).toBe(false);
  });

  test('should return true when appliedFilters["borrow"] is true and amm.market.tags.isBorrowing is true', () => {
    appliedFilters['borrow'] = true;
    amm.market.tags.isBorrowing = true;
    expect(filterByTag(amm as never, appliedFilters as never)).toBe(true);
  });

  test('should return true when appliedFilters["yield"] is true and amm.market.tags.isYield is true', () => {
    appliedFilters['yield'] = true;
    amm.market.tags.isYield = true;
    expect(filterByTag(amm as never, appliedFilters as never)).toBe(true);
  });

  test('should return false when none of the conditions are met', () => {
    expect(filterByTag(amm as never, appliedFilters as never)).toBe(false);
  });

  test('should return false when appliedFilters["v2"] is true and amm.market.tags.isV2 is false', () => {
    appliedFilters['v2'] = true;
    amm.market.tags.isV2 = false;
    expect(filterByTag(amm as never, appliedFilters as never)).toBe(false);
  });

  test('should return false when appliedFilters["borrow"] is true and amm.market.tags.isBorrowing is false', () => {
    appliedFilters['borrow'] = true;
    amm.market.tags.isBorrowing = false;
    expect(filterByTag(amm as never, appliedFilters as never)).toBe(false);
  });

  test('should return false when appliedFilters["yield"] is true and amm.market.tags.isYield is false', () => {
    appliedFilters['yield'] = true;
    amm.market.tags.isYield = false;
    expect(filterByTag(amm as never, appliedFilters as never)).toBe(false);
  });

  test('should return false when appliedFilters["v2"] and appliedFilters["yield"] are true, but amm.market.tags.isV2 and amm.market.tags.isYield are false', () => {
    appliedFilters['v2'] = true;
    appliedFilters['yield'] = true;
    amm.market.tags.isV2 = false;
    amm.market.tags.isYield = false;
    expect(filterByTag(amm as never, appliedFilters as never)).toBe(false);
  });

  test('should return true when all filters are true and all tags are true', () => {
    appliedFilters['v2'] = true;
    appliedFilters['borrow'] = true;
    appliedFilters['yield'] = true;
    amm.market.tags.isV2 = true;
    amm.market.tags.isBorrowing = true;
    amm.market.tags.isYield = true;
    expect(filterByTag(amm as never, appliedFilters as never)).toBe(true);
  });

  test('should return false when all filters are false and all tags are true', () => {
    appliedFilters['v2'] = false;
    appliedFilters['borrow'] = false;
    appliedFilters['yield'] = false;
    amm.market.tags.isV2 = true;
    amm.market.tags.isBorrowing = true;
    amm.market.tags.isYield = true;
    expect(filterByTag(amm as never, appliedFilters as never)).toBe(false);
  });

  test('should return false when all filters are true and all tags are false', () => {
    appliedFilters['v2'] = true;
    appliedFilters['borrow'] = true;
    appliedFilters['yield'] = true;
    amm.market.tags.isV2 = false;
    amm.market.tags.isBorrowing = false;
    amm.market.tags.isYield = false;
    expect(filterByTag(amm as never, appliedFilters as never)).toBe(false);
  });

  test('should return false when all filters are false and all tags are false', () => {
    appliedFilters['v2'] = false;
    appliedFilters['borrow'] = false;
    appliedFilters['yield'] = false;
    amm.market.tags.isV2 = false;
    amm.market.tags.isBorrowing = false;
    amm.market.tags.isYield = false;
    expect(filterByTag(amm as never, appliedFilters as never)).toBe(false);
  });
});
