import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { ColorTokens } from 'brokoli-ui';

import { PositionUI } from '../../../../../../../app/features/portfolio/types';
import { MarketTokenInformationProps } from '../MarketTokenInformation';

export type EntryProps = {
  id: PositionUI['id'];
  isV2: PositionUI['isV2'];
  isBorrowing: PositionUI['isBorrowing'];
  market: MarketTokenInformationProps['market'];
  token: MarketTokenInformationProps['token'];
  maturityFormatted: PositionUI['maturityFormatted'];
  maturityEndTimestampInMS: PositionUI['maturityEndTimestampInMS'];
  maturityStartTimestampInMS: PositionUI['maturityStartTimestampInMS'];
  backgroundColorToken: ColorTokens;
  routeAmmId: PositionUI['routeAmmId'];
  routePoolId: PositionUI['routePoolId'];
  routePositionId: PositionUI['routePositionId'];
  chainId: SupportedChainId;
  status: PositionUI['status'];
  type: PositionUI['type'];
  marginUSDCompactFormat: PositionUI['marginUSDCompactFormat'];
  unrealizedPNLUSDCompactFormat: PositionUI['unrealizedPNLUSDCompactFormat'];
  realizedPNLTotalUSDCompactFormat: PositionUI['realizedPNLTotalUSDCompactFormat'];
  realizedPNLTotalUSD: PositionUI['realizedPNLTotalUSD'];
  realizedPNLFeesUSD: PositionUI['realizedPNLFeesUSD'];
  realizedPNLCashflowUSD: PositionUI['realizedPNLCashflowUSD'];
  notionalUSDCompactFormat: PositionUI['notionalUSDCompactFormat'];
};
