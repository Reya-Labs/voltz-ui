import { ethers } from 'ethers';

type ENSDetails = {
  name: string;
  avatarUrl?: string | null;
};

const CACHED_ENS: Record<string, ENSDetails | null> = {};

/**
 * It takes an Ethereum address and returns an object with the ENS name and avatar URL
 * @param {string | null} [address] - The address to look up.
 * @returns An object with the name and avatarUrl of the ENS address.
 */
export const getENSDetails = async (address?: string | null): Promise<ENSDetails | null> => {
  if (!address || !window.ethereum) {
    return null;
  }
  if (CACHED_ENS[address] !== undefined) {
    return CACHED_ENS[address];
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const name = await provider.lookupAddress(address);
  if (!name) {
    CACHED_ENS[address] = null;
    return null;
  }
  const resolver = await provider.getResolver(name);
  if (!resolver) {
    CACHED_ENS[address] = null;
    return null;
  }

  const avatar = await resolver?.getAvatar();
  const result = {
    name: name,
    avatarUrl: avatar?.url,
  };
  CACHED_ENS[address] = result;
  return result;
};
