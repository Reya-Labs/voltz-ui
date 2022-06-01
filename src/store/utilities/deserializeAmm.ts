import { providers } from 'ethers';
import { Token, RateOracle } from '@voltz-protocol/v1-sdk';

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
    factoryAddress,
    peripheryAddress,
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
    totalLiquidity,
    totalNotionalTraded
  } = serializedAmm;
  const amm = new AugmentedAMM({
    id,
    signer,
    provider: providers.getDefaultProvider(process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK),
    environment: process.env.REACT_APP_DECODING_TAG || 'NO_ENV',
    updatedTimestamp: JSBI.BigInt(updatedTimestamp),
    fcmAddress,
    termStartTimestamp: JSBI.BigInt(termStartTimestamp),
    termEndTimestamp: JSBI.BigInt(termEndTimestamp),
    tick: parseInt(tick, 10),
    tickSpacing: parseInt(tickSpacing, 10),
    factoryAddress: factoryAddress || "0x",
    peripheryAddress: peripheryAddress || "0x",
    marginEngineAddress,
    rateOracle: new RateOracle({ id: rateOracleAddress, protocolId: parseInt(protocolId, 10) }),
    underlyingToken: new Token({
      id: tokenAddress,
      name: tokenName,
      decimals: parseInt(decimals, 10),
    }),
    txCount: parseInt(txCount, 10),
    totalNotionalTraded: JSBI.BigInt(totalNotionalTraded),
    totalLiquidity: JSBI.BigInt(totalLiquidity),
  });

  return amm;
};

export default deserializeAmm;
