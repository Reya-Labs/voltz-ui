import { TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useAppNavigate } from '../../../../../../../../hooks/useAppNavigate';
import { useResponsiveQuery } from '../../../../../../../../hooks/useResponsiveQuery';
import { ChainIcon } from '../../../../../../../components/ChainIcon';
import { HealthIndicator } from '../../HealthIndicator';
import { MarketTokenInformation } from '../../MarketTokenInformation';
import {
  ChainIconContainer,
  EditablePositionEntryBox,
  LeftBox,
  MarginBox,
  MaturityBox,
  NotionalBox,
  PositionEntryBox,
  PositionEntryBoxWrapper,
  RealizedPNLBox,
  RightBox,
  StatusBox,
  UnrealizedPNLBox,
} from '../../PositionEntry.styled';
import { PositionMargin } from '../../PositionMargin';
import { PositionMaturity } from '../../PositionMaturity';
import { PositionNotional } from '../../PositionNotional';
import { PositionRealizedPNLDetails } from '../../PositionRealizedPNLDetails';
import { PositionStatus } from '../../PositionStatus';
import { PositionUnrealizedPNLDetails } from '../../PositionUnrealizedPNLDetails';
import { EntryProps } from '../types';

export const ActivePositionEntry = React.forwardRef<HTMLDivElement, EntryProps>(
  (
    {
      canEdit,
      canSettle,
      canRollover,
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
      marginUSDCompactFormat,
      notionalUSDCompactFormat,
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
    const numbersTypographyToken: TypographyToken = isLargeDesktopDevice
      ? 'secondaryBodyMediumRegular'
      : 'secondaryBodySmallRegular';
    const textsTypographyToken: TypographyToken = isLargeDesktopDevice
      ? 'primaryBodyMediumRegular'
      : 'primaryBodySmallRegular';

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
    const chainIcon = <ChainIcon chainId={chainId} />;
    return (
      <PositionEntryBoxWrapper ref={ref} onClick={handleOnEntryClick}>
        {chainIcon ? <ChainIconContainer>{chainIcon}</ChainIconContainer> : null}
        <HealthIndicator health={status.health} />
        <EntryBox backgroundColorToken={backgroundColorToken}>
          <LeftBox>
            <MarketTokenInformation
              isAaveV3={isAaveV3}
              isBorrowing={isBorrowing}
              market={market}
              token={token}
              type={type}
            />
          </LeftBox>
          <RightBox>
            <NotionalBox>
              <PositionNotional
                notionalUSDCompactFormat={notionalUSDCompactFormat}
                status={status}
                typographyToken={numbersTypographyToken}
              />
            </NotionalBox>
            <MarginBox>
              <PositionMargin
                marginUSDCompactFormat={marginUSDCompactFormat}
                typographyToken={numbersTypographyToken}
              />
            </MarginBox>
            <MaturityBox>
              <PositionMaturity
                maturityEndTimestampInMS={maturityEndTimestampInMS}
                maturityFormatted={maturityFormatted}
                maturityStartTimestampInMS={maturityStartTimestampInMS}
                typographyToken={textsTypographyToken}
              />
            </MaturityBox>
            <StatusBox variant="large">
              <PositionStatus
                numbersTypographyToken={numbersTypographyToken}
                status={status}
                textsTypographyToken={textsTypographyToken}
                type={type}
              />
            </StatusBox>
            <UnrealizedPNLBox>
              <PositionUnrealizedPNLDetails
                numbersTypographyToken={numbersTypographyToken}
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
          </RightBox>
        </EntryBox>
      </PositionEntryBoxWrapper>
    );
  },
);
