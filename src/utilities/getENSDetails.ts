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

  const provider = new ethers.providers.Web3Provider(window.ethereum as never);
  let name;
  try {
    name = await provider.lookupAddress(address);
  } catch (err) {
    name = null;
  }

  if (!name) {
    CACHED_ENS[address] = null;
    return null;
  }

  let resolver;
  try {
    resolver = await provider.getResolver(name);
  } catch (err) {
    resolver = null;
  }

  if (!resolver) {
    CACHED_ENS[address] = null;
    return null;
  }

  let avatar;
  try {
    avatar = await resolver?.getAvatar();
  } catch (err) {
    avatar = null;
  }

  const result = {
    name: name,
    avatarUrl: avatar?.url,
  };
  CACHED_ENS[address] = result;
  return result;
};
