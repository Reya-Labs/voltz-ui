export const getRenderMode = (isClaiming: boolean | undefined, isInvite: boolean | undefined) => {
  return isClaiming ? 'claim' : isInvite ? 'invite' : 'ranking';
};
