import { ethers } from 'ethers';

import { WindowWithEthereum } from '../types';

function* getSigner() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const ethereum = (window as WindowWithEthereum).ethereum;

  if (!ethereum) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const provider = new ethers.providers.Web3Provider(ethereum, 'any');

  return provider.getSigner();
}

export default getSigner;
