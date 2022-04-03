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
    txCount,
    ...rest
  } = serializedAmm;
  const amm = new AugmentedAMM({
    signer,
    provider: providers.getDefaultProvider(process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK),
    rateOracle: new RateOracle({ id: rateOracleAddress, protocolId: parseInt(protocolId, 10) }),
    underlyingToken: new Token({
      id: tokenAddress,
      name: tokenName,
      decimals: parseInt(decimals, 10),
    }),
    txCount: parseInt(txCount, 10),
    ...rest,
  });

  return amm;
};

export default deserializeAmm;
