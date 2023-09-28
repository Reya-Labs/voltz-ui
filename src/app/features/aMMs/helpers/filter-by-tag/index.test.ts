import { PoolFilters } from '../../types';
import { filterByTag } from '.'; // Replace 'your-module' with the actual module name/path

describe('filterByTag', () => {
  let tags: { isV2: boolean; isBorrowing: boolean; isYield: boolean };
  let appliedFilters: Partial<PoolFilters>;

  beforeEach(() => {
    tags = {
      isV2: false,
      isBorrowing: false,
      isYield: false,
    };
    appliedFilters = {};
  });

  it('should return true when appliedFilters["v2"] is true and tags.isV2 is true', () => {
    appliedFilters['v2'] = true;
    tags.isV2 = true;
    expect(filterByTag(tags, appliedFilters as never)).toBe(true);
  });

  it('should return false when appliedFilters["v2"] is false and tags.isV2 is true', () => {
    appliedFilters['v2'] = false;
    tags.isV2 = true;
    expect(filterByTag(tags, appliedFilters as never)).toBe(false);
  });

  it('should return true when appliedFilters["borrow"] is true and tags.isBorrowing is true', () => {
    appliedFilters['borrow'] = true;
    tags.isBorrowing = true;
    expect(filterByTag(tags, appliedFilters as never)).toBe(true);
  });

  it('should return true when appliedFilters["yield"] is true and tags.isYield is true', () => {
    appliedFilters['yield'] = true;
    tags.isYield = true;
    expect(filterByTag(tags, appliedFilters as never)).toBe(true);
  });

  it('should return false when none of the conditions are met', () => {
    expect(filterByTag(tags, appliedFilters as never)).toBe(false);
  });

  it('should return false when appliedFilters["v2"] is true and tags.isV2 is false', () => {
    appliedFilters['v2'] = true;
    tags.isV2 = false;
    expect(filterByTag(tags, appliedFilters as never)).toBe(false);
  });

  it('should return false when appliedFilters["borrow"] is true and tags.isBorrowing is false', () => {
    appliedFilters['borrow'] = true;
    tags.isBorrowing = false;
    expect(filterByTag(tags, appliedFilters as never)).toBe(false);
  });

  it('should return false when appliedFilters["yield"] is true and tags.isYield is false', () => {
    appliedFilters['yield'] = true;
    tags.isYield = false;
    expect(filterByTag(tags, appliedFilters as never)).toBe(false);
  });

  it('should return false when appliedFilters["v2"] and appliedFilters["yield"] are true, but tags.isV2 and tags.isYield are false', () => {
    appliedFilters['v2'] = true;
    appliedFilters['yield'] = true;
    tags.isV2 = false;
    tags.isYield = false;
    expect(filterByTag(tags, appliedFilters as never)).toBe(false);
  });

  it('should return true when all filters are true and all tags are true', () => {
    appliedFilters['v2'] = true;
    appliedFilters['borrow'] = true;
    appliedFilters['yield'] = true;
    tags.isV2 = true;
    tags.isBorrowing = true;
    tags.isYield = true;
    expect(filterByTag(tags, appliedFilters as never)).toBe(true);
  });

  it('should return false when all filters are false and all tags are true', () => {
    appliedFilters['v2'] = false;
    appliedFilters['borrow'] = false;
    appliedFilters['yield'] = false;
    tags.isV2 = true;
    tags.isBorrowing = true;
    tags.isYield = true;
    expect(filterByTag(tags, appliedFilters as never)).toBe(false);
  });

  it('should return false when all filters are true and all tags are false', () => {
    appliedFilters['v2'] = true;
    appliedFilters['borrow'] = true;
    appliedFilters['yield'] = true;
    tags.isV2 = false;
    tags.isBorrowing = false;
    tags.isYield = false;
    expect(filterByTag(tags, appliedFilters as never)).toBe(false);
  });

  it('should return false when all filters are false and all tags are false', () => {
    appliedFilters['v2'] = false;
    appliedFilters['borrow'] = false;
    appliedFilters['yield'] = false;
    tags.isV2 = false;
    tags.isBorrowing = false;
    tags.isYield = false;
    expect(filterByTag(tags, appliedFilters as never)).toBe(false);
  });
});
