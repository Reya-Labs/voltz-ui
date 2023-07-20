import { updateMargin } from '@voltz-protocol/sdk-v1-stateless';
import { updateMargin as updateMarginV2 } from '@voltz-protocol/sdk-v2';
import { AMM } from '@voltz-protocol/v1-sdk';
import { ContractReceipt, Signer } from 'ethers';

import { isV2AMM } from '../../../../../../utilities/amm';
import { isV1StatelessEnabled } from '../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';

export const updateMarginService = async ({
  amm,
  signer,
  positionId,
  margin,
  fixedHigh,
  fixedLow,
}: {
  amm: AMM;
  signer: Signer;
  positionId: string;
  margin: number;
  fixedLow: number;
  fixedHigh: number;
}): Promise<ContractReceipt> => {
  if (isV2AMM(amm)) {
    return await updateMarginV2({
      positionId,
      signer,
      margin,
    });
  } else {
    if (isV1StatelessEnabled()) {
      return await updateMargin({
        positionId,
        signer,
        margin,
      });
    } else {
      return await amm.updatePositionMargin({
        fixedLow,
        fixedHigh,
        marginDelta: margin,
      });
    }
  }
};
