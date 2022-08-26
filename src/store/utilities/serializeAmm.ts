import { AugmentedAMM } from '@utilities';
import { SerializedAMM } from '../types';

const serializeAmm = (amm: AugmentedAMM): SerializedAMM => ({
  id: amm.id,
  updatedTimestamp: amm.updatedTimestamp.toString(),
  factoryAddress: amm.factoryAddress,
  fcmAddress: amm.fcmAddress,
  marginEngineAddress: amm.marginEngineAddress,
  termStartTimestamp: amm.termStartTimestamp.toString(),
  termEndTimestamp: amm.termEndTimestamp.toString(),
  tickSpacing: amm.tickSpacing.toString(),
  tick: amm.tick.toString(),
  txCount: amm.txCount.toString(),
  rateOracle: {
    id: amm.rateOracle.id,
    protocolId: amm.rateOracle.protocolId.toString(),
    token: {
      id: amm.underlyingToken.id || 'id',
      name: amm.underlyingToken.name || 'token',
      decimals: amm.underlyingToken.decimals.toString(),
    },
  },
  totalLiquidity: amm.totalLiquidity.toString(),
  totalNotionalTraded: amm.totalNotionalTraded.toString(),
});

export default serializeAmm;
