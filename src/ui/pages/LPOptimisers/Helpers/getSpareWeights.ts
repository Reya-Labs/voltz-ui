export const getSpareWeights = (
  vaults: { vaultId: string }[],
  weights: { distribution: number }[],
): [string, number][] => {
  if (!(vaults.length === weights.length)) {
    return [];
  }

  const spareWeights = weights
    .map((w, index): [string, number] => [vaults[index].vaultId, w.distribution])
    .filter((w) => w[1] > 0);

  return spareWeights;
};
