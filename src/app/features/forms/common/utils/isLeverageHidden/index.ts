import { AMM } from '@voltz-protocol/v1-sdk';

import { isV2AMM } from '../../../../../../utilities/amm';

export const isLeverageHidden = (amm: AMM | null) => {
  if (!amm) {
    return true;
  }

  return isV2AMM(amm);
};
