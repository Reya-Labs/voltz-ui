import { AMM } from '@voltz-protocol/v1-sdk';

import { SerializedAMM } from '../../../types';

const serializeAmm = (amm: AMM): SerializedAMM => ({
  id: amm.id,
  peripheryAddress: amm.peripheryAddress,
  factoryAddress: amm.factoryAddress,
  marginEngineAddress: amm.marginEngineAddress,
  termStartTimestampInMS: amm.termStartTimestampInMS.toString(),
  termEndTimestampInMS: amm.termEndTimestampInMS.toString(),
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
  minLeverageAllowed: amm.minLeverageAllowed,
});

export default serializeAmm;
