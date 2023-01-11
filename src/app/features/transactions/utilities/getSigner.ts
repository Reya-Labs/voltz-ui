import { ethers } from 'ethers';

export function getSigner(): ethers.providers.JsonRpcSigner | null {
  return window.wallet?.signer || null;
}
