import { ethers } from 'ethers';

// TODO: why is this generator function... Doesn't really make sense
function* getSigner(): Generator<ethers.providers.JsonRpcSigner | null> {
  return window.wallet?.signer || null;
}

export default getSigner;
