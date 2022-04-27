import JSBI from 'jsbi';
import Token from "../token";
import { BigintIsh } from '../../constants';
import { Fraction } from './fraction';
export declare class TokenAmount<T extends Token> extends Fraction {
    readonly token: T;
    readonly decimalScale: JSBI;
    /**
     * Returns a new token amount instance from the unitless amount of token, i.e. the raw amount
     * @param token the token in the amount
     * @param rawAmount the raw token or ether amount
     */
    static fromRawAmount<T extends Token>(token: T, rawAmount: BigintIsh): TokenAmount<T>;
    /**
     * Construct a token amount with a denominator that is not equal to 1
     * @param token the token
     * @param numerator the numerator of the fractional token amount
     * @param denominator the denominator of the fractional token amount
     */
    static fromFractionalAmount<T extends Token>(token: T, numerator: BigintIsh, denominator: BigintIsh): TokenAmount<T>;
    protected constructor(token: T, numerator: BigintIsh, denominator?: BigintIsh);
    scale(decimalPlaces?: number): string;
}
//# sourceMappingURL=tokenAmount.d.ts.map