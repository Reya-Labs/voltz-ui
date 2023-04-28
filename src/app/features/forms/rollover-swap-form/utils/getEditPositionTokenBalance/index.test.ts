import { getEditPositionTokenBalance } from './index';

describe('getEditPositionTokenBalance', () => {
  it('should return the correct token balance when there is a position and a prospective swap', () => {
    const state = {
      position: {
        status: 'success',
        value: {
          fixedTokenBalance: 100,
          variableTokenBalance: 200,
        },
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'success',
          value: {
            fixedTokenDeltaBalance: -50,
            variableTokenDeltaBalance: 100,
          },
        },
      },
    } as never;

    const expectedTokenBalance = {
      fixedTokenBalance: 50,
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
            fixedTokenDeltaBalance: -50,
            variableTokenDeltaBalance: 100,
          },
        },
      },
    } as never;

    const expectedTokenBalance = {
      fixedTokenBalance: -50,
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
          fixedTokenBalance: 100,
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
      fixedTokenBalance: 100,
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
      fixedTokenBalance: 0,
      variableTokenBalance: 0,
    };

    const result = getEditPositionTokenBalance(state);

    expect(result).toEqual(expectedTokenBalance);
  });
});
