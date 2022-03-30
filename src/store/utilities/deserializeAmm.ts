import { providers } from 'ethers';
import { Token, RateOracle } from '@voltz/v1-sdk';

import { AugmentedAMM } from '@utilities';
import { SerializedAMM } from '../types';

const deserializeAmm = (
  serializedAmm: SerializedAMM,
  signer: providers.JsonRpcSigner,
): AugmentedAMM => {
  const {
    rateOracle: {
      id: rateOracleAddress,
      protocolId,
      token: { id: tokenAddress, name: tokenName, decimals },
    },
    ...rest
  } = serializedAmm;
  const amm = new AugmentedAMM({
    signer,
    provider: providers.getDefaultProvider(process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK),
    rateOracle: new RateOracle({ id: rateOracleAddress, protocolId: protocolId as number }),
    underlyingToken: new Token({
      id: tokenAddress,
      name: tokenName,
      decimals: decimals as number,
    }),
    ...rest,
  });

  return amm;
};

export default deserializeAmm;
