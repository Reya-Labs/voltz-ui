import { Bytes, ethers } from "ethers";
import { CommunitySBT__factory } from "../../typechain-sbt";

export function getBadgeTypeFromMetadataUri(metadataURI: string) : number {
    const filenamme = metadataURI.split('/')[3];
    const badgeType = parseInt(filenamme.split('.')[0]);
    return badgeType;
}

export function decodeBadgeType(input: Bytes): number {
    const inter = new ethers.utils.Interface(CommunitySBT__factory.abi);
    const decoded = inter.decodeFunctionData("redeem", input);
    const badgeType = getBadgeTypeFromMetadataUri(decoded[0].metadataURI);
    return badgeType;
}

export function decodeMultipleBadgeTypes(input: Bytes): number[] {
    let badgeTypes = new Array<number>();
    const inter = new ethers.utils.Interface(CommunitySBT__factory.abi);
    const decoded = inter.decodeFunctionData("multiRedeem", input);
    for (const leafInfo of decoded[0]) {
        const badgeType = getBadgeTypeFromMetadataUri(leafInfo.metadataURI);
        badgeTypes.push(badgeType);
    }
    return badgeTypes;
}

export function getEtherscanURL(network: string, apiKey: string, userAddress: string): string {
    switch (network) {
        case "goerli":
            return `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${userAddress}&page=1&offset=50&sort=desc&apikey=${apiKey}`
        case "mainnet":
            return `https://api.etherscan.io/api?module=account&action=txlist&address=${userAddress}&page=1&offset=50&sort=desc&apikey=${apiKey}`
        default:
            return "";
    }
}

/**
 * "Convert seconds to milliseconds, but only if the input is a number and not zero."
 *
 * @param {number} seconds - number - The number of seconds to convert to milliseconds.
 * @returns A function that takes a number and returns a number or undefined.
 */
 export function toMillis(seconds: number): number | undefined {
    if (isNaN(seconds) || seconds === 0) {
      return undefined;
    }
  
    return seconds * 1000;
  };