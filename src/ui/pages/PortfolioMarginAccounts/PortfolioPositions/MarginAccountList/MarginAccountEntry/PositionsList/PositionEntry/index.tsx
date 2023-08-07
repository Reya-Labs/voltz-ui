import { TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useResponsiveQuery } from '../../../../../../../../hooks/useResponsiveQuery';
import { HealthIndicator } from './HealthIndicator';
import { MarketTokenInformation } from './MarketTokenInformation';
import {
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
} from './PositionEntry.styled';
import { PositionMargin } from './PositionMargin';
import { PositionMaturity } from './PositionMaturity';
import { PositionNotional } from './PositionNotional';
import { PositionRealizedPNLDetails } from './PositionRealizedPNLDetails';
import { PositionStatus } from './PositionStatus';
import { PositionUnrealizedPNLDetails } from './PositionUnrealizedPNLDetails';
import { EntryProps } from './types';

export const PositionEntry = React.forwardRef<HTMLDivElement, EntryProps>(
  (
    {
      chainId,
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
      id,
    },
    ref,
  ) => {
    const { isLargeDesktopDevice } = useResponsiveQuery();
    const numbersTypographyToken: TypographyToken = isLargeDesktopDevice
      ? 'secondaryBodyMediumRegular'
      : 'secondaryBodySmallRegular';
    const textsTypographyToken: TypographyToken = isLargeDesktopDevice
      ? 'primaryBodyMediumRegular'
      : 'primaryBodySmallRegular';

    return (
      <React.Fragment>
        <PositionEntryBoxWrapper ref={ref}>
          <HealthIndicator health={status.health} />
          <PositionEntryBox backgroundColorToken={backgroundColorToken}>
            <LeftBox>
              <MarketTokenInformation
                isBorrowing={isBorrowing}
                market={market}
                token={token}
                type={type}
                typographyToken={textsTypographyToken}
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
                  type={type}
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
          </PositionEntryBox>
        </PositionEntryBoxWrapper>
      </React.Fragment>
    );
  },
);
