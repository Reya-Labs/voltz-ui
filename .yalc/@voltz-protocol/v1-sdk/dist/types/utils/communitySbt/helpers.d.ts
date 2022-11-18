import { Bytes } from "ethers";
export declare function getBadgeTypeFromMetadataUri(metadataURI: string): number;
export declare function decodeBadgeType(input: Bytes): number;
export declare function decodeMultipleBadgeTypes(input: Bytes): number[];
export declare function getEtherscanURL(network: string, apiKey: string, userAddress: string): string;
/**
 * "Convert seconds to milliseconds, but only if the input is a number and not zero."
 *
 * @param {number} seconds - number - The number of seconds to convert to milliseconds.
 * @returns A function that takes a number and returns a number or undefined.
 */
export declare function toMillis(seconds: number): number | undefined;
//# sourceMappingURL=helpers.d.ts.map