type SortDirection = 'noSort' | 'ascending' | 'descending';
export const getNextSortDirection = (currentSort: SortDirection): SortDirection => {
  if (currentSort === 'noSort') {
    return 'ascending';
  }
  if (currentSort === 'ascending') {
    return 'descending';
  }
  if (currentSort === 'descending') {
    return 'ascending';
  }
  return 'noSort';
};
