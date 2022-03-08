import JSBI from 'jsbi';
import { BigIntish } from '../types';
export interface TickConstructorArgs {
    index: number;
    liquidityGross: BigIntish;
    liquidityNet: BigIntish;
}
export declare class Tick {
    readonly index: number;
    readonly liquidityGross: JSBI;
    readonly liquidityNet: JSBI;
    constructor({ index, liquidityGross, liquidityNet }: TickConstructorArgs);
}
//# sourceMappingURL=tick.d.ts.map