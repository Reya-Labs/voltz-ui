import { getBalance } from '@voltz-protocol/sdk-v1-stateless';
import { getBalance as getBalanceV2 } from '@voltz-protocol/sdk-v2';
import { AMM } from '@voltz-protocol/v1-sdk';
import { Signer } from 'ethers';

import { isV2AMM } from '../../../../../../utilities/amm';
import { isV1StatelessEnabled } from '../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';

export const getWalletBalanceService = async ({
  amm,
  signer,
}: {
  amm: AMM;
  signer: Signer;
}): Promise<number> => {
  if (!amm || !signer) {
    return 0;
  }
  if (isV2AMM(amm)) {
    return await getBalanceV2({
      ammId: amm.id,
      signer,
    });
  } else {
    if (isV1StatelessEnabled()) {
      return await getBalance({
        ammId: amm.id,
        signer,
      });
    } else {
      return await amm.underlyingTokens();
    }
  }
};
