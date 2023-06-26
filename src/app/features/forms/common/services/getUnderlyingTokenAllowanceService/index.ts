import { getAllowanceToPeriphery } from '@voltz-protocol/sdk-v1-stateless';
import { getAllowanceToPeriphery as getAllowanceToPeripheryV2 } from '@voltz-protocol/sdk-v2';
import { AMM, SupportedChainId } from '@voltz-protocol/v1-sdk';
import { Signer } from 'ethers';

import { isV2AMM } from '../../../../../../utilities/amm';
import { getAlchemyKey } from '../../../../../../utilities/getAlchemyKey';
import { getInfuraKey } from '../../../../../../utilities/getInfuraKey';
import { isV1StatelessEnabled } from '../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';

export const getUnderlyingTokenAllowanceService = async ({
  amm,
  signer,
  chainId,
}: {
  amm: AMM;
  signer: Signer;
  chainId: SupportedChainId;
}): Promise<number> => {
  if (!amm || !signer) {
    return 0;
  }
  if (isV2AMM(amm)) {
    return await getAllowanceToPeripheryV2({
      ammId: amm.id,
      signer,
    });
  } else {
    if (isV1StatelessEnabled()) {
      return await getAllowanceToPeriphery({
        ammId: amm.id,
        signer,
      });
    } else {
      return await amm.getUnderlyingTokenAllowance({
        forceErc20Check: false,
        chainId,
        alchemyApiKey: getAlchemyKey(),
        infuraApiKey: getInfuraKey(),
      });
    }
  }
};
