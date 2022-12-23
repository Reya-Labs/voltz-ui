import { AMM } from '@voltz-protocol/v1-sdk';

import { SerializedAMM } from '../../../types';

const serializeAmm = (amm: AMM): SerializedAMM => ({
  id: amm.id,
  factoryAddress: amm.factoryAddress,
  marginEngineAddress: amm.marginEngineAddress,
  termStartTimestamp: amm.termStartTimestamp.toString(),
  termEndTimestamp: amm.termEndTimestamp.toString(),
  tickSpacing: amm.tickSpacing.toString(),
  rateOracle: {
    id: amm.rateOracle.id,
    protocolId: amm.rateOracle.protocolId.toString(),
    token: {
      id: amm.underlyingToken.id || 'id',
      name: amm.underlyingToken.name || 'token',
      decimals: amm.underlyingToken.decimals.toString(),
    },
  },
  wethAddress: amm.wethAddress,
});

export default serializeAmm;
