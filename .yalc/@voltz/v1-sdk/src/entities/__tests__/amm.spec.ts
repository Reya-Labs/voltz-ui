import { providers, Wallet } from 'ethers';

import Token from '../token';
import RateOracle from '../rateOracle';
import AMM from '../amm';

describe('amm', () => {
  describe('mint', () => {
    const vammAddress = '0xe451980132e65465d0a498c53f0b5227326dd73f';
    const marginEngineAddress = '0x75537828f2ce51be7289709686a69cbfdbb714f1';
    const provider = new providers.JsonRpcProvider('http://0.0.0.0:8545/');
    const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
    const wallet = new Wallet(privateKey, provider);
    const amm = new AMM({
      id: vammAddress,
      signer: wallet,
      createdTimestamp: '1646856471',
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
      sqrtPriceX96: '0',
      termEndTimestamp: '1649458800000000000000000000',
      termStartTimestamp: '1646856441000000000000000000',
      tick: '0',
      tickSpacing: '1000',
      txCount: 0,
      updatedTimestamp: '1646856471',
    });

    it('executes mint', async () => {
      const result = await amm.mint({
        recipient: wallet.address,
        fixedLow: 1,
        fixedHigh: 2,
        margin: 1,
        leverage: 1,
      });

      console.debug(result);
    });
  });
});
