
export const getRenderMode = (isClaiming: boolean | undefined) => {
  return isClaiming ? "claim": 'ranking';
};