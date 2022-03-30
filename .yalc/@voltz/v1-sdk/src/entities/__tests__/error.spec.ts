import { providers, Wallet } from 'ethers';

import Token from '../token';
import RateOracle from '../rateOracle';
import AMM from '../amm';
import { TickMath } from '../../utils/tickMath';

/**
 * tests that need to pass when the VAMM has not been initialized
 */
const BEFORE_INITIALIZATION = false;

/**
 * tests that need to pass when the VAMM has been initialized 
 * and is not close or beyond maturity
*/
const DURING_POOL = false;

/**
 * tests that need to pass when the VAMM is close or beyond maturity
*/
const AFTER_MATURITY = false;

describe('amm', () => {
  describe('amm init', () => {
    let amm_wallet: AMM, amm_other: AMM;
    let wallet: Wallet, other: Wallet;

    beforeAll(async () => {
      const vammAddress = '0xe451980132e65465d0a498c53f0b5227326dd73f';
      const marginEngineAddress = '0x75537828f2ce51be7289709686a69cbfdbb714f1';
      const provider = new providers.JsonRpcProvider('http://0.0.0.0:8545/');
      const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
      wallet = new Wallet(privateKey, provider);
      other = new Wallet(
        '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
        provider,
      );
      amm_wallet = new AMM({
        id: vammAddress,
        signer: wallet,
        provider: provider,
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
          decimals: 18,
        }),
        sqrtPriceX96: TickMath.getSqrtRatioAtTick(0).toString(),
        termEndTimestamp: '1649458800000000000000000000',
        termStartTimestamp: '1646856441000000000000000000',
        tick: '0',
        tickSpacing: '1000',
        txCount: 0,
        updatedTimestamp: '1646856471',
      });

      amm_other = new AMM({
        id: vammAddress,
        signer: other,
        provider: provider,
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
          decimals: 18,
        }),
        sqrtPriceX96: TickMath.getSqrtRatioAtTick(0).toString(),
        termEndTimestamp: '1649458800000000000000000000',
        termStartTimestamp: '1646856441000000000000000000',
        tick: '0',
        tickSpacing: '1000',
        txCount: 0,
        updatedTimestamp: '1646856471',
      });
    });

    it("Introduction", () => {});

    if (DURING_POOL) {
        it("Disordered ticks in swap", async() => { 
            let failure = false;
            try {
                await amm_other.swap({
                    isFT: true,
                    notional: 5000000,
                    fixedLow: 2,
                    fixedHigh: 1,
                    margin: 0,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("Lower Fixed Rate must be smaller than Upper Fixed Rate!");
            }

            expect(failure).toBe(true);
        });

        it("Disordered ticks in mint", async() => { 
            let failure = false;
            try {
                await amm_wallet.mint({
                    fixedLow: 2,
                    fixedHigh: 1,
                    margin: 0,
                    notional: 5000000,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("Lower Fixed Rate must be smaller than Upper Fixed Rate!");
            }

            expect(failure).toBe(true);
        });

        it("Disordered ticks in burn", async() => { 
            let failure = false;
            try {
                await amm_wallet.burn({
                    fixedLow: 2,
                    fixedHigh: 1,
                    notional: 5000000,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("Lower Fixed Rate must be smaller than Upper Fixed Rate!");
            }

            expect(failure).toBe(true);
        });

        it("Fixed rate too low in swap", async() => { 
            let failure = false;
            try {
                await amm_other.swap({
                    isFT: true,
                    notional: 5000000,
                    fixedLow: 0.000001,
                    fixedHigh: 1,
                    margin: 0,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("Lower Fixed Rate is too low!");
            }

            expect(failure).toBe(true);
        });

        it("Fixed rate too low in mint", async() => { 
            let failure = false;
            try {
                await amm_wallet.mint({
                    fixedLow: 0.000001,
                    fixedHigh: 1,
                    margin: 0,
                    notional: 5000000,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("Lower Fixed Rate is too low!");
            }

            expect(failure).toBe(true);
        });

        it("Fixed rate too low in burn", async() => { 
            let failure = false;
            try {
                await amm_wallet.burn({
                    fixedLow: 0.000001,
                    fixedHigh: 1,
                    notional: 5000000,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("Lower Fixed Rate is too low!");
            }

            expect(failure).toBe(true);
        });

        it("Fixed rate too high in swap", async() => { 
            let failure = false;
            try {
                await amm_other.swap({
                    isFT: true,
                    notional: 5000000,
                    fixedLow: 1,
                    fixedHigh: 1500,
                    margin: 0,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("Upper Fixed Rate is too high!");
            }

            expect(failure).toBe(true);
        });

        it("Fixed rate too high in mint", async() => { 
            let failure = false;
            try {
                await amm_wallet.mint({
                    fixedLow: 1,
                    fixedHigh: 1500,
                    margin: 0,
                    notional: 5000000,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("Upper Fixed Rate is too high!");
            }

            expect(failure).toBe(true);
        });

        it("Fixed rate too high in burn", async() => { 
            let failure = false;
            try {
                await amm_wallet.burn({
                    fixedLow: 1,
                    fixedHigh: 1500,
                    notional: 5000000,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("Upper Fixed Rate is too high!");
            }

            expect(failure).toBe(true);
        });

        it("Notional 0 in swap", async() => { 
            let failure = false;
            try {
                await amm_other.swap({
                    isFT: true,
                    notional: 0,
                    fixedLow: 1,
                    fixedHigh: 2,
                    margin: 0,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("Amount of notional must be greater than 0!");
            }

            expect(failure).toBe(true);
        });

        it("Notional 0 in mint", async() => { 
            let failure = false;
            try {
                await amm_wallet.mint({
                    fixedLow: 1,
                    fixedHigh: 2,
                    margin: 0,
                    notional: 0,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("Amount of notional must be greater than 0!");
            }

            expect(failure).toBe(true);
        });

        it("Notional 0 in burn", async() => { 
            let failure = false;
            try {
                await amm_wallet.burn({
                    fixedLow: 1,
                    fixedHigh: 2,
                    notional: 0,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("Amount of notional must be greater than 0!");
            }

            expect(failure).toBe(true);
        });

        it("Negative margin in swap", async() => { 
            let failure = false;
            try {
                await amm_other.swap({
                    isFT: true,
                    notional: 5000000,
                    fixedLow: 1,
                    fixedHigh: 2,
                    margin: -10,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("Amount of margin cannot be negative!");
            }

            expect(failure).toBe(true);
        });

        it("Negative margin in mint", async() => { 
            let failure = false;
            try {
                await amm_wallet.mint({
                    fixedLow: 1,
                    fixedHigh: 2,
                    margin: -10,
                    notional: 5000000,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("Amount of margin cannot be negative!");
            }

            expect(failure).toBe(true);
        });

        it("MarginRequirementNotMet", async() => { 
            let failure = false;
            try {
                await amm_other.swap({
                    isFT: true,
                    notional: 5000000,
                    fixedLow: 1,
                    fixedHigh: 2,
                    margin: 0,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("No enough margin for this operation");
            }

            expect(failure).toBe(true);
        });

        it("MarginLessThanMinimum", async() => { 
            let failure = false;
            try {
                await amm_wallet.mint({
                    fixedLow: 1,
                    fixedHigh: 2,
                    margin: 0,
                    notional: 5000000,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("No enough margin for this operation");
            }

            expect(failure).toBe(true);
        });

        it("Not enough liquidity to burn", async() => { 
            let failure = false;
            try {
                await amm_wallet.burn({
                    fixedLow: 1,
                    fixedHigh: 2,
                    notional: 5000000,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("Not enough liquidity to burn");
            }

            expect(failure).toBe(true);
        });
    }

    if (BEFORE_INITIALIZATION) {
        it("VAMM not initialized", async() => { 
            let failure = false;
            try {
                await amm_other.swap({
                    isFT: true,
                    notional: 50000,
                    fixedLow: 1,
                    fixedHigh: 2,
                    margin: 10000,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("The pool has not been initialized yet");
            }

            expect(failure).toBe(true);
        });
    }

    if (AFTER_MATURITY) {
        it("Swap after maturity", async() => { 
            let failure = false;
            try {
                await amm_other.swap({
                    isFT: true,
                    notional: 50000,
                    fixedLow: 1,
                    fixedHigh: 2,
                    margin: 10000,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("The pool is close to or beyond maturity");
            }

            expect(failure).toBe(true);
        });

        it("Mint after maturity", async() => { 
            let failure = false;
            try {
                await amm_wallet.mint({
                    fixedLow: 1,
                    fixedHigh: 2,
                    margin: 10000,
                    notional: 50000,
                    validationOnly: true
                });
            }
            catch (error) {
                failure = true;
                expect(error instanceof Error);
                expect((error as Error).message).toBe("The pool is close to or beyond maturity");
            }

            expect(failure).toBe(true);
        });
    }
});
});
