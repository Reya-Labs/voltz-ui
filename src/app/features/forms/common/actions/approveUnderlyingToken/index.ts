import { approvePeriphery } from '@voltz-protocol/sdk-v1-stateless';
import { approvePeriphery as approvePeripheryV2 } from '@voltz-protocol/sdk-v2';
import { AMM } from '@voltz-protocol/v1-sdk';
import { Signer } from 'ethers';

import { isV2AMM } from '../../../../../../utilities/amm';
import { isV1StatelessEnabled } from '../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';

export const approveUnderlyingToken = async ({
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
    await approvePeripheryV2({
      signer,
      ammId: amm.id,
    });
    // todo: FB remove 0 after SDKs are fixed
    return 0;
  } else {
    if (isV1StatelessEnabled()) {
      await approvePeriphery({
        signer,
        ammId: amm.id,
      });
      // todo: FB remove 0 after SDKs are fixed
      return 0;
    } else {
      return await amm.approveUnderlyingTokenForPeripheryV1();
    }
  }
};
