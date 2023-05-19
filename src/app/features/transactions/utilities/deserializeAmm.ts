import { AMM, getProvider, RateOracle, Token } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { getAlchemyKey } from '../../../../utilities/getAlchemyKey';
import { getInfuraKey } from '../../../../utilities/getInfuraKey';
import { SerializedAMM } from '../../../types';

export const deserializeAmm = (
  serializedAmm: SerializedAMM,
  signer: providers.JsonRpcSigner,
): AMM => {
  const {
    id,
    peripheryAddress,
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
    minLeverageAllowed,
    chainId,
    traderVisible,
    traderWithdrawable,
  } = serializedAmm;

  return new AMM({
    id,
    signer,
    provider: getProvider(chainId, getAlchemyKey(), getInfuraKey()),
    termStartTimestampInMS: parseInt(termStartTimestampInMS, 10),
    termEndTimestampInMS: parseInt(termEndTimestampInMS, 10),
    tickSpacing: parseInt(tickSpacing, 10),
    peripheryAddress: peripheryAddress,
    factoryAddress: factoryAddress,
    marginEngineAddress,
    rateOracle: new RateOracle({ id: rateOracleAddress, protocolId: parseInt(protocolId, 10) }),
    underlyingToken: new Token({
      id: tokenAddress,
      name: tokenName,
      decimals: parseInt(decimals, 10),
    }),
    wethAddress,
    minLeverageAllowed,
    chainId,
    traderVisible,
    traderWithdrawable,
  });
};
