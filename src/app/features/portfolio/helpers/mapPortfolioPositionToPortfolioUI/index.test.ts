import {
  generateAmmIdForRoute,
  generatePoolId,
  generatePositionIdForRoute,
} from '../../../../../utilities/amm';
import { formatPOSIXTimestamp } from '../../../../../utilities/date';
import { compactFormatToParts } from '../../../../../utilities/number';
import { mapPortfolioPositionToPortfolioUI } from '.';

// Mock the external dependencies
jest.mock('../../../../../utilities/amm');
jest.mock('../../../../../utilities/date');
jest.mock('../../../../../utilities/number');

describe('mapPortfolioPositionToPortfolioUI', () => {
  beforeEach(() => {
    // Clear mock function calls and implementations before each test
    jest.clearAllMocks();
  });

  it('should map the PortfolioPosition to PortfolioUI correctly', () => {
    // Mock the input data
    const position = {
      pool: {
        isV2: true,
        isBorrowing: false,
        market: 'Market',
        underlyingToken: {
          name: 'Token',
          priceUSD: 10,
        },
        termEndTimestampInMS: 123456789,
        termStartTimestampInMS: 987654321,
        chainId: 'ChainId',
      },
      notional: 100,
      margin: 50,
      type: 'Type',
      unrealizedPNL: 10,
      realizedPNLTotal: 20,
      realizedPNLFees: 5,
      realizedPNLCashflow: 8,
      creationTimestampInMS: 163456789,
      fixHigh: 0.8,
      fixLow: 0.2,
      poolCurrentFixedRate: 0.5,
      receiving: 0.6,
      paying: 0.4,
      health: 'Healthy',
      variant: 'Variant',
      id: 'PositionId',
    };

    // Mock the external utility functions
    (generateAmmIdForRoute as jest.Mock).mockReturnValue('MockedAmmId');
    (generatePoolId as jest.Mock).mockReturnValue('MockedPoolId');
    (generatePositionIdForRoute as jest.Mock).mockReturnValue('MockedPositionId');
    (formatPOSIXTimestamp as jest.Mock).mockReturnValue('MockedFormattedTimestamp');
    (compactFormatToParts as jest.Mock).mockImplementation(
      (value: number) => `MockedCompactFormat(${value})`,
    );

    // Call the function to be tested
    const result = mapPortfolioPositionToPortfolioUI(position as never);

    // Assertions
    expect(result).toEqual({
      creationTimestampInMS: 163456789,
      type: 'Type',
      market: 'Market',
      token: 'Token',
      isBorrowing: false,
      isV2: true,
      marginUSDCompactFormat: 'MockedCompactFormat(500)',
      marginUSD: 500,
      notionalUSDCompactFormat: 'MockedCompactFormat(1000)',
      notionalUSD: 1000,
      maturityEndTimestampInMS: 123456789,
      maturityStartTimestampInMS: 987654321,
      maturityFormatted: 'MockedFormattedTimestamp',
      id: 'PositionId',
      chainId: 'ChainId',
      routeAmmId: 'MockedAmmId',
      routePositionId: 'MockedPositionId',
      routePoolId: 'MockedPoolId',
      name: 'Type - Market - Token',
      status: {
        fixHigh: 80,
        fixLow: 20,
        currentFixed: 50,
        health: 'Healthy',
        receiving: 60,
        paying: 40,
        variant: 'Variant',
      },
      unrealizedPNLUSD: 100,
      unrealizedPNLUSDCompactFormat: 'MockedCompactFormat(100)',
      realizedPNLTotalUSD: 200,
      realizedPNLTotalUSDCompactFormat: 'MockedCompactFormat(200)',
      realizedPNLFeesUSD: 50,
      realizedPNLFeesUSDCompactFormat: 'MockedCompactFormat(50)',
      realizedPNLCashflowUSD: 80,
      realizedPNLCashflowUSDCompactFormat: 'MockedCompactFormat(80)',
    });

    // Ensure that the utility functions were called with the correct arguments
    expect(generateAmmIdForRoute).toHaveBeenCalledWith(position.pool);
    expect(generatePoolId).toHaveBeenCalledWith(position.pool);
    expect(generatePositionIdForRoute).toHaveBeenCalledWith(position);
    expect(formatPOSIXTimestamp).toHaveBeenCalledWith(position.pool.termEndTimestampInMS);
    expect(compactFormatToParts).toHaveBeenCalledWith(
      position.margin * position.pool.underlyingToken.priceUSD,
      2,
      2,
    );
    expect(compactFormatToParts).toHaveBeenCalledWith(
      position.notional * position.pool.underlyingToken.priceUSD,
      2,
      2,
    );
    expect(compactFormatToParts).toHaveBeenCalledWith(
      position.unrealizedPNL * position.pool.underlyingToken.priceUSD,
      2,
      2,
    );
    expect(compactFormatToParts).toHaveBeenCalledWith(
      position.realizedPNLTotal * position.pool.underlyingToken.priceUSD,
      2,
      2,
    );
    expect(compactFormatToParts).toHaveBeenCalledWith(
      position.realizedPNLFees * position.pool.underlyingToken.priceUSD,
      2,
      2,
    );
    expect(compactFormatToParts).toHaveBeenCalledWith(
      position.realizedPNLCashflow * position.pool.underlyingToken.priceUSD,
      2,
      2,
    );
  });
});
