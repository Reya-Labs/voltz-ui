import { AMM, NetworkConfiguration, Position } from '@voltz-protocol/v1-sdk';

/**
 * Returns the current positions that the user has for the given amm
 * @param positions - the array of positions the user has
 * @param selectedAmmId - the selected amm id
 */
export const findCurrentPositionsLp = (positions: Position[], selectedAmmId: string) => {
  return (positions || []).filter((p) => {
    return p.amm.id === selectedAmmId;
  });
};

/**
 * Returns the current position that the user has for the given amm
 * @param positions - the array of positions the user has
 * @param selectedAmmId - the selected amm id
 */
export const findCurrentPosition = (positions: Position[], selectedAmmId: string) => {
  return (positions || []).find((p) => {
    return p.amm.id === selectedAmmId;
  });
};

/**
 * Finds the latest amm that corresponds to the given position.
 * Please note that the returned amm will be for the latest pool, whereas the position amm may correspond to an old (matured) pool.
 * @param amms - the array of available pools
 * @param pools - The pools object from the network configuration.
 * @param selectedPosition - the selected position to find the current amm for
 */
export const findCurrentAmm = (
  amms: AMM[] = [],
  pools: NetworkConfiguration['pools'] = [],
  selectedPosition: Position,
) => {
  // First see if there's strong preference for some rollover pool
  const pool = pools.find((p) => p.id.toLowerCase() === selectedPosition.amm.id.toLowerCase());

  if (pool && pool.rollover) {
    const customRollover = pool.rollover;
    return amms.find((amm) => amm.id.toLowerCase() === customRollover.toLowerCase());
  }

  // Otherwise, find pools that match rate oracle and underlying token
  const matchingAMMs = (amms || []).filter((amm) => {
    return (
      amm.rateOracle.id === selectedPosition.amm.rateOracle.id && // check that these are from the same source - rocket, lido etc
      amm.underlyingToken.id === selectedPosition.amm.underlyingToken.id && // check that the tokens match - aDAI !== aUSDC
      +amm.endDateTime - Date.now() >= 24 * (1000 * 60 * 60) // Has at least 24 hours until it matures
    );
  });

  // There could be multiple pools that match. Find the one with the latest end time
  if (matchingAMMs.length > 0) {
    matchingAMMs.sort((a, b) => +a.endDateTime - +b.endDateTime);
    return matchingAMMs.pop();
  }

  return undefined;
};

/**
 * Returns AMM pool name and includes borrowing tag
 * @param amm - the amm
 */
export const getAmmProtocol = (amm: AMM) => {
  return amm.protocol + (amm.market.tags.isBorrowing ? '_borrow' : '');
};

export const getProtocolName = (protocolId: number): string => {
  switch (protocolId) {
    case 1: {
      return 'aave';
    }
    case 2: {
      return 'compound';
    }
    case 3: {
      return 'lido';
    }
    case 4: {
      return 'rocket';
    }
    case 5: {
      return 'aaveBorrowing';
    }
    case 6: {
      return 'compoundBorrowing';
    }
    case 7: {
      return 'aaveV3';
    }
    case 8: {
      return 'gmxGlp';
    }
    case 9: {
      return 'aaveV3Borrowing';
    }
    case 10: {
      return 'sofr';
    }
    default:
      throw new Error('Not supported protocolId');
  }
};

export const generatePoolId = (amm: {
  rateOracle: {
    protocolId: number;
  };
  underlyingToken: {
    name: string;
  };
  termEndTimestampInMS: number;
}) => {
  const timestamp = new Date(amm.termEndTimestampInMS).toISOString().split('T')[0];

  return `${getProtocolName(
    amm.rateOracle.protocolId,
  ).toLowerCase()}-${amm.underlyingToken.name.toLowerCase()}-${timestamp}`;
};

export const generateAmmIdForRoute = (amm: { id: string }) => {
  return amm.id.toLowerCase().substring(amm.id.length - 4);
};

export const generatePositionIdForRoute = (position: { id: string }) => {
  const trimmed = position.id.trim();
  const [info1, info2, info3] = trimmed.toLowerCase().split('_');
  const id = [info1, info2, info3].map((i) => i.trim().substring(i.length - 4)).join('');
  return id.replace('#', '_');
};

export const isV2AMM = (amm: AMM) => {
  return amm.market.tags.isV2;
};
