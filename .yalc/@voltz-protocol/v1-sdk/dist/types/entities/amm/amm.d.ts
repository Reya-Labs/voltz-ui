import JSBI from 'jsbi';
import { providers, BigNumber, ContractReceipt, Signer } from 'ethers';
import { DateTime } from 'luxon';
import RateOracle from '../rateOracle';
import Token from '../token';
import { AMMConstructorArgs, AMMRolloverWithSwapArgs, AMMRolloverWithMintArgs, AMMGetInfoPostSwapArgs, InfoPostSwap, ExpectedApyInfo, AMMSwapArgs, AMMGetInfoPostMintArgs, AMMMintArgs, AMMBurnArgs, AMMUpdatePositionMarginArgs, AMMSettlePositionArgs, ClosestTickAndFixedRate, ExpectedApyArgs, AMMSwapWithWethArgs, AMMMintWithWethArgs } from './types';
export declare class AMM {
    readonly id: string;
    readonly signer: Signer | null;
    readonly provider?: providers.Provider;
    readonly factoryAddress: string;
    readonly marginEngineAddress: string;
    readonly rateOracle: RateOracle;
    readonly termStartTimestamp: JSBI;
    readonly termEndTimestamp: JSBI;
    readonly underlyingToken: Token;
    readonly tickSpacing: number;
    readonly isETH: boolean;
    readonly wethAddress: string;
    readonly ethPrice: () => Promise<number>;
    constructor({ id, signer, provider, factoryAddress, marginEngineAddress, rateOracle, termStartTimestamp, termEndTimestamp, underlyingToken, tickSpacing, wethAddress, ethPrice, }: AMMConstructorArgs);
    expectedApy: (ft: BigNumber, vt: BigNumber, margin: number, rate: number) => Promise<[number, number]>;
    rolloverWithSwap({ isFT, notional, margin, fixedRateLimit, fixedLow, fixedHigh, newMarginEngine, rolloverPosition, }: AMMRolloverWithSwapArgs): Promise<ContractReceipt>;
    rolloverWithMint({ fixedLow, fixedHigh, notional, margin, newMarginEngine, rolloverPosition, }: AMMRolloverWithMintArgs): Promise<ContractReceipt>;
    getInfoPostSwap({ isFT, notional, fixedRateLimit, fixedLow, fixedHigh, }: AMMGetInfoPostSwapArgs): Promise<InfoPostSwap>;
    getExpectedApyInfo({ margin, position, fixedLow, fixedHigh, fixedTokenDeltaUnbalanced, availableNotional, predictedVariableApy, }: ExpectedApyArgs): Promise<ExpectedApyInfo>;
    swap({ isFT, notional, margin, fixedRateLimit, fixedLow, fixedHigh, fullyCollateralisedVTSwap, }: AMMSwapArgs): Promise<ContractReceipt>;
    swapWithWeth({ isFT, notional, margin, marginEth, fixedRateLimit, fixedLow, fixedHigh, }: AMMSwapWithWethArgs): Promise<ContractReceipt>;
    getInfoPostMint({ fixedLow, fixedHigh, notional, }: AMMGetInfoPostMintArgs): Promise<number>;
    mint({ fixedLow, fixedHigh, notional, margin, }: AMMMintArgs): Promise<ContractReceipt>;
    mintWithWeth({ fixedLow, fixedHigh, notional, margin, marginEth, }: AMMMintWithWethArgs): Promise<ContractReceipt>;
    burn({ fixedLow, fixedHigh, notional }: AMMBurnArgs): Promise<ContractReceipt>;
    updatePositionMargin({ fixedLow, fixedHigh, marginDelta, }: AMMUpdatePositionMarginArgs): Promise<ContractReceipt>;
    settlePosition({ owner, fixedLow, fixedHigh, }: AMMSettlePositionArgs): Promise<ContractReceipt>;
    scale(value: number): string;
    descale(value: BigNumber): number;
    isTokenApprovedForPeriphery({ forceErc20Check, approvalAmount, }: {
        forceErc20Check: boolean;
        approvalAmount?: number;
    }): Promise<boolean>;
    approveUnderlyingTokenForPeriphery(): Promise<void>;
    get protocol(): string;
    get startDateTime(): DateTime;
    get endDateTime(): DateTime;
    getFixedApr(): Promise<number>;
    getVariableFactor(termStartTimestamp: BigNumber, termEndTimestamp: BigNumber): Promise<number>;
    closestTickAndFixedRate(fixedRate: number): ClosestTickAndFixedRate;
    getNextUsableFixedRate(fixedRate: number, count: number): number;
    underlyingTokens(): Promise<number>;
    getInstantApy(): Promise<number>;
}
//# sourceMappingURL=amm.d.ts.map