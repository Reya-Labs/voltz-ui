import { getEditPositionTokenBalance } from '.';

describe('getEditPositionTokenBalance', () => {
  it('should return the correct token balance when there is a position and a prospective swap', () => {
    const state = {
      position: {
        status: 'success',
        value: {
          variableTokenBalance: 200,
        },
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'success',
          value: {
            variableTokenDeltaBalance: 100,
          },
        },
      },
    } as never;

    const expectedTokenBalance = {
      variableTokenBalance: 300,
    };

    const result = getEditPositionTokenBalance(state);

    expect(result).toEqual(expectedTokenBalance);
  });

  it('should return the correct token balance when there is no position and a prospective swap', () => {
    const state = {
      position: {
        status: 'idle',
        value: null,
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'success',
          value: {
            variableTokenDeltaBalance: 100,
          },
        },
      },
    } as never;

    const expectedTokenBalance = {
      variableTokenBalance: 100,
    };

    const result = getEditPositionTokenBalance(state);

    expect(result).toEqual(expectedTokenBalance);
  });

  it('should return the correct token balance when there is no prospective swap and a position', () => {
    const state = {
      position: {
        status: 'success',
        value: {
          variableTokenBalance: 200,
        },
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'idle',
          value: null,
        },
      },
    } as never;

    const expectedTokenBalance = {
      variableTokenBalance: 200,
    };

    const result = getEditPositionTokenBalance(state);

    expect(result).toEqual(expectedTokenBalance);
  });

  it('should return the correct token balance when there is no position and no prospective swap', () => {
    const state = {
      position: {
        status: 'idle',
        value: null,
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'idle',
          value: null,
        },
      },
    } as never;

    const expectedTokenBalance = {
      variableTokenBalance: 0,
    };

    const result = getEditPositionTokenBalance(state);

    expect(result).toEqual(expectedTokenBalance);
  });
});
