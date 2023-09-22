import { ethers } from 'ethers';

export type WalletStatus =
  | 'initializing'
  | 'unavailable'
  | 'notConnected'
  | 'connecting'
  | 'connected';

export type WalletName = 'metamask' | 'walletConnect' | 'disconnect';

export type Wallet = {
  status: WalletStatus;
  reconnect: (name: WalletName) => Promise<void>;
  connect: (name: WalletName) => Promise<void>;
  disconnect: () => void;
  account: string | null;
  accountENS: string | null;
  name: WalletName | null;
  provider: ethers.providers.JsonRpcProvider | null;
  signer: ethers.providers.JsonRpcSigner | null;
  required: boolean;
  setRequired: (required: boolean) => void;
  walletError: string | null;
};

export interface WalletRiskAssessment {
  accountExternalId: string;
  address: string;
  addressRiskIndicators: AddressRiskIndicatorsEntity[];
  addressSubmitted: string;
  chain: string;
  entities: EntitiesEntity[];
  trmAppUrl: string;
}
export interface AddressRiskIndicatorsEntity {
  category: string;
  categoryId: string;
  categoryRiskScoreLevel: number;
  categoryRiskScoreLevelLabel: string;
  incomingVolumeUsd: string;
  outgoingVolumeUsd: string;
  riskType: string;
  totalVolumeUsd: string;
}
export interface EntitiesEntity {
  category: string;
  categoryId: string;
  entity: string;
  riskScoreLevel: number;
  riskScoreLevelLabel: string;
  trmAppUrl: string;
  trmUrn: string;
}
