import { WindowWithWallet } from '../types';

function* getSigner() {
  return (window as WindowWithWallet).wallet?.signer || null;
}

export default getSigner;
