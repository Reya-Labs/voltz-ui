import { TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useAppNavigate } from '../../../../../../../../hooks/useAppNavigate';
import { useResponsiveQuery } from '../../../../../../../../hooks/useResponsiveQuery';
import { ChainIcon } from '../../../../../../../components/ChainIcon';
import { HealthIndicator } from '../../HealthIndicator';
import { MarketTokenInformation } from '../../MarketTokenInformation';
import {
  ChainIconContainer,
  LeftBox,
  MaturityBox,
  PositionEntryBox,
  PositionEntryBoxWrapper,
  RightBox,
  StatusBox,
} from '../../PositionEntry.styled';
import { PositionMaturity } from '../../PositionMaturity';
import { PositionStatus } from '../../PositionStatus';
import { EntryProps } from '../types';

export const SettledPositionEntry = React.forwardRef<HTMLDivElement, EntryProps>(
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
          </RightBox>
        </PositionEntryBox>
      </PositionEntryBoxWrapper>
    );
  },
);
