import JSBI from 'jsbi';
export declare abstract class SwapMath {
    /**
     * Cannot be constructed.
     */
    private constructor();
    static computeSwapStep(sqrtRatioCurrentX96: JSBI, sqrtRatioTargetX96: JSBI, liquidity: JSBI, amountRemaining: JSBI, feePercentage: JSBI, timeToMaturityInSeconds: JSBI): [JSBI, JSBI, JSBI, JSBI];
}
//# sourceMappingURL=swapMath.d.ts.map