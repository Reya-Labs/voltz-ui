export declare type TokenConstructorArgs = {
    id: string;
    name: string;
    decimals: number;
};
declare class Token {
    readonly id?: string;
    readonly name?: string;
    readonly decimals: number;
    constructor({ id, name, decimals }: TokenConstructorArgs);
}
export default Token;
//# sourceMappingURL=token.d.ts.map