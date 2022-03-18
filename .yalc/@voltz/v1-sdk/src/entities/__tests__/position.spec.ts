import { providers, Wallet } from 'ethers';

import Token from '../token';
import RateOracle from '../rateOracle';
import AMM from '../amm';
import { TickMath } from '../../utils/tickMath';
import {
  VAMM__factory as vammFactory,
} from '../../typechain';
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
        createdTimestamp: '1649458800',
        fcmAddress: '0x5392a33f7f677f59e833febf4016cddd88ff9e67',
        liquidity: '0',
        marginEngineAddress,
        rateOracle: new RateOracle({
          id: '0x0165878a594ca255338adfa4d48449f69242eb8f',
          protocolId: 1,
        }),
        underlyingToken: new Token({
          id: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
          name: 'USDC',
        }),
        sqrtPriceX96: TickMath.getSqrtRatioAtTick(0).toString(),
        termEndTimestamp:   '1649458800000000000000000000',
        termStartTimestamp: '1646856441000000000000000000',
        tick: '0',
        tickSpacing: '1000',
        txCount: 0,
        updatedTimestamp: '1646856441'
      });

      position = new Position({
        id: "position_test",
        createdTimestamp: JSBI.BigInt('1649458800'),
        updatedTimestamp: JSBI.BigInt('1646856441'),
        amm: amm,
        tickLower: -7000,
        tickUpper: 0,
        liquidity: "1000000000000000000000000",
        isSettled: false,
        margin: JSBI.BigInt('100000000000000000000000'),
        fixedTokenBalance: JSBI.BigInt('0'),
        variableTokenBalance: JSBI.BigInt('0'),
        isLiquidityProvider: true,
        owner: "string",
        isEmpty: false,
      });

      const vammContract = vammFactory.connect(vammAddress, wallet);
      // await vammContract.initializeVAMM(TickMath.getSqrtRatioAtTick(0).toString()); // for periphery tests
    });

    it('position', async () => {
      console.log(position.effectiveMargin);
      console.log(position.fixedRateLower.toNumber());
      console.log(position.fixedRateUpper.toNumber());
      console.log(position.createdDateTime);
      console.log(position.updatedDateTime);
      console.log(position.notional);
    });
  });
});
