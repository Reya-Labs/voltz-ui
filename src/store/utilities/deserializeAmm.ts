import { providers } from 'ethers';
import { Token, RateOracle } from '@voltz/v1-sdk';

import { AugmentedAMM } from '@utilities';
import { SerializedAMM } from '../types';
import JSBI from 'jsbi';

const deserializeAmm = (
  serializedAmm: SerializedAMM,
  signer: providers.JsonRpcSigner,
): AugmentedAMM => {
  const {
    id,
    updatedTimestamp,
    fcmAddress,
    marginEngineAddress,
    termStartTimestamp,
    termEndTimestamp,
    tickSpacing,
    tick,
    rateOracle: {
      id: rateOracleAddress,
      protocolId,
      token: { id: tokenAddress, name: tokenName, decimals },
    },
    txCount,
  } = serializedAmm;
  const amm = new AugmentedAMM({
    id,
    signer,
    provider: providers.getDefaultProvider(process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK),
    environment: 'LOCALHOST_UI',
    updatedTimestamp: JSBI.BigInt(updatedTimestamp),
    fcmAddress,
    termStartTimestamp: JSBI.BigInt(termStartTimestamp),
    termEndTimestamp: JSBI.BigInt(termEndTimestamp),
    tick: parseInt(tick, 10),
    tickSpacing: parseInt(tickSpacing, 10),
    marginEngineAddress,
    rateOracle: new RateOracle({ id: rateOracleAddress, protocolId: parseInt(protocolId, 10) }),
    underlyingToken: new Token({
      id: tokenAddress,
      name: tokenName,
      decimals: parseInt(decimals, 10),
    }),
    txCount: parseInt(txCount, 10),
  });

  return amm;
};

export default deserializeAmm;
