import { Bytes } from "ethers";
export declare function getBadgeTypeFromMetadataUri(metadataURI: string): number;
export declare function decodeBadgeType(input: Bytes): number;
export declare function decodeMultipleBadgeTypes(input: Bytes): number[];
export declare function getEtherscanURL(network: string, apiKey: string, userAddress: string): string;
export declare function getTopBadgeType(season: number, isTrader: boolean): string | undefined;
/**
 * "Convert seconds to milliseconds, but only if the input is a number and not zero."
 *
 * @param {number} seconds - number - The number of seconds to convert to milliseconds.
 * @returns A function that takes a number and returns a number or undefined.
 */
export declare function toMillis(seconds: number): number | undefined;
export declare function get2MRefereeBenchmark(subgraphUrl?: string): number;
export declare function get100KRefereeBenchmark(subgraphUrl?: string): number;
export declare function geckoEthToUsd(apiKey: string): Promise<number>;
export declare function geLeavesIpfsUri(network: string, seasonId: number, isClaiming: boolean): string;
//# sourceMappingURL=helpers.d.ts.map