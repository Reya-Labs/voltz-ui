import { ethers } from 'ethers';

import { WindowWithEthereum } from '../types';

const getSigner = (): ethers.providers.JsonRpcSigner | null => {
  const ethereum = (window as WindowWithEthereum).ethererum;

  if (!ethereum) {
    return null;
  }

  const provider = new ethers.providers.Web3Provider(ethereum, 'any');

  return provider.getSigner();
};

export default getSigner;
