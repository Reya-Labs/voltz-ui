import { BigNumber, ethers } from 'ethers';
import { GetWalletQuery } from '@graphql';

export type WalletStatus =
  | 'initializing'
  | 'unavailable'
  | 'notConnected'
  | 'connecting'
  | 'connected';

export type WalletName = 
  | 'metamask'
  | 'walletConnect';

export type EthereumRequestArguments = {
  method: string;
  params?: unknown[] | object;
};

export type Wallet = {
  status: WalletStatus;
  connect: (name: WalletName) => Promise<void>;
  disconnect: () => void;
  account: string | null;
  name: WalletName | null;
  signer: ethers.providers.JsonRpcSigner | null;
  balance: Record<string, BigNumber>;
  wallet: GetWalletQuery['wallet'] | null;
  loading: boolean;
  error: boolean;
  required: boolean;
  setRequired: (required: boolean) => void;
  walletError: string | null;
  networkId?: string;
};

export interface WalletRiskAssessment {
  accountExternalId: string;
  address: string;
  addressRiskIndicators: (AddressRiskIndicatorsEntity)[];
  addressSubmitted: string;
  chain: string;
  entities: (EntitiesEntity)[];
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

