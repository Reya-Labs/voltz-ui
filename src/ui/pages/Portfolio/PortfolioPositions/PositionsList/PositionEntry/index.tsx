import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { AttentionIndicator, ColorTokens, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionUI } from '../../../../../../app/features/portfolio/types';
import { useAppNavigate } from '../../../../../../hooks/useAppNavigate';
import { useResponsiveQuery } from '../../../../../../hooks/useResponsiveQuery';
import { MarketTokenInformation, MarketTokenInformationProps } from './MarketTokenInformation';
import {
  ArbitrumIcon,
  AvalancheIcon,
  ChainIconContainer,
  HealthIndicatorBox,
  LeftBox,
  MarginBox,
  MaturityBox,
  NotionalBox,
  PositionEntryBox,
  PositionEntryBoxWrapper,
  RealizedPNLBox,
  StatusBox,
  UnrealizedPNLBox,
} from './PositionEntry.styled';
import { PositionMargin } from './PositionMargin';
import { PositionMaturity } from './PositionMaturity';
import { PositionNotional } from './PositionNotional';
import { PositionRealizedPNLDetails } from './PositionRealizedPNLDetails';
import { PositionStatus } from './PositionStatus';
import { PositionUnrealizedPNLDetails } from './PositionUnrealizedPNLDetails';

type PositionEntryProps = {
  health: PositionUI['status']['health'];
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
  routePositionId: PositionUI['routePositionId'];
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
const HealthColorMap: Record<PositionEntryProps['health'], ColorTokens | undefined> = {
  danger: 'wildStrawberry',
  healthy: undefined,
  warning: 'orangeYellow',
};
export const PositionEntry = React.forwardRef<HTMLDivElement, PositionEntryProps>(
  (
    {
      health,
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
      routePositionId,
    },
    ref,
  ) => {
    const navigate = useAppNavigate();
    const { isLargeDesktopDevice } = useResponsiveQuery();
    const ChainIcon = ChainIconMap[chainId];
    const typographyToken: TypographyToken = isLargeDesktopDevice
      ? 'secondaryBodyMediumRegular'
      : 'secondaryBodySmallRegular';

    const handleOnRollover = () => {
      if (type === 'LP') {
        navigate.toRolloverLPFormPage({
          ammId: routeAmmId,
          poolId: routePoolId,
          positionId: routePositionId,
        });
      } else {
        navigate.toRolloverSwapFormPage({
          ammId: routeAmmId,
          poolId: routePoolId,
          positionId: routePositionId,
        });
      }
    };
    const handleOnSettle = () => {
      alert('TODO!');
    };
    return (
      <PositionEntryBoxWrapper ref={ref}>
        {ChainIcon ? (
          <ChainIconContainer>
            <ChainIcon />
          </ChainIconContainer>
        ) : null}
        {HealthColorMap[health] !== undefined ? (
          <HealthIndicatorBox>
            <AttentionIndicator colorToken={HealthColorMap[health]!} />
          </HealthIndicatorBox>
        ) : null}
        <PositionEntryBox
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
            <PositionNotional
              notionalCompactFormat={notionalCompactFormat}
              status={status}
              typographyToken={typographyToken}
            />
          </NotionalBox>
          <MarginBox>
            <PositionMargin
              marginCompactFormat={marginCompactFormat}
              status={status}
              typographyToken={typographyToken}
            />
          </MarginBox>
          <MaturityBox>
            <PositionMaturity
              maturityEndTimestampInMS={maturityEndTimestampInMS}
              maturityFormatted={maturityFormatted}
              maturityStartTimestampInMS={maturityStartTimestampInMS}
              status={status}
              typographyToken={typographyToken}
              onSettle={handleOnSettle}
            />
          </MaturityBox>
          <StatusBox>
            <PositionStatus
              status={status}
              type={type}
              typographyToken={typographyToken}
              onRollover={handleOnRollover}
            />
          </StatusBox>
          <UnrealizedPNLBox>
            <PositionUnrealizedPNLDetails
              status={status}
              typographyToken={typographyToken}
              unrealizedPNLCompactFormat={unrealizedPNLCompactFormat}
            />
          </UnrealizedPNLBox>
          <RealizedPNLBox>
            <PositionRealizedPNLDetails
              realizedPNLCashflow={realizedPNLCashflow}
              realizedPNLFees={realizedPNLFees}
              realizedPNLTotal={realizedPNLTotal}
              realizedPNLTotalCompactFormat={realizedPNLTotalCompactFormat}
              type={type}
              typographyToken={typographyToken}
            />
          </RealizedPNLBox>
        </PositionEntryBox>
      </PositionEntryBoxWrapper>
    );
  },
);
