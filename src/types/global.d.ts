/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';

export {};

declare global {
  interface Window {
    dataLayer?: {
      push: (payload?: any) => void;
    };
    wallet?: {
      provider: ethers.providers.Web3Provider;
      signer: ethers.providers.JsonRpcSigner;
    };
  }
}
