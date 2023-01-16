import { AMM, RateOracle, Token } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { SerializedAMM } from '../../../types';

const deserializeAmm = (serializedAmm: SerializedAMM, signer: providers.JsonRpcSigner): AMM => {
  const {
    id,
    factoryAddress,
    marginEngineAddress,
    termStartTimestampInMS,
    termEndTimestampInMS,
    tickSpacing,
    rateOracle: {
      id: rateOracleAddress,
      protocolId,
      token: { id: tokenAddress, name: tokenName, decimals },
    },
    wethAddress,
  } = serializedAmm;

  return new AMM({
    id,
    signer,
    provider: providers.getDefaultProvider(process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK),
    termStartTimestampInMS: parseInt(termStartTimestampInMS, 10),
    termEndTimestampInMS: parseInt(termEndTimestampInMS, 10),
    tickSpacing: parseInt(tickSpacing, 10),
    factoryAddress: factoryAddress || '0x',
    marginEngineAddress,
    rateOracle: new RateOracle({ id: rateOracleAddress, protocolId: parseInt(protocolId, 10) }),
    underlyingToken: new Token({
      id: tokenAddress,
      name: tokenName,
      decimals: parseInt(decimals, 10),
    }),
    wethAddress,
  });
};

export default deserializeAmm;