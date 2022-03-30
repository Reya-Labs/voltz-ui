import { ethers } from 'ethers';

import { WindowWithEthereum } from '../types';

function* getSigner() {
  const ethereum = (window as WindowWithEthereum).ethereum;

  if (!ethereum) {
    return null;
  }

  const provider = new ethers.providers.Web3Provider(ethereum, 'any');

  return provider.getSigner();
}

export default getSigner;
