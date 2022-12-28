import { ethers } from 'ethers';

type ENSDetails = {
  name: string;
  avatarUrl?: string | null;
};

const CACHED_ENS: Record<string, ENSDetails | null> = {};

/**
 * It takes an Ethereum address and returns an object with the ENS name and avatar URL
 * @param {string | null} [address] - The address to look up.
 * @param {unknown} web3Provider - This is the web3 provider that you're using. If
 * you're using Metamask, this is window.ethereum.
 */
export const getENSDetails = async (
  address: string | null = '',
  web3Provider: unknown = window.ethereum,
): Promise<ENSDetails | null> => {
  if (!address || !web3Provider) {
    return null;
  }
  if (CACHED_ENS[address] !== undefined) {
    return CACHED_ENS[address];
  }

  const provider = new ethers.providers.Web3Provider(web3Provider as never);
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
    avatar = await resolver.getAvatar();
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
