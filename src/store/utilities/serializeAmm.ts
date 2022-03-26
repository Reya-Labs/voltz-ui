import { AugmentedAMM } from '@hooks';
import { SerializedAMM } from '../types';

const serializeAmm = (amm: AugmentedAMM): SerializedAMM => ({
  id: amm.id,
  createdTimestamp: amm.createdTimestamp.toString(),
  updatedTimestamp: amm.updatedTimestamp.toString(),
  fcmAddress: amm.fcmAddress,
  marginEngineAddress: amm.marginEngineAddress,
  termStartTimestamp: amm.termEndTimestamp.toString(),
  termEndTimestamp: amm.termEndTimestamp.toString(),
  tickSpacing: amm.tickSpacing.toString(),
  sqrtPriceX96: amm.sqrtPriceX96.toString(),
  liquidity: amm.liquidity.toString(),
  tick: amm.tick.toString(),
  txCount: amm.txCount.toString(),
  rateOracle: {
    id: amm.rateOracle.id,
    protocolId: amm.rateOracle.protocol,
    token: {
      id: amm.underlyingToken.id || 'id',
      name: amm.underlyingToken.name || 'token',
      decimals: amm.underlyingToken.decimals.toString(),
    },
  },
});

export default serializeAmm;
