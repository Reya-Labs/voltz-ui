import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { ColorTokens, TokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionUI } from '../../../../../app/features/portfolio/types';
import { useResponsiveQuery } from '../../../../../hooks/useResponsiveQuery';
import {
  ActivePositionEntryBox,
  ActivePositionEntryBoxWrapper,
  ArbitrumIcon,
  AvalancheIcon,
  ChainIconContainer,
  LeftBox,
  MarginBox,
  MaturityBox,
  NotionalBox,
  RealizedPNLBox,
  StatusBox,
  UnrealizedPNLBox,
} from './ActivePositionEntry.styled';
import { MarketTokenInformation, MarketTokenInformationProps } from './MarketTokenInformation';
import { PositionMaturity } from './PositionMaturity';
import { PositionPNLDetails } from './PositionPNLDetails';
import { PositionStatus } from './PositionStatus';

type ActivePositionEntryProps = {
  isAaveV3: PositionUI['isAaveV3'];
  isV2: PositionUI['isV2'];
  isBorrowing: PositionUI['isBorrowing'];
  market: MarketTokenInformationProps['market'];
  token: MarketTokenInformationProps['token'];
  maturityFormatted: PositionUI['maturityFormatted'];
  maturityEndTimestampInMS: PositionUI['maturityEndTimestampInMS'];
  maturityStartTimestampInMS: PositionUI['maturityStartTimestampInMS'];
  backgroundColorToken: ColorTokens;
  borderColorToken: ColorTokens | 'transparent';
  routeAmmId: PositionUI['routeAmmId'];
  routePoolId: PositionUI['routePoolId'];
  chainId: SupportedChainId;
  status: PositionUI['status'];
  type: PositionUI['type'];
  marginCompactFormat: PositionUI['marginCompactFormat'];
  unrealizedPNLCompactFormat: PositionUI['unrealizedPNLCompactFormat'];
  realizedPNLTotalCompactFormat: PositionUI['realizedPNLTotalCompactFormat'];
  realizedPNLTotal: PositionUI['realizedPNLTotal'];
  realizedPNLFees: PositionUI['realizedPNLFees'];
  realizedPNLCashflow: PositionUI['realizedPNLCashflow'];
  notionalCompactFormat: PositionUI['notionalCompactFormat'];
};
const ChainIconMap: Record<SupportedChainId, React.FunctionComponent | null> = {
  [SupportedChainId.mainnet]: null,
  [SupportedChainId.goerli]: null,
  [SupportedChainId.arbitrum]: ArbitrumIcon,
  [SupportedChainId.arbitrumGoerli]: ArbitrumIcon,
  [SupportedChainId.avalanche]: AvalancheIcon,
  [SupportedChainId.avalancheFuji]: AvalancheIcon,
};
export const ActivePositionEntry = React.forwardRef<HTMLDivElement, ActivePositionEntryProps>(
  (
    {
      chainId,
      isAaveV3,
      isBorrowing,
      market,
      token,
      maturityFormatted,
      backgroundColorToken,
      routePoolId,
      routeAmmId,
      status,
      isV2,
      borderColorToken,
      marginCompactFormat,
      notionalCompactFormat,
      realizedPNLTotalCompactFormat,
      realizedPNLFees,
      realizedPNLTotal,
      realizedPNLCashflow,
      unrealizedPNLCompactFormat,
      type,
      maturityEndTimestampInMS,
      maturityStartTimestampInMS,
    },
    ref,
  ) => {
    const { isLargeDesktopDevice } = useResponsiveQuery();
    const ChainIcon = ChainIconMap[chainId];
    const typographyToken: TypographyToken = isLargeDesktopDevice
      ? 'secondaryBodyMediumRegular'
      : 'secondaryBodySmallRegular';

    return (
      <ActivePositionEntryBoxWrapper ref={ref}>
        {ChainIcon ? (
          <ChainIconContainer>
            <ChainIcon />
          </ChainIconContainer>
        ) : null}
        <ActivePositionEntryBox
          backgroundColorToken={backgroundColorToken}
          borderColorToken={borderColorToken}
        >
          <LeftBox>
            <MarketTokenInformation
              isAaveV3={isAaveV3}
              isBorrowing={isBorrowing}
              market={market}
              token={token}
              type={type}
            />
          </LeftBox>
          <NotionalBox>
            <TokenTypography
              colorToken="lavenderWeb"
              token={notionalCompactFormat.compactSuffix}
              typographyToken={typographyToken}
              value={notionalCompactFormat.compactNumber}
            />
          </NotionalBox>
          <MarginBox>
            <TokenTypography
              colorToken="lavenderWeb"
              token={marginCompactFormat.compactSuffix}
              typographyToken={typographyToken}
              value={marginCompactFormat.compactNumber}
            />
          </MarginBox>
          <MaturityBox>
            <PositionMaturity
              maturityEndTimestampInMS={maturityEndTimestampInMS}
              maturityFormatted={maturityFormatted}
              maturityStartTimestampInMS={maturityStartTimestampInMS}
              typographyToken={typographyToken}
            />
          </MaturityBox>
          <StatusBox>
            <PositionStatus status={status} typographyToken={typographyToken} />
          </StatusBox>
          <UnrealizedPNLBox>
            <TokenTypography
              colorToken={
                unrealizedPNLCompactFormat.compactNumber.indexOf('-') === -1
                  ? 'skyBlueCrayola'
                  : 'wildStrawberry'
              }
              prefixToken={
                unrealizedPNLCompactFormat.compactNumber.indexOf('-') === -1 ? '+$' : '-$'
              }
              token={unrealizedPNLCompactFormat.compactSuffix}
              typographyToken={typographyToken}
              value={unrealizedPNLCompactFormat.compactNumber.replace('-', '')}
            />
          </UnrealizedPNLBox>
          <RealizedPNLBox>
            <PositionPNLDetails
              realizedPNLCashflow={realizedPNLCashflow}
              realizedPNLFees={realizedPNLFees}
              realizedPNLTotal={realizedPNLTotal}
              realizedPNLTotalCompactFormat={realizedPNLTotalCompactFormat}
              type={type}
              typographyToken={typographyToken}
            />
          </RealizedPNLBox>
        </ActivePositionEntryBox>
      </ActivePositionEntryBoxWrapper>
    );
  },
);
