import { ContractReceipt, Signer } from 'ethers';
export declare type BadgeResponse = {
    status: string;
    error?: string;
    receipt?: ContractReceipt;
};
export declare const redeemBadge: (badgesAddress: string, signer: Signer, season: string, simulation: boolean) => Promise<BadgeResponse>;
//# sourceMappingURL=badges.d.ts.map