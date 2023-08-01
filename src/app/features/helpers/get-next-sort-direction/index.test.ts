import { getNextSortDirection } from '.';

describe('getNextSortDirection', () => {
  it('should return "ascending" when currentSort is "noSort"', () => {
    expect(getNextSortDirection('noSort')).toBe('ascending');
  });

  it('should return "descending" when currentSort is "ascending"', () => {
    expect(getNextSortDirection('ascending')).toBe('descending');
  });

  it('should return "ascending" when currentSort is "descending"', () => {
    expect(getNextSortDirection('descending')).toBe('ascending');
  });

  it('should return "noSort" when currentSort is not "noSort", "ascending", or "descending"', () => {
    expect(getNextSortDirection('foo' as never)).toBe('noSort');
  });
});
