import { Dialog, TypographyToken } from 'brokoli-ui';
import React, { useState } from 'react';

import { useResponsiveQuery } from '../../../../../../../../hooks/useResponsiveQuery';
import { ChainIcon } from '../../../../../../../components/ChainIcon';
import { HealthIndicator } from '../../HealthIndicator';
import { MarketTokenInformation } from '../../MarketTokenInformation';
import {
  ChainIconContainer,
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
import { PositionTransactionHistoryDialogContent } from '../PositionTransactionHistoryDialogContent';
import { EntryProps } from '../types';

export const ActivePositionEntry = React.forwardRef<HTMLDivElement, EntryProps>(
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
    const [transactionHistoryDialogOpen, setTransactionHistoryDialogOpen] = useState(false);
    const { isLargeDesktopDevice } = useResponsiveQuery();
    const numbersTypographyToken: TypographyToken = isLargeDesktopDevice
      ? 'secondaryBodyMediumRegular'
      : 'secondaryBodySmallRegular';
    const textsTypographyToken: TypographyToken = isLargeDesktopDevice
      ? 'primaryBodyMediumRegular'
      : 'primaryBodySmallRegular';

    const handleOnEntryClick = () => setTransactionHistoryDialogOpen(true);
    const handleOnClose = () => setTransactionHistoryDialogOpen(false);

    const chainIcon = <ChainIcon chainId={chainId} />;
    return (
      <React.Fragment>
        <Dialog open={transactionHistoryDialogOpen}>
          <PositionTransactionHistoryDialogContent
            chainId={chainId}
            id={id}
            isAaveV3={isAaveV3}
            isBorrowing={isBorrowing}
            market={market}
            routeAmmId={routeAmmId}
            routePoolId={routePoolId}
            routePositionId={routePositionId}
            status={status}
            token={token}
            type={type}
            onClose={handleOnClose}
          />
        </Dialog>
        <PositionEntryBoxWrapper ref={ref} onClick={handleOnEntryClick}>
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
          </PositionEntryBox>
        </PositionEntryBoxWrapper>
      </React.Fragment>
    );
  },
);
