import { providers, Wallet } from 'ethers';

import Token from '../token';
import RateOracle from '../rateOracle';
import AMM from '../amm';
import Position from '../position';
import JSBI from 'jsbi';

describe('amm', () => {
  describe('amm init', () => {
    let position: Position;
    let amm: AMM;
    let wallet: Wallet;

    beforeAll(async () => {
      const vammAddress = '0xe451980132e65465d0a498c53f0b5227326dd73f';
      const marginEngineAddress = '0x75537828f2ce51be7289709686a69cbfdbb714f1';
      const provider = new providers.JsonRpcProvider('http://0.0.0.0:8545/');
      const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

      wallet = new Wallet(privateKey, provider);
      amm = new AMM({
        id: vammAddress,
        signer: wallet,
        provider: provider,
        environment: "LOCALHOST_SDK",
        fcmAddress: '0x5392a33f7f677f59e833febf4016cddd88ff9e67',
        marginEngineAddress,
        rateOracle: new RateOracle({
          id: '0x0165878a594ca255338adfa4d48449f69242eb8f',
          protocolId: 1,
        }),
        underlyingToken: new Token({
          id: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
          name: 'USDC',
          decimals: 18,
        }),
        termEndTimestamp: JSBI.BigInt('1649458800000000000000000000'),
        termStartTimestamp: JSBI.BigInt('1646856441000000000000000000'),
        tick: 0,
        tickSpacing: 1000,
        txCount: 0,
        updatedTimestamp: JSBI.BigInt('1646856441'),
      });

      position = new Position({
        id: 'position_test',
        createdTimestamp: JSBI.BigInt('1649458800'),
        updatedTimestamp: JSBI.BigInt('1646856441'),
        amm: amm,
        tickLower: -7000,
        tickUpper: 0,
        liquidity: JSBI.BigInt('1000000000000000000000000'),
        isSettled: false,
        margin: JSBI.BigInt('100000000000000000000000'),
        fixedTokenBalance: JSBI.BigInt('1000000000000000000000'),
        variableTokenBalance: JSBI.BigInt('-1000000000000000000000'),
        agent: 3,
        owner: 'owner',
        accumulatedFees: JSBI.BigInt('1000000000000000000000'),
        mints: [],
        burns: [],
        swaps: [],
        marginUpdates: [],
        liquidations: [],
        settlements: [],
      });
    });

    it('position', async () => {
      expect(position.effectiveMargin).toBe(100000);
      expect(position.fixedRateLower.toNumber()).toBeCloseTo(1);
      expect(position.fixedRateUpper.toNumber()).toBeCloseTo(2.01);
      expect(position.effectiveFixedTokenBalance).toBe(1000);
      expect(position.effectiveVariableTokenBalance).toBe(-1000);
      expect(position.effectiveAccumulatedFees).toBe(1000);
    });
  });
});
