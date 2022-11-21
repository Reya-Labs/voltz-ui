export const group = <T>(items: T[], m: number): T[][] => {
  const results: T[][] = [];
  let i = 0;
  while (i < items.length) {
    let j = 0;
    const tmp = [];
    while (j < m && i < items.length) {
      tmp.push(items[i]);
      i += 1;
      j += 1;
    }
    results.push(tmp);
  }

  return results;
};
