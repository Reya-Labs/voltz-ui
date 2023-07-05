import { isLeverageHidden } from '.';

describe('isLeverageHidden', () => {
  it('should return true if AMM is null', () => {
    const result = isLeverageHidden(null);
    expect(result).toBe(true);
  });

  it('should return true if AMM is a v2 AMM', () => {
    const amm = {
      market: {
        tags: {
          isV2: true,
        },
      },
    };
    const result = isLeverageHidden(amm as never);
    expect(result).toBe(true);
  });

  it('should return false if AMM is not a v2 AMM', () => {
    const amm = {
      market: {
        tags: {
          isV2: false,
        },
      },
    };
    const result = isLeverageHidden(amm as never);
    expect(result).toBe(false);
  });
});
