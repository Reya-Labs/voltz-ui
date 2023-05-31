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
  EditablePositionEntryBox,
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
  canEdit: PositionUI['canEdit'];
  canSettle: PositionUI['canSettle'];
  canRollover: PositionUI['canRollover'];
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
  unrealizedPNLUSDCompactFormat: PositionUI['unrealizedPNLUSDCompactFormat'];
  realizedPNLTotalUSDCompactFormat: PositionUI['realizedPNLTotalUSDCompactFormat'];
  realizedPNLTotalUSD: PositionUI['realizedPNLTotalUSD'];
  realizedPNLFeesUSD: PositionUI['realizedPNLFeesUSD'];
  realizedPNLCashflowUSD: PositionUI['realizedPNLCashflowUSD'];
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
      canEdit,
      canSettle,
      canRollover,
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
      realizedPNLTotalUSDCompactFormat,
      realizedPNLFeesUSD,
      realizedPNLTotalUSD,
      realizedPNLCashflowUSD,
      unrealizedPNLUSDCompactFormat,
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
    const numbersTypographyToken: TypographyToken = isLargeDesktopDevice
      ? 'secondaryBodyMediumRegular'
      : 'secondaryBodySmallRegular';
    const textsTypographyToken: TypographyToken = isLargeDesktopDevice
      ? 'primaryBodyMediumRegular'
      : 'primaryBodySmallRegular';

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

    const handleOnEntryClick = () => {
      if (!canEdit) {
        return;
      }
      if (type === 'LP') {
        navigate.toLPFormPage({
          ammId: routeAmmId,
          poolId: routePoolId,
          fixedLower: status.fixLow,
          fixedUpper: status.fixHigh,
        });
      } else {
        navigate.toSwapFormPage({
          ammId: routeAmmId,
          poolId: routePoolId,
        });
      }
    };
    const EntryBox = canEdit ? EditablePositionEntryBox : PositionEntryBox;
    return (
      <PositionEntryBoxWrapper ref={ref} onClick={handleOnEntryClick}>
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
        <EntryBox backgroundColorToken={backgroundColorToken} borderColorToken={borderColorToken}>
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
              typographyToken={numbersTypographyToken}
            />
          </NotionalBox>
          <MarginBox>
            <PositionMargin
              marginCompactFormat={marginCompactFormat}
              status={status}
              typographyToken={numbersTypographyToken}
            />
          </MarginBox>
          <MaturityBox>
            <PositionMaturity
              canSettle={canSettle}
              maturityEndTimestampInMS={maturityEndTimestampInMS}
              maturityFormatted={maturityFormatted}
              maturityStartTimestampInMS={maturityStartTimestampInMS}
              status={status}
              typographyToken={textsTypographyToken}
              onSettle={handleOnSettle}
            />
          </MaturityBox>
          <StatusBox>
            <PositionStatus
              canRollover={canRollover}
              numbersTypographyToken={numbersTypographyToken}
              status={status}
              textsTypographyToken={textsTypographyToken}
              type={type}
              onRollover={handleOnRollover}
            />
          </StatusBox>
          <UnrealizedPNLBox>
            <PositionUnrealizedPNLDetails
              numbersTypographyToken={numbersTypographyToken}
              status={status}
              textsTypographyToken={textsTypographyToken}
              unrealizedPNLUSDCompactFormat={unrealizedPNLUSDCompactFormat}
            />
          </UnrealizedPNLBox>
          <RealizedPNLBox>
            <PositionRealizedPNLDetails
              realizedPNLCashflowUSD={realizedPNLCashflowUSD}
              realizedPNLFeesUSD={realizedPNLFeesUSD}
              realizedPNLTotalUSD={realizedPNLTotalUSD}
              realizedPNLTotalUSDCompactFormat={realizedPNLTotalUSDCompactFormat}
              type={type}
              typographyToken={numbersTypographyToken}
            />
          </RealizedPNLBox>
        </EntryBox>
      </PositionEntryBoxWrapper>
    );
  },
);
