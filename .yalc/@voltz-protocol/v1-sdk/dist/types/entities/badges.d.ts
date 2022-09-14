import { ContractReceipt, Signer } from 'ethers';
export declare type BadgeResponse = {
    status: 'SUCCESS' | 'FAIL';
    error?: string;
    receipt?: ContractReceipt;
};
export declare const redeemBadge: (badgesAddress: string, signer: Signer, season: string, simulation: boolean) => Promise<BadgeResponse>;
//# sourceMappingURL=badges.d.ts.map