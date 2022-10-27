

type MellowLpVaultAddresses = {
    voltzVaultAddress: string;
    erc20RootVaultAddress: string;
    erc20RootVaultGovernanceAddress: string;
};

export const getMellowLPAddresses = (): MellowLpVaultAddresses[] => {
    const addresses =
        (process.env.REACT_APP_MELLOW_VAULTS)
            ? process.env.REACT_APP_MELLOW_VAULTS
                .replace("(", "")
                .replace("[", "")
                .replace(")", "")
                .replace("]", "")
                .split(",")
            : [];

    const result: MellowLpVaultAddresses[] = [];
    for (let i = 0; i < addresses.length; i += 3) {
        result.push({
            voltzVaultAddress: addresses[i],
            erc20RootVaultAddress: addresses[i+1],
            erc20RootVaultGovernanceAddress: addresses[i+2],
        });
    }

    return result;
}