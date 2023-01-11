import jazzicon from '@metamask/jazzicon';

import { encodeSvg } from '../encodeSvg';

type ResolveAvatarParam = {
  address?: string | null;
  size: number;
};
const CACHE: Record<string, string> = {};

/*
 * A function that takes in an address and a size and returns a string.
 * It's generating a unique metamask avatar for a given address using the algorithm taken from metamask repo.
 */
export const getMetamaskAvatar = (payload: ResolveAvatarParam) => {
  const { address, size } = payload;
  if (!address || address.length !== 42) {
    return '';
  }
  const cacheId = `${size}-${address}`;
  if (CACHE[cacheId]) {
    return CACHE[cacheId];
  }
  // https://github.com/MetaMask/metamask-filecoin-developer-beta/blob/4ec4bf9995e64bfb0eb732cbe10ae2f2bac2ddff/ui/lib/icon-factory.js#L65
  const seed = parseInt(address.slice(2, 10), 16);
  const divWithSvg = jazzicon(size, seed);

  const svg = divWithSvg.firstChild;
  if (!svg) {
    return;
  }
  const xmlSerializer = new XMLSerializer();
  const str = xmlSerializer.serializeToString(svg);
  const dataUrl = `data:image/svg+xml,${encodeSvg(str)}`;
  CACHE[cacheId] = dataUrl;
  return dataUrl;
};
