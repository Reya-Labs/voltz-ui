import { providers } from 'ethers';
import { NetworkConfiguration } from './types';
export declare const getConfig: ({ network, providerURL, }: {
    network: string;
    providerURL: string;
}) => NetworkConfiguration & {
    PROVIDER: providers.BaseProvider;
};
//# sourceMappingURL=config.d.ts.map