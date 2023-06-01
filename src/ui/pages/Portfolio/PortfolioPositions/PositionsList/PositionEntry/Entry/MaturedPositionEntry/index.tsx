import { TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useAppNavigate } from '../../../../../../../../hooks/useAppNavigate';
import { useResponsiveQuery } from '../../../../../../../../hooks/useResponsiveQuery';
import { ChainIcon } from '../../../../../../../components/ChainIcon';
import { HealthIndicator } from '../../HealthIndicator';
import { MarketTokenInformation } from '../../MarketTokenInformation';
import {
  ButtonsBox,
  ChainIconContainer,
  LeftBox,
  MarginBox,
  MaturityBox,
  PositionEntryBox,
  PositionEntryBoxWrapper,
  RealizedPNLBox,
  RightBox,
  StatusBox,
} from '../../PositionEntry.styled';
import { PositionMargin } from '../../PositionMargin';
import { PositionMaturity } from '../../PositionMaturity';
import { PositionRealizedPNLDetails } from '../../PositionRealizedPNLDetails';
import { PositionStatus } from '../../PositionStatus';
import { RolloverButton, SettleButton } from '../../PositionStatus/PositionStatus.styled';
import { EntryProps } from '../types';

export const MaturedPositionEntry = React.forwardRef<HTMLDivElement, EntryProps>(
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

    const chainIcon = <ChainIcon chainId={chainId} />;
    return (
      <PositionEntryBoxWrapper ref={ref}>
        {chainIcon ? <ChainIconContainer>{chainIcon}</ChainIconContainer> : null}
        <HealthIndicator health={status.health} />
        <PositionEntryBox backgroundColorToken={backgroundColorToken}>
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
            <ButtonsBox>
              {canSettle ? (
                <SettleButton
                  typographyToken={textsTypographyToken}
                  variant="secondary"
                  onClick={handleOnSettle}
                >
                  Settle
                </SettleButton>
              ) : null}
              {canRollover ? (
                <RolloverButton
                  typographyToken={textsTypographyToken}
                  variant="secondary"
                  onClick={handleOnRollover}
                >
                  Rollover
                </RolloverButton>
              ) : null}
            </ButtonsBox>
            <MaturityBox>
              <PositionMaturity
                maturityEndTimestampInMS={maturityEndTimestampInMS}
                maturityFormatted={maturityFormatted}
                maturityStartTimestampInMS={maturityStartTimestampInMS}
                typographyToken={textsTypographyToken}
              />
            </MaturityBox>
            <StatusBox variant="small">
              <PositionStatus
                numbersTypographyToken={numbersTypographyToken}
                status={status}
                textsTypographyToken={textsTypographyToken}
                type={type}
              />
            </StatusBox>
            <MarginBox>
              <PositionMargin
                marginUSDCompactFormat={marginUSDCompactFormat}
                typographyToken={numbersTypographyToken}
              />
            </MarginBox>
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
        </PositionEntryBox>
      </PositionEntryBoxWrapper>
    );
  },
);
